import React, { useState } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import type { Character } from './models/Character';
import type { Faction } from './models/Faction';
import type { Relationship } from './models/Relationship';
// import { ChapterTimeline } from './components/ChapterTimeline';
import type { Chapter } from './models/Chapter';
import { ChapterSlider } from './components/ChapterSlider';

const demoFactions: Faction[] = [
  { id: 'f1', title: 'Starks', description: '' },
  { id: 'f2', title: 'Lannisters', description: '' },
  { id: 'f3', title: 'Targaryens', description: '' },
];

const demoCharacters: Character[] = [
  { name: 'Arya Stark', id: '1', description: '', firstAppearanceChapter: 1, aliases: [], factions: ['f1'], attributes: [] },
  { name: 'Jon Snow', id: '2', description: '', firstAppearanceChapter: 2, aliases: [], factions: ['f1'], attributes: [] },
  { name: 'Tyrion Lannister', id: '3', description: '', firstAppearanceChapter: 3, aliases: [], factions: ['f2'], attributes: [] },
  { name: 'Daenerys Targaryen', id: '4', description: '', firstAppearanceChapter: 4, aliases: [], factions: ['f3'], attributes: [] },
];

const demoRelationships: Relationship[] = [
  {
    character1: demoCharacters[0],
    character2: demoCharacters[1],
    description: 'Siblings',
    chapter: { book: { author: { id: '', name: '' }, title: '' }, title: '', index: 1 },
  },
  {
    character1: demoCharacters[1],
    character2: demoCharacters[2],
    description: 'Allies',
    chapter: { book: { author: { id: '', name: '' }, title: '' }, title: '', index: 1 },
  },
  {
    character1: demoCharacters[3],
    character2: demoCharacters[1],
    description: 'Aunt & Nephew',
    chapter: { book: { author: { id: '', name: '' }, title: '' }, title: '', index: 1 },
  },
];

const demoChapters: Chapter[] = [
  { book: { author: { id: '', name: '' }, title: '' }, title: 'Winterfell', index: 1 },
  { book: { author: { id: '', name: '' }, title: '' }, title: 'The Kingsroad', index: 2 },
  { book: { author: { id: '', name: '' }, title: '' }, title: 'Lord Snow', index: 3 },
  { book: { author: { id: '', name: '' }, title: '' }, title: 'Cripples, Bastards, and Broken Things', index: 4 },
];

function App() {
  const [selectedChapter, setSelectedChapter] = useState(0);

  // Only show characters whose firstAppearanceChapter is <= selected chapter
  const visibleCharacters = demoCharacters.filter(
    c => c.firstAppearanceChapter <= demoChapters[selectedChapter].index
  );
  // Only show relationships where both characters are visible
  const visibleCharacterIds = new Set(visibleCharacters.map(c => c.id));
  const visibleRelationships = demoRelationships.filter(
    r => visibleCharacterIds.has(r.character1.id) && visibleCharacterIds.has(r.character2.id)
  );

  // Only show factions that have at least one visible character
  const visibleFactionIds = new Set(visibleCharacters.flatMap(c => c.factions));
  const visibleFactions = demoFactions.filter(f => visibleFactionIds.has(f.id));

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ position: 'absolute', left: 24, top: 24, zIndex: 20 }}>Character Visualization</h1>
        <CharacterGraph characters={visibleCharacters} factions={visibleFactions} relationships={visibleRelationships} />
      </div>
      {/* <ChapterTimeline chapters={demoChapters} /> */}
      <ChapterSlider chapters={demoChapters} value={selectedChapter} onChange={setSelectedChapter} />
    </div>
  );
}

export default App;
