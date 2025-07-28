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


interface LocationsTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

export const LocationsTab: React.FC<LocationsTabProps> = ({
  bookData,
  setBookData
}) => {

  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingLocationName, setEditingLocationName] = useState('');
  const [editingLocationDescription, setEditingLocationDescription] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationDescription, setNewLocationDescription] = useState('');
  const [locationFilterText, setLocationFilterText] = useState('');

  const handleAddLocation = (locationName: string, description: string = '') => {
    const newLocation = {
      id: locationName.trim().toLowerCase().replace(/\s+/g, '-'),
      name: locationName.trim(),
      description: description.trim()
    };
    setBookData(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  const handleRemoveLocation = (locationId: string) => {
    setBookData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== locationId)
    }));
  };

  const handleStartEditingLocation = (location: { id: string; name: string; description?: string }) => {
    setEditingLocationId(location.id);
    setEditingLocationName(location.name);
    setEditingLocationDescription(location.description || '');
  };

  const handleSaveLocationEdit = (locationId: string) => {
    if (editingLocationName.trim()) {
      setBookData(prev => ({
        ...prev,
        locations: prev.locations.map(loc => 
          loc.id === locationId 
            ? { ...loc, name: editingLocationName.trim(), description: editingLocationDescription }
            : loc
        )
      }));
    }
    setEditingLocationId(null);
    setEditingLocationName('');
    setEditingLocationDescription('');
  };

  const handleCancelLocationEdit = () => {
    setEditingLocationId(null);
    setEditingLocationName('');
    setEditingLocationDescription('');
  };

  const handleAddLocationWithForm = () => {
    if (newLocationName.trim()) {
      handleAddLocation(newLocationName, newLocationDescription);
      setNewLocationName('');
      setNewLocationDescription('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {/* Left Column - Add Location Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Location
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Location Name"
            placeholder="Enter location name"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddLocationWithForm();
              }
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--color-textSecondary)',
              },
              '& .MuiInputBase-input': {
                color: 'var(--color-text)',
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
            Enter the name of a location in your story (e.g., "The Shire", "Mordor", "Rivendell")
          </Typography>
          <TextField
            fullWidth
            label="Description (optional)"
            placeholder="Enter location description"
            value={newLocationDescription}
            onChange={(e) => setNewLocationDescription(e.target.value)}
            multiline
            rows={2}
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--color-textSecondary)',
              },
              '& .MuiInputBase-input': {
                color: 'var(--color-text)',
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
            Describe the location's significance, appearance, or role in the story
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleAddLocationWithForm}
            disabled={!newLocationName.trim()}
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
            Add Location
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

      {/* Right Column - Locations List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            Current Locations ({bookData.locations.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Filter locations..."
            value={locationFilterText}
            onChange={(e) => setLocationFilterText(e.target.value)}
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
        {bookData.locations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No locations added yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '800px', overflowY: 'auto' }}>
            {fuzzySearch(
              bookData.locations,
              bookData.locations,
              locationFilterText,
              true,
              { 
                keys: ['name', 'description'],
                threshold: 0.6
              }
            )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((location) => (
              <Box
                key={location.id}
                sx={{
                  display: 'flex',
                  justifyContent: editingLocationId === location.id ? 'flex-start' : 'space-between',
                  alignItems: 'center',
                  p: 1,
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface)',
                  cursor: editingLocationId === location.id ? 'default' : 'pointer',
                  '&:hover': {
                    backgroundColor: editingLocationId === location.id ? 'var(--color-surface) !important' : 'var(--color-hover) !important'
                  }
                }}
                onClick={() => {
                  if (editingLocationId !== location.id) {
                    handleStartEditingLocation(location);
                  }
                }}
              >
                {editingLocationId === location.id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        label="Location Name"
                        value={editingLocationName}
                        onChange={(e) => setEditingLocationName(e.target.value)}
                        sx={{
                          '& .MuiInputLabel-root': {
                            color: 'var(--color-textSecondary)',
                          },
                          '& .MuiInputBase-input': {
                            color: 'var(--color-text)',
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
                    </Box>
                    <TextField
                      fullWidth
                      label="Description (optional)"
                      value={editingLocationDescription}
                      onChange={(e) => setEditingLocationDescription(e.target.value)}
                      placeholder="Enter location description"
                      multiline
                      rows={2}
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: 'var(--color-textSecondary)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'var(--color-text)',
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
                        onClick={() => handleSaveLocationEdit(location.id)}
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
                        onClick={handleCancelLocationEdit}
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
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'var(--color-text)' }}>
                      {location.name}
                    </Typography>
                    {location.description && (
                      <Typography variant="caption" sx={{ ml: 1, color: 'var(--color-textSecondary)' }}>
                        {location.description}
                      </Typography>
                    )}
                  </Box>
                )}
                {editingLocationId !== location.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveLocation(location.id)}
                    title="Delete Location"
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