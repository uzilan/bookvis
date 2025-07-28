import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { LocationSelectorModal } from './LocationSelectorModal';
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
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationModalTitle, setLocationModalTitle] = useState('');
  const [newChapterLocations, setNewChapterLocations] = useState<string[]>([]);

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter: SchemaChapter = {
        id: `chapter-${bookData.chapters.length + 1}`,
        title: newChapterTitle.trim(),
        locations: newChapterLocations,
        characters: []
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
      chapters: prev.chapters.filter(ch => ch.id !== chapterId),
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
      // Reorder hierarchy
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
  };

  const handleSaveEdit = () => {
    if (editingChapterId && editingTitle.trim()) {
      setBookData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter => 
          chapter.id === editingChapterId 
            ? { ...chapter, title: editingTitle.trim(), locations: editingType === 'chapter' ? editingLocations : [], characters: [] }
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
  };

  const handleCancelEdit = () => {
    setEditingChapterId(null);
    setEditingTitle('');
    setEditingType('chapter');
    setEditingLocations([]);
  };

  const handleOpenLocationModal = (title: string, isForNewChapter: boolean = false) => {
    setLocationModalTitle(title);
    setIsLocationModalOpen(true);
    // Set the initial locations based on whether we're creating or editing
    if (isForNewChapter) {
      // For new chapters, we don't need to set editingLocations since we're not editing
      // The modal will use newChapterLocations as the initial value
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

          {/* Locations */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: 'var(--color-textSecondary)' }}>
              Locations
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleOpenLocationModal(`Select Locations for New Chapter`, true)}
              sx={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'var(--color-hover)',
                }
              }}
            >
              {newChapterLocations.length > 0 ? `${newChapterLocations.length} selected` : 'Select Locations'}
            </Button>
            {newChapterLocations.length > 0 && (
              <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {newChapterLocations.map(locationId => {
                  const location = bookData.locations.find(l => l.id === locationId);
                  return location ? (
                    <Chip
                      key={locationId}
                      label={location.name}
                      size="small"
                      sx={{
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.75rem'
                      }}
                    />
                  ) : null;
                })}
              </Box>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={handleAddChapter}
            disabled={!newChapterTitle.trim()}
            sx={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-onPrimary)',
              '&:hover': {
                backgroundColor: 'var(--color-primaryHover)',
              },
              '&:disabled': {
                backgroundColor: 'var(--color-disabled)',
                color: 'var(--color-onDisabled)',
              }
            }}
          >
            Add Chapter
          </Button>
        </Box>
      </Box>

      {/* Right Column - Chapter List */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Chapters ({bookData.chapters.length})
        </Typography>
        
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {buildHierarchyTree().map(({ item, chapter, level }) => (
            <Box
              key={chapter.id}
              draggable
              onDragStart={(e) => handleDragStart(e, chapter.id)}
              onDragOver={(e) => handleDragOver(e, chapter.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, chapter.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                mb: 1,
                backgroundColor: dragOverItem === chapter.id ? 'var(--color-hover) !important' : 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 1,
                cursor: 'grab',
                '&:hover': {
                  backgroundColor: 'var(--color-hover) !important',
                },
                                 pl: editingChapterId === chapter.id ? 2 : 2 + level * 2
              }}
            >
                             {editingChapterId !== chapter.id && (
                 <DragIndicatorIcon 
                   sx={{ 
                     color: 'var(--color-textSecondary)',
                     cursor: 'grab'
                   }} 
                 />
               )}
              
              {editingChapterId === chapter.id ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Chapter Title"
                    placeholder="Enter chapter title"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
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

                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, color: 'var(--color-textSecondary)' }}>
                      Locations
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenLocationModal(`Select Locations for "${editingTitle}"`)}
                      sx={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                        '&:hover': {
                          borderColor: 'var(--color-primary)',
                          backgroundColor: 'var(--color-hover)',
                        }
                      }}
                    >
                      {editingLocations.length > 0 ? `${editingLocations.length} selected` : 'Select Locations'}
                    </Button>
                    {editingLocations.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {editingLocations.map(locationId => {
                          const location = bookData.locations.find(l => l.id === locationId);
                          return location ? (
                            <Chip
                              key={locationId}
                              label={location.name}
                              size="small"
                              sx={{
                                backgroundColor: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.75rem'
                              }}
                            />
                          ) : null;
                        })}
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleSaveEdit}
                      sx={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-onPrimary)',
                        '&:hover': {
                          backgroundColor: 'var(--color-primaryHover)',
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleCancelEdit}
                      sx={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                        '&:hover': {
                          borderColor: 'var(--color-primary)',
                          backgroundColor: 'var(--color-hover)',
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                                 <>
                   <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => handleStartEditing(chapter.id, chapter.title, item.type)}>
                     <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                       {chapter.title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       Type: {item.type}
                     </Typography>
                     {chapter.locations && chapter.locations.length > 0 && (
                       <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                         {chapter.locations.map(locationId => {
                           const location = bookData.locations.find(l => l.id === locationId);
                           return location ? (
                             <Chip
                               key={locationId}
                               label={location.name}
                               size="small"
                               sx={{
                                 backgroundColor: 'var(--color-surface)',
                                 color: 'var(--color-text)',
                                 border: '1px solid var(--color-border)',
                                 fontSize: '0.75rem'
                               }}
                             />
                           ) : null;
                         })}
                       </Box>
                     )}
                   </Box>
                   
                   <IconButton
                     size="small"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleRemoveFromHierarchy(chapter.id);
                     }}
                     sx={{
                       color: 'var(--color-textSecondary)',
                       '&:hover': {
                         backgroundColor: 'var(--color-hover)',
                       }
                     }}
                   >
                     <DeleteIcon />
                   </IconButton>
                 </>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Location Selector Modal */}
      <LocationSelectorModal
        open={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title={locationModalTitle}
        bookData={bookData}
        initialSelectedLocationIds={editingChapterId ? editingLocations : newChapterLocations}
        onSave={handleLocationModalSave}
      />
    </Box>
  );
}; 