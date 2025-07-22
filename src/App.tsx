import React, { useState } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import type { Book } from './models/Book';
import type { BookData } from './models/BookData';
import { winnieBookData } from './books/winnieData';
import { aliceBookData } from './books/aliceData';
import { duneData } from './books/duneData';
import { crimeAndPunishmentData } from './books/crimeAndPunishmentData';
import { lotrData } from './books/lotrData';
import { firebaseConfig} from "./credentials.ts";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const bookDataList: BookData[] = [winnieBookData, aliceBookData, duneData, crimeAndPunishmentData, lotrData];
const availableBooks = bookDataList.map(bd => bd.book);
const bookDataMap: Record<string, BookData> = Object.fromEntries(bookDataList.map(bd => [bd.book.id, bd]));

function App() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book>(winnieBookData.book);

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Initialize analytics (required for Firebase Analytics)
  console.log('Analytics initialized:', analytics);

  // Get the appropriate book data based on selected book
  const getBookData = (book: Book): BookData => {
    return bookDataMap[book.id] || winnieBookData;
  };

  const bookData = getBookData(selectedBook);

  // Reset chapter when switching books
  React.useEffect(() => {
    setSelectedChapter(1);
  }, [selectedBook]);

  // Clamp selectedChapter to a valid range for the current book
  const safeChapterIndex = Math.min(selectedChapter, Math.max(0, bookData.chapters.length - 1));

  // Only show characters whose firstAppearanceChapter is <= selected chapter
  const visibleCharacters = bookData.characters.filter(
    c => c.firstAppearanceChapter <= bookData.chapters[safeChapterIndex].index
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
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <CharacterGraph
          key={selectedBook.id}
          bookData={filteredBookData}
          fullBookData={bookData}
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
          books={availableBooks}
          selectedBook={selectedBook}
          onBookChange={setSelectedBook}
        />
      </div>
    </div>
  );
}

export default App;
