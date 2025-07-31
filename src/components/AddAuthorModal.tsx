import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';
import type { Author } from '../models/Author';
import { materialUITheme } from '../styles';

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
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = () => {
    if (authorName.trim()) {
      const newAuthor: Author = {
        id: authorName.trim().toLowerCase().replace(/\s+/g, '-'),
        name: authorName.trim()
      };
      onAuthorAdded(newAuthor);
      setAuthorName('');
      onClose();
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
        sx={materialUITheme.dialog}
      >
      <DialogTitle sx={materialUITheme.dialogTitle}>
        Add New Author
      </DialogTitle>
      <DialogContent sx={materialUITheme.dialogContent}>
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
                sx={materialUITheme.textFieldAlt}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={materialUITheme.dialogActions}>
        <Button 
          onClick={handleClose} 
          sx={materialUITheme.buttonSecondary}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!authorName.trim()}
          sx={materialUITheme.button}
        >
          Add Author
        </Button>
      </DialogActions>
        </Dialog>
      </>
    );
  }; 