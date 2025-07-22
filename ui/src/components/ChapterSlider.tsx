import React from 'react';
import type { Chapter } from '../models/Chapter';
import type { Book } from '../models/Book';
import Box from '@mui/material/Box';
import { FormControl, Select, MenuItem, Typography } from '@mui/material';

interface ChapterSliderProps {
  chapters: Chapter[];
  value: number;
  onChange: (index: number) => void;
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}

export const ChapterSlider: React.FC<ChapterSliderProps> = ({ 
  chapters, 
  value, 
  onChange, 
  books, 
  selectedBook, 
  onBookChange 
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 200,
        height: '100vh',
        background: 'rgba(255,255,255,0.98)',
        borderRight: '3px solid #ccc',
        zIndex: 1000,
        p: '24px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Book Selector */}
      <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, fontSize: 12, color: '#111' }}>
          Book:
        </Typography>
        <FormControl size="small" sx={{ width: '100%' }}>
          <Select
            value={selectedBook.title}
            onChange={(e) => {
              const book = books.find(b => b.title === e.target.value);
              if (book) onBookChange(book);
            }}
            displayEmpty
            sx={{ fontSize: 12 }}
          >
            {books.map((book) => (
              <MenuItem key={book.title} value={book.title} sx={{ fontSize: 12 }}>
                {book.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Chapter List */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        height: '80vh',
        overflow: 'auto',
        pr: 1,
      }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2, fontSize: 12, color: '#111' }}>
          Chapters:
        </Typography>
        {chapters.map((chapter, idx) => (
          <div
            key={chapter.index}
            style={{
              fontSize: 12,
              color: idx === value ? '#111' : '#888',
              fontWeight: idx === value ? 'bold' : 'normal',
              textAlign: 'left',
              minHeight: 0,
              cursor: 'pointer',
              textDecoration: idx === value ? 'underline' : 'none',
              marginBottom: 24,
              padding: '12px 0',
            }}
            onClick={() => onChange(idx)}
          >
            {chapter.title}
          </div>
        ))}
      </Box>
    </Box>
  );
}; 