// import React, { useState } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import axios from 'axios';

// const QA = ({ setAnswer, setAudioFile }) => {
//   const [question, setQuestion] = useState('');

//   const handleQuestionSubmit = async () => {
//     if (!question) {
//       alert("Please enter a question.");
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/qa', { question });
//       setAnswer(response.data.answer); // Pass answer to parent
//       setAudioFile(response.data.audio_file); // Set the audio file path
//     } catch (error) {
//       console.error("Error submitting question:", error);
//     }
//   };

//   return (
//     <Box sx={{ my: 2 }}>
//       <Typography variant="h5">Ask a Question</Typography>
//       <input
//         type="text"
//         placeholder="Type your question here..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         style={{ width: '100%', padding: '8px' }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleQuestionSubmit}
//         sx={{ mt: 1 }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default QA;

import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const QA = ({ setAnswer, setAudioFile, language }) => {
  const [question, setQuestion] = useState('');

  const handleQuestionSubmit = async () => {
    if (!question) {
      alert("Please enter a question.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/qa', { question, target_lang: language });

      setAnswer(response.data.answer); 
      setAudioFile(response.data.audio_file); 
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h5">Ask a Question</Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuestionSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default QA;

