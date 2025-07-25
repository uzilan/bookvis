import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { FirebaseService } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import type { Author } from '../models/Author';
import type { BookData } from '../models/BookData';

export const HomePage: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [allBooks, setAllBooks] = useState<BookData[]>([]); // Store all books for filtering
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookData | null>(null);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [bookToUpdateVisibility, setBookToUpdateVisibility] = useState<BookData | null>(null);
  const [newVisibility, setNewVisibility] = useState(false);

  // Fetch authors and books for all users
  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      console.log('Fetching data...');
      const [fetchedAuthors, fetchedBooks] = await Promise.all([
        FirebaseService.getAllAuthors(),
        FirebaseService.getAllBooks()
      ]);
      console.log('Fetched authors:', fetchedAuthors);
      console.log('Fetched books:', fetchedBooks);
      setAuthors(fetchedAuthors);
      setAllBooks(fetchedBooks);
      setBooks(fetchedBooks);
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
      setBooks(allBooks);
    } else {
      // Filter books by the selected author
      setSelectedAuthor(authorId);
      const filteredBooks = allBooks.filter(book => book.book.author.id === authorId);
      setBooks(filteredBooks);
    }
  };

  const clearAuthorFilter = () => {
    setSelectedAuthor(null);
    setBooks(allBooks);
  };

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
      <Container maxWidth="md" sx={{ 
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
          <Typography variant="h5" color="text.secondary" gutterBottom>
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
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Sign in to view and manage your books
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Welcome, {user?.displayName || user?.email}!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSignOut}
                size="small"
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Box>

        {/* Content for all users */}
        <>
          {/* Authors Section */}
          <Paper sx={{ p: 3, mb: 4, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Authors ({authors.length})
              </Typography>
              {selectedAuthor && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearAuthorFilter}
                  sx={{ ml: 2 }}
                >
                  Clear Filter
                </Button>
              )}
            </Box>
            {loadingData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : authors.length > 0 ? (
              <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
                {authors.map((author) => (
                  <Grid item xs={12} sm={6} md={4} key={author.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        border: selectedAuthor === author.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        backgroundColor: selectedAuthor === author.id ? '#f3f6ff' : 'inherit',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out'
                        }
                      }}
                      onClick={() => handleAuthorClick(author.id)}
                    >
                      <CardContent>
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
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Books ({books.length})
              {selectedAuthor && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Filtered by: {authors.find(a => a.id === selectedAuthor)?.name}
                </Typography>
              )}
            </Typography>
            {loadingData ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : books.length > 0 ? (
              <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
                {books.map((bookData) => (
                  <Grid item xs={12} sm={6} md={4} key={bookData.book.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        position: 'relative',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s ease-in-out'
                        }
                      }}
                      onClick={() => handleBookClick(bookData)}
                    >
                      <CardContent>
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
                        
                        {isAuthenticated && isOwnBook(bookData) && (
                          <Chip 
                            label={bookData.isPublic ? 'Public' : 'Private'} 
                            size="small" 
                            color={bookData.isPublic ? 'success' : 'warning'} 
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                        )}
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: 'center' }}>
                          <Chip 
                            label={`${bookData.characters.length} Characters`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                          <Chip 
                            label={`${bookData.chapters.length} Chapters`} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                          />
                          <Chip 
                            label={`${bookData.factions.length} Factions`} 
                            size="small" 
                            color="success" 
                            variant="outlined"
                          />
                        </Box>
                        
                        {bookData.ownerEmail && (
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            Owner: {bookData.ownerEmail}
                          </Typography>
                        )}
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
    </Box>
  );
}; 