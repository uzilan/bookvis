import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { AddAuthorModal } from '../AddAuthorModal';
import { BookInfoTab, LocationsTab, FactionsTab, ChaptersTab, CharactersTab, RelationshipsTab } from './index';
import type { Author } from '../../models/Author';
import type { SchemaBookData, SchemaAuthor } from '../../schema/models';
import { FirebaseService } from '../../services/firebase';

interface CreateBookModalProps {
  open: boolean;
  onClose: () => void;
}



export const CreateBookModal: React.FC<CreateBookModalProps> = ({
  open,
  onClose
}) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  
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

  // Fetch authors when modal opens
  useEffect(() => {
    if (open) {
      fetchAuthors();
    }
  }, [open]);

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
    // Use the bookData state as the single source of truth
    if (!bookData.book.title || !bookData.book.author.id) {
      console.error('Missing required book data');
      return;
    }

    const completeBookData: SchemaBookData = {
      ...bookData,
      book: {
        ...bookData.book,
        id: bookData.book.title.trim().toLowerCase().replace(/\s+/g, '-')
      }
    };

    console.log('Creating book with SchemaBookData:', completeBookData);
    // TODO: Save the complete book data to Firebase or your storage
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
    console.log('handleAuthorSelect called with:', authorId);
    if (authorId === 'new-author') {
      console.log('Setting isAddAuthorModalOpen to true');
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

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
      <DialogTitle>
        Create New Book
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '600px', p: 0 }}>
        {/* Tabs - Always visible */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Book Info" />
            <Tab label="Locations" />
            <Tab label="Chapters" />
            <Tab label="Factions" />
            <Tab label="Characters" />
            <Tab label="Relationships" />
          </Tabs>
        </Box>

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
            <ChaptersTab
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

          {currentTab === 3 && (
            <FactionsTab
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleCreateBook} 
          color="primary" 
          variant="contained"
          disabled={!bookData.book.author.id || !bookData.book.title.trim() || loading}
        >
          Create Book
        </Button>
      </DialogActions>
      
        </Dialog>
      )}
    
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