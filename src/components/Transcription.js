import React from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css'; // Import CSS

const Transcription = ({ transcription }) => {
  return (
    <Box className="box">
      <Typography variant="h5">Transcription</Typography>
      <Box className="transcription">
        <Typography variant="body1">
          {transcription || "Transcription will appear here..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default Transcription;
