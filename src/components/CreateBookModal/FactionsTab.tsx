import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';


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
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {/* Left Column - Add Faction Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Faction
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'var(--color-textSecondary)',
                },
                '& .MuiInputBase-input': {
                  color: 'var(--color-textSecondary) !important',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'var(--color-textSecondary)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '1px solid #e0e0e0 !important',
                  },
                  '&:hover fieldset': {
                    border: '1px solid #e0e0e0 !important',
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #1976d2 !important',
                  },
                },
              }}
            />
            <Box
                            sx={{
                position: 'relative',
                width: '65px',
                height: '55px',
                borderRadius: '50%',
                backgroundColor: newFactionColor,
                border: '2px solid #ccc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                margin: 0,
                boxSizing: 'border-box'
              }}
            >
              <input
                type="color"
                value={newFactionColor}
                onChange={(e) => setNewFactionColor(e.target.value)}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: -0.8, display: 'block' }}>
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
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--color-textSecondary)',
              },
              '& .MuiInputBase-input': {
                color: 'var(--color-textSecondary) !important',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'var(--color-textSecondary)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1px solid #e0e0e0 !important',
                },
                '&:hover fieldset': {
                  border: '1px solid #e0e0e0 !important',
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid #1976d2 !important',
                },
              },
            }}
          />
          <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', mt: -1, mb: 1 }}>
            Describe the faction's role, goals, or significance in the story
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleAddFactionWithForm}
            disabled={!newFactionName.trim()}
            sx={{
              backgroundColor: 'var(--color-buttonActive)',
              color: 'white',
              border: '1px solid var(--color-border)',
              '&:hover': {
                backgroundColor: 'var(--color-buttonActiveHover)',
                border: '1px solid var(--color-border)',
              },
              '&:disabled': {
                backgroundColor: 'var(--color-disabled)',
                color: 'var(--color-onDisabled)',
                border: '1px solid var(--color-border)',
              },
            }}
          >
            Add Faction
          </Button>
        </Box>
      </Box>

      {/* Divider between columns */}
      <Divider 
        orientation="vertical" 
        flexItem 
        sx={{ 
          backgroundColor: 'var(--color-border)',
        }}
      />

      {/* Right Column - Factions List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Factions ({bookData.factions.length})
        </Typography>
        {bookData.factions.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'var(--color-textSecondary)' }}>
            No factions added yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '400px', overflowY: 'auto' }}>
            {bookData.factions.map((faction) => (
              <Box
                key={faction.id}
                sx={{
                  display: 'flex',
                  justifyContent: editingFactionId === faction.id ? 'flex-start' : 'space-between',
                  alignItems: 'center',
                  p: 1,
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface)',
                  cursor: editingFactionId === faction.id ? 'default' : 'pointer',
                  '&:hover': {
                    backgroundColor: editingFactionId === faction.id ? 'var(--color-surface) !important' : 'var(--color-hover) !important'
                  }
                }}
                onClick={() => {
                  if (editingFactionId !== faction.id) {
                    handleStartEditingFaction(faction);
                  }
                }}
              >
                {editingFactionId === faction.id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        label="Faction Name"
                        value={editingFactionName}
                        onChange={(e) => setEditingFactionName(e.target.value)}
                        sx={{
                          '& .MuiInputLabel-root': {
                            color: 'var(--color-textSecondary)',
                          },
                          '& .MuiInputBase-input': {
                            color: 'var(--color-textSecondary) !important',
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: '1px solid #e0e0e0 !important',
                            },
                            '&:hover fieldset': {
                              border: '1px solid #e0e0e0 !important',
                            },
                            '&.Mui-focused fieldset': {
                              border: '1px solid #1976d2 !important',
                            },
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'relative',
                          width: '65px',
                          height: '55px',
                          borderRadius: '50%',
                          backgroundColor: editingFactionColor,
                          border: '2px solid #ccc',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          margin: 0,
                          boxSizing: 'border-box'
                        }}
                      >
                        <input
                          type="color"
                          value={editingFactionColor}
                          onChange={(e) => setEditingFactionColor(e.target.value)}
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer'
                          }}
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
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: 'var(--color-textSecondary)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'var(--color-textSecondary) !important',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: 'var(--color-textSecondary)',
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: '1px solid #e0e0e0 !important',
                          },
                          '&:hover fieldset': {
                            border: '1px solid #e0e0e0 !important',
                          },
                          '&.Mui-focused fieldset': {
                            border: '1px solid #1976d2 !important',
                          },
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSaveFactionEdit(faction.id)}
                        sx={{
                          backgroundColor: 'var(--color-buttonActive)',
                          color: 'white',
                          border: '1px solid var(--color-border)',
                          '&:hover': {
                            backgroundColor: 'var(--color-buttonActiveHover)',
                            border: '1px solid var(--color-border)',
                          },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        onClick={handleCancelFactionEdit}
                        sx={{
                          backgroundColor: 'var(--color-surface)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border)',
                          '&:hover': {
                            backgroundColor: 'var(--color-hover)',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: faction.color,
                          border: '1px solid #ccc'
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'var(--color-text)' }}>
                        {faction.title}
                      </Typography>
                    </Box>
                    {faction.description && (
                      <Typography variant="caption" sx={{ ml: 2, color: 'var(--color-textSecondary)' }}>
                        {faction.description}
                      </Typography>
                    )}
                  </Box>
                )}
                {editingFactionId !== faction.id && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFaction(faction.id)}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}; 