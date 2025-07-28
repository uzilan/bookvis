import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CharacterGraph } from './CharacterGraph';
import { CreateBookModal } from './CreateBookModal';


import type { Book } from '../models/Book';
import type { BookData } from '../models/BookData';
import type { SchemaBookData } from '../schema/models/SchemaBookData';
import { FirebaseService } from '../services/firebase.ts';
import { convertBookDataToSchema } from '../utils/schemaToBookDataConverter';

export const CharacterGraphView: React.FC = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const previewParam = searchParams.get('preview');
  
  // Parse preview data from URL parameter
  const previewDataFromUrl = previewParam ? (() => {
    try {
      return JSON.parse(decodeURIComponent(previewParam)) as BookData;
    } catch (error) {
      console.error('Error parsing preview data from URL:', error);
      return null;
    }
  })() : null;
  
  const previewData = location.state?.previewData as BookData | null;
  // Use local previewBookData state instead of location state for isPreview
  const isPreviewFromLocation = location.state?.isPreview || false;
  const [selectedChapter, setSelectedChapter] = useState<string>('chapter-1');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [booksFromFirebase, setBooksFromFirebase] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);
  const [previewBookData, setPreviewBookData] = useState<BookData | null>(null);
  const [initialModalData, setInitialModalData] = useState<SchemaBookData | undefined>(undefined);
  const [previewTimestamp, setPreviewTimestamp] = useState<number>(0);
  const hasSetInitialBook = useRef(false);

  // Fetch books from Firebase on component mount (skip if in preview mode)
  useEffect(() => {
    if (isPreviewFromLocation) {
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await FirebaseService.getAllBooks();
        
        // Use only Firebase books
        const allBooks = books;
        

        
        setBooksFromFirebase(allBooks);
        
        // Set the book based on URL parameter or first book
        if (allBooks.length > 0) {
          let targetBook: BookData;
          
          if (bookId) {
            // Find the book specified in the URL
            targetBook = allBooks.find(b => b.book.id === bookId) || allBooks[0];
          } else {
            // Use the first book if no bookId specified
            targetBook = allBooks[0];
          }
          
          if (!hasSetInitialBook.current) {
            setSelectedBook(targetBook.book);
            
            // Set the initial chapter to the first actual chapter's index
            if (targetBook.chapters.length > 0) {
              const firstChapter = targetBook.chapters.find(ch => ch.id.startsWith('chapter-')) || targetBook.chapters[0];
              setSelectedChapter(firstChapter.id);
            }
            
            hasSetInitialBook.current = true;
          }
        }
      } catch (error) {
        console.error('Failed to fetch books from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bookId, isPreviewFromLocation]);

  // Use only Firebase books
  const availableBooks = booksFromFirebase.map(bd => bd.book);

  const bookDataMap: Record<string, BookData> = Object.fromEntries(
    booksFromFirebase.map(bd => [bd.book.id, bd])
  );
  


  // Get the appropriate book data based on selected book
  const getBookData = (book: Book): BookData | null => {
    return bookDataMap[book.id] || null;
  };

  const bookData = previewBookData || previewDataFromUrl || previewData || (selectedBook ? getBookData(selectedBook) : null);
  


  // Reset chapter when switching books (but not on initial load)
  React.useEffect(() => {
    if (bookData && bookData.chapters.length > 0) {
      // Only reset chapter when switching books, not when in preview mode
      if (!previewBookData && !previewDataFromUrl && !isPreviewFromLocation && hasSetInitialBook.current) {
        // Find the first actual chapter (not book or part)
        const firstChapter = bookData.chapters.find(ch => ch.id.startsWith('chapter-')) || bookData.chapters[0];
        setSelectedChapter(firstChapter.id);
      }
    }
  }, [selectedBook, bookData, previewBookData, previewDataFromUrl, isPreviewFromLocation]);

  // Update URL when book changes (skip in preview mode)
  useEffect(() => {
    if (selectedBook && !previewBookData && !previewDataFromUrl && !isPreviewFromLocation) {
      navigate(`/visualize/${selectedBook.id}`, { replace: true });
    }
  }, [selectedBook, navigate, previewBookData, previewDataFromUrl, isPreviewFromLocation]);

  // Show loading or no data message if no book data
  if (loading && !previewBookData && !previewDataFromUrl && !isPreviewFromLocation) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading books from Firebase...</div>;
  }

  if (!bookData) {
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
  const visibleCharacters = bookData.characters.filter(c => {
    const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
    return currentChapter && currentChapter.characters && currentChapter.characters.includes(c.id);
  });

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
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
          shouldAdd = !!(currentChapter && (joinChapter as number) <= (currentChapter.index || 0));
        } else if (typeof joinChapter === 'string') {
          // For string chapter IDs, find the target chapter and current chapter
          const targetChapter = bookData.chapters.find(ch => ch.id === joinChapter);
          const currentChapter = bookData.chapters.find(ch => ch.id === selectedChapter);
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
  




  // Use previewBookData if available, otherwise use full book data (let graph handle filtering)
  const displayBookData = previewBookData || bookData;

  const handleCreateBook = () => {
    setIsCreateBookModalOpen(true);
  };

  const handlePreview = (previewData: BookData) => {
    // Close the modal first
    setIsCreateBookModalOpen(false);
    
    // Clear any existing preview data first
    setPreviewBookData(null);
    setPreviewTimestamp(0);
    
    // Use setTimeout to ensure the clear happens before setting new data
    setTimeout(() => {
      setPreviewBookData(previewData);
      setPreviewTimestamp(Date.now());
    }, 0);
  };

  const handleExitPreview = () => {
    // Use the correct preview data source
    const currentPreviewData = previewBookData || previewDataFromUrl;
    
    if (currentPreviewData) {
      const schemaData = convertBookDataToSchema(currentPreviewData);
      setInitialModalData(schemaData);
      // Open modal after setting the data
      setTimeout(() => {
        setIsCreateBookModalOpen(true);
      }, 0);
    } else {
      setIsCreateBookModalOpen(true);
    }
    setPreviewBookData(null);
    setPreviewTimestamp(0);
  };

  const handleCloseCreateBookModal = () => {
    setIsCreateBookModalOpen(false);
    setPreviewBookData(null);
    setInitialModalData(undefined);
    
    // If we're in preview mode, navigate back to home page
    if (previewBookData || previewDataFromUrl) {
      navigate('/');
    }
  };



  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <CharacterGraph
          key={previewBookData ? `preview-${previewBookData.book.id}` : selectedBook?.id || 'no-book'}
          bookData={displayBookData}
          fullBookData={displayBookData}
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
          books={availableBooks}
          selectedBook={previewBookData ? previewBookData.book : (selectedBook || bookData.book)}
          onBookChange={setSelectedBook}
          onCreateBook={handleCreateBook}
          isPreview={!!previewBookData || !!previewDataFromUrl}
          onExitPreview={handleExitPreview}
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
}; 