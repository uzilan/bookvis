import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Chip,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  TextField
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { FirebaseService } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import type { Author } from '../models/Author';
import type { BookData } from '../models/BookData';
import { fuzzySearch } from '../utils/fuzzySearch';
import { CreateBookModal } from '../components/CreateBookModal';

export const HomePage: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [allBooks, setAllBooks] = useState<BookData[]>([]); // Store all books for filtering
  const [allAuthors, setAllAuthors] = useState<Author[]>([]); // Store all authors for filtering
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookData | null>(null);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [bookToUpdateVisibility, setBookToUpdateVisibility] = useState<BookData | null>(null);
  const [newVisibility, setNewVisibility] = useState(false);
  const [showOnlyMyBooks, setShowOnlyMyBooks] = useState(false);
  const [authorFilterText, setAuthorFilterText] = useState('');
  const [bookFilterText, setBookFilterText] = useState('');
  const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Fetch authors and books for all users (only once)
  useEffect(() => {
    if (!hasFetchedData) {
      fetchData();
    }
  }, [isAuthenticated, hasFetchedData]);

  // Filter authors and books based on toggle and author selection
  useEffect(() => {
    let filteredBooks = allBooks;
    let filteredAuthors = allAuthors;
    
    // Filter by ownership if toggle is on and user is authenticated
    if (showOnlyMyBooks && isAuthenticated && user) {
      filteredBooks = allBooks.filter(book => book.ownerId === user.uid);
      // Get unique author IDs from filtered books
      const myAuthorIds = [...new Set(filteredBooks.map(book => book.book.author.id))];
      filteredAuthors = allAuthors.filter(author => myAuthorIds.includes(author.id));
    } else {
      // When toggle is off, show all authors and books
      filteredBooks = allBooks;
      filteredAuthors = allAuthors;
    }
    
    // Filter books by author if selected
    if (selectedAuthor) {
      filteredBooks = filteredBooks.filter(book => book.book.author.id === selectedAuthor);
    }
    
    setBooks(filteredBooks);
    setAuthors(filteredAuthors);
  }, [allBooks, allAuthors, showOnlyMyBooks, selectedAuthor, isAuthenticated, user]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [fetchedAuthors, fetchedBooks] = await Promise.all([
        FirebaseService.getAllAuthors(),
        FirebaseService.getAllBooks()
      ]);
      setAuthors(fetchedAuthors);
      setAllAuthors(fetchedAuthors);
      setAllBooks(fetchedBooks);
      setBooks(fetchedBooks);
      setHasFetchedData(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAuthors([]);
      setBooks([]);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleDeleteBook = (book: BookData) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    
    try {
      await FirebaseService.deleteBook(bookToDelete.book.id);
      setBooks(books.filter(b => b.book.id !== bookToDelete.book.id));
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Failed to delete book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  const handleUpdateVisibility = (book: BookData) => {
    setBookToUpdateVisibility(book);
    setNewVisibility(!book.isPublic);
    setVisibilityDialogOpen(true);
  };

  const handleConfirmVisibilityUpdate = async () => {
    if (!bookToUpdateVisibility) return;
    
    try {
      await FirebaseService.updateBookVisibility(bookToUpdateVisibility.book.id, newVisibility);
      setBooks(books.map(b => 
        b.book.id === bookToUpdateVisibility.book.id 
          ? { ...b, isPublic: newVisibility }
          : b
      ));
      setVisibilityDialogOpen(false);
      setBookToUpdateVisibility(null);
    } catch (error) {
      console.error('Failed to update book visibility:', error);
      alert('Failed to update book visibility. Please try again.');
    }
  };

  const isOwnBook = (book: BookData) => {
    return user && book.ownerId === user.uid;
  };

  const handleBookClick = (book: BookData) => {
    navigate(`/visualize/${book.book.id}`);
  };

  const handleAuthorClick = (authorId: string) => {
    if (selectedAuthor === authorId) {
      // If clicking the same author, clear the filter
      setSelectedAuthor(null);
    } else {
      // Filter books by the selected author
      setSelectedAuthor(authorId);
    }
  };

  const clearAuthorFilter = () => {
    setSelectedAuthor(null);
  };

  const handleOpenCreateBookModal = () => {
    setIsCreateBookModalOpen(true);
  };

  const handleCloseCreateBookModal = () => {
    setIsCreateBookModalOpen(false);
  };

  // Filter authors using fuzzy search
  const filteredAuthors = useMemo(() => {
    if (!authorFilterText.trim()) {
      return authors;
    }
    
    return fuzzySearch(
      authors,
      authors, // For authors, we always search all authors
      authorFilterText,
      true, // Always show all for authors
      { keys: ['name'] }
    );
  }, [authors, authorFilterText]);

  // Filter books using fuzzy search
  const filteredBooks = useMemo(() => {
    if (!bookFilterText.trim()) {
      return books;
    }
    
    return fuzzySearch(
      books,
      books, // For books, we always search all books
      bookFilterText,
      true, // Always show all for books
      { keys: ['book.title', 'book.author.name'] }
    );
  }, [books, bookFilterText]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      width: '100%'
    }}>
      <Container maxWidth="lg" sx={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            BookVis
          </Typography>
          <Typography variant="h5" sx={{ color: '#ffffff' }} gutterBottom>
            Visualize Character Relationships in Your Books
          </Typography>
          
          {!isAuthenticated ? (
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleSignIn}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  borderRadius: 2
                }}
              >
                Sign in with Google
              </Button>
              <Typography variant="body2" sx={{ mt: 2, color: '#ffffff' }}>
                Sign in to view and manage your books
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>
                Welcome, {user?.displayName || user?.email}!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSignOut}
                size="small"
                sx={{ color: '#ffffff', borderColor: '#ffffff' }}
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Box>

        {/* Content for all users */}
        <>
          {/* Toggle Section */}
          {isAuthenticated && (
            <Paper sx={{ p: 3, mb: 3, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showOnlyMyBooks}
                      onChange={(e) => setShowOnlyMyBooks(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Show only my books"
                  labelPlacement="start"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleOpenCreateBookModal}
                  sx={{ ml: 2 }}
                >
                  Create New Book
                </Button>
              </Box>
            </Paper>
          )}

          {/* Authors Section */}
          <Paper sx={{ p: 3, mb: 4, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Authors ({filteredAuthors.length})
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Filter authors..."
                  value={authorFilterText}
                  onChange={(e) => setAuthorFilterText(e.target.value)}
                  sx={{ minWidth: '200px' }}
                />
                {selectedAuthor && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearAuthorFilter}
                  >
                    Clear Filter
                  </Button>
                )}
              </Box>
            </Box>
            {loadingData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredAuthors.length > 0 ? (
              <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
                {filteredAuthors.map((author) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={author.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        border: selectedAuthor === author.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        backgroundColor: selectedAuthor === author.id ? '#f3f6ff' : 'inherit'
                      }}
                      onClick={() => handleAuthorClick(author.id)}
                    >
                      <CardContent sx={{ padding: '8px 12px 2px 12px !important' }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {author.name}
                        </Typography>
                        {selectedAuthor === author.id && (
                          <Chip 
                            label="Selected" 
                            size="small" 
                            color="primary" 
                            sx={{ mt: 1 }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No authors found. Create your first book to get started!
              </Typography>
            )}
          </Paper>

          {/* Books Section */}
          <Paper sx={{ p: 3, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Books ({filteredBooks.length})
                {selectedAuthor && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Filtered by: {authors.find(a => a.id === selectedAuthor)?.name}
                  </Typography>
                )}
              </Typography>
              <TextField
                size="small"
                placeholder="Filter books..."
                value={bookFilterText}
                onChange={(e) => setBookFilterText(e.target.value)}
                sx={{ minWidth: '200px' }}
              />
            </Box>
            {loadingData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredBooks.length > 0 ? (
              <Grid container spacing={1} justifyContent="center" sx={{ width: '100%', maxWidth: '1200px' }}>
                {filteredBooks.map((bookData) => (
                  <Grid size={{ xs: 12, sm: 4, md: 4 }} key={bookData.book.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        position: 'relative',
                        cursor: 'pointer',
                        maxWidth: '300px',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out'
                        }
                      }}
                      onClick={() => handleBookClick(bookData)}
                    >
                      <CardContent sx={{ padding: '8px 12px 2px 12px !important' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ flex: 1 }}>
                            {bookData.book.title}
                          </Typography>
                          {isAuthenticated && isOwnBook(bookData) && (
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateVisibility(bookData);
                                }}
                                title={bookData.isPublic ? 'Make Private' : 'Make Public'}
                              >
                                {bookData.isPublic ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBook(bookData);
                                }}
                                title="Delete Book"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          by {bookData.book.author.name}
                        </Typography>
                        

                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No books found. Create your first book to get started!
              </Typography>
            )}
          </Paper>
        </>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{bookToDelete?.book.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Visibility Update Dialog */}
      <Dialog open={visibilityDialogOpen} onClose={() => setVisibilityDialogOpen(false)}>
        <DialogTitle>Update Book Visibility</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Update visibility for "{bookToUpdateVisibility?.book.title}"
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={newVisibility}
                onChange={(e) => setNewVisibility(e.target.checked)}
              />
            }
            label={newVisibility ? 'Public' : 'Private'}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {newVisibility 
              ? 'Public books can be viewed by anyone, even when not signed in.'
              : 'Private books can only be viewed by you when signed in.'
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisibilityDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmVisibilityUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Book Modal */}
      {isCreateBookModalOpen && (
        <CreateBookModal
          open={isCreateBookModalOpen}
          onClose={handleCloseCreateBookModal}
          onPreview={(previewData) => {
            // Navigate to visualization page with preview data in URL parameters
            const previewDataString = encodeURIComponent(JSON.stringify(previewData));
            navigate(`/visualize?preview=${previewDataString}`);
          }}
        />
      )}
    </Box>
  );
}; 