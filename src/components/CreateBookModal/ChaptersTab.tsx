import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Chip, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { LocationSelectorModal } from './LocationSelectorModal';
import { CharacterSelectorModal } from './CharacterSelectorModal';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';
import type { SchemaChapter } from '../../schema/models/SchemaChapter';
import type { SchemaHierarchyItem, SchemaHierarchyType } from '../../schema/models/SchemaHierarchy';


interface ChaptersTabProps {
  bookData: SchemaBookData;
  setBookData: React.Dispatch<React.SetStateAction<SchemaBookData>>;
}

export const ChaptersTab: React.FC<ChaptersTabProps> = ({
  bookData,
  setBookData
}) => {

  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [selectedHierarchyType, setSelectedHierarchyType] = useState<SchemaHierarchyType>('chapter');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingType, setEditingType] = useState<SchemaHierarchyType>('chapter');
  const [editingLocations, setEditingLocations] = useState<string[]>([]);
  const [editingCharacters, setEditingCharacters] = useState<string[]>([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationModalTitle, setLocationModalTitle] = useState('');
  const [newChapterLocations, setNewChapterLocations] = useState<string[]>([]);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [characterModalTitle, setCharacterModalTitle] = useState('');
  const [newChapterCharacters, setNewChapterCharacters] = useState<string[]>([]);

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter: SchemaChapter = {
        id: `chapter-${bookData.chapters.length + 1}`,
        title: newChapterTitle.trim(),
        locations: newChapterLocations,
        characters: newChapterCharacters
      };

      const newHierarchyItem: SchemaHierarchyItem = {
        chapter_id: newChapter.id,
        type: selectedHierarchyType
      };

      setBookData(prev => ({
        ...prev,
        chapters: [...prev.chapters, newChapter],
        hierarchy: [...(prev.hierarchy || []), newHierarchyItem]
      }));

      setNewChapterTitle('');
      setNewChapterLocations([]);
      setNewChapterCharacters([]);
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





  const handleRemoveFromHierarchy = (chapterId: string) => {
    setBookData(prev => ({
      ...prev,
      hierarchy: prev.hierarchy?.filter(item => item.chapter_id !== chapterId) || []
    }));
  };

  const handleDragStart = (e: React.DragEvent, chapterId: string) => {
    setDraggedItem(chapterId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, chapterId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== chapterId) {
      setDragOverItem(chapterId);
    }
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetChapterId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetChapterId) {
      const hierarchy = bookData.hierarchy || [];
      const draggedIndex = hierarchy.findIndex(item => item.chapter_id === draggedItem);
      const targetIndex = hierarchy.findIndex(item => item.chapter_id === targetChapterId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newHierarchy = [...hierarchy];
        const [draggedItem] = newHierarchy.splice(draggedIndex, 1);
        newHierarchy.splice(targetIndex, 0, draggedItem);
        
        setBookData(prev => ({
          ...prev,
          hierarchy: newHierarchy
        }));
      }
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleStartEditing = (chapterId: string, currentTitle: string, currentType: SchemaHierarchyType) => {
    const chapter = bookData.chapters.find(ch => ch.id === chapterId);
    setEditingChapterId(chapterId);
    setEditingTitle(currentTitle);
    setEditingType(currentType);
    setEditingLocations(chapter?.locations || []);
    setEditingCharacters(chapter?.characters || []);
  };

  const handleSaveEdit = () => {
    if (editingChapterId && editingTitle.trim()) {
      setBookData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter => 
          chapter.id === editingChapterId 
            ? { ...chapter, title: editingTitle.trim(), locations: editingType === 'chapter' ? editingLocations : [], characters: editingType === 'chapter' ? editingCharacters : [] }
            : chapter
        ),
        hierarchy: prev.hierarchy?.map(item => 
          item.chapter_id === editingChapterId 
            ? { ...item, type: editingType }
            : item
        ) || []
      }));
    }
    setEditingChapterId(null);
    setEditingTitle('');
    setEditingType('chapter');
    setEditingLocations([]);
    setEditingCharacters([]);
  };

  const handleCancelEdit = () => {
    setEditingChapterId(null);
    setEditingTitle('');
    setEditingType('chapter');
    setEditingLocations([]);
    setEditingCharacters([]);
  };



  const handleOpenLocationModal = (title: string, isForNewChapter: boolean = false) => {
    setLocationModalTitle(title);
    setIsLocationModalOpen(true);
    // Set the initial locations based on whether we're creating or editing
    if (isForNewChapter) {
      setEditingLocations(newChapterLocations);
    }
  };

  const handleLocationModalSave = (selectedLocationIds: string[]) => {
    // Check if we're editing an existing chapter or creating a new one
    if (editingChapterId) {
      setEditingLocations(selectedLocationIds);
    } else {
      setNewChapterLocations(selectedLocationIds);
    }
  };

  const handleOpenCharacterModal = (title: string) => {
    setCharacterModalTitle(title);
    setIsCharacterModalOpen(true);
  };

  const handleCharacterModalSave = (selectedCharacterIds: string[]) => {
    // Check if we're editing an existing chapter or creating a new one
    if (editingChapterId) {
      setEditingCharacters(selectedCharacterIds);
    } else {
      setNewChapterCharacters(selectedCharacterIds);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      {/* Left Column - Add Chapter Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add New Chapter
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Chapter Title */}
          <TextField
            fullWidth
            label="Chapter Title"
            placeholder="Enter chapter title"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddChapter();
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
          
          {/* Type Select */}
          <FormControl 
            fullWidth
            sx={{
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
            <InputLabel sx={{ color: 'var(--color-textSecondary)' }}>Type</InputLabel>
            <Select
              value={selectedHierarchyType}
              label="Type"
              onChange={(e) => setSelectedHierarchyType(e.target.value as SchemaHierarchyType)}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'var(--color-textSecondary) !important',
                },
                '& .MuiSelect-select': {
                  color: 'var(--color-textSecondary) !important',
                },
              }}
            >
              <MenuItem value="volume">Volume</MenuItem>
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="part">Part</MenuItem>
              <MenuItem value="chapter">Chapter</MenuItem>
            </Select>
          </FormControl>
          
          {/* Locations Row - Always show, but read-only for non-chapters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 80 }}>
              Locations:
            </Typography>
            {selectedHierarchyType === 'chapter' ? (
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpenLocationModal(`Select Locations for New Chapter`, true)}
              >
                {newChapterLocations.length} selected
              </Button>
            ) : (
              <Button
                size="small"
                variant="outlined"
                disabled
                title={`Locations are only available for chapters. ${selectedHierarchyType.charAt(0).toUpperCase() + selectedHierarchyType.slice(1)}s are organizational structures.`}
                sx={{ 
                  cursor: 'help',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                Not available
              </Button>
            )}
          </Box>
          
          {/* Characters Row - Always show, but read-only for non-chapters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 80 }}>
              Characters:
            </Typography>
            {selectedHierarchyType === 'chapter' ? (
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpenCharacterModal(`Select Characters for New Chapter`)}
              >
                {newChapterCharacters.length} selected
              </Button>
            ) : (
              <Button
                size="small"
                variant="outlined"
                disabled
                title={`Characters are only available for chapters. ${selectedHierarchyType.charAt(0).toUpperCase() + selectedHierarchyType.slice(1)}s are organizational structures.`}
                sx={{ 
                  cursor: 'help',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                Not available
              </Button>
            )}
          </Box>
          
          {/* Add Button */}
          <Button
            variant="contained"
            onClick={handleAddChapter}
            disabled={!newChapterTitle.trim()}
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
            Add
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

      {/* Right Column - Book Structure Tree */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Book Structure Tree (drag to reorder):
        </Typography>

        {/* Tree View */}
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 1 }}>
            {buildHierarchyTree().map(({ item, chapter, level }) => (
              <Box
                key={item.chapter_id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.chapter_id)}
                onDragOver={(e) => handleDragOver(e, item.chapter_id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.chapter_id)}
                onClick={() => handleStartEditing(item.chapter_id, chapter.title, item.type)}
                sx={{
                  display: 'flex',
                  justifyContent: editingChapterId === item.chapter_id ? 'flex-start' : 'space-between',
                  alignItems: 'flex-start',
                  py: 0.5,
                  pl: editingChapterId === item.chapter_id ? 0 : level * 2,
                  cursor: editingChapterId === item.chapter_id ? 'default' : 'grab',
                  backgroundColor: dragOverItem === item.chapter_id ? '#e3f2fd' : 'var(--color-surface)',
                  border: dragOverItem === item.chapter_id ? '2px dashed #1976d2' : '1px solid var(--color-border)',
                  borderRadius: 1,
                  '&:hover': { 
                    backgroundColor: dragOverItem === item.chapter_id ? '#e3f2fd' : 
                      editingChapterId === item.chapter_id ? 'transparent' : 'var(--color-hover) !important'
                  },
                  '&:active': { cursor: 'grabbing' }
                }}
              >
                {editingChapterId !== item.chapter_id && (
                  <DragIndicatorIcon 
                    sx={{ 
                      mr: 1, 
                      color: 'var(--color-textSecondary)',
                      fontSize: '16px'
                    }} 
                  />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {editingChapterId === item.chapter_id ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                      {/* Title Input */}
                      <TextField
                        fullWidth
                        label="Chapter Title"
                        placeholder="Enter chapter title"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
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
                      
                      {/* Type Select */}
                      <FormControl 
                        fullWidth
                        sx={{ 
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
                        <InputLabel sx={{ color: 'var(--color-textSecondary)' }}>Type</InputLabel>
                        <Select
                          value={editingType}
                          label="Type"
                          onChange={(e) => setEditingType(e.target.value as SchemaHierarchyType)}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiInputBase-input': {
                              color: 'var(--color-textSecondary) !important',
                            },
                            '& .MuiSelect-select': {
                              color: level === 0 ? 'var(--color-primary)' : 'var(--color-textSecondary) !important',
                            },
                          }}
                        >
                          <MenuItem value="volume">Volume</MenuItem>
                          <MenuItem value="book">Book</MenuItem>
                          <MenuItem value="part">Part</MenuItem>
                          <MenuItem value="chapter">Chapter</MenuItem>
                        </Select>
                      </FormControl>
                      
                      {/* Locations Button */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 80 }}>
                          Locations:
                        </Typography>
                        {editingType === 'chapter' ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenLocationModal(`Select Locations for "${editingTitle}"`, false);
                            }}
                          >
                            {editingLocations.length} selected
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            disabled
                            title={`Locations are only available for chapters. ${editingType.charAt(0).toUpperCase() + editingType.slice(1)}s are organizational structures.`}
                            sx={{ 
                              cursor: 'help',
                              '&:hover': {
                                backgroundColor: 'action.hover'
                              }
                            }}
                          >
                            Not available
                          </Button>
                        )}
                      </Box>
                      
                      {/* Characters Button */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 80 }}>
                          Characters:
                        </Typography>
                        {editingType === 'chapter' ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCharacterModal(`Select Characters for "${editingTitle}"`);
                            }}
                          >
                            {editingCharacters.length} selected
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            disabled
                            title={`Characters are only available for chapters. ${editingType.charAt(0).toUpperCase() + editingType.slice(1)}s are organizational structures.`}
                            sx={{ 
                              cursor: 'help',
                              '&:hover': {
                                backgroundColor: 'action.hover'
                              }
                            }}
                          >
                            Not available
                          </Button>
                        )}
                      </Box>
                      
                      {/* Buttons Row */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit();
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
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
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: level === 0 ? 'bold' : 'normal',
                          color: level === 0 ? 'var(--color-primary)' : 'var(--color-text)'
                        }}
                      >
                        {chapter.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: 'var(--color-textSecondary)' }}
                      >
                        ({item.type})
                      </Typography>
                      {chapter.locations && chapter.locations.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                          {chapter.locations.map((locationId) => {
                            const location = bookData.locations.find(loc => loc.id === locationId);
                            return (
                              <Chip 
                                key={locationId} 
                                label={location?.name || locationId} 
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.7rem', 
                                  height: '20px',
                                  color: 'var(--color-text)',
                                  borderColor: 'var(--color-border)',
                                  '& .MuiChip-label': {
                                    color: 'var(--color-text)',
                                  }
                                }}
                              />
                            );
                          })}
                        </Box>
                      )}
                      {chapter.characters && chapter.characters.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                          {chapter.characters.map((characterId) => {
                            const character = bookData.characters.find(char => char.id === characterId);
                            return (
                              <Chip 
                                key={characterId} 
                                label={character?.name || characterId} 
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.7rem', 
                                  height: '20px',
                                  color: 'var(--color-text)',
                                  borderColor: 'var(--color-border)',
                                  '& .MuiChip-label': {
                                    color: 'var(--color-text)',
                                  }
                                }}
                              />
                            );
                          })}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                {editingChapterId !== item.chapter_id && (
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFromHierarchy(item.chapter_id)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
            {buildHierarchyTree().length === 0 && (
              <Typography variant="body2" sx={{ textAlign: 'center', py: 2, color: 'var(--color-textSecondary)' }}>
                No structure defined yet. Add chapters above to build your book structure.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>



      {/* Location Selector Modal */}
      <LocationSelectorModal
        open={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={handleLocationModalSave}
        bookData={bookData}
        initialSelectedLocationIds={editingLocations}
        title={locationModalTitle}
      />

      {/* Character Selector Modal */}
      <CharacterSelectorModal
        open={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        onSave={handleCharacterModalSave}
        bookData={bookData}
        initialSelectedCharacterIds={editingCharacters}
        title={characterModalTitle}
      />
    </Box>
  );
}; 