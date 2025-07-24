import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input
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
      >
      <DialogTitle>
        Add New Author
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
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
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={!authorName.trim()}
        >
          Add Author
        </Button>
      </DialogActions>
        </Dialog>
      </>
    );
  }; 