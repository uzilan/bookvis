import React, { useState } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import type { Character } from './models/Character';
import type { Faction } from './models/Faction';
import type { Relationship } from './models/Relationship';
// import { ChapterTimeline } from './components/ChapterTimeline';
import type { Chapter } from './models/Chapter';
import { ChapterSlider } from './components/ChapterSlider';
import {
  winnieBook,
  winnieChapters,
  winnieCharacters,
  winnieFactions,
  winnieRelationships,
} from './winnieData';
import type { RelationshipWithChapters } from './winnieData';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(0);

  // Only show characters whose firstAppearanceChapter is <= selected chapter
  const visibleCharacters = winnieCharacters.filter(
    c => c.firstAppearanceChapter <= winnieChapters[selectedChapter].index
  );
  // Only show relationships where both characters are visible and a description exists for the selected chapter
  const visibleCharacterIds = new Set(visibleCharacters.map(c => c.id));
  const visibleRelationships = winnieRelationships
    .map(r => {
      // Find the latest description for the current chapter or earlier
      const desc = [...r.descriptions]
        .sort((a, b) => b.chapter - a.chapter)
        .find(d => d.chapter <= winnieChapters[selectedChapter].index);
      if (!desc) return null;
      // Only show if both characters are visible (in either direction)
      if (
        visibleCharacterIds.has(r.character1.id) &&
        visibleCharacterIds.has(r.character2.id)
      ) {
        return {
          character1: r.character1,
          character2: r.character2,
          description: desc.description,
          chapter: { book: winnieBook, title: '', index: desc.chapter },
        };
      }
      // Also check for the reverse direction
      if (
        visibleCharacterIds.has(r.character2.id) &&
        visibleCharacterIds.has(r.character1.id)
      ) {
        return {
          character1: r.character2,
          character2: r.character1,
          description: desc.description,
          chapter: { book: winnieBook, title: '', index: desc.chapter },
        };
      }
      return null;
    })
    .filter(Boolean) as Relationship[];
  // Only show factions that have at least one visible character
  const visibleFactionIds = new Set(visibleCharacters.flatMap(c => c.factions));
  const visibleFactions = winnieFactions.filter(f => visibleFactionIds.has(f.id));

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <CharacterGraph characters={visibleCharacters} factions={visibleFactions} relationships={visibleRelationships} />
      </div>
      <ChapterSlider chapters={winnieChapters} value={selectedChapter} onChange={setSelectedChapter} />
    </div>
  );
}

export default App;
