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

interface LocationSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (selectedLocationIds: string[]) => void;
  bookData: SchemaBookData;
  initialSelectedLocationIds: string[];
  title: string;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  open,
  onClose,
  onSave,
  bookData,
  initialSelectedLocationIds,
  title
}) => {
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedLocationIds(initialSelectedLocationIds);
  }, [initialSelectedLocationIds, open]);

  const handleLocationTransfer = (locationId: string, direction: 'add' | 'remove') => {
    if (direction === 'add') {
      setSelectedLocationIds(prev => [...prev, locationId]);
    } else {
      setSelectedLocationIds(prev => prev.filter(id => id !== locationId));
    }
  };

  const handleLocationTransferAll = (direction: 'add' | 'remove') => {
    if (direction === 'add') {
      const availableLocations = bookData.locations
        .filter(location => !selectedLocationIds.includes(location.id))
        .map(location => location.id);
      setSelectedLocationIds(prev => [...prev, ...availableLocations]);
    } else {
      setSelectedLocationIds([]);
    }
  };

  const handleSave = () => {
    onSave(selectedLocationIds);
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
            title="Available Locations"
            items={bookData.locations.filter(location => !selectedLocationIds.includes(location.id))}
            onItemClick={(id) => handleLocationTransfer(id, 'add')}
            onSelectAll={() => handleLocationTransferAll('add')}
          />
          <TransferList
            title="Selected Locations"
            items={bookData.locations.filter(location => selectedLocationIds.includes(location.id))}
            onItemClick={(id) => handleLocationTransfer(id, 'remove')}
            onDeselectAll={() => handleLocationTransferAll('remove')}
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