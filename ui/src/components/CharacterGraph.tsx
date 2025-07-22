import React, { useState, useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
// @ts-expect-error - cytoscape-node-editing has no type declarations
import nodeEditing from 'cytoscape-node-editing';
import type { BookData } from '../models/BookData';
import type { Character } from '../models/Character';
import type { Book } from '../models/Book';
import { CharacterDetailsPanel } from './CharacterDetailsPanel';
import { ChapterSlider } from './ChapterSlider';

// Register the node editing extension
cytoscape.use(nodeEditing);

interface CharacterGraphProps {
  bookData: BookData;
  selectedChapter: number;
  onChapterChange: (index: number) => void;
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}

export const CharacterGraph: React.FC<CharacterGraphProps> = ({ 
  bookData, 
  selectedChapter, 
  onChapterChange, 
  books, 
  selectedBook, 
  onBookChange 
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const cyRef = useRef<cytoscape.Core | null>(null);

  // Auto-reorganize layout when chapter changes
  useEffect(() => {
    if (cyRef.current) {
      // Only re-layout if there are elements to layout
      const elementCount = cyRef.current.elements().length;
      if (elementCount > 0) {
        // Add a delay so users can see new elements appear first
        const timeoutId = setTimeout(() => {
          if (cyRef.current) {
            try {
              cyRef.current.layout(layout).run();
            } catch (error) {
              console.warn('Layout failed:', error);
            }
          }
        }, 500); // 500ms delay before re-layout
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedChapter, bookData.characters.length, bookData.relationships.length]);

  // Create a lookup for faction colors from the factions array
  const factionColors: Record<string, string> = Object.fromEntries(bookData.factions.map(f => [f.id, f.color]));

  // Layout configuration for cose
  const layout = { 
    name: 'cose', 
    padding: 10, // Reduced from 20
    animate: true,
    animationDuration: 2000,
    animationEasing: 'ease-out-cubic',
    fit: true,
    nodeDimensionsIncludeLabels: true,
    // Compound node specific settings - much tighter arrangement
    nestingFactor: 0.02, // Reduced from 0.05
    nodeRepulsion: 1500, // Reduced from 2500
    idealEdgeLength: 20, // Reduced from 30
    edgeElasticity: 0.2, // Reduced from 0.3
    gravity: 0.6, // Increased from 0.4 to pull nodes much closer
    gravityRange: 0.3, // Reduced from 0.5
    gravityCompound: 0.2, // Increased from 0.1
  };

  // Create compound nodes for factions
  const elements = [
    ...bookData.factions.map((faction) => ({
      data: { id: faction.id, label: faction.title, bgcolor: factionColors[faction.id] || '#e0e0e0' },
      classes: 'faction',
    })),
    ...bookData.characters.map((character) => ({
      data: {
        id: character.id,
        label: character.name,
        parent: character.factions[0] || undefined, // assign to first faction if exists
      },
      classes: 'character',
    })),
    ...bookData.relationships.map((rel, i) => ({
      data: {
        id: `rel-${i}`,
        source: rel.character1.id,
        target: rel.character2.id,
        label: rel.descriptions[0]?.description || 'Related',
      },
      classes: 'relationship',
    })),
  ];

  const style = [
    {
      selector: 'node.faction',
      style: {
        'background-color': 'data(bgcolor)',
        'label': 'data(label)',
        'text-valign': 'top',
        'text-halign': 'center',
        'font-size': 16,
        'font-weight': 'bold',
        'shape': 'roundrectangle',
        'padding': '20px',
        'border-width': 3,
        'border-color': '#888',
        'width': 200,
        'height': 200,
        'text-margin-y': -10, // Move label even closer above the group
        'text-background-color': '#fff',
        'text-background-opacity': 1,
        'text-background-padding': 6,
        'resize': 'manual',
        'resize-from': 'width height',
        'resize-to': 'width height',
        'resize-handle-width': 10,
        'resize-handle-color': '#ff0000',
        'resize-handle-border-color': '#fff',
        'resize-handle-border-width': 2,
        'resize-handle-opacity': 1,
      },
    },
    {
      selector: 'node.character',
      style: {
        'background-color': '#fafafa',
        'label': 'data(label)',
        'color': '#111',
        'font-size': 8, // Reduced from 12
        'font-weight': 'bold',
        'border-width': 2,
        'border-color': '#333',
        'width': 80,
        'height': 80,
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'ellipse',
        'userDraggable': true,
        'cursor': 'pointer',
      },
    },
    {
      selector: 'edge.relationship',
      style: {
        'width': 3,
        'line-color': '#888',
        'target-arrow-color': '#888',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': 10,
        'color': '#333',
      },
    },
  ];

  const handleNodeClick = (event: cytoscape.EventObject) => {
    const node = event.target;
    if (node.hasClass('character')) {
      const characterId = node.id();
      const character = bookData.characters.find(c => c.id === characterId);
      if (character) {
        setSelectedCharacter(character);
        setIsDetailsPanelOpen(true);
      }
    }
  };

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
      clipPath: 'inset(0 0 0 0)',
      isolation: 'isolate'
    }}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        layout={layout}
        stylesheet={style}
        cy={(cy: cytoscape.Core) => {
          cy.on('tap', 'node', handleNodeClick);
          // Enable panning and zooming
          cy.panningEnabled(true);
          cy.zoomingEnabled(true);
          // Ensure the graph stays within bounds
          cy.fit();
          cyRef.current = cy; // Store the cytoscape instance in the ref
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