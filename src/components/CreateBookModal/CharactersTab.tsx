import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
  Divider
} from '@mui/material';
import type { SchemaBookData, SchemaCharacter, SchemaChapter, SchemaHierarchyItem } from '../../schema/models';



interface CharactersTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

export const CharactersTab: React.FC<CharactersTabProps> = ({
  bookData,
  setBookData
}) => {

  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterDescription, setNewCharacterDescription] = useState('');
  const [newCharacterAliases, setNewCharacterAliases] = useState<string[]>([]);
  const [newAlias, setNewAlias] = useState('');
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);
  const [editingCharacterName, setEditingCharacterName] = useState('');
  const [editingCharacterDescription, setEditingCharacterDescription] = useState('');
  const [editingCharacterAliases, setEditingCharacterAliases] = useState<string[]>([]);
  const [editingAlias, setEditingAlias] = useState('');
  const [newCharacterAttributes, setNewCharacterAttributes] = useState<string[]>([]);
  const [newAttribute, setNewAttribute] = useState('');
  const [editingCharacterAttributes, setEditingCharacterAttributes] = useState<string[]>([]);
  const [editingAttribute, setEditingAttribute] = useState('');
  
  // Faction membership state
  interface FactionMembership {
    factionId: string;
    joinChapterId: string;
  }
  const [newCharacterFactions, setNewCharacterFactions] = useState<FactionMembership[]>([]);
  const [editingCharacterFactions, setEditingCharacterFactions] = useState<FactionMembership[]>([]);

  const handleAddCharacter = () => {
    if (newCharacterName.trim() && newCharacterDescription.trim()) {
      const newCharacter: SchemaCharacter = {
        id: `character-${bookData.characters.length + 1}`,
        name: newCharacterName.trim(),
        description: newCharacterDescription.trim(),
        aliases: newCharacterAliases,
        factions: newCharacterFactions.map(fm => fm.factionId),
        faction_join_chapters: newCharacterFactions.reduce((acc, fm) => {
          acc[fm.factionId] = fm.joinChapterId;
          return acc;
        }, {} as Record<string, string>),
        attributes: newCharacterAttributes
      };

      setBookData(prev => ({
        ...prev,
        characters: [...prev.characters, newCharacter]
      }));

      setNewCharacterName('');
      setNewCharacterDescription('');
      setNewCharacterAliases([]);
      setNewCharacterAttributes([]);
      setNewCharacterFactions([]);
    }
  };

  const handleDeleteCharacter = (characterId: string) => {
    setBookData(prev => ({
      ...prev,
      characters: prev.characters.filter(character => character.id !== characterId)
    }));
  };

  const handleStartEditingCharacter = (character: SchemaCharacter) => {
    setEditingCharacterId(character.id);
    setEditingCharacterName(character.name);
    setEditingCharacterDescription(character.description);
    setEditingCharacterAliases(character.aliases || []);
    setEditingCharacterAttributes(character.attributes || []);
    
    // Convert faction data to FactionMembership format
    const factionMemberships: FactionMembership[] = (character.factions || []).map(factionId => ({
      factionId,
      joinChapterId: (character.faction_join_chapters || {})[factionId] || ''
    }));
    setEditingCharacterFactions(factionMemberships);
  };

  const handleSaveCharacterEdit = (characterId: string) => {
    if (editingCharacterName.trim()) {
      setBookData(prev => ({
        ...prev,
        characters: prev.characters.map(character => 
          character.id === characterId 
            ? { 
                ...character, 
                name: editingCharacterName.trim(),
                description: editingCharacterDescription,
                aliases: editingCharacterAliases,
        
                attributes: editingCharacterAttributes,
                factions: editingCharacterFactions.map(fm => fm.factionId),
                faction_join_chapters: editingCharacterFactions.reduce((acc, fm) => {
                  acc[fm.factionId] = fm.joinChapterId;
                  return acc;
                }, {} as Record<string, string>)
              }
            : character
        )
      }));
    }
    setEditingCharacterId(null);
    setEditingCharacterName('');
    setEditingCharacterDescription('');
    setEditingCharacterAliases([]);
    setEditingAlias('');
    setEditingCharacterFirstAppearance('');
    setEditingCharacterAttributes([]);
    setEditingAttribute('');
    setEditingCharacterFactions([]);
  };

  const handleCancelCharacterEdit = () => {
    setEditingCharacterId(null);
    setEditingCharacterName('');
    setEditingCharacterDescription('');
    setEditingCharacterAliases([]);
    setEditingAlias('');
    setEditingCharacterFirstAppearance('');
    setEditingCharacterAttributes([]);
    setEditingAttribute('');
    setEditingCharacterFactions([]);
  };

  const handleAddAlias = () => {
    if (editingAlias.trim() && !editingCharacterAliases.includes(editingAlias.trim())) {
      setEditingCharacterAliases(prev => [...prev, editingAlias.trim()]);
      setEditingAlias('');
    }
  };

  const handleRemoveAlias = (aliasToRemove: string) => {
    setEditingCharacterAliases(prev => prev.filter(alias => alias !== aliasToRemove));
  };

  const handleAddNewCharacterAlias = () => {
    if (newAlias.trim() && !newCharacterAliases.includes(newAlias.trim())) {
      setNewCharacterAliases(prev => [...prev, newAlias.trim()]);
      setNewAlias('');
    }
  };

  const handleRemoveNewCharacterAlias = (aliasToRemove: string) => {
    setNewCharacterAliases(prev => prev.filter(alias => alias !== aliasToRemove));
  };

  const handleAddAttribute = () => {
    if (editingAttribute.trim() && !editingCharacterAttributes.includes(editingAttribute.trim())) {
      setEditingCharacterAttributes(prev => [...prev, editingAttribute.trim()]);
      setEditingAttribute('');
    }
  };

  const handleRemoveAttribute = (attributeToRemove: string) => {
    setEditingCharacterAttributes(prev => prev.filter(attribute => attribute !== attributeToRemove));
  };

  const handleAddNewCharacterAttribute = () => {
    if (newAttribute.trim() && !newCharacterAttributes.includes(newAttribute.trim())) {
      setNewCharacterAttributes(prev => [...prev, newAttribute.trim()]);
      setNewAttribute('');
    }
  };

  const handleRemoveNewCharacterAttribute = (attributeToRemove: string) => {
    setNewCharacterAttributes(prev => prev.filter(attribute => attribute !== attributeToRemove));
  };

  // Faction management handlers
  const handleAddFactionMembership = (isEditing: boolean = false) => {
    const newMembership: FactionMembership = { factionId: '', joinChapterId: '' };
    if (isEditing) {
      setEditingCharacterFactions(prev => [...prev, newMembership]);
    } else {
      setNewCharacterFactions(prev => [...prev, newMembership]);
    }
  };

  const handleRemoveFactionMembership = (index: number, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingCharacterFactions(prev => prev.filter((_, i) => i !== index));
    } else {
      setNewCharacterFactions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdateFactionMembership = (index: number, field: 'factionId' | 'joinChapterId', value: string, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingCharacterFactions(prev => prev.map((membership, i) => 
        i === index ? { ...membership, [field]: value } : membership
      ));
    } else {
      setNewCharacterFactions(prev => prev.map((membership, i) => 
        i === index ? { ...membership, [field]: value } : membership
      ));
    }
  };

  const buildHierarchyTree = (): Array<{ item: SchemaHierarchyItem; chapter: SchemaChapter; level: number }> => {
    const tree: Array<{ item: SchemaHierarchyItem; chapter: SchemaChapter; level: number }> = [];
    const hierarchy = bookData.hierarchy || [];
    
    hierarchy.forEach((item) => {
      const chapter = bookData.chapters.find(ch => ch.id === item.chapter_id);
      if (chapter) {
        // Calculate level based on type
        let level = 0;
        switch (item.type) {
          case 'volume':
            level = 0;
            break;
          case 'book':
            level = 1;
            break;
          case 'part':
            level = 2;
            break;
          case 'chapter':
            level = 3;
            break;
        }
        tree.push({ item, chapter, level });
      }
    });
    
    return tree;
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {/* Left Column - Add Character Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Character
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Character Name"
            placeholder="Enter character name"
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCharacter();
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
          
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Character Description"
            placeholder="Enter character description"
            value={newCharacterDescription}
            onChange={(e) => setNewCharacterDescription(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleAddCharacter();
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
          
          {/* First Appearance Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              select
              size="small"
              label="First Appearance Chapter"
              value={newCharacterFirstAppearance}
              onChange={(e) => setNewCharacterFirstAppearance(e.target.value)}
              sx={{ 
                flex: 1,
                '& .MuiInputLabel-root': {
                  color: 'var(--color-textSecondary)',
                },
                '& .MuiInputBase-input': {
                  color: 'var(--color-textSecondary) !important',
                },
                '& .MuiSelect-select': {
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
            >
              <MenuItem value="">
                <em>Select a chapter</em>
              </MenuItem>
              {buildHierarchyTree()
                .filter(({ item }) => item.type === 'chapter')
                .map(({ item, chapter }) => (
                  <MenuItem key={item.chapter_id} value={item.chapter_id}>
                    {chapter.title}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
          
          {/* Aliases Section for New Character */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                label="Add Alias"
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                placeholder="Enter alias"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddNewCharacterAlias();
                  }
                }}
                sx={{ 
                  flex: 1,
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
              <Button
                size="small"
                variant="outlined"
                onClick={handleAddNewCharacterAlias}
                disabled={!newAlias.trim()}
                sx={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  '&:hover': {
                    backgroundColor: 'var(--color-hover)',
                  },
                  '&:disabled': {
                    backgroundColor: 'var(--color-disabled)',
                    color: 'var(--color-onDisabled)',
                    border: '1px solid var(--color-border)',
                  },
                }}
              >
                Add
              </Button>
            </Box>
            {newCharacterAliases.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {newCharacterAliases.map((alias) => (
                          <Chip
                            key={alias}
                            label={alias}
                            size="small"
                            onDelete={() => handleRemoveNewCharacterAlias(alias)}
                            variant="outlined"
                            sx={{
                              backgroundColor: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              border: '1px solid var(--color-border)',
                              '& .MuiChip-deleteIcon': {
                                color: 'var(--color-text)',
                              },
                              '&:hover': {
                                backgroundColor: 'var(--color-hover)',
                              },
                            }}
                          />
                        ))}
              </Box>
            )}
          </Box>
          
          {/* Attributes Section for New Character */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                label="Add Attribute"
                value={newAttribute}
                onChange={(e) => setNewAttribute(e.target.value)}
                placeholder="Enter attribute (e.g., Brave, Intelligent, Mysterious)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddNewCharacterAttribute();
                  }
                }}
                sx={{ 
                  flex: 1,
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
              <Button
                size="small"
                variant="outlined"
                onClick={handleAddNewCharacterAttribute}
                disabled={!newAttribute.trim()}
                sx={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  '&:hover': {
                    backgroundColor: 'var(--color-hover)',
                  },
                  '&:disabled': {
                    backgroundColor: 'var(--color-disabled)',
                    color: 'var(--color-onDisabled)',
                    border: '1px solid var(--color-border)',
                  },
                }}
              >
                Add
              </Button>
            </Box>
            {newCharacterAttributes.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {newCharacterAttributes.map((attribute) => (
                  <Chip
                    key={attribute}
                    label={attribute}
                    size="small"
                    onDelete={() => handleRemoveNewCharacterAttribute(attribute)}
                    variant="outlined"
                    color="secondary"
                    sx={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                      '& .MuiChip-deleteIcon': {
                        color: 'var(--color-text)',
                      },
                      '&:hover': {
                        backgroundColor: 'var(--color-hover)',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
          
          {/* Factions Section for New Character */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {newCharacterFactions.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {newCharacterFactions.map((membership, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      select
                      size="small"
                      label="Faction"
                      value={membership.factionId}
                      onChange={(e) => handleUpdateFactionMembership(index, 'factionId', e.target.value, false)}
                      sx={{ 
                        flex: 1,
                        '& .MuiInputLabel-root': {
                          color: 'var(--color-textSecondary)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'var(--color-textSecondary) !important',
                        },
                        '& .MuiSelect-select': {
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
                    >
                      <MenuItem value="">
                        <em>Select a faction</em>
                      </MenuItem>
                      {bookData.factions.map((faction) => (
                        <MenuItem key={faction.id} value={faction.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, backgroundColor: faction.color, borderRadius: '50%' }} />
                            {faction.title}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      size="small"
                      label="Join Chapter"
                      value={membership.joinChapterId}
                      onChange={(e) => handleUpdateFactionMembership(index, 'joinChapterId', e.target.value, false)}
                      sx={{ 
                        flex: 1,
                        '& .MuiInputLabel-root': {
                          color: 'var(--color-textSecondary)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'var(--color-textSecondary) !important',
                        },
                        '& .MuiSelect-select': {
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
                    >
                      <MenuItem value="">
                        <em>Select a chapter</em>
                      </MenuItem>
                      {buildHierarchyTree()
                        .filter(({ item }) => item.type === 'chapter')
                        .map(({ item, chapter }) => (
                          <MenuItem key={item.chapter_id} value={item.chapter_id}>
                            {chapter.title}
                          </MenuItem>
                        ))}
                    </TextField>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFactionMembership(index, false)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleAddFactionMembership(false)}
              disabled={bookData.factions.length === 0}
              sx={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                '&:hover': {
                  backgroundColor: 'var(--color-hover)',
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
          
          <Button
            variant="contained"
            onClick={handleAddCharacter}
            disabled={!newCharacterName.trim() || !newCharacterDescription.trim()}
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
            Add Character
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

      {/* Right Column - Characters List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Characters ({bookData.characters.length})
        </Typography>
        {bookData.characters.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '400px', overflowY: 'auto' }}>
            {bookData.characters.map((character) => (
              <Box
                key={character.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  p: 1,
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface)',
                  cursor: editingCharacterId === character.id ? 'default' : 'pointer',
                  '&:hover': {
                    backgroundColor: editingCharacterId === character.id ? 'var(--color-surface)' : 'var(--color-hover)'
                  }
                }}
                onClick={() => {
                  if (editingCharacterId !== character.id) {
                    handleStartEditingCharacter(character);
                  }
                }}
              >
                {editingCharacterId === character.id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                    <TextField
                      size="small"
                      label="Name"
                      value={editingCharacterName}
                      onChange={(e) => setEditingCharacterName(e.target.value)}
                      sx={{ 
                        flex: 1,
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
                    <TextField
                      size="small"
                      label="Description"
                      value={editingCharacterDescription}
                      onChange={(e) => setEditingCharacterDescription(e.target.value)}
                      placeholder="Enter character description"
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
                    
                    {/* First Appearance Section for Editing */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <TextField
                        select
                        size="small"
                        label="First Appearance Chapter"
                        value={editingCharacterFirstAppearance}
                        onChange={(e) => setEditingCharacterFirstAppearance(e.target.value)}
                        sx={{ 
                          flex: 1,
                          '& .MuiInputLabel-root': {
                            color: 'var(--color-textSecondary)',
                          },
                          '& .MuiInputBase-input': {
                            color: 'var(--color-textSecondary) !important',
                          },
                          '& .MuiSelect-select': {
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
                      >
                        <MenuItem value="">
                          <em>Select a chapter</em>
                        </MenuItem>
                        {buildHierarchyTree()
                          .filter(({ item }) => item.type === 'chapter')
                          .map(({ item, chapter }) => (
                            <MenuItem key={item.chapter_id} value={item.chapter_id}>
                              {chapter.title}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Box>
                    
                    {/* Aliases Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                          size="small"
                          label="Add Alias"
                          value={editingAlias}
                          onChange={(e) => setEditingAlias(e.target.value)}
                          placeholder="Enter alias"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddAlias();
                            }
                          }}
                          sx={{ 
                            flex: 1,
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
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleAddAlias}
                          disabled={!editingAlias.trim()}
                        >
                          Add
                        </Button>
                      </Box>
                      {editingCharacterAliases.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {editingCharacterAliases.map((alias) => (
                            <Chip
                              key={alias}
                              label={alias}
                              size="small"
                              onDelete={() => handleRemoveAlias(alias)}
                              variant="outlined"
                              sx={{
                                backgroundColor: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                '& .MuiChip-deleteIcon': {
                                  color: 'var(--color-text)',
                                },
                                '&:hover': {
                                  backgroundColor: 'var(--color-hover)',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    {/* Attributes Section for Editing */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                          size="small"
                          label="Add Attribute"
                          value={editingAttribute}
                          onChange={(e) => setEditingAttribute(e.target.value)}
                          placeholder="Enter attribute (e.g., Brave, Intelligent, Mysterious)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddAttribute();
                            }
                          }}
                          sx={{ 
                            flex: 1,
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
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleAddAttribute}
                          disabled={!editingAttribute.trim()}
                        >
                          Add
                        </Button>
                      </Box>
                      {editingCharacterAttributes.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {editingCharacterAttributes.map((attribute) => (
                            <Chip
                              key={attribute}
                              label={attribute}
                              size="small"
                              onDelete={() => handleRemoveAttribute(attribute)}
                              variant="outlined"
                              color="secondary"
                              sx={{
                                backgroundColor: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                '& .MuiChip-deleteIcon': {
                                  color: 'var(--color-text)',
                                },
                                '&:hover': {
                                  backgroundColor: 'var(--color-hover)',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    {/* Factions Section for Editing */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {editingCharacterFactions.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {editingCharacterFactions.map((membership, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <TextField
                                select
                                size="small"
                                label="Faction"
                                value={membership.factionId}
                                onChange={(e) => handleUpdateFactionMembership(index, 'factionId', e.target.value, true)}
                                sx={{ 
                                  flex: 1,
                                  '& .MuiInputLabel-root': {
                                    color: 'var(--color-textSecondary)',
                                  },
                                  '& .MuiInputBase-input': {
                                    color: 'var(--color-textSecondary) !important',
                                  },
                                  '& .MuiSelect-select': {
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
                              >
                                <MenuItem value="">
                                  <em>Select a faction</em>
                                </MenuItem>
                                {bookData.factions.map((faction) => (
                                  <MenuItem key={faction.id} value={faction.id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Box sx={{ width: 12, height: 12, backgroundColor: faction.color, borderRadius: '50%' }} />
                                      {faction.title}
                                    </Box>
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                select
                                size="small"
                                label="Join Chapter"
                                value={membership.joinChapterId}
                                onChange={(e) => handleUpdateFactionMembership(index, 'joinChapterId', e.target.value, true)}
                                sx={{ 
                                  flex: 1,
                                  '& .MuiInputLabel-root': {
                                    color: 'var(--color-textSecondary)',
                                  },
                                  '& .MuiInputBase-input': {
                                    color: 'var(--color-textSecondary) !important',
                                  },
                                  '& .MuiSelect-select': {
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
                              >
                                <MenuItem value="">
                                  <em>Select a chapter</em>
                                </MenuItem>
                                {buildHierarchyTree()
                                  .filter(({ item }) => item.type === 'chapter')
                                  .map(({ item, chapter }) => (
                                    <MenuItem key={item.chapter_id} value={item.chapter_id}>
                                      {chapter.title}
                                    </MenuItem>
                                  ))}
                              </TextField>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemoveFactionMembership(index, true)}
                              >
                                Remove
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAddFactionMembership(true)}
                        disabled={bookData.factions.length === 0}
                      >
                        Add Faction
                      </Button>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSaveCharacterEdit(character.id)}
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
                        onClick={handleCancelCharacterEdit}
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
                        {character.name}
                      </Typography>
                    {character.description && (
                      <Typography variant="caption" sx={{ ml: 1, color: 'var(--color-textSecondary)' }}>
                        {character.description}
                      </Typography>
                    )}
                    {character.aliases && character.aliases.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                        {character.aliases.map((alias) => (
                          <Chip
                            key={alias}
                            label={alias}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.7rem', 
                              height: '20px',
                              backgroundColor: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              border: '1px solid var(--color-border)',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    {character.attributes && character.attributes.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                        {character.attributes.map((attribute) => (
                          <Chip
                            key={attribute}
                            label={attribute}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            sx={{ 
                              fontSize: '0.7rem', 
                              height: '20px',
                              backgroundColor: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              border: '1px solid var(--color-border)',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    {character.factions && character.factions.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                        {character.factions.map((factionId) => {
                          const faction = bookData.factions.find(f => f.id === factionId);
                          const joinChapter = bookData.chapters.find(ch => ch.id === character.faction_join_chapters[factionId]);
                          return (
                            <Chip
                              key={factionId}
                              label={`${faction?.title || factionId}${joinChapter ? ` (${joinChapter.title})` : ''}`}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.7rem', 
                                height: '20px',
                                backgroundColor: faction?.color || 'grey.300',
                                color: faction?.color ? 'white' : 'text.primary',
                                borderColor: faction?.color || 'grey.400'
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}

                  </Box>
                )}
                {editingCharacterId !== character.id && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteCharacter(character.id)}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'var(--color-textSecondary)' }}>
            No characters created yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}; 