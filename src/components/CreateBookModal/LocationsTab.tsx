import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';

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
          />
          <TextField
            fullWidth
            label="Description (optional)"
            placeholder="Enter location description"
            value={newLocationDescription}
            onChange={(e) => setNewLocationDescription(e.target.value)}
            multiline
            rows={2}
          />
          
          <Button
            variant="contained"
            onClick={handleAddLocationWithForm}
            disabled={!newLocationName.trim()}
          >
            Add
          </Button>
        </Box>
      </Box>

      {/* Divider between columns */}
      <Divider orientation="vertical" flexItem />

      {/* Right Column - Locations List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Locations ({bookData.locations.length})
        </Typography>
        {bookData.locations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No locations added yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '400px', overflowY: 'auto' }}>
            {bookData.locations.map((location) => (
              <Box
                key={location.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  cursor: editingLocationId === location.id ? 'default' : 'pointer',
                  '&:hover': {
                    backgroundColor: editingLocationId === location.id ? '#f9f9f9' : '#f0f0f0'
                  }
                }}
                onClick={() => {
                  if (editingLocationId !== location.id) {
                    handleStartEditingLocation(location);
                  }
                }}
              >
                {editingLocationId === location.id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        label="Name"
                        value={editingLocationName}
                        onChange={(e) => setEditingLocationName(e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                    <TextField
                      size="small"
                      label="Description"
                      value={editingLocationDescription}
                      onChange={(e) => setEditingLocationDescription(e.target.value)}
                      placeholder="Enter location description"
                      multiline
                      rows={2}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSaveLocationEdit(location.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        onClick={handleCancelLocationEdit}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {location.name}
                    </Typography>
                    {location.description && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {location.description}
                      </Typography>
                    )}
                  </Box>
                )}
                {editingLocationId !== location.id && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveLocation(location.id)}
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