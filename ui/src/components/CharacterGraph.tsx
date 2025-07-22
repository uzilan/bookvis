import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import { CharacterDetailsPanel } from './CharacterDetailsPanel';
import { ChapterSlider } from './ChapterSlider';



interface CharacterGraphProps {
  bookData: BookData;
  fullBookData: BookData;
  selectedChapter: number;
  onChapterChange: (index: number) => void;
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
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
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<Network | null>(null);

  // Create vis.js nodes and edges with legend-style faction display
  const createVisData = (preservePositions = false) => {
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

    // Add character nodes in the main area
    bookData.characters.forEach((character) => {
      const primaryFaction = character.factions[0];
      
      // Use existing position if available, otherwise random
      const existingPosition = currentPositions[character.id];
      const position = existingPosition || {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      };

      nodes.push({
        id: character.id,
        label: character.name,
        group: 'character',
        color: primaryFaction ? bookData.factions.find(f => f.id === primaryFaction)?.color : '#cccccc',
        font: { size: 16, face: 'Arial', bold: true },
        borderWidth: 2,
        borderColor: '#333',
        size: 100, // Explicit size override
        widthConstraint: { minimum: 100, maximum: 100 },
        heightConstraint: { minimum: 100, maximum: 100 },
        // Use preserved position or random position
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
  };

  // Network options
  const options = {
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
        avoidOverlap: 0.5,
      },
    },
    smooth: {
      enabled: true,
      type: 'continuous',
      forceDirection: 'none',
      roundness: 0.5,
    },
    animation: {
      enabled: true,
      duration: 8000,
      easingFunction: 'easeInOutQuad',
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
    },
  };

  // Initialize network
  useEffect(() => {
    if (networkRef.current && !networkInstanceRef.current) {
      const data = createVisData();
      const network = new Network(networkRef.current, data, options);
      networkInstanceRef.current = network;

      // Handle node clicks
      network.on('click', (params) => {
        console.log('Node click detected:', params);
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          console.log('Clicked node ID:', nodeId);
          const character = fullBookData.characters.find(c => c.id === nodeId);
          console.log('Found character:', character);
          console.log('Available characters in fullBookData:', fullBookData.characters.map(c => ({ id: c.id, name: c.name })));
          if (character) {
            console.log('Setting selected character and opening panel');
            setSelectedCharacter(character);
            setIsDetailsPanelOpen(true);
          } else {
            console.log('Character not found in fullBookData.characters:', fullBookData.characters.map(c => c.id));
          }
        }
      });

      // Fit network to view
      network.fit();
    }
  }, []); // Keep empty dependency array



  // Update network when data changes
  useEffect(() => {
    if (networkInstanceRef.current) {
      const data = createVisData(true); // Preserve current positions
      networkInstanceRef.current.setData(data);
      // Don't call fit() here as it would reset the view
    }
  }, [bookData, selectedChapter]);



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


      {/* Faction Legend */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #333',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        minWidth: '200px',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#000' }}>
          Factions:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {bookData.factions.map((faction) => (
            <div key={faction.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: faction.color,
                border: '2px solid #333',
                borderRadius: '3px',
              }} />
              <span style={{ fontSize: '13px', color: '#000', fontWeight: '500' }}>{faction.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={networkRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
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
        open={isDetailsPanelOpen}
        onClose={handleCloseDetailsPanel}
      />
    </div>
  );
};
