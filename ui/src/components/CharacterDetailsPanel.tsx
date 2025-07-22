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

interface CharacterDetailsPanelProps {
  character: Character | null;
  factions: Faction[];
  chapters: Chapter[];
  relationships: RelationshipWithChapters[];
  open: boolean;
  onClose: () => void;
}

export const CharacterDetailsPanel: React.FC<CharacterDetailsPanelProps> = ({
  character,
  factions,
  chapters,
  relationships,
  open,
  onClose,
}) => {
  console.log('CharacterDetailsPanel render:', { character, open });
  if (!character) return null;

  const characterFactions = character.factions.map(factionId => 
    factions.find(f => f.id === factionId)
  ).filter(Boolean) as Faction[];

  const firstAppearanceChapter = chapters.find(ch => ch.index === character.firstAppearanceChapter);

  // Find relationships where this character is involved
  const characterRelationships = relationships.filter(rel => 
    rel.character1.id === character.id || rel.character2.id === character.id
  );

  return (
    <Drawer
      anchor="right"
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
            First appears in {firstAppearanceChapter ? `"${firstAppearanceChapter.title}"` : `Chapter ${character.firstAppearanceChapter}`}
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
              Factions
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