import React from 'react';
import { Container } from '@mui/material';
import VideoUpload from './components/VideoUpload';

const App = () => {
  return (
    <Container maxWidth="md">
      <h1>AI Video Assistant</h1>
      <VideoUpload />
    </Container>
  );
};

export default App;
