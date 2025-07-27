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
  const path = chapter.path || [];
  const breadcrumbs: string[] = [];
  
  // Determine the structure based on path length
  if (path.length === 0) {
    // Simple structure: no path, just show chapter title
    breadcrumbs.push(chapter.title);
  } else if (path.length === 1) {
    // Book only: show book and chapter
    breadcrumbs.push(path[0]);
    breadcrumbs.push(chapter.title);
  } else if (path.length === 2) {
    // Book and part: show part and chapter (skip book if only one book)
    const books = chapters.filter(ch => ch.type === 'book');
    if (books.length > 1) {
      breadcrumbs.push(path[0]); // Book name
    }
    breadcrumbs.push(path[1]); // Part name
    breadcrumbs.push(chapter.title);
  } else if (path.length > 2) {
    // Complex structure: show all levels
    breadcrumbs.push(path[0]); // Book name
    breadcrumbs.push(path[1]); // Part name
    breadcrumbs.push(chapter.title);
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

  // Find chapters where this character is mentioned
  const characterMentionedChapters = chapters.filter(ch => 
    ch.characters && ch.characters.includes(character.id)
  );

  // Find relationships where this character is involved and filter by current chapter
  const characterRelationships = relationships.filter(rel => {
    // Check if this character is involved in the relationship
    const isInvolved = rel.character1.id === character.id || rel.character2.id === character.id;
    if (!isInvolved) return false;
    
    // Filter by current chapter - only show relationships where both characters appear in the current chapter
    const currentChapter = chapters.find(ch => ch.id === selectedChapter);
    if (!currentChapter) return false;
    
    // Check if both characters appear in the current chapter (same logic as the graph)
    const character1Appears = currentChapter.characters && currentChapter.characters.includes(rel.character1.id);
    const character2Appears = currentChapter.characters && currentChapter.characters.includes(rel.character2.id);
    
    // Only show relationships where both characters appear in the current chapter
    return character1Appears && character2Appears;
  });



  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: 'left', color: 'var(--color-text)' }}>
            {character.name}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'var(--color-text)' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', color: 'var(--color-text)' }}>
            {character.description}
          </Typography>
          
          <Typography variant="body2" sx={{ textAlign: 'left', color: 'var(--color-textSecondary)', mb: 1 }}>
            Appears in:
          </Typography>
          {characterMentionedChapters.length > 0 ? (
            <Box sx={{ 
              maxHeight: 200, 
              overflow: 'auto',
              border: '1px solid var(--color-border)',
              borderRadius: 1,
              backgroundColor: 'var(--color-background)'
            }}>
              <List dense sx={{ py: 0 }}>
                {characterMentionedChapters.map((chapter, index) => (
                  <ListItem key={index} sx={{ py: 0.1, px: 1 }}>
                    <ListItemText 
                      primary={getBreadcrumbDisplay(chapter, chapters)}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          color: 'var(--color-textSecondary)',
                          fontSize: '0.875rem'
                        } 
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'left', color: 'var(--color-textSecondary)', fontStyle: 'italic' }}>
              Not mentioned in any chapters
            </Typography>
          )}
        </Paper>

        {character.aliases.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', color: 'var(--color-text)' }}>
              Aliases
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {character.aliases.map((alias, index) => (
                <Chip key={index} label={alias} size="small" sx={{ backgroundColor: 'var(--color-buttonActive)', color: 'white' }} />
              ))}
            </Box>
          </Paper>
        )}

        {characterFactions.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', color: 'var(--color-text)' }}>
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
          <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', color: 'var(--color-text)' }}>
              Attributes
            </Typography>
            <List dense>
              {character.attributes.map((attribute, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={attribute} 
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        color: 'var(--color-text)' 
                      } 
                    }} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {characterRelationships.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', color: 'var(--color-text)' }}>
              Current Relationships
            </Typography>
            <List dense>
              {characterRelationships.map((rel, index) => {
                const otherCharacter = rel.character1.id === character.id ? rel.character2 : rel.character1;
                
                // Use the first description since both characters are present in the current chapter
                const relevantDescription = rel.descriptions[0]?.description || 'Related';
                
                return (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={otherCharacter.name}
                      secondary={relevantDescription}
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
                );
              })}
            </List>
          </Paper>
        )}
      </Box>
    </Drawer>
  );
}; 