import React from 'react';
import { Box, Typography } from '@mui/material';

const KeyMoments = ({ keyMoments }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h5">Key Moments</Typography>
      <Box sx={{ border: '1px solid #ccc', padding: 2, minHeight: 100 }}>
        {keyMoments && keyMoments.length > 0 ? (
          keyMoments.map((moment, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Typography variant="body1">
                {index + 1}. {moment.description} (Timestamp: {moment.timestamp})
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">Key moments will appear here...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default KeyMoments;
