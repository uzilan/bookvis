// Shared Material-UI theme configurations for CreateBookModal components
// This file contains common sx patterns that are repeated across multiple components

export const materialUITheme = {
  // Common TextField styling used across all CreateBookModal components
  textField: {
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
  },

  // Alternative TextField styling (used in AddAuthorModal)
  textFieldAlt: {
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
  },

  // Common Typography styling for captions
  caption: {
    color: 'var(--color-textSecondary)',
    mt: -0.8,
    display: 'block',
  },

  // Common Dialog styling
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
    }
  },

  // Common DialogTitle styling
  dialogTitle: {
    color: 'var(--color-text)',
  },

  // Common DialogContent styling
  dialogContent: {
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
  },

  // Common DialogContentText styling
  dialogContentText: {
    color: 'var(--color-text)',
  },

  // Common DialogActions styling
  dialogActions: {
    backgroundColor: 'var(--color-background)',
  },

  // Common Paper styling
  paper: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
  },

  // Common List styling
  list: {
    backgroundColor: 'var(--color-surface)',
  },

  // Common ListItem styling
  listItem: {
    '&:hover': {
      backgroundColor: 'var(--color-hover)',
    },
  },

  // Common ListItemText styling
  listItemText: {
    '& .MuiListItemText-primary': {
      color: 'var(--color-text)'
    },
    '& .MuiListItemText-secondary': {
      color: 'var(--color-textSecondary)'
    }
  },

  // Common Button styling
  button: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-onPrimary)',
    '&:hover': {
      backgroundColor: 'var(--color-primaryHover)',
    },
    '&:disabled': {
      backgroundColor: 'var(--color-disabled)',
      color: 'var(--color-onDisabled)',
    }
  },

  // Common Button secondary styling
  buttonSecondary: {
    color: 'var(--color-textSecondary)',
    '&:hover': {
      backgroundColor: 'var(--color-hover)',
    }
  },
} as const;

// Type-safe access to theme configurations
export type MaterialUITheme = typeof materialUITheme; 