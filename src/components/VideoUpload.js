import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Transcription from './Transcription';
import Summary from './Summary';
import QA from './QA'; // Import QA component

const VideoUpload = () => {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [answer, setAnswer] = useState(''); // State for the answer
  const [audioFile, setAudioFile] = useState(''); // State for the audio file name
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');

  // Handle file input change for video upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setVideoSrc(url);
    }
  };

  // Upload the video to the backend and get transcription & summary
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setTranscription(data.transcription);
        setSummary(data.summary);
      } else {
        setTranscription("Error: " + (data.error || "An unknown error occurred."));
        setSummary('');
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setTranscription("Error: Could not upload the file.");
      setSummary('');
    }
  };

  // Play the generated answer audio file
  const handlePlayAudio = () => {
    if (audioFile) {
      // Construct the correct URL using the audio file name
      const audio = new Audio(`http://localhost:5000/${audioFile}`);
      audio.play();
    } else {
      alert("No audio file available.");
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>
        Upload Video
      </Button>
      {videoSrc && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Video Preview:</Typography>
          <video
            src={videoSrc}
            controls
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Box>
      )}
      <Transcription transcription={transcription} />
      <Summary summary={summary} />
      
      {/* QA component to handle Q&A and set audio file */}
      <QA setAnswer={setAnswer} setAudioFile={setAudioFile} />
      
      {answer && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Answer:</Typography>
          <Typography>{answer}</Typography>
          <Button variant="contained" onClick={handlePlayAudio} sx={{ mt: 1 }}>
            Hear Answer
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
