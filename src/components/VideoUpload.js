import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import Transcription from './Transcription';
import Summary from './Summary';
import QA from './QA';
import KeyMoments from './KeyMoments';
import '../App.css'; // Import the CSS file

const VideoUpload = () => {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [answer, setAnswer] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [keyMoments, setKeyMoments] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setVideoSrc(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setTranscription(data.transcription); // Ensure data has this field
      setSummary(data.summary); // Ensure data has this field
      setKeyMoments(data.keyMoments || []); // Update if key moments are returned
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleQA = async () => {
    if (!question) {
      alert("Please enter a question.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, target_lang: language }),
      });

      const data = await response.json();
      setAnswer(data.answer);
      setAudioFile(data.audio_file); // Save the audio file name returned from the server
      setQuestion(''); // Clear the question after submitting
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const playAudio = () => {
    const audio = new Audio(`http://localhost:5000/uploads/${audioFile}`);
    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
  };

  return (
    <Box className="video-upload-container" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        UPLOAD VIDEO
      </Typography>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={loading}
        sx={{
          marginTop: 2,
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          width: 'calc(100% - 30px)',
          marginLeft: '10px'
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Analyse Video'}
      </Button>

      {videoSrc && <video controls width="600" src={videoSrc} />}

      <Transcription transcription={transcription} />
      <Summary summary={summary} />
      <QA 
        setAnswer={setAnswer} 
        setAudioFile={setAudioFile} 
        language={language} 
        onQA={(question) => {
          setQuestion(question); // Use the question state here
          handleQA(); // Call the existing handleQA function
        }}
      />

      {answer && (
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">Answer:</Typography>
          <Typography variant="body1">{answer}</Typography>
        </Box>
      )}

      {audioFile && (
        <Button variant="contained" onClick={playAudio}>
          Play Answer Audio
        </Button>
      )}

      <FormControl variant="outlined" fullWidth sx={{ marginTop: 2, width: 'calc(100% - 30px)' }}>
        <InputLabel id="language-label">Language</InputLabel>
        <Select
          labelId="language-label"
          value={language}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="de">German</MenuItem>
          <MenuItem value="ja">Japanese</MenuItem>
        </Select>
      </FormControl>

      <KeyMoments keyMoments={keyMoments} />
    </Box>
  );
};

export default VideoUpload;
