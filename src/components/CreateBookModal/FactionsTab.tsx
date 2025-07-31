import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';
import { fuzzySearch } from '../../utils/fuzzySearch';
import { classes, materialUITheme } from '../../styles';


interface FactionsTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

export const FactionsTab: React.FC<FactionsTabProps> = ({
  bookData,
  setBookData
}) => {

  const generateRandomColor = (): string => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
      '#ff5722', '#795548', '#9e9e9e', '#607d8b'
    ];
    
    // Calculate color distance using RGB values
    const colorDistance = (color1: string, color2: string): number => {
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };
      
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      
      if (!rgb1 || !rgb2) return 0;
      
      return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
      );
    };
    
    // Get existing faction colors
    const existingColors = bookData.factions.map(faction => faction.color);
    
    // Filter out colors that are too similar to existing ones
    const availableColors = colors.filter(color => {
      return !existingColors.some(existingColor => 
        colorDistance(color, existingColor) < 100 // Minimum distance threshold
      );
    });
    
    // If no colors are available (all are too similar), return a random one
    if (availableColors.length === 0) {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  const [editingFactionId, setEditingFactionId] = useState<string | null>(null);
  const [editingFactionName, setEditingFactionName] = useState('');
  const [editingFactionDescription, setEditingFactionDescription] = useState('');
  const [editingFactionColor, setEditingFactionColor] = useState('#3f51b5');
  const [newFactionName, setNewFactionName] = useState('');
  const [newFactionDescription, setNewFactionDescription] = useState('');
  const [newFactionColor, setNewFactionColor] = useState(generateRandomColor());
  const [factionFilterText, setFactionFilterText] = useState('');

  const handleAddFaction = (factionName: string, description: string = '', color: string = '') => {
    const newFaction = {
      id: factionName.trim().toLowerCase().replace(/\s+/g, '-'),
      title: factionName.trim(),
      description: description.trim(),
      color: color || generateRandomColor()
    };
    setBookData(prev => ({
      ...prev,
      factions: [...prev.factions, newFaction]
    }));
  };

  const handleRemoveFaction = (factionId: string) => {
    setBookData(prev => ({
      ...prev,
      factions: prev.factions.filter(faction => faction.id !== factionId)
    }));
  };

  const handleStartEditingFaction = (faction: { id: string; title: string; description: string; color: string }) => {
    setEditingFactionId(faction.id);
    setEditingFactionName(faction.title);
    setEditingFactionDescription(faction.description);
    setEditingFactionColor(faction.color);
  };

  const handleSaveFactionEdit = (factionId: string) => {
    if (editingFactionName.trim()) {
      setBookData(prev => ({
        ...prev,
        factions: prev.factions.map(faction => 
          faction.id === factionId 
            ? { 
                ...faction, 
                title: editingFactionName.trim(),
                description: editingFactionDescription,
                color: editingFactionColor
              }
            : faction
        )
      }));
    }
    setEditingFactionId(null);
    setEditingFactionName('');
    setEditingFactionDescription('');
    setEditingFactionColor('#3f51b5');
  };

  const handleCancelFactionEdit = () => {
    setEditingFactionId(null);
    setEditingFactionName('');
    setEditingFactionDescription('');
    setEditingFactionColor('#3f51b5');
  };

  const handleAddFactionWithForm = () => {
    if (newFactionName.trim()) {
      handleAddFaction(newFactionName, newFactionDescription, newFactionColor);
      setNewFactionName('');
      setNewFactionDescription('');
      setNewFactionColor(generateRandomColor());
    }
  };

  return (
    <Box className={classes.factionsTabContainer}>
      {/* Left Column - Add Faction Form */}
      <Box className={classes.factionsTabLeftColumn}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Faction
        </Typography>
        
        <Box className={classes.factionsTabForm}>
          <Box className={classes.factionsTabFormRow}>
            <TextField
              fullWidth
              label="Faction Name"
              placeholder="Enter faction name"
              value={newFactionName}
              onChange={(e) => setNewFactionName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddFactionWithForm();
                }
              }}
              sx={materialUITheme.textField}
            />
            <Box
              className={classes.factionsTabColorPicker}
              style={{ backgroundColor: newFactionColor }}
            >
              <input
                type="color"
                value={newFactionColor}
                onChange={(e) => setNewFactionColor(e.target.value)}
                className={classes.factionsTabColorInput}
              />
            </Box>
          </Box>
          <Typography variant="caption" sx={materialUITheme.caption}>
            Enter the name of a faction in your story (e.g., "The Fellowship", "The Dark Forces", "The Elves"). You can accept the suggested color or choose a new one by clicking the color circle.
          </Typography>
          <TextField
            fullWidth
            label="Description (optional)"
            placeholder="Enter faction description"
            value={newFactionDescription}
            onChange={(e) => setNewFactionDescription(e.target.value)}
            multiline
            rows={2}
            sx={materialUITheme.textField}
          />
          <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: -1, mb: 1 }}>
            Describe the faction's role, goals, or significance in the story
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleAddFactionWithForm}
            disabled={!newFactionName.trim()}
            className={classes.factionsTabButton}
          >
            Add Faction
          </Button>
        </Box>
      </Box>

      {/* Divider between columns */}
      <Divider 
        orientation="vertical" 
        flexItem 
        className={classes.factionsTabDivider}
      />

      {/* Right Column - Factions List */}
      <Box className={classes.factionsTabRightColumn}>
        <Box className={classes.factionsTabHeader}>
          <Typography variant="subtitle1">
            Current Factions ({bookData.factions.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Filter factions..."
            value={factionFilterText}
            onChange={(e) => setFactionFilterText(e.target.value)}
            sx={{ 
              minWidth: '200px',
              '& .MuiInputBase-input': {
                color: 'var(--color-text)',
              },
              '& .MuiInputLabel-root': {
                color: 'var(--color-textSecondary)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--color-border)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--color-border)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--color-primary)',
                },
              },
            }}
          />
        </Box>
        {bookData.factions.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'var(--color-textSecondary)' }}>
            No factions added yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '800px', overflowY: 'auto' }}>
            {fuzzySearch(
              bookData.factions,
              bookData.factions,
              factionFilterText,
              true,
              { 
                keys: ['title', 'description'],
                threshold: 0.6
              }
            )
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((faction) => (
              <Box
                key={faction.id}
                className={classes.factionsTabFactionItem}
                onClick={() => {
                  if (editingFactionId !== faction.id) {
                    handleStartEditingFaction(faction);
                  }
                }}
              >
                {editingFactionId === faction.id ? (
                  <Box className={classes.factionsTabForm}>
                    <Box className={classes.factionsTabFormRow}>
                      <TextField
                        fullWidth
                        label="Faction Name"
                        value={editingFactionName}
                        onChange={(e) => setEditingFactionName(e.target.value)}
                        sx={materialUITheme.textField}
                      />
                      <Box
                        className={classes.factionsTabColorPicker}
                        style={{ backgroundColor: editingFactionColor }}
                      >
                        <input
                          type="color"
                          value={editingFactionColor}
                          onChange={(e) => setEditingFactionColor(e.target.value)}
                          className={classes.factionsTabColorInput}
                        />
                      </Box>
                    </Box>
                    <TextField
                      fullWidth
                      label="Description (optional)"
                      value={editingFactionDescription}
                      onChange={(e) => setEditingFactionDescription(e.target.value)}
                      placeholder="Enter faction description"
                      multiline
                      rows={2}
                      sx={materialUITheme.textField}
                    />
                    <Box className={classes.factionsTabButtonGroup}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSaveFactionEdit(faction.id)}
                        className={classes.factionsTabButton}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        onClick={handleCancelFactionEdit}
                        className={classes.factionsTabButtonSecondary}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box className={classes.factionsTabFactionItem}>
                    <Box className={classes.factionsTabFactionHeader}>
                      <Box
                        className={classes.factionsTabColorDot}
                        style={{ backgroundColor: faction.color }}
                      />
                      <Typography variant="body2" className={classes.textPrimary}>
                        {faction.title}
                      </Typography>
                    </Box>
                    {faction.description && (
                      <Typography variant="caption" className={classes.textSecondary}>
                        {faction.description}
                      </Typography>
                    )}
                  </Box>
                )}
                {editingFactionId !== faction.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFaction(faction.id)}
                    title="Delete Faction"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}; 