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
        locations: selectedHierarchyType === 'chapter' ? newChapterLocations : []
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
  };

  const handleSaveEdit = () => {
    if (editingChapterId && editingTitle.trim()) {
      setBookData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter => 
          chapter.id === editingChapterId 
            ? { ...chapter, title: editingTitle.trim(), locations: editingType === 'chapter' ? editingLocations : [] }
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Chapters
        </Typography>
      </Box>

      {/* Add Chapter Form */}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Title, Type, and Add Button Row */}
          <Box sx={{ display: 'flex', gap: 1 }}>
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
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedHierarchyType}
                label="Type"
                onChange={(e) => setSelectedHierarchyType(e.target.value as SchemaHierarchyType)}
              >
                <MenuItem value="volume">Volume</MenuItem>
                <MenuItem value="book">Book</MenuItem>
                <MenuItem value="part">Part</MenuItem>
                <MenuItem value="chapter">Chapter</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleAddChapter}
              disabled={!newChapterTitle.trim()}
            >
              Add
            </Button>
          </Box>
          
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
        </Box>
      </Box>



      {/* Book Structure Tree */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Book Structure
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Chapters are automatically added to the structure when created. Drag and drop to reorder them.
          </Typography>
        </Box>



        {/* Tree View */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Book Structure Tree (drag to reorder):
          </Typography>
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
                  alignItems: 'center',
                  py: 0.5,
                  pl: level * 2,
                  cursor: editingChapterId === item.chapter_id ? 'default' : 'grab',
                  backgroundColor: dragOverItem === item.chapter_id ? '#e3f2fd' : 'transparent',
                  border: dragOverItem === item.chapter_id ? '2px dashed #1976d2' : '2px solid transparent',
                  borderRadius: 1,
                  '&:hover': { 
                    backgroundColor: dragOverItem === item.chapter_id ? '#e3f2fd' : 
                      editingChapterId === item.chapter_id ? 'transparent' : '#f0f0f0'
                  },
                  '&:active': { cursor: 'grabbing' }
                }}
              >
                <DragIndicatorIcon 
                  sx={{ 
                    mr: 1, 
                    color: 'text.secondary',
                    fontSize: '16px'
                  }} 
                />
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  {editingChapterId === item.chapter_id ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                      {/* Title and Type Row */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          size="small"
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
                          sx={{ flex: 1 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                          <Select
                            value={editingType}
                            onChange={(e) => setEditingType(e.target.value as SchemaHierarchyType)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MenuItem value="volume">Volume</MenuItem>
                            <MenuItem value="book">Book</MenuItem>
                            <MenuItem value="part">Part</MenuItem>
                            <MenuItem value="chapter">Chapter</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      
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
                      
                      {/* Buttons Row */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit();
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
                          color: level === 0 ? '#1976d2' : 'inherit'
                        }}
                      >
                        {chapter.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: 'text.secondary' }}
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
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                              />
                            );
                          })}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFromHierarchy(item.chapter_id)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            {buildHierarchyTree().length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No structure defined yet. Add chapters above to build your book structure.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Development: Show current bookData state */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Current bookData State (Development)
        </Typography>
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '200px'
          }}
        >
          <pre>{JSON.stringify(bookData, null, 2)}</pre>
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
    </Box>
  );
}; 