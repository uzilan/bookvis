import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { Relationship } from '../models/Relationship';

interface CharacterGraphProps {
  characters: Character[];
  factions: Faction[];
  relationships?: Relationship[];
}

export const CharacterGraph: React.FC<CharacterGraphProps> = ({ characters, factions, relationships = [] }) => {
  // Color palette for factions
  const factionColors: Record<string, string> = {
    f1: '#e0e7ff', // blue-ish
    f2: '#fef9c3', // yellow-ish
    f3: '#fee2e2', // red-ish
    // Add more as needed
  };

  // Create compound nodes for factions
  const elements = [
    ...factions.map((faction) => ({
      data: { id: faction.id, label: faction.title, bgcolor: factionColors[faction.id] || '#e0e0e0' },
      classes: 'faction',
    })),
    ...characters.map((character) => ({
      data: {
        id: character.id,
        label: character.name,
        parent: character.factions[0] || undefined, // assign to first faction if exists
      },
      classes: 'character',
    })),
    ...relationships.map((rel, i) => ({
      data: {
        id: `rel-${i}`,
        source: rel.character1.id,
        target: rel.character2.id,
        label: rel.description,
      },
      classes: 'relationship',
    })),
  ];

  const layout = { name: 'cose', padding: 30 };

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
        'width': 320,
        'height': 320,
        'text-margin-y': -10, // Move label even closer above the group
        'text-background-color': '#fff',
        'text-background-opacity': 1,
        'text-background-padding': 6,
      },
    },
    {
      selector: 'node.character',
      style: {
        'background-color': '#fafafa',
        'label': 'data(label)',
        'color': '#111',
        'font-size': 12,
        'font-weight': 'bold',
        'border-width': 2,
        'border-color': '#333',
        'width': 80,
        'height': 80,
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'ellipse',
        'userDraggable': true,
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

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#f8fafc' }}>
      <CytoscapeComponent
        elements={elements as any}
        style={{ width: '100vw', height: '100vh' }}
        layout={layout}
        stylesheet={style}
      />
    </div>
  );
}; 