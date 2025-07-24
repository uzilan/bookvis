import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SchemaBookData } from '../../schema/models';

interface DevelopmentDataViewerProps {
  bookData: SchemaBookData;
  title?: string;
}

export const DevelopmentDataViewer: React.FC<DevelopmentDataViewerProps> = ({
  bookData,
  title = "Development Data"
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: 'grey.100',
          p: 2,
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          overflow: 'auto',
          maxHeight: '200px'
        }}
      >
        <pre>{JSON.stringify(bookData, null, 2)}</pre>
      </Box>
    </Box>
  );
}; 