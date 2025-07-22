import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import { CharacterDetailsPanel } from './CharacterDetailsPanel';
import { ChapterSlider } from './ChapterSlider';

interface CharacterGraphProps {
  bookData: BookData;
  selectedChapter: number;
  onChapterChange: (index: number) => void;
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}

export const CharacterGraphVis: React.FC<CharacterGraphProps> = ({ 
  bookData, 
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
  const createVisData = () => {
    const nodes: Record<string, unknown>[] = [];
    const edges: Record<string, unknown>[] = [];

    // Position faction legend boxes in a horizontal row at the top
    const legendStartX = -600;
    const legendY = -400;
    const legendSpacing = 300;
    
    bookData.factions.forEach((faction, index) => {
      const x = legendStartX + (index * legendSpacing);
      nodes.push({
        id: `faction-${faction.id}`,
        label: faction.title,
        group: 'faction',
        color: faction.color,
        shape: 'box',
        widthConstraint: { minimum: 200, maximum: 250 },
        heightConstraint: { minimum: 80, maximum: 120 },
        font: { size: 14, face: 'Arial', bold: true },
        borderWidth: 2,
        borderColor: '#888',
        x: x,
        y: legendY,
        fixed: true, // Keep legend boxes in fixed positions
      });
    });

    // Add character nodes in the main area
    bookData.characters.forEach((character) => {
      const primaryFaction = character.factions[0];
      
      nodes.push({
        id: character.id,
        label: character.name,
        group: 'character',
        color: primaryFaction ? bookData.factions.find(f => f.id === primaryFaction)?.color : '#cccccc',
        shape: 'circle',
        size: 25,
        font: { size: 9, face: 'Arial', bold: true },
        borderWidth: 2,
        borderColor: '#333',
        // Position characters in the main area (center)
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      });
    });

    // Add relationship edges
    bookData.relationships.forEach((rel, index) => {
      edges.push({
        id: `rel-${index}`,
        from: rel.character1.id,
        to: rel.character2.id,
        label: rel.descriptions[0]?.description || 'Related',
        arrows: 'to',
        color: '#888',
        width: 2,
        font: { size: 8, color: '#333' },
      });
    });

    return { nodes, edges };
  };

  // Network options
  const options = {
    nodes: {
      shape: 'circle',
      font: {
        size: 12,
        face: 'Arial',
      },
    },
    edges: {
      color: '#888',
      width: 2,
      smooth: {
        enabled: true,
        type: 'continuous',
        roundness: 0.5,
      },
    },
    groups: {
      faction: {
        shape: 'box',
        font: { size: 16, bold: true },
        color: { background: '#e0e0e0', border: '#888' },
      },
      ungrouped: {
        shape: 'circle',
        color: { background: '#cccccc', border: '#333' },
        font: { size: 10, bold: true },
      },
    },

    physics: {
      enabled: true,
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springLength: 100,
        springConstant: 0.08,
        damping: 0.4,
        avoidOverlap: 0.6,
      },
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
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const character = bookData.characters.find(c => c.id === nodeId);
          if (character) {
            setSelectedCharacter(character);
            setIsDetailsPanelOpen(true);
          }
        }
      });

      // Fit network to view
      network.fit();
    }
  }, []);

  // Update network when data changes
  useEffect(() => {
    if (networkInstanceRef.current) {
      const data = createVisData();
      networkInstanceRef.current.setData(data);
      networkInstanceRef.current.fit();
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