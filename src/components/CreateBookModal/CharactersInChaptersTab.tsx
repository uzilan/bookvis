import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Button,
  Chip
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Description
} from '@mui/icons-material';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';
import type { SchemaCharacter } from '../../schema/models/SchemaCharacter';
import type { SchemaChapter } from '../../schema/models/SchemaChapter';
import type { SchemaFaction } from '../../schema/models/SchemaFaction';
import type { SchemaHierarchyItem } from '../../schema/models/SchemaHierarchy';

interface CharactersInChaptersTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

interface ChapterNode {
  item: SchemaHierarchyItem;
  chapter: SchemaChapter;
  level: number;
  children: ChapterNode[];
}

export const CharactersInChaptersTab: React.FC<CharactersInChaptersTabProps> = ({
  bookData,
  setBookData
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(
    bookData.chapters.length > 0 ? bookData.chapters[0].id : null
  );
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const handleCharacterTransfer = (characterId: string, direction: 'add' | 'remove') => {
    if (!selectedChapter) return;

    setBookData(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => {
        if (chapter.id === selectedChapter) {
          const characters = chapter.characters || [];
          if (direction === 'add') {
            if (!characters.includes(characterId)) {
              return { ...chapter, characters: [...characters, characterId] };
            }
          } else {
            return { ...chapter, characters: characters.filter(id => id !== characterId) };
          }
        }
        return chapter;
      })
    }));
  };

  const handleCharacterTransferAll = (direction: 'add' | 'remove') => {
    if (!selectedChapter) return;

    if (direction === 'add') {
      const currentCharacters = getCharactersInChapter(selectedChapter);
      const availableCharacters = bookData.characters
        .filter(char => !currentCharacters.includes(char.id))
        .map(char => char.id);
      
      setBookData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter => {
          if (chapter.id === selectedChapter) {
            const characters = chapter.characters || [];
            return { ...chapter, characters: [...characters, ...availableCharacters] };
          }
          return chapter;
        })
      }));
    } else {
      setBookData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter => {
          if (chapter.id === selectedChapter) {
            return { ...chapter, characters: [] };
          }
          return chapter;
        })
      }));
    }
  };

  const getCharacterFaction = (character: SchemaCharacter): SchemaFaction | null => {
    if (character.factions && character.factions.length > 0) {
      const factionId = character.factions[0];
      return bookData.factions.find(f => f.id === factionId) || null;
    }
    return null;
  };

  const getCharactersInChapter = (chapterId: string): string[] => {
    const chapter = bookData.chapters.find(ch => ch.id === chapterId);
    return chapter?.characters || [];
  };

  const buildChapterTree = (): ChapterNode[] => {
    const tree: ChapterNode[] = [];
    const hierarchy = bookData.hierarchy || [];
    
    hierarchy.forEach((item) => {
      const chapter = bookData.chapters.find(ch => ch.id === item.chapter_id);
      if (chapter) {
        let level = 0;
        switch (item.type) {
          case 'volume': level = 0; break;
          case 'book': level = 1; break;
          case 'part': level = 2; break;
          case 'chapter': level = 3; break;
        }
        
        const node: ChapterNode = {
          item,
          chapter,
          level,
          children: []
        };
        
        // Find parent and add as child
        if (level > 0) {
          const parentLevel = level - 1;
          const parentNode = findNodeAtLevel(tree, parentLevel);
          if (parentNode) {
            parentNode.children.push(node);
          } else {
            tree.push(node);
          }
        } else {
          tree.push(node);
        }
      }
    });
    
    return tree;
  };

  const findNodeAtLevel = (nodes: ChapterNode[], targetLevel: number): ChapterNode | null => {
    for (const node of nodes) {
      if (node.level === targetLevel) {
        return node;
      }
      const found = findNodeAtLevel(node.children, targetLevel);
      if (found) return found;
    }
    return null;
  };

  const toggleChapterExpansion = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const renderChapterNode = (node: ChapterNode, depth: number = 0) => {
    const isExpanded = expandedChapters.has(node.chapter.id);
    const hasChildren = node.children.length > 0;
    const characterCount = getCharactersInChapter(node.chapter.id).length;
    const isSelected = selectedChapter === node.chapter.id;
    const isChapter = node.item.type === 'chapter';
    const isClickable = isChapter;

    return (
      <Box key={node.chapter.id}>
        <ListItem
          onClick={isClickable ? () => setSelectedChapter(node.chapter.id) : undefined}
          sx={{
            pl: 2 + depth * 2,
            backgroundColor: isSelected ? 'var(--color-hover)' : 'transparent',
            '&:hover': {
              backgroundColor: isClickable ? 'var(--color-hover)' : 'transparent',
            },
            borderLeft: isSelected ? '3px solid var(--color-primary)' : 'none',
            cursor: isClickable ? 'pointer' : 'default',
            opacity: isClickable ? 1 : 0.7,
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            {hasChildren ? (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChapterExpansion(node.chapter.id);
                }}
                sx={{ minWidth: 24, p: 0 }}
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </Button>
            ) : (
              <Description sx={{ fontSize: 20, color: 'var(--color-textSecondary)' }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                  {node.chapter.title}
                </Typography>
                {isChapter && (
                  <Chip
                    label={`${characterCount} chars`}
                    size="small"
                    sx={{
                      backgroundColor: characterCount > 0 ? 'var(--color-buttonActive)' : 'var(--color-surface)',
                      color: characterCount > 0 ? 'white' : 'var(--color-textSecondary)',
                      fontSize: '0.7rem',
                      height: '20px'
                    }}
                  />
                )}
              </Box>
            }
            secondary={
              <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)' }}>
                {node.item.type}
              </Typography>
            }
          />
        </ListItem>
        {hasChildren && isExpanded && (
          <Box>
            {node.children.map(child => renderChapterNode(child, depth + 1))}
          </Box>
        )}
      </Box>
    );
  };

  const TransferList = ({ title, items, onItemClick, onSelectAll, onDeselectAll }: {
    title: string;
    items: Array<{ id: string; name: string; faction?: SchemaFaction }>;
    onItemClick: (id: string) => void;
    onSelectAll?: () => void;
    onDeselectAll?: () => void;
  }) => (
    <Paper sx={{ width: 200, flex: 1, overflow: 'auto', minHeight: 0 }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: 'var(--color-border)' }}>
        <Typography variant="subtitle2">{title}</Typography>
        {(onSelectAll || onDeselectAll) && (
          <Button size="small" onClick={onSelectAll || onDeselectAll}>
            {onSelectAll ? 'Select All' : 'Deselect All'}
          </Button>
        )}
      </Box>
      <List dense>
        {items.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => onItemClick(item.id)}
            sx={{ py: 0.5, cursor: 'pointer' }}
          >
            <ListItemText 
              primary={item.name}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  if (bookData.chapters.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'var(--color-text)' }}>
          No chapters created yet
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'var(--color-text)' }}>
          Please create some chapters first, then come back to assign characters.
        </Typography>
      </Box>
    );
  }

  if (bookData.characters.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'var(--color-text)' }}>
          No characters created yet
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'var(--color-text)' }}>
          Please create some characters first, then come back to assign them to chapters.
        </Typography>
      </Box>
    );
  }

  const chapterTree = buildChapterTree();
  const selectedChapterData = bookData.chapters.find(ch => ch.id === selectedChapter);
  const charactersInSelectedChapter = selectedChapter ? getCharactersInChapter(selectedChapter) : [];
  const availableCharacters = bookData.characters.filter(char => !charactersInSelectedChapter.includes(char.id));

    return (
    <Box sx={{ display: 'flex', gap: 3, minHeight: 0, flex: 1 }}>
      {/* Left Column - Chapter Tree */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chapters
        </Typography>
        <Paper sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <List dense>
            {chapterTree.map(node => renderChapterNode(node))}
          </List>
        </Paper>
      </Box>

      {/* Right Column - Transfer List */}
      {selectedChapter && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Characters in "{selectedChapterData?.title}"
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flex: 1, minHeight: 0 }}>
            <TransferList
              title="Available Characters"
              items={availableCharacters.map(char => ({
                id: char.id,
                name: char.name,
                faction: getCharacterFaction(char) || undefined
              }))}
              onItemClick={(id) => handleCharacterTransfer(id, 'add')}
              onSelectAll={() => handleCharacterTransferAll('add')}
            />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleCharacterTransferAll('add')}
                sx={{ minWidth: '32px', height: '32px' }}
              >
                &gt;&gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleCharacterTransferAll('remove')}
                sx={{ minWidth: '32px', height: '32px' }}
              >
                &lt;&lt;
              </Button>
            </Box>
            
            <TransferList
              title="Assigned Characters"
              items={bookData.characters
                .filter(char => charactersInSelectedChapter.includes(char.id))
                .map(char => ({
                  id: char.id,
                  name: char.name,
                  faction: getCharacterFaction(char) || undefined
                }))}
              onItemClick={(id) => handleCharacterTransfer(id, 'remove')}
              onDeselectAll={() => handleCharacterTransferAll('remove')}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}; 