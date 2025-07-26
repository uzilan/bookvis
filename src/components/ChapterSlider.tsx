import React, { useState, useEffect } from 'react';
import type { Chapter } from '../models/Chapter';
import type { Book } from '../models/Book';
import Box from '@mui/material/Box';
import { FormControl, Select, MenuItem, Typography, Chip, Button } from '@mui/material';
import { buildChapterTree, type ChapterNode } from '../utils/chapterHierarchy';

import AddIcon from '@mui/icons-material/Add';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ChapterSliderProps {
  chapters: Chapter[];
  value: string; // Changed from number to string (chapter ID)
  onChange: (chapterId: string) => void; // Changed from index to chapterId
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
  onCreateBook: () => void;
  showBookSelector?: boolean;
  isPreview?: boolean; // New prop to indicate preview mode
  onExitPreview?: () => void; // New prop to handle exiting preview mode
}

interface ChapterItemProps {
  node: ChapterNode;
  selectedChapterId: string; // Changed from selectedIndex to selectedChapterId
  onSelect: (chapterId: string) => void; // Changed from index to chapterId
  level: number;
  expandedNodes: Set<string>;
  onToggleExpanded: (nodeTitle: string) => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ 
  node, 
  selectedChapterId, 
  onSelect, 
  level, 
  expandedNodes, 
  onToggleExpanded 
}) => {
  const isExpanded = expandedNodes.has(node.chapter.title);
  const isSelected = node.chapter.type === 'chapter' && selectedChapterId === node.chapter.id;
  


  const hasChildren = node.children.length > 0;
  // Book: 0px, Part: 2px, Chapter: 4px
  // Since the hierarchy is flattened (book level removed), adjust indentation
  // Material-UI spacing: 1 = 8px, so 0.25 = 2px, 0.5 = 4px
  // Book: 0px, Part: 2px, Chapter: 4px
  // After book level removal: Part (level 0) gets 2px, Chapter (level 1) gets 4px
  // No indentation, use font weights for hierarchy
  

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: node.chapter.type === 'part' ? '12px 0px 4px 0px' : '4px 0px',
          borderRadius: '4px',
          backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isSelected ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.04)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isSelected ? 'var(--color-primary)' : 'transparent';
        }}
        onClick={() => {
          if (hasChildren) {
            onToggleExpanded(node.chapter.title);
          } else {
            onSelect(node.chapter.id);
          }
        }}
      >
        {/* Removed expand/collapse icons to eliminate indentation */}
        
        <Typography
          variant={node.chapter.type === 'book' ? 'h6' : 'body2'}
          style={{
            fontSize: node.chapter.type === 'book' ? 14 : 11,
            color: isSelected ? 'var(--color-primary)' : 'var(--color-text)',
            fontWeight: isSelected ? 'bold' : (
              node.chapter.type === 'book' ? 'bold' : 
              node.chapter.type === 'part' ? 'bold' : 
              'normal'
            ),
            textDecoration: isSelected ? 'underline' : 'none',
            flex: 1,
            textAlign: 'left',
          }}
        >
          {node.chapter.title}
        </Typography>
        
        {node.chapter.type && node.chapter.type !== 'chapter' && (
          <Chip
            label={node.chapter.type}
            size="small"
            sx={{
              height: 16,
              fontSize: 9,
              backgroundColor: level === 0 ? '#e3f2fd' : '#f5f5f5',
              color: level === 0 ? '#1976d2' : '#666',
            }}
          />
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child, index) => (
            <ChapterItem
              key={`${child.chapter.title}-${index}`}
              node={child}
              selectedChapterId={selectedChapterId}
              onSelect={onSelect}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ChapterSlider: React.FC<ChapterSliderProps> = ({ 
  chapters, 
  value, 
  onChange, 
  books, 
  selectedBook, 
  onBookChange,
  onCreateBook,
  showBookSelector = true,
  isPreview = false,
  onExitPreview
}) => {
  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  
  // Build hierarchical structure
  let chapterTree = buildChapterTree(chapters);

  // If there is only one root node and it is a book, show its children as top-level
  if (chapterTree.length === 1 && chapterTree[0].chapter.type === 'book') {
    chapterTree = chapterTree[0].children;
  }
  
  // Get current chapter for breadcrumb (only actual chapters, not books or parts)
  const currentChapter = chapters.find(ch => {
    if (ch.type !== 'chapter') return false;
    return ch.id === value;
  });



  // Auto-expand parent nodes by default and ensure current chapter's parents are expanded
  useEffect(() => {
    const newExpanded = new Set<string>();
    
    // Auto-expand all parent nodes (parts and books) by default
    chapters.forEach(chapter => {
      if (chapter.type === 'part' || chapter.type === 'book') {
        newExpanded.add(chapter.title);
      }
    });
    
    // Ensure the current chapter's parent path is expanded
    if (currentChapter && currentChapter.path) {
      currentChapter.path.forEach(pathSegment => {
        const parentChapter = chapters.find(ch => ch.title === pathSegment);
        if (parentChapter) {
          newExpanded.add(parentChapter.title);
        }
      });
    }
    
    setExpandedNodes(newExpanded);
  }, [chapters, currentChapter]);

  const handleToggleExpanded = (nodeTitle: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeTitle)) {
      newExpanded.delete(nodeTitle);
    } else {
      newExpanded.add(nodeTitle);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 280,
        height: '100vh',
        background: 'var(--color-overlay)',
        borderRight: '3px solid var(--color-border)',
        zIndex: 1000,
        padding: '24px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px var(--color-shadow)',
      }}
    >
      {/* Home Link / Return to Editor */}
      <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #eee' }}>
        <Button
          variant="outlined"
          startIcon={isPreview ? <span style={{ fontSize: '16px' }}>✏️</span> : <HomeIcon />}
          onClick={() => {
            console.log('ChapterSlider button clicked:', { isPreview, onExitPreview: !!onExitPreview });
            if (isPreview && onExitPreview) {
              console.log('Calling onExitPreview');
              onExitPreview();
            } else {
              console.log('Navigating to home');
              navigate('/');
            }
          }}
          size="small"
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: 12,
            ...(isPreview && {
              backgroundColor: '#2196f3',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1976d2',
              }
            })
          }}
        >
          {isPreview ? 'Return to Editor' : 'Back to Home'}
        </Button>
      </Box>
      {/* Book Selector */}
      {showBookSelector && (
        <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 12, color: '#111' }}>
              Book:
            </Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={onCreateBook}
              sx={{
                minWidth: 'auto',
                px: 1,
                py: 0.5,
                fontSize: 10,
                textTransform: 'none'
              }}
            >
              Create
            </Button>
          </Box>
          <FormControl size="small" sx={{ width: '100%' }}>
            <Select
              value={selectedBook.id}
              onChange={(e) => {
                const book = books.find(b => b.id === e.target.value);
                if (book) onBookChange(book);
              }}
              displayEmpty
              sx={{ fontSize: 12 }}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id} sx={{ fontSize: 12 }}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Chapter Tree */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        height: '70vh',
        overflow: 'auto',
        pr: 1,
        textAlign: 'left',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            background: '#a8a8a8',
          },
        },
      }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2, fontSize: 12, color: 'var(--color-text)' }}>
          Chapters:
        </Typography>
        {chapterTree.map((node, index) => (
          <ChapterItem
            key={`${node.chapter.title}-${index}`}
            node={node}
            selectedChapterId={value}
            onSelect={onChange}
            level={node.level}
            expandedNodes={expandedNodes}
            onToggleExpanded={handleToggleExpanded}
          />
        ))}
      </Box>
    </Box>
  );
}; 