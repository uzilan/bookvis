import React, { useState } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import { BookSelector } from './components/BookSelector';
// import { ChapterTimeline } from './components/ChapterTimeline';
import type { Book } from './models/Book';
import type { BookData } from './models/BookData';
import {
  winnieBook,
  winnieChapters,
  winnieCharacters,
  winnieFactions,
  winnieRelationships,
} from './winnieData';
import {
  aliceBook,
  aliceChapters,
  aliceCharacters,
  aliceFactions,
  aliceRelationships,
} from './aliceData';

const availableBooks = [winnieBook, aliceBook];

// Create BookData objects
const winnieBookData: BookData = {
  book: winnieBook,
  characters: winnieCharacters,
  chapters: winnieChapters,
  factions: winnieFactions,
  relationships: winnieRelationships,
};

const aliceBookData: BookData = {
  book: aliceBook,
  characters: aliceCharacters,
  chapters: aliceChapters,
  factions: aliceFactions,
  relationships: aliceRelationships,
};

function App() {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book>(winnieBook);

  // Get the appropriate book data based on selected book
  const getBookData = (book: Book): BookData => {
    switch (book.title) {
      case 'Winnie-the-Pooh':
        return winnieBookData;
      case 'Alice\'s Adventures in Wonderland':
        return aliceBookData;
      default:
        return winnieBookData;
    }
  };

  const bookData = getBookData(selectedBook);

  // Reset chapter when switching books
  React.useEffect(() => {
    setSelectedChapter(0);
  }, [selectedBook]);

  // Only show characters whose firstAppearanceChapter is <= selected chapter
  const visibleCharacters = bookData.characters.filter(
    c => c.firstAppearanceChapter <= bookData.chapters[selectedChapter].index
  );
  // Only show factions that have at least one visible character
  const visibleCharacterIds = new Set(visibleCharacters.map(c => c.id));
  const visibleFactionIds = new Set(visibleCharacters.flatMap(c => c.factions));
  const visibleFactions = bookData.factions.filter(f => visibleFactionIds.has(f.id));

  // Create filtered book data for the graph
  const filteredBookData: BookData = {
    ...bookData,
    characters: visibleCharacters,
    relationships: bookData.relationships.filter(r => {
      // Only include relationships where both characters are visible
      return visibleCharacterIds.has(r.character1.id) && visibleCharacterIds.has(r.character2.id);
    }),
    factions: visibleFactions,
  };

  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <BookSelector 
        books={availableBooks}
        selectedBook={selectedBook}
        onBookChange={setSelectedBook}
      />
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <CharacterGraph 
          bookData={filteredBookData}
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
        />
      </div>
    </div>
  );
}

export default App;
