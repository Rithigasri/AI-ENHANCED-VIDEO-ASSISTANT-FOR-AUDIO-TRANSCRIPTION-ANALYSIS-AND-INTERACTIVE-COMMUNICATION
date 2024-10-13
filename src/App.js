import React from 'react';
import { Container } from '@mui/material';
import VideoUpload from './components/VideoUpload';
import './App.css'; // Import CSS

const App = () => {
  return (
    <Container maxWidth="md" className="container">
      <h1 style={{color: "white"}}>AI ENHANCED VIDEO ASSISTANT</h1>
      <VideoUpload />
    </Container>
  );
};

export default App;
