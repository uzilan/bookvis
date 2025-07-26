import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Divider
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
            value={selectedAuthor}
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
      </Box>

      <Box>
        <TextField
          fullWidth
          label="Map Link (optional)"
          value={bookData.book.mapLink || ''}
          onChange={(e) => setBookData(prev => ({
            ...prev,
            book: {
              ...prev.book,
              mapLink: e.target.value
            }
          }))}
          placeholder="Enter a link to the book's map"
          helperText="URL to a static image of the book's world map"
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
            '& .MuiFormHelperText-root': {
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
      </Box>


    </Box>
  );
}; 