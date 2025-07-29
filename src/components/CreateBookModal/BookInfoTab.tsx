import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';
import type { Author } from '../../models/Author';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';

interface BookInfoTabProps {
  authors: Author[];
  loading: boolean;
  selectedAuthor: string;
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
  onAuthorSelect: (authorId: string) => void;
  onAddAuthorClick: () => void;
}

export const BookInfoTab: React.FC<BookInfoTabProps> = ({
  authors,
  loading,
  selectedAuthor,
  bookData,
  setBookData,
  onAuthorSelect,
  onAddAuthorClick
}) => {

  // Ensure selectedAuthor is valid (exists in authors list or is empty)
  const validSelectedAuthor = selectedAuthor && authors.some(author => author.id === selectedAuthor) 
    ? selectedAuthor 
    : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <FormControl 
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&:hover fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&.Mui-focused fieldset': {
                border: '1px solid #1976d2 !important',
              },
            },
          }}
        >
          <InputLabel 
            sx={{ 
              zIndex: 1,
              backgroundColor: 'var(--color-background)',
              padding: '0 4px',
              color: 'var(--color-textSecondary)'
            }}
          >
            Author
          </InputLabel>
          <Select
            value={validSelectedAuthor}
            onChange={(e) => onAuthorSelect(e.target.value)}
            disabled={loading}
            displayEmpty
            sx={{
              '& .MuiInputBase-input': {
                color: 'var(--color-text)',
              },
              '& .MuiSelect-select': {
                color: 'var(--color-text)',
              },
              '& .MuiSelect-icon': {
                color: 'var(--color-textSecondary) !important',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #e0e0e0 !important',
                },
                '&:hover fieldset': {
                  border: '1px solid #e0e0e0 !important',
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid #1976d2 !important',
                },
              },
            }}
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
                onClick={onAddAuthorClick}
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
        <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: 1, display: 'block' }}>
          Select the author of this book, or add a new author if they're not in the list
        </Typography>
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
          sx={{
            '& .MuiInputLabel-root': {
              color: 'var(--color-textSecondary)',
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-text)',
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'var(--color-textSecondary)',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&:hover fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&.Mui-focused fieldset': {
                border: '1px solid #1976d2 !important',
              },
            },
          }}
        />
        <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: 1, display: 'block' }}>
          Enter the title of your book (e.g., "The Lord of the Rings", "The Hobbit")
        </Typography>
      </Box>

      <Box>
        <TextField
          fullWidth
          label="Map Link (optional)"
          value={bookData.map_url || ''}
          onChange={(e) => setBookData(prev => ({
            ...prev,
            map_url: e.target.value
          }))}
          placeholder="Enter a link to the book's map"
          sx={{
            '& .MuiInputLabel-root': {
              color: 'var(--color-textSecondary)',
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-text)',
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'var(--color-textSecondary)',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&:hover fieldset': {
                border: '1px solid #e0e0e0 !important',
              },
              '&.Mui-focused fieldset': {
                border: '1px solid #1976d2 !important',
              },
            },
          }}
        />
        <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: 1, display: 'block' }}>
          If available, add a URL to a static image of the book's world map
        </Typography>
      </Box>


    </Box>
  );
}; 