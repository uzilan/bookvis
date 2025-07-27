import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { CharacterGraph } from './components/CharacterGraph';
import { CreateBookModal } from './components/CreateBookModal';
import { LoginButton } from './components/LoginButton';
import type { Book } from './models/Book';
import type { BookData } from './models/BookData';
import type { SchemaBookData } from './schema/models/SchemaBookData';
import { FirebaseService } from './services/firebase.ts';
import { convertBookDataToSchema } from './utils/schemaToBookDataConverter';

console.log('🔧 App.tsx is being imported');

function App() {
  const [selectedChapter, setSelectedChapter] = useState<string>('chapter-1');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [booksFromFirebase, setBooksFromFirebase] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);
  const [previewBookData, setPreviewBookData] = useState<BookData | null>(null);
  const [initialModalData, setInitialModalData] = useState<SchemaBookData | undefined>(undefined);
  const hasSetInitialBook = useRef(false);

  const handlePreview = useCallback((previewData: BookData) => {
    setPreviewBookData(previewData);
  }, []);

  // Fetch books from Firebase on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await FirebaseService.getAllBooks();
        
        // Use only Firebase books
        const allBooks = books;
        setBooksFromFirebase(allBooks);
        
        // Set the first book as selected if we have books and no book is currently selected
        if (allBooks.length > 0 && !hasSetInitialBook.current) {
          const firstBook = allBooks[0];

          setSelectedBook(firstBook.book);
          
          // Set the initial chapter to the first actual chapter's index
          if (firstBook.chapters.length > 0) {
            const firstChapter = firstBook.chapters.find(ch => ch.id.startsWith('chapter-')) || firstBook.chapters[0];
            setSelectedChapter(firstChapter.id);
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

  const bookData = previewBookData || (selectedBook ? getBookData(selectedBook) : null);
  

  
  // If we're in preview mode, use the preview data for all the logic
  const currentBookData = previewBookData || bookData;

  // Reset chapter when switching books (but not on initial load)
  React.useEffect(() => {
    if (bookData && bookData.chapters.length > 0 && hasSetInitialBook.current) {
      // Find the first actual chapter (not book or part)
      const firstChapter = bookData.chapters.find(ch => ch.id.startsWith('chapter-')) || bookData.chapters[0];
      setSelectedChapter(firstChapter.id);
    }
  }, [selectedBook, bookData]);

  // Show loading or no data message if no book data
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading books from Firebase...</div>;
  }

  if (!bookData || !selectedBook) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>No books available from Firebase.</div>;
  }

  // Find the current chapter by matching selectedChapter with id
  let currentChapter = bookData.chapters.find(ch => 
    ch.id === selectedChapter
  );
  

  
  // If no chapter is selected, select the first one
  if (!currentChapter && bookData.chapters.length > 0) {
    // Find the first actual chapter (not book or part)
    const firstChapter = bookData.chapters.find(ch => ch.id.startsWith('chapter-')) || bookData.chapters[0];
    setSelectedChapter(firstChapter.id);
    currentChapter = firstChapter;
  }
  
  // Only show characters who are mentioned in the current chapter
  const visibleCharacters = currentBookData?.characters?.filter(c => {
    const currentChapter = currentBookData?.chapters?.find(ch => ch.id === selectedChapter);
    const isVisible = currentChapter && currentChapter.characters && currentChapter.characters.includes(c.id);
    return isVisible;
  }) || [];


  // Only show factions that have at least one visible character and are active in current chapter
  const activeFactionIds = new Set();
  
  visibleCharacters.forEach(character => {
    character.factions.forEach(factionId => {
      const joinChapter = character.factionJoinChapters?.[factionId];
      if (joinChapter) {
        // Handle both string chapter IDs and numeric chapter indices
        let shouldAdd = false;
        if (typeof joinChapter === 'number') {
          // For backward compatibility with numeric chapter indices
          const currentChapter = currentBookData?.chapters?.find(ch => ch.id === selectedChapter);
          shouldAdd = !!(currentChapter && (joinChapter as number) <= (currentChapter.index || 0));
        } else if (typeof joinChapter === 'string') {
          // For string chapter IDs, find the target chapter and current chapter
          const targetChapter = currentBookData?.chapters?.find(ch => ch.id === joinChapter);
          const currentChapter = currentBookData?.chapters?.find(ch => ch.id === selectedChapter);
          if (targetChapter && targetChapter.index && currentChapter && currentChapter.index) {
            shouldAdd = targetChapter.index <= currentChapter.index;
          }
        }
        if (shouldAdd) {
          activeFactionIds.add(factionId);
        }
      }
    });
  });
  



  // Create filtered book data for the graph
  // Pass the full book data to the graph component and let it handle filtering
  const filteredBookData: BookData = currentBookData ? {
    ...currentBookData,
    // Don't filter characters here - let the graph component handle it
    characters: currentBookData.characters,
    relationships: currentBookData.relationships,
    factions: currentBookData.factions,
  } : {
    book: { id: '', title: '', author: { id: '', name: '' } },
    characters: [],
    chapters: [],
    factions: [],
    relationships: [],
    locations: []
  };
  



  
  const handleCreateBook = () => {
    setIsCreateBookModalOpen(true);
  };

  const handleCloseCreateBookModal = () => {
    setIsCreateBookModalOpen(false);
    setPreviewBookData(null); // Clear preview when closing modal
    setInitialModalData(undefined); // Clear initial data when closing modal
  };

  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      {/* Login Button - Top Right Corner */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 1003,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <LoginButton />
      </div>
      
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <CharacterGraph
          key={previewBookData ? `preview-${previewBookData.book.id}` : selectedBook?.id || 'no-book'}
          bookData={filteredBookData}
          fullBookData={bookData}
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
          books={availableBooks}
          selectedBook={selectedBook}
          onBookChange={setSelectedBook}
          onCreateBook={handleCreateBook}
          isPreview={!!previewBookData}
          onExitPreview={() => {
            if (previewBookData) {
              const schemaData = convertBookDataToSchema(previewBookData);
              setInitialModalData(schemaData);
            }
            setPreviewBookData(null);
            setIsCreateBookModalOpen(true);
          }}
        />
      </div>
      {isCreateBookModalOpen && (
        <CreateBookModal
            open={isCreateBookModalOpen}
            onClose={handleCloseCreateBookModal}
            onPreview={handlePreview}
            initialData={initialModalData}
          />
      )}

    </div>
  );
}

export default App;
