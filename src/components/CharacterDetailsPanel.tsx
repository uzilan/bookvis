import React from 'react';
import {
  Drawer,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Character } from '../models/Character';
import type { Faction } from '../models/Faction';
import type { Chapter } from '../models/Chapter';
import type { RelationshipWithChapters } from '../models/BookData';

// Helper function to create breadcrumb display for chapter
function getBreadcrumbDisplay(chapter: Chapter, chapters: Chapter[]): string {
  // Get all unique books and parts to determine what to show
  const books = chapters.filter(ch => ch.type === 'book');
  const parts = chapters.filter(ch => ch.type === 'part');
  
  const path = chapter.path || [];
  const breadcrumbs: string[] = [];
  
  // If there's only one book, skip the book name
  if (books.length <= 1) {
    // For simple books without parts, just show the chapter title
    if (path.length === 0) {
      // Simple structure: no path, just show chapter title
      breadcrumbs.push(chapter.title);
    } else if (path.length === 1) {
      // Simple structure: just book and chapter
      breadcrumbs.push(chapter.title);
    } else if (path.length > 1) {
      // Has parts
      breadcrumbs.push(path[1]); // Part name
      if (path.length > 2) {
        breadcrumbs.push(path[2]); // Chapter name
      }
    }
  } else {
    // Multiple books, show book name
    if (path.length > 0) {
      breadcrumbs.push(path[0]); // Book name
    }
    if (path.length > 1) {
      breadcrumbs.push(path[1]); // Part name
    }
    if (path.length > 2) {
      breadcrumbs.push(path[2]); // Chapter name
    }
  }
  
  // If there's only one part, skip the part name
  if (parts.length <= 1 && breadcrumbs.length > 1) {
    breadcrumbs.splice(1, 1); // Remove part name
  }
  
  return breadcrumbs.join(', ');
}

interface CharacterDetailsPanelProps {
  character: Character | null;
  factions: Faction[];
  chapters: Chapter[];
  relationships: RelationshipWithChapters[];
  selectedChapter: string; // Current chapter ID
  open: boolean;
  onClose: () => void;
}

export const CharacterDetailsPanel: React.FC<CharacterDetailsPanelProps> = ({
  character,
  factions,
  chapters,
  relationships,
  selectedChapter,
  open,
  onClose,
}) => {

  if (!character) return null;

  // Filter factions based on current chapter - only show factions the character has joined by this chapter
  const currentFactionIds = character.factions.filter(factionId => {
    const joinChapter = character.factionJoinChapters?.[factionId];
    if (!joinChapter) return false;
    
    // Handle both number (backward compatibility) and string (chapter ID) values
    if (typeof joinChapter === 'number') {
      // For backward compatibility with numeric chapter indices
      const currentChapter = chapters.find(ch => ch.id === selectedChapter);
      return currentChapter && typeof currentChapter.index === 'number' && joinChapter <= currentChapter.index;
    } else if (typeof joinChapter === 'string') {
      // For string chapter IDs, find the target chapter and current chapter
      const targetChapter = chapters.find(ch => ch.id === joinChapter);
      const currentChapter = chapters.find(ch => ch.id === selectedChapter);
      return targetChapter && targetChapter.index && currentChapter && currentChapter.index && 
             targetChapter.index <= currentChapter.index;
    }
    return false;
  });

  const characterFactions = currentFactionIds.map(factionId => 
    factions.find(f => f.id === factionId)
  ).filter(Boolean) as Faction[];

  const firstAppearanceChapter = chapters.find(ch => {
    if (typeof character.firstAppearanceChapter === 'number') {
      return ch.index === character.firstAppearanceChapter;
    } else if (typeof character.firstAppearanceChapter === 'string') {
      return ch.id === character.firstAppearanceChapter;
    }
    return false;
  });

  // Find relationships where this character is involved
  const characterRelationships = relationships.filter(rel => 
    rel.character1.id === character.id || rel.character2.id === character.id
  );

  // Get the formatted display path for first appearance
  const firstAppearanceDisplay = firstAppearanceChapter 
    ? getBreadcrumbDisplay(firstAppearanceChapter, chapters)
    : `Chapter ${character.firstAppearanceChapter}`;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            {character.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {character.description}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            First appears in {firstAppearanceDisplay}
          </Typography>
        </Paper>

        {character.aliases.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Aliases
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {character.aliases.map((alias, index) => (
                <Chip key={index} label={alias} size="small" />
              ))}
            </Box>
          </Paper>
        )}

        {characterFactions.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Current Factions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {characterFactions.map((faction) => (
                <Chip
                  key={faction.id}
                  label={faction.title}
                  size="small"
                  sx={{
                    backgroundColor: faction.color,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: faction.color,
                      opacity: 0.8,
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        )}

        {character.attributes.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Attributes
            </Typography>
            <List dense>
              {character.attributes.map((attribute, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText primary={attribute} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {characterRelationships.length > 0 && (
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Current Relationships
            </Typography>
            <List dense>
              {characterRelationships.map((rel, index) => {
                const otherCharacter = rel.character1.id === character.id ? rel.character2 : rel.character1;
                return (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={otherCharacter.name}
                      secondary={rel.descriptions[0]?.description || 'Related'}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}
      </Box>
    </Drawer>
  );
}; 