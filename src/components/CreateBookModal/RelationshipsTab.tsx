import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
  IconButton
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { SchemaBookData, SchemaRelationship, SchemaRelationshipDescription, SchemaHierarchyItem, SchemaChapter } from '../../schema/models';
import { DevelopmentDataViewer } from './DevelopmentDataViewer';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Character Relationships
        </Typography>
      </Box>

      {/* Add Relationship Form */}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              fullWidth
              label="First Character"
              value={newRelationshipCharacter1}
              onChange={(e) => setNewRelationshipCharacter1(e.target.value)}
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
            <Button
              variant="contained"
              onClick={handleAddRelationship}
              disabled={!newRelationshipCharacter1 || !newRelationshipCharacter2 || newRelationshipCharacter1 === newRelationshipCharacter2}
            >
              Add
            </Button>
          </Box>

          {/* Relationship Descriptions for New Relationship */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Relationship Descriptions:
            </Typography>
            
            {/* Add New Description */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                select
                size="small"
                label="Chapter"
                value={newDescriptionChapter}
                onChange={(e) => setNewDescriptionChapter(e.target.value)}
                sx={{ flex: 1 }}
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
                sx={{ flex: 2 }}
              />
              <Button
                size="small"
                variant="outlined"
                onClick={handleAddNewDescription}
                disabled={!newDescriptionChapter || !newDescriptionText}
              >
                Add
              </Button>
            </Box>

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
        </Box>
      </Box>

      {/* Relationships List */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Current Relationships ({bookData.relationships.length})
        </Typography>
        {bookData.relationships.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    cursor: isEditing ? 'default' : 'pointer',
                    '&:hover': {
                      backgroundColor: isEditing ? '#f9f9f9' : '#f0f0f0'
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
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          select
                          size="small"
                          label="First Character"
                          value={editingRelationshipCharacter1}
                          onChange={(e) => setEditingRelationshipCharacter1(e.target.value)}
                          sx={{ flex: 1 }}
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
                          sx={{ flex: 1 }}
                        >
                          {bookData.characters.map((character) => (
                            <MenuItem key={character.id} value={character.id}>
                              {character.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>

                      {/* Relationship Descriptions */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Relationship Descriptions:
                        </Typography>
                        
                        {/* Add New Description */}
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <TextField
                            select
                            size="small"
                            label="Chapter"
                            value={editingDescriptionChapter}
                            onChange={(e) => setEditingDescriptionChapter(e.target.value)}
                            sx={{ flex: 1 }}
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
                            sx={{ flex: 2 }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddEditingDescription}
                            disabled={!editingDescriptionChapter || !editingDescriptionText}
                          >
                            Add
                          </Button>
                        </Box>

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
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          onClick={handleCancelRelationshipEdit}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
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
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                {description.description}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                      {relationship.descriptions.length === 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          No relationship descriptions added yet.
                        </Typography>
                      )}
                    </Box>
                  )}
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteRelationship(relationshipId)}
                    disabled={isEditing}
                  >
                    Remove
                  </Button>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No relationships created yet.
          </Typography>
        )}
      </Box>

      {/* Development JSON */}
      <DevelopmentDataViewer bookData={bookData} />
    </Box>
  );
}; 