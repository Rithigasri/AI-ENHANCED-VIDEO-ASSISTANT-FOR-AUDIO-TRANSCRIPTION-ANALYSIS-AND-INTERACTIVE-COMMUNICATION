import React from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css'; // Import CSS

const Summary = ({ summary }) => {
  return (
    <Box className="box">
      <Typography variant="h5">Summary</Typography>
      <Box className="summary">
        <Typography variant="body1">
          {summary || "Summary will appear here..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default Summary;
