import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { SchemaBookData, SchemaRelationship, SchemaRelationshipDescription, SchemaHierarchyItem, SchemaChapter } from '../../schema/models';



interface RelationshipsTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

export const RelationshipsTab: React.FC<RelationshipsTabProps> = ({
  bookData,
  setBookData
}) => {

  const [newRelationshipCharacter1, setNewRelationshipCharacter1] = useState('');
  const [newRelationshipCharacter2, setNewRelationshipCharacter2] = useState('');
  const [newRelationshipDescriptions, setNewRelationshipDescriptions] = useState<SchemaRelationshipDescription[]>([]);
  const [newDescriptionChapter, setNewDescriptionChapter] = useState('');
  const [newDescriptionText, setNewDescriptionText] = useState('');
  const [editingRelationshipId, setEditingRelationshipId] = useState<string | null>(null);
  const [editingRelationshipCharacter1, setEditingRelationshipCharacter1] = useState('');
  const [editingRelationshipCharacter2, setEditingRelationshipCharacter2] = useState('');
  const [editingRelationshipDescriptions, setEditingRelationshipDescriptions] = useState<SchemaRelationshipDescription[]>([]);
  const [editingDescriptionChapter, setEditingDescriptionChapter] = useState('');
  const [editingDescriptionText, setEditingDescriptionText] = useState('');

  const buildHierarchyTree = (): Array<{ item: SchemaHierarchyItem; chapter: SchemaChapter; level: number }> => {
    const tree: Array<{ item: SchemaHierarchyItem; chapter: SchemaChapter; level: number }> = [];
    const hierarchy = bookData.hierarchy || [];
    
    hierarchy.forEach((item) => {
      const chapter = bookData.chapters.find(ch => ch.id === item.chapter_id);
      if (chapter) {
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

  const handleAddRelationship = () => {
    if (newRelationshipCharacter1 && newRelationshipCharacter2 && newRelationshipCharacter1 !== newRelationshipCharacter2) {
      const newRelationship: SchemaRelationship = {
        character1: newRelationshipCharacter1,
        character2: newRelationshipCharacter2,
        descriptions: newRelationshipDescriptions
      };

      setBookData(prev => ({
        ...prev,
        relationships: [...prev.relationships, newRelationship]
      }));

      setNewRelationshipCharacter1('');
      setNewRelationshipCharacter2('');
      setNewRelationshipDescriptions([]);
      setNewDescriptionChapter('');
      setNewDescriptionText('');
    }
  };

  const handleDeleteRelationship = (relationshipId: string) => {
    setBookData(prev => ({
      ...prev,
      relationships: prev.relationships.filter(relationship => 
        `${relationship.character1}-${relationship.character2}` !== relationshipId
      )
    }));
  };

  const handleStartEditingRelationship = (relationship: SchemaRelationship) => {
    const relationshipId = `${relationship.character1}-${relationship.character2}`;
    setEditingRelationshipId(relationshipId);
    setEditingRelationshipCharacter1(relationship.character1);
    setEditingRelationshipCharacter2(relationship.character2);
    setEditingRelationshipDescriptions([...relationship.descriptions]);
  };

  const handleSaveRelationshipEdit = () => {
    if (editingRelationshipId && editingRelationshipCharacter1 && editingRelationshipCharacter2) {
      setBookData(prev => ({
        ...prev,
        relationships: prev.relationships.map(relationship => {
          const oldId = `${relationship.character1}-${relationship.character2}`;
          if (oldId === editingRelationshipId) {
            return {
              character1: editingRelationshipCharacter1,
              character2: editingRelationshipCharacter2,
              descriptions: editingRelationshipDescriptions
            };
          }
          return relationship;
        })
      }));
    }
    setEditingRelationshipId(null);
    setEditingRelationshipCharacter1('');
    setEditingRelationshipCharacter2('');
    setEditingRelationshipDescriptions([]);
  };

  const handleCancelRelationshipEdit = () => {
    setEditingRelationshipId(null);
    setEditingRelationshipCharacter1('');
    setEditingRelationshipCharacter2('');
    setEditingRelationshipDescriptions([]);
  };



  const handleAddNewDescription = () => {
    if (newDescriptionChapter && newDescriptionText) {
      const newDescription: SchemaRelationshipDescription = {
        chapter: newDescriptionChapter,
        description: newDescriptionText
      };
      setNewRelationshipDescriptions(prev => [...prev, newDescription]);
      setNewDescriptionChapter('');
      setNewDescriptionText('');
    }
  };

  const handleAddEditingDescription = () => {
    if (editingDescriptionChapter && editingDescriptionText) {
      const newDescription: SchemaRelationshipDescription = {
        chapter: editingDescriptionChapter,
        description: editingDescriptionText
      };
      setEditingRelationshipDescriptions(prev => [...prev, newDescription]);
      setEditingDescriptionChapter('');
      setEditingDescriptionText('');
    }
  };

  const handleRemoveNewDescription = (index: number) => {
    setNewRelationshipDescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveDescription = (index: number) => {
    setEditingRelationshipDescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const getCharacterName = (characterId: string) => {
    const character = bookData.characters.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {/* Left Column - Add Relationship Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Relationship
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            fullWidth
            label="First Character"
            value={newRelationshipCharacter1}
            onChange={(e) => setNewRelationshipCharacter1(e.target.value)}
            sx={{
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
              <em>Select first character</em>
            </MenuItem>
            {bookData.characters.map((character) => (
              <MenuItem key={character.id} value={character.id}>
                {character.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Second Character"
            value={newRelationshipCharacter2}
            onChange={(e) => setNewRelationshipCharacter2(e.target.value)}
            sx={{
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
              <em>Select second character</em>
            </MenuItem>
            {bookData.characters.map((character) => (
              <MenuItem key={character.id} value={character.id}>
                {character.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Relationship Descriptions for New Relationship */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)' }}>
              Relationship Descriptions:
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', fontStyle: 'italic', mb: 1 }}>
              Add descriptions of how the relationship evolves throughout the story. Select a chapter and describe the relationship at that point.
            </Typography>
            
            {/* Add New Description */}
            <TextField
              select
              size="small"
              label="Chapter"
              value={newDescriptionChapter}
              onChange={(e) => setNewDescriptionChapter(e.target.value)}
              fullWidth
              sx={{
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
                <em>Select chapter</em>
              </MenuItem>
              {buildHierarchyTree()
                .filter(({ item }) => item.type === 'chapter')
                .map(({ item, chapter }) => (
                  <MenuItem key={item.chapter_id} value={item.chapter_id}>
                    {chapter.title}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              size="small"
              label="Description"
              value={newDescriptionText}
              onChange={(e) => setNewDescriptionText(e.target.value)}
              placeholder="Describe the relationship at this point"
              fullWidth
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
            <Button
              size="small"
              variant="outlined"
              onClick={handleAddNewDescription}
              disabled={!newDescriptionChapter || !newDescriptionText}
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
              Add Description
            </Button>

            {/* Existing Descriptions */}
            {newRelationshipDescriptions.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {newRelationshipDescriptions.map((description, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                      label={bookData.chapters.find(ch => ch.id === description.chapter)?.title || description.chapter}
                      size="small"
                      variant="outlined"
                      sx={{ minWidth: '120px' }}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {description.description}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveNewDescription(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          
          <Button
            variant="contained"
            onClick={handleAddRelationship}
            disabled={!newRelationshipCharacter1 || !newRelationshipCharacter2 || newRelationshipCharacter1 === newRelationshipCharacter2}
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
            Add Relationship
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

      {/* Right Column - Relationships List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Relationships ({bookData.relationships.length})
        </Typography>
        {bookData.relationships.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '400px', overflowY: 'auto' }}>
            {bookData.relationships.map((relationship) => {
              const relationshipId = `${relationship.character1}-${relationship.character2}`;
              const isEditing = editingRelationshipId === relationshipId;

              return (
                <Box
                  key={relationshipId}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    p: 2,
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-surface)',
                    cursor: isEditing ? 'default' : 'pointer',
                    '&:hover': {
                      backgroundColor: isEditing ? 'var(--color-surface)' : 'var(--color-hover)'
                    }
                  }}
                  onClick={() => {
                    if (!isEditing) {
                      handleStartEditingRelationship(relationship);
                    }
                  }}
                >
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <TextField
                        select
                        size="small"
                        label="First Character"
                        value={editingRelationshipCharacter1}
                        onChange={(e) => setEditingRelationshipCharacter1(e.target.value)}
                        fullWidth
                        sx={{
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
                        {bookData.characters.map((character) => (
                          <MenuItem key={character.id} value={character.id}>
                            {character.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        size="small"
                        label="Second Character"
                        value={editingRelationshipCharacter2}
                        onChange={(e) => setEditingRelationshipCharacter2(e.target.value)}
                        fullWidth
                        sx={{
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
                        {bookData.characters.map((character) => (
                          <MenuItem key={character.id} value={character.id}>
                            {character.name}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Relationship Descriptions */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)' }}>
                          Relationship Descriptions:
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--color-textSecondary)', fontStyle: 'italic', mb: 1 }}>
                          Add descriptions of how the relationship evolves throughout the story. Select a chapter and describe the relationship at that point.
                        </Typography>
                        
                        {/* Add New Description */}
                        <TextField
                          select
                          size="small"
                          label="Chapter"
                          value={editingDescriptionChapter}
                          onChange={(e) => setEditingDescriptionChapter(e.target.value)}
                          fullWidth
                          sx={{
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
                            <em>Select chapter</em>
                          </MenuItem>
                          {buildHierarchyTree()
                            .filter(({ item }) => item.type === 'chapter')
                            .map(({ item, chapter }) => (
                              <MenuItem key={item.chapter_id} value={item.chapter_id}>
                                {chapter.title}
                              </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                          size="small"
                          label="Description"
                          value={editingDescriptionText}
                          onChange={(e) => setEditingDescriptionText(e.target.value)}
                          placeholder="Describe the relationship at this point"
                          fullWidth
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
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleAddEditingDescription}
                          disabled={!editingDescriptionChapter || !editingDescriptionText}
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
                          Add Description
                        </Button>

                        {/* Existing Descriptions */}
                        {editingRelationshipDescriptions.length > 0 && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {editingRelationshipDescriptions.map((description, index) => (
                              <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Chip
                                  label={bookData.chapters.find(ch => ch.id === description.chapter)?.title || description.chapter}
                                  size="small"
                                  variant="outlined"
                                  sx={{ minWidth: '120px' }}
                                />
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                  {description.description}
                                </Typography>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveDescription(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleSaveRelationshipEdit}
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
                          onClick={handleCancelRelationshipEdit}
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
                        {getCharacterName(relationship.character1)} ↔ {getCharacterName(relationship.character2)}
                      </Typography>
                      {relationship.descriptions.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {relationship.descriptions.map((description, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Chip
                                label={bookData.chapters.find(ch => ch.id === description.chapter)?.title || description.chapter}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', height: '20px', minWidth: '100px' }}
                              />
                              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'var(--color-textSecondary)' }}>
                                {description.description}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                      {relationship.descriptions.length === 0 && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'var(--color-textSecondary)' }}>
                          No relationship descriptions added yet.
                        </Typography>
                      )}
                    </Box>
                  )}
                  {editingRelationshipId !== relationshipId && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteRelationship(relationshipId)}
                      sx={{
                        backgroundColor: 'var(--color-error)',
                        color: 'var(--color-onError)',
                        border: '1px solid var(--color-border)',
                        '&:hover': {
                          backgroundColor: 'var(--color-errorHover)',
                        },
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'var(--color-textSecondary)' }}>
            No relationships created yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}; 