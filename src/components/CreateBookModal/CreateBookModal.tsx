import React, { useState, useEffect } from 'react';
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
import type { BookData } from '../../models/BookData';
import { FirebaseService } from '../../services/firebase';
import { convertSchemaToBookData } from '../../utils/schemaToBookDataConverter';


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

  // Fetch authors when modal opens and restore initial data if provided
  useEffect(() => {
    if (open) {
      fetchAuthors();
      // Restore initial data if provided (when returning from preview)
      if (initialData) {
        setBookData(initialData);
        setSelectedAuthor(initialData.book.author.id);
      } else {
        // Reset to initial state when creating a new book
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
        setSelectedAuthor('');
      }
    }
  }, [open, initialData]);

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

  const handleCreateBook = () => {
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



    if (missing.length > 0) {
      setMissingRequirements(missing);
      setShowRequirementsDialog(true);
      return;
    }

    // TODO: Save the complete book data to Firebase or your storage
    onClose();
  };

  const handleCancelClick = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirmation(false);
    setSelectedAuthor('');
    setIsAddAuthorModalOpen(false);
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
    if (authorId === 'new-author') {
      setIsAddAuthorModalOpen(true);
    } else {
      setSelectedAuthor(authorId);
      const selectedAuthorData = authors.find(author => author.id === authorId);
      if (selectedAuthorData) {
        const schemaAuthor: SchemaAuthor = {
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
          onClose={(event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
              return; // Prevent closing on backdrop click or escape key
            }
            handleClose();
          }}
          maxWidth="md"
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
      </DialogTitle>
      <DialogContent sx={{ 
        display: 'flex', 
        height: '600px', 
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