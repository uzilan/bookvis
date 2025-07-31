import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  TextField,
  Alert,
  Snackbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Google as GoogleIcon,
  Info as InfoIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Upload as UploadIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { FirebaseService } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import type { Author } from '../models/Author';
import type { BookData } from '../models/BookData';
import type { SchemaBookData } from '../schema/models/SchemaBookData';
import { fuzzySearch } from '../utils/fuzzySearch';
import { CreateBookModal } from '../components/CreateBookModal';
import { loadBookDataFromYamlString } from '../utils/yamlParser';
import { convertBookDataToSchema } from '../utils/schemaToBookDataConverter';
import { classes, combineClasses, materialUITheme } from '../styles';

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
  const [draftBookData, setDraftBookData] = useState<SchemaBookData | null>(null);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  
  // YAML upload functionality
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingYaml, setUploadingYaml] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoadingData(true);
      const [fetchedAuthors, fetchedBooks] = await Promise.all([
        FirebaseService.getAllAuthors(),
        FirebaseService.getAllBooks()
      ]);
      setAuthors(fetchedAuthors);
      setAllAuthors(fetchedAuthors);
      
      // Combine published books and drafts
      let allBooksData = fetchedBooks;
      if (isAuthenticated) {
        try {
          const fetchedDrafts = await FirebaseService.getUserDrafts();
          // Combine published books and drafts, avoiding duplicates
          const draftIds = new Set(fetchedDrafts.map(draft => draft.book.id));
          const publishedBooks = fetchedBooks.filter(book => !draftIds.has(book.book.id));
          allBooksData = [...publishedBooks, ...fetchedDrafts];
        } catch (error) {
          console.error('Error fetching drafts:', error);
        }
      }
      
      setAllBooks(allBooksData);
      setBooks(allBooksData);
      setHasFetchedData(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  }, [isAuthenticated]);

  // Fetch authors and books for all users (only once)
  useEffect(() => {
    if (!hasFetchedData) {
      fetchData();
    }
  }, [hasFetchedData, fetchData]);

  // Check for draft book data when component mounts
  useEffect(() => {
    const draft = checkForDraftBook();
    setDraftBookData(draft);
  }, []);

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
      filteredAuthors = allAuthors;
    }
    
    // Filter books by author if selected
    if (selectedAuthor) {
      filteredBooks = filteredBooks.filter(book => book.book.author.id === selectedAuthor);
    }
    
    setBooks(filteredBooks);
    setAuthors(filteredAuthors);
  }, [allBooks, allAuthors, showOnlyMyBooks, selectedAuthor, isAuthenticated, user]);

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
    if (book.status === 'draft') {
      // For drafts, open the editor with the book data
      const schemaBookData = convertBookDataToSchema(book);
      setIsCreateBookModalOpen(true);
      // We'll need to pass the data to the modal
      // For now, we'll store it in session storage and the modal will pick it up
      sessionStorage.setItem('bookvis-draft-book', JSON.stringify(schemaBookData));
    } else {
      // For published books, navigate to visualization
      navigate(`/visualize/${book.book.id}`);
    }
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
    // Check for updated draft data after modal closes
    const draft = checkForDraftBook();
    setDraftBookData(draft);
  };

  // Check for draft book data in session storage
  const checkForDraftBook = () => {
    try {
      const stored = sessionStorage.getItem('bookvis-draft-book');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if there's any meaningful data
        const hasData = parsed && (
          parsed.book?.title ||
          parsed.locations?.length > 0 ||
          parsed.characters?.length > 0 ||
          parsed.factions?.length > 0 ||
          parsed.chapters?.length > 0 ||
          parsed.relationships?.length > 0
        );
        return hasData ? parsed : null;
      }
      return null;
    } catch (error) {
      console.error('Error checking for draft book:', error);
      return null;
    }
  };

  // YAML upload handlers
  const handleYamlUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.yaml') && !file.name.endsWith('.yml')) {
      setUploadStatus({
        open: true,
        message: 'Please select a YAML file (.yaml or .yml)',
        severity: 'error'
      });
      return;
    }

    try {
      setUploadingYaml(true);
      const fileContent = await file.text();
      
      // Parse YAML to BookData
      const bookData = loadBookDataFromYamlString(fileContent);
      
      // Upload to Firebase (BookData format is already correct)
      await FirebaseService.saveBook(bookData);
      
      setUploadStatus({
        open: true,
        message: `Successfully uploaded "${bookData.book.title}" with ${bookData.characters.length} characters and ${bookData.relationships.length} relationships!`,
        severity: 'success'
      });
      
      // Refresh data
      fetchData();
      
    } catch (error) {
      console.error('Error uploading YAML:', error);
      setUploadStatus({
        open: true,
        message: `Error uploading YAML: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error'
      });
    } finally {
      setUploadingYaml(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCloseUploadStatus = () => {
    setUploadStatus(prev => ({ ...prev, open: false }));
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
    <Box className={classes.homePageMainContainer}>
      {/* Info Indicator */}
      <Box className={combineClasses(classes.homePageInfoButton, infoDrawerOpen && 'open')}>
        <Button
          onClick={() => setInfoDrawerOpen(!infoDrawerOpen)}
          className={classes.homePageInfoButtonContent}
        >
          {infoDrawerOpen ? (
            <>
              <CloseIcon className={classes.homePageInfoButtonIcon} />
              <Typography variant="body2" className={classes.homePageInfoButtonText}>
                CLOSE
              </Typography>
            </>
          ) : (
            <>
              <InfoIcon className={classes.homePageInfoButtonIcon} />
              <Typography variant="body2" className={classes.homePageInfoButtonText}>
                INFO
              </Typography>
            </>
          )}
        </Button>
      </Box>

      <Container maxWidth="lg" className={classes.homePageContentContainer}>
        {/* Header */}
        <Box className={classes.homePageHeader}>
          <Box className={classes.homePageHeroSection}>
            <Typography variant="h2" component="h1" className={classes.homePageTitle}>
              BookVis
            </Typography>
            
            {/* Relationships Image */}
            <Box className={classes.homePageHeroImageWrapper}>
              <img 
                src="/relationships.png" 
                alt="Character Relationships" 
                className={classes.homePageHeroImage}
              />
            </Box>
            
            <Box className={classes.homePageHeroActions}>
              
            </Box>
          </Box>
          <Typography variant="h5" sx={{ color: 'var(--color-text)' }} gutterBottom>
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
              <Typography variant="body2" sx={{ mt: 2, color: 'var(--color-textSecondary)' }}>
                Sign in to view and manage your books
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ color: 'var(--color-text)' }}>
                Welcome, {user?.displayName || user?.email}!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSignOut}
                size="small"
                sx={{ 
                  color: 'var(--color-text)', 
                  borderColor: 'var(--color-textSecondary)',
                  border: '1px solid var(--color-textSecondary)'
                }}
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleOpenCreateBookModal}
                  >
                    {draftBookData ? 
                      `Continue creating "${draftBookData.book?.title || 'Untitled Book'}"` : 
                      'Create New Book'
                    }
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<UploadIcon />}
                    onClick={handleYamlUpload}
                    disabled={uploadingYaml}
                  >
                    {uploadingYaml ? 'Uploading...' : 'Upload YAML'}
                  </Button>
                </Box>
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
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'var(--color-textSecondary)' }}>
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
                        border: '1px solid #e0e0e0',
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
                          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-start' }}>
                            {bookData.status === 'draft' && (
                              <Chip 
                                label="Draft" 
                                size="small" 
                                color="secondary" 
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                              />
                            )}
                            {isAuthenticated && isOwnBook(bookData) && bookData.status !== 'draft' && (
                              <>
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateVisibility(bookData);
                                  }}
                                  title={bookData.isPublic ? 'Make Private' : 'Make Public'}
                                  sx={{ color: 'var(--color-textSecondary)' }}
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
                              </>
                            )}
                            {isAuthenticated && isOwnBook(bookData) && bookData.status === 'draft' && (
                              <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBook(bookData);
                                }}
                                title="Delete Draft"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: 'var(--color-textSecondary)' }} gutterBottom>
                          by {bookData.book.author.name}
                        </Typography>
                        

                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'var(--color-textSecondary)' }}>
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

      {/* Hidden file input for YAML upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".yaml,.yml"
        style={{ display: 'none' }}
      />

      {/* Upload status snackbar */}
      <Snackbar
        open={uploadStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseUploadStatus}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseUploadStatus} 
          severity={uploadStatus.severity}
          sx={{ width: '100%' }}
        >
          {uploadStatus.message}
        </Alert>
      </Snackbar>

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

      {/* Info Drawer */}
      <Drawer
        anchor="right"
        open={infoDrawerOpen}
        onClose={() => setInfoDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '400px' },
            maxWidth: '500px',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'var(--color-text)' }}>
              About BookVis
            </Typography>
            <IconButton onClick={() => setInfoDrawerOpen(false)} sx={{ color: 'var(--color-textSecondary)' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 3, color: 'var(--color-textSecondary)' }}>
            BookVis is a powerful tool for authors and readers to visualize character relationships and story structures in books.
          </Typography>
          
          {/* Application Screenshot */}
          <Box sx={{ mb: 3 }}>
            <img 
              src="/application.png" 
              alt="BookVis Application Interface" 
              style={{ 
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out'
              }}
              onClick={() => setImagePopupOpen(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </Box>
          
          {/* Features List */}
          <List sx={{ width: '100%' }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <BookIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Book Management" 
                secondary="Create and manage your books with an intuitive interface. Add characters, locations, and chapters with ease."
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'var(--color-text)'
                  },
                  '& .MuiListItemText-secondary': {
                    color: 'var(--color-textSecondary)'
                  }
                }}
              />
            </ListItem>
            
            <Divider sx={{ my: 1 }} />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <PeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Character Relationships" 
                secondary=""
                sx={materialUITheme.listItemText}
              />
            </ListItem>
            
            <Divider sx={{ my: 1 }} />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <TimelineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Story Timeline" 
                secondary="Track character appearances and relationship developments throughout your story with chapter-based visualization."
                sx={materialUITheme.listItemText}
              />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--color-border)' }}>
            <Typography variant="body2" sx={{ color: 'var(--color-textSecondary)', mb: 2 }}>
              Ready to start visualizing your story?
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setInfoDrawerOpen(false);
                handleOpenCreateBookModal();
              }}
            >
              Create Your First Book
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Image Popup Modal */}
      <Dialog
        open={imagePopupOpen}
        onClose={() => setImagePopupOpen(false)}
        maxWidth={false}
        fullWidth
        sx={{
          ...materialUITheme.dialog,
          '& .MuiDialog-paper': {
            ...materialUITheme.dialog['& .MuiDialog-paper'],
            maxWidth: '95vw',
            maxHeight: '95vh',
            width: '95vw',
            height: '95vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          ...materialUITheme.dialogTitle
        }}>
          BookVis Application Interface
          <IconButton 
            onClick={() => setImagePopupOpen(false)}
            sx={{ color: 'var(--color-textSecondary)' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src="/application.png" 
            alt="BookVis Application Interface" 
            style={{ 
              width: '100%',
              maxWidth: '1800px',
              maxHeight: '90vh',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}; 