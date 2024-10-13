import React from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css'; // Import CSS

const KeyMoments = ({ keyMoments }) => {
  return (
    <Box className="keybox">
      <Typography variant="h5" className="key-moments-title">
        Key Moments
      </Typography>
      {keyMoments && keyMoments.length > 0 ? (
        <Box className="key-moments">
          {keyMoments.map((moment, index) => (
            <Box key={index} className="key-moment">
              <img
                src={`http://localhost:5000/frames/${moment}`}
                alt={`Key Moment`}
                width="200"
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>No key moments found.</Typography>
      )}
    </Box>
  );
};

export default KeyMoments;
