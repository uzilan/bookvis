import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import type { SchemaBookData } from '../../schema/models/SchemaBookData';

interface CharacterSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (selectedCharacterIds: string[]) => void;
  bookData: SchemaBookData;
  initialSelectedCharacterIds: string[];
  title: string;
}

export const CharacterSelectorModal: React.FC<CharacterSelectorModalProps> = ({
  open,
  onClose,
  onSave,
  bookData,
  initialSelectedCharacterIds,
  title
}) => {
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCharacterIds(initialSelectedCharacterIds);
  }, [initialSelectedCharacterIds, open]);

  const handleCharacterTransfer = (characterId: string, direction: 'add' | 'remove') => {
    if (direction === 'add') {
      setSelectedCharacterIds(prev => [...prev, characterId]);
    } else {
      setSelectedCharacterIds(prev => prev.filter(id => id !== characterId));
    }
  };

  const handleCharacterTransferAll = (direction: 'add' | 'remove') => {
    if (direction === 'add') {
      const availableCharacters = bookData.characters
        .filter(character => !selectedCharacterIds.includes(character.id))
        .map(character => character.id);
      setSelectedCharacterIds(prev => [...prev, ...availableCharacters]);
    } else {
      setSelectedCharacterIds([]);
    }
  };

  const handleSave = () => {
    onSave(selectedCharacterIds);
    onClose();
  };

  const TransferList = ({ title, items, onItemClick, onSelectAll, onDeselectAll }: {
    title: string;
    items: Array<{ id: string; name: string }>;
    onItemClick: (id: string) => void;
    onSelectAll?: () => void;
    onDeselectAll?: () => void;
  }) => (
    <Paper sx={{ width: 200, height: 300, overflow: 'auto' }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2">{title}</Typography>
        {(onSelectAll || onDeselectAll) && (
          <Button size="small" onClick={onSelectAll || onDeselectAll}>
            {onSelectAll ? 'Select All' : 'Deselect All'}
          </Button>
        )}
      </Box>
      <List dense>
        {items.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => onItemClick(item.id)}
            sx={{ py: 0.5, cursor: 'pointer' }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', py: 2 }}>
          <TransferList
            title="Available Characters"
            items={bookData.characters.filter(character => !selectedCharacterIds.includes(character.id))}
            onItemClick={(id) => handleCharacterTransfer(id, 'add')}
            onSelectAll={() => handleCharacterTransferAll('add')}
          />
          <TransferList
            title="Selected Characters"
            items={bookData.characters.filter(character => selectedCharacterIds.includes(character.id))}
            onItemClick={(id) => handleCharacterTransfer(id, 'remove')}
            onDeselectAll={() => handleCharacterTransferAll('remove')}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 