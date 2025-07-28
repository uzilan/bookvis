import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField
} from '@mui/material';
import type { Author } from '../models/Author';

interface AddAuthorModalProps {
  open: boolean;
  onClose: () => void;
  onAuthorAdded: (author: Author) => void;
}

export const AddAuthorModal: React.FC<AddAuthorModalProps> = ({
  open,
  onClose,
  onAuthorAdded
}) => {
  const [authorName, setAuthorName] = useState<string>('');

  const handleSubmit = () => {
    if (authorName.trim()) {
      const newAuthor: Author = {
        id: authorName.trim().toLowerCase().replace(/\s+/g, '-'),
        name: authorName.trim()
      };
      onAuthorAdded(newAuthor);
      handleClose();
    }
  };

  const handleClose = () => {
    setAuthorName('');
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
          }
        }}
      >
      <DialogTitle sx={{ color: 'var(--color-text)' }}>
        Add New Author
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'var(--color-text)' }}>
                Author Information
              </Typography>
            </Box>
            
            <Box>
              <TextField
                fullWidth
                label="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter the author's full name"
                autoFocus
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'var(--color-textSecondary)',
                  },
                  '& .MuiInputBase-root': {
                    color: 'var(--color-text)',
                    '& fieldset': {
                      borderColor: 'var(--color-border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--color-border)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--color-text)',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'var(--color-background)' }}>
        <Button 
          onClick={handleClose} 
          sx={{ 
            color: 'var(--color-textSecondary)',
            '&:hover': {
              backgroundColor: 'var(--color-hover)',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!authorName.trim()}
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
          Add Author
        </Button>
      </DialogActions>
        </Dialog>
      </>
    );
  }; 