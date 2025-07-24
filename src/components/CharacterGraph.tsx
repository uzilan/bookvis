import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Network } from 'vis-network/standalone';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import { CharacterDetailsPanel } from './CharacterDetailsPanel';
import { ChapterSlider } from './ChapterSlider';
import { LocationList } from './LocationList';
import { FactionList } from './FactionList';



interface CharacterGraphProps {
  bookData: BookData;
  fullBookData: BookData;
  selectedChapter: string; // Changed from number to string (chapter ID)
  onChapterChange: (chapterId: string) => void; // Changed from index to chapterId
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}



// Utility to determine if a color is dark
function isDarkColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

// Utility to generate a pie chart SVG data URI for an array of colors with character name
function generatePieSVG(colors: string[], characterName: string, size = 100): string {
  if (colors.length === 0) return '';
  const radius = size / 2;
  const cx = radius;
  const cy = radius;
  const total = colors.length;
  let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>`;
  
  // For 1 color, create a solid circle
  if (total === 1) {
    svg += `<circle cx='${cx}' cy='${cy}' r='${radius-2}' fill='${colors[0]}'/>`;
  } else if (total === 2) {
    // For 2 colors, create a vertical split (left/right halves of circle)
    // Left half of circle
    svg += `<path d='M${cx},${cy} L${cx},${cy-radius} A${radius},${radius} 0 0 1 ${cx},${cy+radius} Z' fill='${colors[0]}'/>`;
    // Right half of circle
    svg += `<path d='M${cx},${cy} L${cx},${cy-radius} A${radius},${radius} 0 0 0 ${cx},${cy+radius} Z' fill='${colors[1]}'/>`;
  } else {
    // For more than 2 colors, use pie chart
    let startAngle = 0;
    for (let i = 0; i < total; i++) {
      const endAngle = startAngle + (2 * Math.PI) / total;
      const x1 = cx + radius * Math.cos(startAngle);
      const y1 = cy + radius * Math.sin(startAngle);
      const x2 = cx + radius * Math.cos(endAngle);
      const y2 = cy + radius * Math.sin(endAngle);
      const largeArcFlag = (endAngle - startAngle) > Math.PI ? 1 : 0;
      svg += `<path d='M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z' fill='${colors[i]}'/>`;
      startAngle = endAngle;
    }
  }
  
  svg += `<circle cx='${cx}' cy='${cy}' r='${radius-2}' fill='none' stroke='#333' stroke-width='2'/>`;
  // Add character name in the center with wrapping
  const maxCharsPerLine = 8; // Adjust based on desired fit and font size
  const lineHeight = 8; // Adjust based on font size (font-size 6 + some padding)
  const words = characterName.split(' ');
  let lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine === '' ? '' : ' ') + word;
    } else {
      if (currentLine !== '') {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  if (currentLine !== '') {
    lines.push(currentLine);
  }

  // If a single word is too long, force break it
  if (lines.length === 1 && lines[0].length > maxCharsPerLine) {
    const originalLine = lines[0];
    lines = [];
    for (let i = 0; i < originalLine.length; i += maxCharsPerLine) {
      lines.push(originalLine.substring(i, i + maxCharsPerLine));
    }
  }

  const totalTextHeight = lines.length * lineHeight;
  const initialY = cy - (totalTextHeight / 2) + (lineHeight / 2); // Center vertically

  // Determine text color based on background colors
  let textColor = '#333'; // Default dark text
  if (total === 1) {
    // Single color - check if it's dark
    textColor = isDarkColor(colors[0]) ? '#FFFFFF' : '#333';
  } else {
    // Multiple colors - check if any are dark
    const hasDarkColor = colors.some(color => isDarkColor(color));
    textColor = hasDarkColor ? '#FFFFFF' : '#333';
  }

  svg += `<text x='${cx}' y='${initialY}' text-anchor='middle' font-family='Arial' font-size='6' font-weight='bold' fill='${textColor}'>`;
  lines.forEach((line, index) => {
    svg += `<tspan x='${cx}' dy='${index === 0 ? 0 : lineHeight}'>${line}</tspan>`;
  });
  svg += `</text>`;
  svg += '</svg>';
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CharacterGraph: React.FC<CharacterGraphProps> = ({
  bookData,
  fullBookData,
  selectedChapter,
  onChapterChange,
  books,
  selectedBook,
  onBookChange
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isClustered] = useState(true); // Start with clustering enabled by default
  const [currentZoom, setCurrentZoom] = useState(1);
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<Network | null>(null);

  // Create vis.js nodes and edges with faction-based clustering
  const createVisData = useCallback((preservePositions = false) => {
    const nodes: Record<string, unknown>[] = [];
    const edges: Record<string, unknown>[] = [];

    // Get current node positions if preserving positions
    const currentPositions: Record<string, { x: number; y: number }> = {};
    if (preservePositions && networkInstanceRef.current) {
      const currentNodes = networkInstanceRef.current.getPositions();
      Object.keys(currentNodes).forEach(nodeId => {
        currentPositions[nodeId] = currentNodes[nodeId];
      });
    }

    // Debug: Log available chapters

    
    // Group characters by faction for clustering
    const factionGroups: Record<string, Character[]> = {};
    bookData.characters.forEach((character) => {
      // Filter factions based on current chapter
      const currentFactions = character.factions.filter(factionId => {
        const joinChapter = character.factionJoinChapters?.[factionId];
        if (!joinChapter) return false;
        
        // Handle both number (backward compatibility) and string (chapter ID) values
        if (typeof joinChapter === 'number') {
          // For backward compatibility with numeric chapter indices
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          return currentChapter && typeof currentChapter.index === 'number' && joinChapter <= currentChapter.index;
        } else if (typeof joinChapter === 'string') {
          // For string chapter IDs, find the target chapter and current chapter
          const targetChapter = bookData.chapters.find(ch => ch.id === joinChapter);
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          return targetChapter && targetChapter.index && currentChapter && currentChapter.index && 
                 targetChapter.index <= currentChapter.index;
        }
        return false;
      });
      
      const primaryFaction = currentFactions[0] || character.factions[0];
      if (primaryFaction) {
        if (!factionGroups[primaryFaction]) {
          factionGroups[primaryFaction] = [];
        }
        factionGroups[primaryFaction].push(character);
      }
    });

    // Add character nodes with faction-based positioning
    bookData.characters.forEach((character) => {
      // Filter factions based on current chapter
      const currentFactions = character.factions.filter(factionId => {
        const joinChapter = character.factionJoinChapters?.[factionId];
        if (!joinChapter) return false;
        
        // Handle both number (backward compatibility) and string (chapter ID) values
        if (typeof joinChapter === 'number') {
          // For backward compatibility with numeric chapter indices
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          return currentChapter && typeof currentChapter.index === 'number' && joinChapter <= currentChapter.index;
        } else if (typeof joinChapter === 'string') {
          // For string chapter IDs, find the target chapter and current chapter
          const targetChapter = bookData.chapters.find(ch => ch.id === joinChapter);
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          return targetChapter && targetChapter.index && currentChapter && currentChapter.index && 
                 targetChapter.index <= currentChapter.index;
        }
        return false;
      });
      
      const factionColors = currentFactions
        .map(fid => {
          const faction = bookData.factions.find(f => f.id === fid);
          return faction?.color;
        })
        .filter(Boolean) as string[];
      
      // If no current factions, use a default color to prevent invisible nodes
      const finalColors = factionColors.length > 0 ? factionColors : ['#ffffff'];
      
      // Determine the primary faction for clustering (use first current faction)
      const primaryFaction = currentFactions[0] || character.factions[0];
      const factionGroup = primaryFaction ? `faction-${primaryFaction}` : 'character';
      
      // Calculate position based on faction grouping
      let position;
      if (isClustered && primaryFaction && factionGroups[primaryFaction]) {
        // Position characters in clusters by faction
        const factionIndex = Object.keys(factionGroups).indexOf(primaryFaction);
        const characterIndex = factionGroups[primaryFaction].indexOf(character);
        const clusterX = (factionIndex - 1) * 200; // Spread clusters horizontally
        const clusterY = (characterIndex - factionGroups[primaryFaction].length / 2) * 80; // Stack within cluster
        position = {
          x: clusterX + (Math.random() - 0.5) * 50, // Add some randomness
          y: clusterY + (Math.random() - 0.5) * 50,
        };
      } else {
        // Use existing position or random
        const existingPosition = currentPositions[character.id];
        position = existingPosition || {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
        };
      }
      
      // Use SVG image for all characters (single or multiple factions)
      nodes.push({
        id: character.id,
        label: '', // No label since name is inside the SVG
        group: factionGroup, // Use faction-based grouping
        shape: 'image',
        image: generatePieSVG(finalColors, character.name, 60),
        font: { size: 16, face: 'Arial', bold: true },
        borderWidth: 2,
        borderColor: '#333',
        size: 60,
        widthConstraint: { minimum: 60, maximum: 60 },
        heightConstraint: { minimum: 60, maximum: 60 },
        x: position.x,
        y: position.y,
      });
    });

    // Add relationship edges
    bookData.relationships.forEach((rel, index) => {
      edges.push({
        id: `rel-${index}`,
        from: rel.character1.id,
        to: rel.character2.id,
        label: rel.descriptions[0]?.description || 'Related',
        color: '#888',
        width: 2,
        font: { size: 14, color: '#333' },
      });
    });

    return { nodes, edges };
  }, [bookData.characters, bookData.factions, bookData.relationships, bookData.chapters, selectedChapter, isClustered]);

  // Network options
  const options = useMemo(() => ({
    nodes: {
      shape: 'circle',
      font: {
        size: 16,
        face: 'Arial',
      },
      size: 100, // Default size for all nodes
      scaling: {
        min: 100,
        max: 100,
        label: {
          enabled: false,
        },
      },
    },
    edges: {
      color: '#888',
      width: 2,
      font: { size: 14, color: '#333' },
      smooth: {
        enabled: true,
        type: 'continuous',
        roundness: 0.5,
      },
    },
    groups: {
      character: {
        shape: 'circle',
        size: 100, // Fixed size for character nodes
        color: { background: '#cccccc', border: '#333' },
        font: { size: 16, bold: true },
        scaling: {
          min: 100,
          max: 100,
          label: {
            enabled: false,
          },
        },
      },
      // Add faction-specific groups for clustering
      ...bookData.factions.reduce((acc, faction) => {
        acc[`faction-${faction.id}`] = {
          shape: 'circle',
          size: 100,
          color: { background: faction.color, border: '#333' },
          font: { size: 16, bold: true },
          scaling: {
            min: 100,
            max: 100,
            label: {
              enabled: false,
            },
          },
        };
        return acc;
      }, {} as Record<string, Record<string, unknown>>),
    },

            physics: {
      enabled: true,
      solver: 'repulsion',
      repulsion: {
        nodeDistance: 150,
        centralGravity: 0.05,
        springLength: 200,
        springConstant: 0.01,
        damping: 0.9,
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
    },
    manipulation: {
      enabled: false, // Disable node manipulation but enable zoom controls
    },

  }), [bookData.factions]);

  // Initialize network
  useEffect(() => {
    if (networkRef.current && !networkInstanceRef.current) {
      // Add CSS for navigation controls
      const style = document.createElement('style');
      style.textContent = `
        .vis-navigation {
          background: white !important;
          border: 1px solid #ccc !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }
        .vis-navigation button {
          color: #333 !important;
          background: white !important;
          border: 1px solid #ccc !important;
        }
        .vis-navigation button:hover {
          background: #f0f0f0 !important;
        }
      `;
      document.head.appendChild(style);

      const data = createVisData();
      const network = new Network(networkRef.current, data, options);
      networkInstanceRef.current = network;

      // Handle node clicks
      network.on('click', (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const character = fullBookData.characters.find(c => c.id === nodeId);
          if (character) {
            setSelectedCharacter(character);
            setIsDetailsPanelOpen(true);
          }
        }
      });

      // Fit network to view
      network.fit();
    }
  }, [createVisData, fullBookData.characters, options]);



  // Update network when data changes
  useEffect(() => {
    if (networkInstanceRef.current) {
      const data = createVisData(true); // Preserve current positions
      networkInstanceRef.current.setData(data);
      // Don't call fit() here as it would reset the view
    }
  }, [bookData, selectedChapter, createVisData, isClustered]);



  const handleCloseDetailsPanel = () => {
    setIsDetailsPanelOpen(false);
    setSelectedCharacter(null);
  };



  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#f8fafc',
      overflow: 'hidden',
      position: 'relative',
    }}>





      {/* Sidebar Panels Wrapper */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '50px',
        width: '240px',
        zIndex: 1002,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxHeight: 'calc(100vh - 40px)',
      }}>
        {/* Faction List */}
        <FactionList 
          factions={bookData.factions} 
          bookData={fullBookData}
          onCharacterClick={(character) => {
            setSelectedCharacter(character);
            setIsDetailsPanelOpen(true);
          }}
        />

        {/* Location List */}
        {(() => {
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          return currentChapter && currentChapter.locations ? (
            <LocationList 
              locations={currentChapter.locations} 
              chapterTitle={currentChapter.title}
              chapterId={selectedChapter}
              bookData={bookData}
            />
          ) : null;
        })()}
      </div>


      <div
        ref={networkRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Custom Zoom Controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '300px',
        zIndex: 100,
        background: 'white',
        padding: '6px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <button
          onClick={() => {
            const newZoom = Math.min(currentZoom * 1.2, 5); // Max zoom 5x
            setCurrentZoom(newZoom);
            networkInstanceRef.current?.moveTo({ 
              scale: newZoom,
              animation: {
                duration: 300,
                easingFunction: 'easeInOutQuad'
              }
            });
          }}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #ddd',
            background: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#333',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            const newZoom = Math.max(currentZoom * 0.8, 0.1); // Min zoom 0.1x
            setCurrentZoom(newZoom);
            networkInstanceRef.current?.moveTo({ 
              scale: newZoom,
              animation: {
                duration: 300,
                easingFunction: 'easeInOutQuad'
              }
            });
          }}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #ddd',
            background: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#333',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          −
        </button>
        <button
          onClick={() => {
            setCurrentZoom(1);
            // Fit to the available space (accounting for sidebar)
            networkInstanceRef.current?.fit({
              animation: {
                duration: 300,
                easingFunction: 'easeInOutQuad'
              }
            });
            // Move view to account for sidebar width
            setTimeout(() => {
              networkInstanceRef.current?.moveTo({
                offset: { x: 140, y: 0 },
                animation: {
                  duration: 200,
                  easingFunction: 'easeInOutQuad'
                }
              });
            }, 350); // Wait for fit animation to complete
          }}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #ddd',
            background: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#333',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ⤢
        </button>
      </div>

      <ChapterSlider
        chapters={bookData.chapters}
        value={selectedChapter}
        onChange={onChapterChange}
        books={books}
        selectedBook={selectedBook}
        onBookChange={onBookChange}
      />
      <CharacterDetailsPanel
        character={selectedCharacter}
        factions={bookData.factions}
        chapters={bookData.chapters}
        relationships={bookData.relationships}
        selectedChapter={selectedChapter}
        open={isDetailsPanelOpen}
        onClose={handleCloseDetailsPanel}
      />
    </div>
  );
};
