// import React from 'react';
// import { Box, Typography } from '@mui/material';

// const KeyMoments = ({ keyMoments }) => {
//   return (
//     <Box sx={{ marginTop: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Key Moments
//       </Typography>
//       {keyMoments && keyMoments.length > 0 ? (
//         keyMoments.map((moment, index) => (
//           <Box key={index} sx={{ marginBottom: 1 }}>
//             <img
//               src={`http://localhost:5000/frames/${moment}`}
//               alt={`Key Moment ${index + 1}`}
//               width="200"
//             />
//             <Typography variant="caption">Key Moment {index + 1}</Typography>
//           </Box>
//         ))
//       ) : (
//         <Typography>No key moments found.</Typography>
//       )}
//     </Box>
//   );
// };


// export default KeyMoments;
import React from 'react';
import { Box, Typography } from '@mui/material';

const KeyMoments = ({ keyMoments }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Key Moments
      </Typography>
      {keyMoments && keyMoments.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {keyMoments.map((moment, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
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
