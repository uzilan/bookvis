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

  // Create vis.js nodes and edges
  const createVisData = () => {
    const nodes: Record<string, unknown>[] = [];
    const edges: Record<string, unknown>[] = [];

    // Add faction nodes (groups)
    bookData.factions.forEach((faction) => {
      nodes.push({
        id: faction.id,
        label: faction.title,
        group: 'faction',
        color: faction.color,
        shape: 'box',
        widthConstraint: { minimum: 200 },
        heightConstraint: { minimum: 100 },
        font: { size: 16, face: 'Arial', bold: true },
        borderWidth: 3,
        borderColor: '#888',
      });
    });

    // Add character nodes
    bookData.characters.forEach((character) => {
      nodes.push({
        id: character.id,
        label: character.name,
        color: '#fafafa',
        shape: 'circle',
        size: 30,
        font: { size: 10, face: 'Arial', bold: true },
        borderWidth: 2,
        borderColor: '#333',
        // Group characters by their first faction
        group: character.factions[0] || 'ungrouped',
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
      character: {
        shape: 'circle',
        color: { background: '#fafafa', border: '#333' },
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
        avoidOverlap: 0.5,
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