import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button
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
  const [editingFactionId, setEditingFactionId] = useState<string | null>(null);
  const [editingFactionName, setEditingFactionName] = useState('');
  const [editingFactionDescription, setEditingFactionDescription] = useState('');
  const [editingFactionColor, setEditingFactionColor] = useState('#3f51b5');
  const [newFactionName, setNewFactionName] = useState('');
  const [newFactionDescription, setNewFactionDescription] = useState('');
  const [newFactionColor, setNewFactionColor] = useState('#3f51b5');

  const generateRandomColor = (): string => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
      '#ff5722', '#795548', '#9e9e9e', '#607d8b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
      setNewFactionColor('#3f51b5');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Add Faction Form */}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
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
            />
            <Box
              sx={{
                position: 'relative',
                width: '60px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: newFactionColor,
                border: '2px solid #ccc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
            <Button
              variant="contained"
              onClick={handleAddFactionWithForm}
              disabled={!newFactionName.trim()}
            >
              Add
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Description (optional)"
            placeholder="Enter faction description"
            value={newFactionDescription}
            onChange={(e) => setNewFactionDescription(e.target.value)}
            multiline
            rows={2}
          />
        </Box>
      </Box>

      {/* Factions List */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Current Factions ({bookData.factions.length})
        </Typography>
        {bookData.factions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No factions added yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {bookData.factions.map((faction) => (
              <Box
                key={faction.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  cursor: editingFactionId === faction.id ? 'default' : 'pointer',
                  '&:hover': {
                    backgroundColor: editingFactionId === faction.id ? '#f9f9f9' : '#f0f0f0'
                  }
                }}
                onClick={() => {
                  if (editingFactionId !== faction.id) {
                    handleStartEditingFaction(faction);
                  }
                }}
              >
                {editingFactionId === faction.id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        label="Name"
                        value={editingFactionName}
                        onChange={(e) => setEditingFactionName(e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <Box
                        sx={{
                          position: 'relative',
                          width: '60px',
                          height: '56px',
                          borderRadius: '50%',
                          backgroundColor: editingFactionColor,
                          border: '2px solid #ccc',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
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
                      size="small"
                      label="Description"
                      value={editingFactionDescription}
                      onChange={(e) => setEditingFactionDescription(e.target.value)}
                      placeholder="Enter faction description"
                      multiline
                      rows={2}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSaveFactionEdit(faction.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        onClick={handleCancelFactionEdit}
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
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {faction.title}
                      </Typography>
                    </Box>
                    {faction.description && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                        {faction.description}
                      </Typography>
                    )}
                  </Box>
                )}
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveFaction(faction.id)}
                  disabled={editingFactionId === faction.id}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>


    </Box>
  );
}; 