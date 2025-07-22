import React, { useState, useEffect } from 'react';
import type { Chapter } from '../models/Chapter';
import type { Book } from '../models/Book';
import Box from '@mui/material/Box';
import { FormControl, Select, MenuItem, Typography, Chip } from '@mui/material';
import { buildChapterTree, type ChapterNode } from '../utils/chapterHierarchy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ChapterSliderProps {
  chapters: Chapter[];
  value: number;
  onChange: (index: number) => void;
  books: Book[];
  selectedBook: Book;
  onBookChange: (book: Book) => void;
}

interface ChapterItemProps {
  node: ChapterNode;
  selectedIndex: number;
  onSelect: (index: number) => void;
  level: number;
  expandedNodes: Set<string>;
  onToggleExpanded: (nodeTitle: string) => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ 
  node, 
  selectedIndex, 
  onSelect, 
  level, 
  expandedNodes, 
  onToggleExpanded 
}) => {
  const isExpanded = expandedNodes.has(node.chapter.title);
  const isSelected = selectedIndex === (node.chapter.globalIndex || node.chapter.index);
  const hasChildren = node.children.length > 0;
  const indent = level * 4; // Reduced from 8 to 4

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          py: 0.5,
          px: 1,
          ml: indent,
          borderRadius: 1,
          backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
          '&:hover': {
            backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.15)' : 'rgba(0, 0, 0, 0.04)',
          },
        }}
        onClick={() => {
          if (hasChildren) {
            onToggleExpanded(node.chapter.title);
          } else {
            onSelect(node.chapter.globalIndex || node.chapter.index);
          }
        }}
      >
        {hasChildren && (
          <Box sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
            {isExpanded ? (
              <ExpandLessIcon sx={{ fontSize: 16 }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        )}
        
        <Typography
          variant="body2"
          sx={{
            fontSize: 11,
            color: isSelected ? '#1976d2' : (level === 0 ? '#111' : '#666'),
            fontWeight: isSelected ? 'bold' : (level === 0 ? 'medium' : 'normal'),
            textDecoration: isSelected ? 'underline' : 'none',
            flex: 1,
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
      </Box>
      
      {hasChildren && isExpanded && (
        <Box>
          {node.children.map((child, index) => (
            <ChapterItem
              key={`${child.chapter.title}-${index}`}
              node={child}
              selectedIndex={selectedIndex}
              onSelect={onSelect}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export const ChapterSlider: React.FC<ChapterSliderProps> = ({ 
  chapters, 
  value, 
  onChange, 
  books, 
  selectedBook, 
  onBookChange 
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  
  // Build hierarchical structure
  let chapterTree = buildChapterTree(chapters);

  // If there is only one root node and it is a book, show its children as top-level
  if (chapterTree.length === 1 && chapterTree[0].chapter.type === 'book') {
    chapterTree = chapterTree[0].children;
  }
  
  // Debug logging
  console.log('ChapterSlider - chapters:', chapters.length);
  console.log('ChapterSlider - chapterTree:', chapterTree);
  console.log('ChapterSlider - expandedNodes:', expandedNodes);
  
  // Get current chapter for breadcrumb
  const currentChapter = chapters.find(ch => (ch.globalIndex || ch.index) === value);

  // Auto-expand parent nodes by default and ensure current chapter's parents are expanded
  useEffect(() => {
    const newExpanded = new Set<string>();
    
    // Auto-expand all parent nodes (parts and books) by default
    chapters.forEach(chapter => {
      if (chapter.type === 'part' || chapter.type === 'book') {
        newExpanded.add(chapter.title);
        console.log('Auto-expanding:', chapter.title, 'type:', chapter.type);
      }
    });
    
    // Ensure the current chapter's parent path is expanded
    if (currentChapter && currentChapter.path) {
      currentChapter.path.forEach(pathSegment => {
        const parentChapter = chapters.find(ch => ch.title === pathSegment);
        if (parentChapter) {
          newExpanded.add(parentChapter.title);
          console.log('Expanding parent path:', parentChapter.title);
        }
      });
    }
    
    console.log('Setting expanded nodes:', Array.from(newExpanded));
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

      {/* Chapter Tree */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        height: '70vh',
        overflow: 'auto',
        pr: 1,
      }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2, fontSize: 12, color: '#111' }}>
          Chapters:
        </Typography>
        {chapterTree.map((node, index) => (
          <ChapterItem
            key={`${node.chapter.title}-${index}`}
            node={node}
            selectedIndex={value}
            onSelect={onChange}
            level={0}
            expandedNodes={expandedNodes}
            onToggleExpanded={handleToggleExpanded}
          />
        ))}
      </Box>
    </Box>
  );
}; 