import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Network } from 'vis-network/standalone';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import { CharacterDetailsPanel } from './CharacterDetailsPanel';
import { ChapterSlider } from './ChapterSlider';
import { LocationList } from './LocationList';
import { FactionList } from './FactionList';
import { CharacterList } from './CharacterList';
import { useTheme } from '../hooks/useTheme';



interface CharacterGraphProps {
  bookData: BookData;
  fullBookData: BookData;
  selectedChapter: string; // Changed from number to string (chapter ID)
  onChapterChange: (chapterId: string) => void; // Changed from index to chapterId
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
  onCreateBook: () => void;
  isPreview?: boolean; // New prop to indicate preview mode
  onExitPreview?: () => void; // New prop to handle exiting preview mode
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
  onBookChange,
  onCreateBook,
  isPreview = false,
  onExitPreview
}) => {
  const { isDarkMode } = useTheme();
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
      // Check if character appears in current chapter using character mentions
      const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
      const characterAppearsInChapter = currentChapter && currentChapter.characters && currentChapter.characters.includes(character.id);
      

      
      // Only show characters that appear in the current chapter
      if (!characterAppearsInChapter) {
        return; // Skip this character
      }
      
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
        // Smart positioning based on relationships and character count
        const existingPosition = currentPositions[character.id];
        if (existingPosition) {
          position = existingPosition;
        } else {
          // Calculate smart initial positions
          const chapterCharacters = bookData.characters.filter(char => {
            const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
            return currentChapter && currentChapter.characters && currentChapter.characters.includes(char.id);
          });
          
          const characterIndex = chapterCharacters.findIndex(char => char.id === character.id);
          const totalCharacters = chapterCharacters.length;
          
          if (totalCharacters <= 2) {
            // For 1-2 characters, position them close together
            position = {
              x: characterIndex * 100 - 50, // 100px apart for 2 characters
              y: 0,
            };
          } else {
            // For more characters, use circular layout
            const angle = (characterIndex / totalCharacters) * 2 * Math.PI;
            const radius = 150;
            position = {
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
            };
          }
        }
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

    // Add relationship edges (only for characters that appear in current chapter)
    bookData.relationships.forEach((rel, index) => {
      const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
      const character1Appears = currentChapter && currentChapter.characters && currentChapter.characters.includes(rel.character1.id);
      const character2Appears = currentChapter && currentChapter.characters && currentChapter.characters.includes(rel.character2.id);
      
      // Only show relationships where both characters appear in the current chapter
      if (character1Appears && character2Appears) {
        edges.push({
          id: `rel-${index}`,
          from: rel.character1.id,
          to: rel.character2.id,
          label: rel.descriptions[0]?.description || 'Related',
          color: '#888',
          width: 2,
          font: { 
            size: 14, 
            color: isDarkMode ? '#ffffff' : '#000000',
            strokeWidth: 0
          },
          labelHighlightBold: false,
          smooth: { type: 'continuous' },
          shadow: { enabled: false }
        });
      }
    });

    // Add invisible edges between orphan nodes to keep them closer together
    const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
    if (currentChapter && currentChapter.characters) {
      const chapterCharacters = currentChapter.characters;
      const connectedCharacters = new Set<string>();
      
      // Find all characters that have relationships
      bookData.relationships.forEach(rel => {
        if (chapterCharacters.includes(rel.character1.id) && chapterCharacters.includes(rel.character2.id)) {
          connectedCharacters.add(rel.character1.id);
          connectedCharacters.add(rel.character2.id);
        }
      });
      
      // Find orphan characters (those without relationships)
      const orphanCharacters = chapterCharacters.filter(charId => !connectedCharacters.has(charId));
      
      // If we have 2 or more orphan characters, connect them with invisible edges
      if (orphanCharacters.length >= 2) {
        // Connect each orphan to the next one in a chain
        for (let i = 0; i < orphanCharacters.length - 1; i++) {
          edges.push({
            id: `orphan-${i}`,
            from: orphanCharacters[i],
            to: orphanCharacters[i + 1],
            color: 'transparent', // Invisible edge
            width: 0,
            hidden: true, // Hide the edge completely
            smooth: { type: 'continuous' },
          });
        }
        
        // If we have more than 2 orphans, also connect the last to the first for a complete cycle
        if (orphanCharacters.length > 2) {
          edges.push({
            id: `orphan-cycle`,
            from: orphanCharacters[orphanCharacters.length - 1],
            to: orphanCharacters[0],
            color: 'transparent',
            width: 0,
            hidden: true,
            smooth: { type: 'continuous' },
          });
        }
      }
    }

    return { nodes, edges };
  }, [bookData.characters, bookData.factions, bookData.relationships, bookData.chapters, selectedChapter, isClustered, isDarkMode]);

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
      font: { size: 14, color: isDarkMode ? '#ffffff' : '#000000', strokeWidth: 0 },
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
        nodeDistance: 250, // Increased distance for connected nodes
        centralGravity: 0.15, // Stronger gravity to pull unconnected nodes together
        springLength: 180, // Longer spring length for connected nodes
        springConstant: 0.02, // Lighter spring force to allow more distance
        damping: 0.9,
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      dragNodes: true, // Enable node dragging
      dragView: true, // Enable view dragging
      zoomView: true, // Enable zooming
    },
    manipulation: {
      enabled: false, // Disable manipulation controls but keep node dragging
    },

  }), [bookData.factions, isDarkMode]);

  // Initialize network
  useEffect(() => {
    if (networkRef.current && !networkInstanceRef.current) {
      // Add CSS for navigation controls
      const style = document.createElement('style');
      style.textContent = `
        .vis-navigation {
          background: var(--color-background) !important;
          border: 0.5px solid var(--color-border) !important;
          border-radius: 4px !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          padding: 2px !important;
        }
        .vis-navigation button {
          color: var(--color-text) !important;
          background: var(--color-background) !important;
          border: 0.5px solid var(--color-border) !important;
          margin: 1px !important;
          padding: 4px !important;
        }
        .vis-navigation button:hover {
          background: var(--color-hover) !important;
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
      background: 'var(--color-background)',
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
        {/* Character List */}
        {(() => {
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          // Filter characters to only show those that appear in the current chapter
          const chapterCharacters = bookData.characters.filter(character => {
            return currentChapter?.characters && currentChapter.characters.includes(character.id);
          });
          
          return (
            <CharacterList 
              characters={chapterCharacters} 
              bookData={fullBookData}
              onCharacterClick={(character) => {
                setSelectedCharacter(character);
                setIsDetailsPanelOpen(true);
              }}
            />
          );
        })()}

        {/* Faction List */}
        {(() => {
          // Calculate factions relevant to the current chapter
          const chapterRelevantFactions = bookData.factions.filter(faction => {
            // Check if any character in this chapter belongs to this faction
            return bookData.characters.some(character => {
              // Check if character appears in current chapter
              const characterAppearsInChapter = bookData.chapters.some(ch => 
                ch.id === selectedChapter && ch.characters && ch.characters.includes(character.id)
              );
              // Check if character belongs to this faction
              const characterBelongsToFaction = character.factions.includes(faction.id);
              return characterAppearsInChapter && characterBelongsToFaction;
            });
          });

          return (
            <FactionList 
              factions={chapterRelevantFactions} 
              bookData={fullBookData}
              isPreview={isPreview}
              onCharacterClick={(character) => {
                setSelectedCharacter(character);
                setIsDetailsPanelOpen(true);
              }}
            />
          );
        })()}

        {/* Location List */}
        {(() => {
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          // Always show LocationList for consistent UI
          return (
            <LocationList 
              locations={currentChapter?.locations || []} 
              chapterTitle={currentChapter?.title || 'All Locations'}
              chapterId={selectedChapter}
              bookData={bookData}
              isPreview={isPreview}
            />
          );
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
        padding: '3px',
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
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: 'var(--color-text)',
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
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: 'var(--color-text)',
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
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            color: 'var(--color-text)',
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
        selectedBook={isPreview ? bookData.book : selectedBook}
        onBookChange={onBookChange}
        onCreateBook={onCreateBook}
        showBookSelector={false}
        isPreview={isPreview}
        onExitPreview={onExitPreview}
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
