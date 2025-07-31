import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Loading } from './Loading';
import { useAuth } from '../hooks/useAuth';

export const LoginButton: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut, isAuthenticated } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return <Loading message="Loading..." size="small" />;
  }

  if (isAuthenticated && user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Welcome, {user.displayName || user.email}!
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleSignOut}
          color="primary"
        >
          Sign Out
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleSignIn}
      color="primary"
    >
      Sign in with Google
    </Button>
  );
}; 