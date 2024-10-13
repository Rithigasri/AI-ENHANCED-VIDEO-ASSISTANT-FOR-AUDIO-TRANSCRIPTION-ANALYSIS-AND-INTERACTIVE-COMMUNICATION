import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import '../App.css'; // Import CSS

const QA = ({ setAnswer, setAudioFile, language, onQA }) => {
  const [question, setQuestion] = useState('');

  const handleQA = () => {
    if (!question) {
      alert("Please enter a question.");
      return;
    }

    onQA(question); // Call the function passed down from VideoUpload
    // Optionally, you can keep the question for review or further modifications
    // setQuestion(''); // Remove this line to keep the question in the input field
  };

  return (
    <Box className="qabox">
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
        onClick={handleQA} // Call the new handleQA function here
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default QA;
