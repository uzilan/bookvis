import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  DialogContentText,
  Typography
} from '@mui/material';
import { AddAuthorModal } from '../AddAuthorModal';
import { BookInfoTab, LocationsTab, FactionsTab, ChaptersTab, CharactersTab, RelationshipsTab, CharactersInChaptersTab } from './index';
import type { Author } from '../../models/Author';
import type { SchemaBookData, SchemaAuthor } from '../../schema/models';
import type { SchemaHierarchyType } from '../../schema/models/SchemaHierarchy';
import type { BookData } from '../../models/BookData';
import { FirebaseService } from '../../services/firebase';
import { convertSchemaToBookData, convertBookDataToSchema } from '../../utils/schemaToBookDataConverter';


interface CreateBookModalProps {
  open: boolean;
  onClose: () => void;
  onPreview?: (previewData: BookData) => void;
  initialData?: SchemaBookData; // New prop to restore data when returning from preview
  onInitialDataUsed?: () => void; // Callback to notify when initial data has been used
}



export const CreateBookModal: React.FC<CreateBookModalProps> = (props) => {
  const { open, onClose, onPreview, initialData } = props;

  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showRequirementsDialog, setShowRequirementsDialog] = useState(false);
  const [missingRequirements, setMissingRequirements] = useState<string[]>([]);
  const [loadedFromSession, setLoadedFromSession] = useState(false);
  const isLoadingFromSessionRef = useRef(false);
  
  // Session storage key for book data
  const SESSION_STORAGE_KEY = 'bookvis-draft-book';
  
  // SchemaBookData instance that we'll populate step by step
  const [bookData, setBookData] = useState<SchemaBookData>({
    book: {
      id: '',
      title: '',
      author: {
        id: '',
        name: ''
      }
    },
    locations: [],
    characters: [],
    factions: [],
    relationships: [],
    chapters: [],
    hierarchy: []
  });

  // Check for existing draft when creating a new book
  const checkForExistingDraft = useCallback(async () => {
    try {
      // Only check if we have a title and author, and don't already have a book ID
      if (bookData.book.title && bookData.book.author.id && !bookData.book.id) {
        const draftId = `draft-${bookData.book.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${bookData.book.author.id}`;
        const existingDraft = await FirebaseService.getDraftByBookId(draftId);
        
        if (existingDraft) {
          // Convert the existing draft to schema format and load it
          const schemaData = convertBookDataToSchema(existingDraft);
          setBookData(schemaData);
          setSelectedAuthor(schemaData.book.author.id);
          setLoadedFromSession(false);
          isLoadingFromSessionRef.current = false;
          
          // Show a message to the user
          alert('Found an existing draft for this book. Your previous work has been loaded.');
        }
      }
    } catch (error) {
      console.error('Error checking for existing draft:', error);
      // Don't show error to user, just log it
    }
  }, [bookData.book.title, bookData.book.author.id, bookData.book.id]);
  
  // Save book data to session storage
  const saveToSessionStorage = (data: SchemaBookData) => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save book data to session storage:', error);
    }
  };

  // Load book data from session storage
  const loadFromSessionStorage = (): SchemaBookData | null => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Failed to load book data from session storage:', error);
      return null;
    }
  };

  // Clear session storage
  const clearSessionStorage = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear session storage:', error);
    }
  };

  // Fetch authors when modal opens and restore data (prioritize session storage over initialData)
  useEffect(() => {
    if (open) {
      fetchAuthors();
      
      // Always try to load from session storage first (it has the most recent data)
      const savedData = loadFromSessionStorage();
      if (savedData) {
        isLoadingFromSessionRef.current = true;
        setBookData(savedData);
        // Don't set selectedAuthor here, let the useEffect handle it after authors are loaded
        setLoadedFromSession(true);
        // Reset the loading flag after a short delay to allow the data to be set
        setTimeout(() => {
          isLoadingFromSessionRef.current = false;
        }, 100);
      } else if (initialData) {
        // Only use initialData if no session storage data exists
        setBookData(initialData);
        setSelectedAuthor(initialData.book.author.id);
        setLoadedFromSession(false);
        isLoadingFromSessionRef.current = false;
      } else {
        // Check if there's an existing draft for this book
        checkForExistingDraft();
      }
    }
  }, [open, initialData, checkForExistingDraft]);

  // Save book data to session storage whenever it changes
  useEffect(() => {
    if (open && bookData && !isLoadingFromSessionRef.current) {
      // Only save if we have meaningful data (not just empty initial state)
      const hasMeaningfulData = bookData.book.title || 
                               bookData.locations.length > 0 ||
                               bookData.characters.length > 0 ||
                               bookData.factions.length > 0 ||
                               bookData.chapters.length > 0 ||
                               bookData.relationships.length > 0;
      
      if (hasMeaningfulData) {
        saveToSessionStorage(bookData);
      }
    }
  }, [bookData, open]);

  // Check for existing drafts when title or author changes
  useEffect(() => {
    if (open && bookData.book.title && bookData.book.author.id && !isLoadingFromSessionRef.current) {
      // Debounce the check to avoid too many Firebase calls
      const timeoutId = setTimeout(() => {
        checkForExistingDraft();
      }, 1000); // Wait 1 second after the user stops typing
      
      return () => clearTimeout(timeoutId);
    }
  }, [bookData.book.title, bookData.book.author.id, open, checkForExistingDraft]);

  // Ensure author from session storage exists in authors list
  useEffect(() => {
    if (loadedFromSession && bookData.book.author.id) {
      if (authors.length > 0) {
        // Authors are loaded, check if our author exists
        const authorExists = authors.find(author => author.id === bookData.book.author.id);
        
        if (!authorExists && bookData.book.author.name) {
          // Add the author from session storage to the authors list
          const sessionAuthor: Author = {
            id: bookData.book.author.id,
            name: bookData.book.author.name
          };
          setAuthors(prev => [...prev, sessionAuthor]);
        }
        // Ensure selectedAuthor is set to the author from session storage
        // Only set if the author actually exists in the list
        if (bookData.book.author.id && selectedAuthor !== bookData.book.author.id) {
          const authorExists = authors.find(author => author.id === bookData.book.author.id);
          if (authorExists) {
            setSelectedAuthor(bookData.book.author.id);
          } else {
            // If author doesn't exist, clear the selection
            setSelectedAuthor('');
          }
        }
      } else {
        // Authors are loaded but empty, or still loading
        if (authors.length === 0 && bookData.book.author.id && bookData.book.author.name) {
          // Authors list is empty but we have an author from session storage
          // Add the author to the list
          const sessionAuthor: Author = {
            id: bookData.book.author.id,
            name: bookData.book.author.name
          };
          setAuthors([sessionAuthor]);
          setSelectedAuthor(bookData.book.author.id);
        }
      }
    }
  }, [loadedFromSession, bookData.book.author, authors, selectedAuthor]);

  // Add beforeunload event listener to warn before navigating away
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if we have unsaved changes (any data in the book)
      const hasUnsavedChanges = bookData && (
        bookData.book.title ||
        bookData.locations.length > 0 ||
        bookData.characters.length > 0 ||
        bookData.factions.length > 0 ||
        bookData.chapters.length > 0 ||
        bookData.relationships.length > 0
      );

      if (open && hasUnsavedChanges) {
        // Show browser's default confirmation dialog
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    if (open) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [open, bookData]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const fetchedAuthors = await FirebaseService.getAllAuthors();
      setAuthors(fetchedAuthors);
    } catch (error) {
      console.error('Error fetching authors:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      
      // Validate that we have at least a book title and author
      if (!bookData.book.title.trim()) {
        alert('Please enter a book title before saving as draft');
        return;
      }
      
      if (!bookData.book.author.id) {
        alert('Please select an author before saving as draft');
        return;
      }
      
      // Generate a consistent book ID based on title and author for drafts
      // This ensures drafts update the same book instead of creating new ones
      const bookId = bookData.book.id || `draft-${bookData.book.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${bookData.book.author.id}`;
      
      // Ensure hierarchy is set before converting
      const bookDataWithHierarchy = {
        ...bookData,
        hierarchy: bookData.hierarchy && bookData.hierarchy.length > 0 
          ? bookData.hierarchy 
          : bookData.chapters.map(chapter => ({
              chapter_id: chapter.id,
              type: 'chapter' as SchemaHierarchyType
            }))
      };
      
      // Convert schema data to BookData format
      const bookDataForSave = convertSchemaToBookData(bookDataWithHierarchy);
      bookDataForSave.book.id = bookId;
      
      // Save to Firebase as draft
      await FirebaseService.saveBook(bookDataForSave, false, 'draft'); // false = private, 'draft' = draft status
      
      // Update the book ID in our local state so future saves use the same ID
      setBookData(prev => ({
        ...prev,
        book: {
          ...prev.book,
          id: bookId
        }
      }));
      
      clearSessionStorage(); // Clear session storage after successful save
      onClose();
    } catch (error) {
      console.error('Error saving draft:', error);
      alert(`Failed to save draft: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async () => {
    const missing: string[] = [];

    // Validate basic book information
    if (!bookData.book.title || !bookData.book.author.id) {
      missing.push('Book title and author');
    }

    // Validate chapters
    if (!bookData.chapters || bookData.chapters.length === 0) {
      missing.push('At least one chapter');
    }

    // Validate locations
    if (!bookData.locations || bookData.locations.length === 0) {
      missing.push('At least one location');
    }

    // Validate factions
    if (!bookData.factions || bookData.factions.length === 0) {
      missing.push('At least one faction');
    }

    // Validate characters
    if (!bookData.characters || bookData.characters.length === 0) {
      missing.push('At least one character');
    }

    // Validate relationships
    if (!bookData.relationships || bookData.relationships.length === 0) {
      missing.push('At least one relationship');
    }

    // Validate character assignments to chapters
    const totalCharacterAssignments = bookData.chapters?.reduce((total, chapter) => 
      total + (chapter.characters?.length || 0), 0) || 0;
    if (totalCharacterAssignments === 0) {
      missing.push('At least one character must be assigned to a chapter');
    }

    if (missing.length > 0) {
      setMissingRequirements(missing);
      setShowRequirementsDialog(true);
      return;
    }

    try {
      setLoading(true);
      
      // Generate a consistent book ID based on title and author for published books
      // This ensures published books have consistent IDs
      const bookId = bookData.book.id || `book-${bookData.book.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${bookData.book.author.id}-${Date.now()}`;
      
      // Convert schema data to BookData format
      const bookDataForSave = convertSchemaToBookData(bookData);
      bookDataForSave.book.id = bookId;
      
      // Save to Firebase
      await FirebaseService.saveBook(bookDataForSave, false, 'published'); // false = private by default, 'published' = published status
      
      clearSessionStorage(); // Clear session storage after successful save
      onClose();
    } catch (error) {
      console.error('Error saving book:', error);
      // You might want to show an error message to the user here
      alert(`Failed to save book: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirmation(false);
    setSelectedAuthor('');
    setIsAddAuthorModalOpen(false);
    clearSessionStorage(); // Clear session storage when cancelling
    setBookData({
      book: {
        id: '',
        title: '',
        author: {
          id: '',
          name: ''
        }
      },
      locations: [],
      characters: [],
      factions: [],
      relationships: [],
      chapters: [],
      hierarchy: []
    });
    onClose();
  };

  const handleClose = () => {
    setSelectedAuthor('');
    setIsAddAuthorModalOpen(false);
    clearSessionStorage(); // Clear session storage when closing
    setBookData({
      book: {
        id: '',
        title: '',
        author: {
          id: '',
          name: ''
        }
      },
      locations: [],
      characters: [],
      factions: [],
      relationships: [],
      chapters: [],
      hierarchy: []
    });
    onClose();
  };

  const handleAuthorSelect = (authorId: string) => {
    const selectedAuthorData = authors.find(author => author.id === authorId);
    if (selectedAuthorData) {
      const schemaAuthor = {
        id: selectedAuthorData.id,
        name: selectedAuthorData.name
      };
      
      setBookData(prev => ({
        ...prev,
        book: {
          ...prev.book,
          author: schemaAuthor
        }
      }));
    }
  };

  const handleAuthorAdded = (newAuthor: Author) => {
    // Add the new author to the list and select it
    setAuthors(prev => [...prev, newAuthor].sort((a, b) => a.name.localeCompare(b.name)));
    setSelectedAuthor(newAuthor.id);
    
    // Update bookData with the new author
    const schemaAuthor: SchemaAuthor = {
      id: newAuthor.id,
      name: newAuthor.name
    };
    setBookData(prev => ({
      ...prev,
      book: {
        ...prev.book,
        author: schemaAuthor
      }
    }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePreview = () => {
    try {
      // Create a copy of bookData with default values for missing required fields
      const previewData: SchemaBookData = {
        ...bookData,
        book: {
          id: bookData.book.id || 'preview-book',
          title: bookData.book.title,
          author: {
            id: bookData.book.author.id || 'preview-author',
            name: bookData.book.author.name || 'Unknown Author'
          }
        },
        chapters: bookData.chapters.map(chapter => ({
          ...chapter,
          // Ensure locations is always an array of location IDs
          locations: chapter.locations || []
        })),
        characters: bookData.characters.length > 0 ? bookData.characters : [],
        locations: bookData.locations.length > 0 ? bookData.locations : [],
        factions: bookData.factions.length > 0 ? bookData.factions : [],
        relationships: bookData.relationships.length > 0 ? bookData.relationships : [],
        hierarchy: bookData.hierarchy || []
      };

      const convertedBookData = convertSchemaToBookData(previewData);
      if (onPreview) {
        onPreview(convertedBookData);
      }
    } catch (error) {
      console.error('Error converting to preview:', error);
      // You might want to show an error message to the user here
    }
  };



  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
              return; // Prevent closing on backdrop click or escape key
            }
            handleClose();
          }}
          maxWidth="lg"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
            }
          }}
        >
      <DialogTitle sx={{ color: 'var(--color-text)' }}>
        Create New Book
        {loadedFromSession && (
          <Typography variant="caption" sx={{ 
            display: 'block', 
            mt: 1, 
            color: 'var(--color-textSecondary)',
            fontStyle: 'italic'
          }}>
            📝 Draft restored from previous session
          </Typography>
        )}
      </DialogTitle>
      <DialogContent sx={{ 
        display: 'flex', 
        height: '800px', 
        p: 0,
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}>
        {/* Main Content Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Scrollable Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {currentTab === 0 && (
            <BookInfoTab
              authors={authors}
              loading={loading}
              selectedAuthor={selectedAuthor}
              bookData={bookData}
              setBookData={setBookData}
              onAuthorSelect={handleAuthorSelect}
              onAddAuthorClick={() => setIsAddAuthorModalOpen(true)}
            />
          )}

          {currentTab === 1 && (
            <LocationsTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 2 && (
            <FactionsTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 3 && (
            <ChaptersTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 4 && (
            <CharactersTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 5 && (
            <RelationshipsTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 6 && (
            <CharactersInChaptersTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}
          </Box>
        </Box>
        
        {/* Vertical Tabs on the Right */}
        <Box sx={{ 
          width: '200px', 
          borderLeft: 1, 
          borderColor: 'divider',
          backgroundColor: 'var(--color-surface)'
        }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            orientation="vertical"
            sx={{
              '& .MuiTab-root': {
                color: 'var(--color-textSecondary)',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '12px 16px',
                minHeight: '48px',
                borderBottom: '1px solid var(--color-border)',
              },
              '& .Mui-selected': {
                color: 'var(--color-text) !important',
                backgroundColor: 'var(--color-hover)',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--color-primary)',
                left: 0,
                width: '4px',
              },
            }}
          >
            <Tab label="Info" />
            <Tab label={`Locations (${bookData.locations?.length || 0})`} />
            <Tab label={`Factions (${bookData.factions?.length || 0})`} />
            <Tab label={`Chapters (${bookData.chapters?.length || 0})`} />
            <Tab label={`Characters (${bookData.characters?.length || 0})`} />
            <Tab label={`Relationships (${bookData.relationships?.length || 0})`} />
            <Tab label={`Chapter Cast (${bookData.chapters?.filter(chapter => {
              const hierarchyItem = bookData.hierarchy?.find(h => h.chapter_id === chapter.id);
              return hierarchyItem?.type === 'chapter' && (chapter.characters?.length || 0) > 0;
            }).length || 0}/${bookData.chapters?.filter(chapter => {
              const hierarchyItem = bookData.hierarchy?.find(h => h.chapter_id === chapter.id);
              return hierarchyItem?.type === 'chapter';
            }).length || 0})`} />
          </Tabs>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleCancelClick} 
          variant="outlined"
          color="primary"
          sx={{ minWidth: '120px' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handlePreview}
          color="info"
          variant="contained"
          title="Preview your book visualization to see how it will look"
          sx={{ minWidth: '120px' }}
        >
          Preview
        </Button>
        <Button 
          onClick={handleSaveDraft}
          color="secondary"
          variant="outlined"
          disabled={loading || !bookData.book.title.trim()}
          sx={{ minWidth: '120px' }}
        >
          Save as Draft
        </Button>
        <Button 
          onClick={handleCreateBook} 
          color={
            !bookData.book.author.id || 
            !bookData.book.title.trim() || 
            !bookData.chapters?.length ||
            !bookData.locations?.length ||
            !bookData.factions?.length ||
            !bookData.characters?.length ||
            !bookData.relationships?.length
              ? "warning"
              : "primary"
          }
          variant="contained"
          disabled={loading}
          sx={{ minWidth: '120px' }}
        >
          Create Book
        </Button>
      </DialogActions>
      
        </Dialog>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
          }
        }}
      >
        <DialogTitle sx={{ color: 'var(--color-text)' }}>
          Cancel Book Creation?
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
          <DialogContentText sx={{ color: 'var(--color-text)' }}>
            Are you sure you want to cancel? All unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelConfirmation(false)} color="primary">
            Continue Editing
          </Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Requirements Dialog */}
      <Dialog
        open={showRequirementsDialog}
        onClose={() => setShowRequirementsDialog(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
          }
        }}
      >
        <DialogTitle sx={{ color: 'var(--color-text)' }}>
          Missing Requirements
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
          <DialogContentText gutterBottom sx={{ color: 'var(--color-text)' }}>
            Please complete the following requirements before creating your book:
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            {missingRequirements.map((requirement, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    bgcolor: 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box sx={{ fontSize: 12, color: 'white' }}>!</Box>
                </Box>
                <Typography variant="body2" color="error.main">
                  {requirement}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRequirementsDialog(false)} color="primary">
            Continue Editing
          </Button>
        </DialogActions>
      </Dialog>
    


      {open && (
        <AddAuthorModal
          open={isAddAuthorModalOpen}
          onClose={() => setIsAddAuthorModalOpen(false)}
          onAuthorAdded={handleAuthorAdded}
        />
      )}

    </>
  );
}; 