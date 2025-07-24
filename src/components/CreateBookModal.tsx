import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import type { Author } from '../models/Author';
import type { SchemaBookData, SchemaAuthor } from '../schema/models';
import { FirebaseService } from '../services/firebase';
import { AddAuthorModal } from './AddAuthorModal';

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
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingLocationName, setEditingLocationName] = useState('');
  
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAddLocation = (locationName: string) => {
    const newLocation = {
      id: locationName.trim().toLowerCase().replace(/\s+/g, '-'),
      name: locationName.trim(),
      description: ''
    };
    setBookData(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  const handleRemoveLocation = (locationId: string) => {
    setBookData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== locationId)
    }));
  };

  const handleStartEditingLocation = (location: { id: string; name: string }) => {
    setEditingLocationId(location.id);
    setEditingLocationName(location.name);
  };

  const handleSaveLocationEdit = (locationId: string) => {
    if (editingLocationName.trim()) {
      setBookData(prev => ({
        ...prev,
        locations: prev.locations.map(loc => 
          loc.id === locationId 
            ? { ...loc, name: editingLocationName.trim() }
            : loc
        )
      }));
    }
    setEditingLocationId(null);
    setEditingLocationName('');
  };

  const handleCancelLocationEdit = () => {
    setEditingLocationId(null);
    setEditingLocationName('');
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
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Book Info" />
              <Tab label="Locations" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {currentTab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Book Information
                </Typography>
              </Box>
              
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Author</InputLabel>
                  <Select
                    value={selectedAuthor}
                    label="Author"
                    onChange={(e) => handleAuthorSelect(e.target.value)}
                    disabled={loading}
                    displayEmpty
                  >
                    {loading ? (
                      <MenuItem disabled>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={16} />
                          Loading authors...
                        </Box>
                      </MenuItem>
                    ) : [
                      <MenuItem 
                        key="new-author"
                        value="new-author" 
                        sx={{ color: 'primary.main', fontWeight: 'bold' }}
                        onClick={() => {
                          console.log('Add New Author clicked directly');
                          setIsAddAuthorModalOpen(true);
                        }}
                      >
                        + Add New Author
                      </MenuItem>,
                      ...(authors.length > 0 ? [<Divider key="divider" />] : []),
                      ...authors.map((author) => (
                        <MenuItem key={author.id} value={author.id}>
                          {author.name}
                        </MenuItem>
                      ))
                    ]}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Book Title"
                  value={bookData.book.title}
                  onChange={(e) => setBookData(prev => ({
                    ...prev,
                    book: {
                      ...prev.book,
                      title: e.target.value
                    }
                  }))}
                  placeholder="Enter the book title"
                />
              </Box>

              {/* Development: Show current bookData state */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Current bookData State (Development)
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '12px',
                    maxHeight: '200px',
                    overflow: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {JSON.stringify(bookData, null, 2)}
                </Box>
              </Box>
            </Box>
          )}

          {currentTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Locations
                </Typography>
              </Box>

              {/* Add Location Form */}
              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Location Name"
                    placeholder="Enter location name"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          handleAddLocation(input.value);
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Enter location name"]') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        handleAddLocation(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              {/* Locations List */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Current Locations ({bookData.locations.length})
                </Typography>
                {bookData.locations.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No locations added yet.
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {bookData.locations.map((location) => (
                      <Box
                        key={location.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1,
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: '#f9f9f9',
                          cursor: editingLocationId === location.id ? 'default' : 'pointer',
                          '&:hover': {
                            backgroundColor: editingLocationId === location.id ? '#f9f9f9' : '#f0f0f0'
                          }
                        }}
                        onClick={() => {
                          if (editingLocationId !== location.id) {
                            handleStartEditingLocation(location);
                          }
                        }}
                      >
                        {editingLocationId === location.id ? (
                          <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                            <TextField
                              size="small"
                              value={editingLocationName}
                              onChange={(e) => setEditingLocationName(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveLocationEdit(location.id);
                                } else if (e.key === 'Escape') {
                                  handleCancelLocationEdit();
                                }
                              }}
                              autoFocus
                              sx={{ flex: 1 }}
                            />
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => handleSaveLocationEdit(location.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              onClick={handleCancelLocationEdit}
                            >
                              Cancel
                            </Button>
                          </Box>
                        ) : (
                          <Typography 
                            variant="body2" 
                            sx={{ flex: 1 }}
                          >
                            {location.name}
                          </Typography>
                        )}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveLocation(location.id)}
                          disabled={editingLocationId === location.id}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Development: Show current bookData state */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Current bookData State (Development)
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '12px',
                    maxHeight: '200px',
                    overflow: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {JSON.stringify(bookData, null, 2)}
                </Box>
              </Box>
            </Box>
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