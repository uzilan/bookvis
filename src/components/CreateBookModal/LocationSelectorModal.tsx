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
    <Paper sx={{ 
      width: 200, 
      height: 300, 
      overflow: 'auto',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)'
    }}>
      <Box sx={{ 
        p: 1, 
        borderBottom: 1, 
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)'
      }}>
        <Typography variant="subtitle2" sx={{ color: 'var(--color-text)' }}>{title}</Typography>
        {(onSelectAll || onDeselectAll) && (
          <Button 
            size="small" 
            onClick={onSelectAll || onDeselectAll}
            sx={{
              color: 'var(--color-text)',
              '&:hover': {
                backgroundColor: 'var(--color-hover)',
              }
            }}
          >
            {onSelectAll ? 'Select All' : 'Deselect All'}
          </Button>
        )}
      </Box>
      <List dense sx={{ backgroundColor: 'var(--color-surface)' }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => onItemClick(item.id)}
            sx={{ 
              py: 0.5, 
              cursor: 'pointer',
              color: 'var(--color-text)',
              '&:hover': {
                backgroundColor: 'var(--color-hover)',
              }
            }}
          >
            <ListItemText 
              primary={item.name} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: 'var(--color-text)',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
        }
      }}
    >
      <DialogTitle sx={{ color: 'var(--color-text)' }}>{title}</DialogTitle>
      <DialogContent sx={{ backgroundColor: 'var(--color-background)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', py: 2 }}>
          <TransferList
            title="Available Locations"
            items={bookData.locations.filter(location => !selectedLocationIds.includes(location.id))}
            onItemClick={(id) => handleLocationTransfer(id, 'add')}
            onSelectAll={() => handleLocationTransferAll('add')}
          />
          
          {/* Transfer Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                const availableLocations = bookData.locations
                  .filter(location => !selectedLocationIds.includes(location.id))
                  .map(location => location.id);
                if (availableLocations.length > 0) {
                  setSelectedLocationIds(prev => [...prev, ...availableLocations]);
                }
              }}
              disabled={bookData.locations.filter(location => !selectedLocationIds.includes(location.id)).length === 0}
              sx={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'var(--color-hover)',
                },
                '&:disabled': {
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textSecondary)',
                }
              }}
            >
              &gt;&gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                const selectedLocations = bookData.locations
                  .filter(location => selectedLocationIds.includes(location.id))
                  .map(location => location.id);
                if (selectedLocations.length > 0) {
                  setSelectedLocationIds(prev => prev.filter(id => !selectedLocations.includes(id)));
                }
              }}
              disabled={selectedLocationIds.length === 0}
              sx={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'var(--color-hover)',
                },
                '&:disabled': {
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textSecondary)',
                }
              }}
            >
              &lt;&lt;
            </Button>
          </Box>
          
          <TransferList
            title="Selected Locations"
            items={bookData.locations.filter(location => selectedLocationIds.includes(location.id))}
            onItemClick={(id) => handleLocationTransfer(id, 'remove')}
            onDeselectAll={() => handleLocationTransferAll('remove')}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'var(--color-background)' }}>
        <Button 
          onClick={onClose}
          sx={{
            color: 'var(--color-text)',
            '&:hover': {
              backgroundColor: 'var(--color-hover)',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{
            backgroundColor: 'var(--color-buttonActive)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'var(--color-buttonActiveHover)',
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 