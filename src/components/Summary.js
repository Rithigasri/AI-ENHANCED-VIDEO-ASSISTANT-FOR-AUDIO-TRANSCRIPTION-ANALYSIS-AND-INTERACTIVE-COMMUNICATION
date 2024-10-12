import React from 'react';
import { Box, Typography } from '@mui/material';

const Summary = ({ summary }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h5">Summary</Typography>
      <Box sx={{ border: '1px solid #ccc', padding: 2, minHeight: 100 }}>
        <Typography variant="body1">
          {summary || "Summary will appear here..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default Summary;
