import React from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import type { Book } from '../models/Book';

interface BookSelectorProps {
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}

export const BookSelector: React.FC<BookSelectorProps> = ({ books, selectedBook, onBookChange }) => {
  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 20, 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 2000,
      background: 'rgba(255,255,255,0.95)',
      padding: '8px 16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #ddd'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Book:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedBook.id}
            onChange={(e) => {
              const book = books.find(b => b.id === e.target.value);
              if (book) onBookChange(book);
            }}
            displayEmpty
          >
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}; 