import React from 'react';
import {
  Box,
  Typography,
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
            onChange={(e) => onAuthorSelect(e.target.value)}
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
  );
}; 