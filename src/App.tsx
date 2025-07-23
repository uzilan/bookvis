import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import type { Book } from './models/Book';
import type { BookData } from './models/BookData';
import FirebaseService from './services/firebase';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [booksFromFirebase, setBooksFromFirebase] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const hasSetInitialBook = useRef(false);

  // Fetch books from Firebase on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await FirebaseService.getAllBooks();
        setBooksFromFirebase(books);
        
        // Set the first book as selected if we have books and no book is currently selected
        if (books.length > 0 && !hasSetInitialBook.current) {
          const firstBook = books[0];

          setSelectedBook(firstBook.book);
          
          // Set the initial chapter to the first actual chapter's index
          if (firstBook.chapters.length > 0) {
            const firstActualChapter = firstBook.chapters.find(ch => ch.type === 'chapter');
            if (firstActualChapter) {
              setSelectedChapter(firstActualChapter.index);
            }
          }
          
          hasSetInitialBook.current = true;
        }
      } catch (error) {
        console.error('Failed to fetch books from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Use only Firebase books
  const availableBooks = booksFromFirebase.map(bd => bd.book);

  const bookDataMap: Record<string, BookData> = Object.fromEntries(
    booksFromFirebase.map(bd => [bd.book.id, bd])
  );

  // Get the appropriate book data based on selected book
  const getBookData = (book: Book): BookData | null => {
    return bookDataMap[book.id] || null;
  };

  const bookData = selectedBook ? getBookData(selectedBook) : null;

  // Reset chapter when switching books (but not on initial load)
  React.useEffect(() => {
    if (bookData && bookData.chapters.length > 0 && hasSetInitialBook.current) {
      // Set to the index of the first actual chapter
      const firstActualChapter = bookData.chapters.find(ch => ch.type === 'chapter');
      if (firstActualChapter) {
        setSelectedChapter(firstActualChapter.index);
      }
    }
  }, [selectedBook, bookData]);

  // Show loading or no data message if no book data
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading books from Firebase...</div>;
  }

  if (!bookData || !selectedBook) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>No books available from Firebase.</div>;
  }

  // Find the current chapter by matching selectedChapter with index
  const currentChapter = bookData.chapters.find(ch => 
    ch.type === 'chapter' && ch.index === selectedChapter
  );
  
  // Only show characters whose firstAppearanceChapter is <= selected chapter
  const visibleCharacters = bookData.characters.filter(c => {
    return currentChapter && c.firstAppearanceChapter <= selectedChapter;
  });
  // Only show factions that have at least one visible character and are active in current chapter
  const visibleCharacterIds = new Set(visibleCharacters.map(c => c.id));
  const activeFactionIds = new Set();
  
  visibleCharacters.forEach(character => {
    character.factions.forEach(factionId => {
      const joinChapter = character.factionJoinChapters?.[factionId];
      if (joinChapter) {
        // Handle both string chapter IDs and numeric chapter indices
        let shouldAdd = false;
        if (typeof joinChapter === 'number') {
          shouldAdd = joinChapter <= selectedChapter;
        } else if (typeof joinChapter === 'string') {
          // For string chapter IDs, we need to find the chapter and get its globalIndex
          // Try to extract chapter number from string like 'chapter-1' -> 1
          const chapterMatch = joinChapter.match(/chapter-(\d+)/);
          if (chapterMatch) {
            const chapterNumber = parseInt(chapterMatch[1]);
            shouldAdd = chapterNumber <= selectedChapter;
          }
        }
        if (shouldAdd) {
          activeFactionIds.add(factionId);
        }
      }
    });
  });
  
  const visibleFactions = bookData.factions.filter(f => activeFactionIds.has(f.id));


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
