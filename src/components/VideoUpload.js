// import React, { useState } from 'react';
// import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import Transcription from './Transcription';
// import Summary from './Summary';
// import QA from './QA';

// const VideoUpload = () => {
//   const [transcription, setTranscription] = useState('');
//   const [summary, setSummary] = useState('');
//   const [answer, setAnswer] = useState(''); 
//   const [audioFile, setAudioFile] = useState(''); 
//   const [file, setFile] = useState(null);
//   const [videoSrc, setVideoSrc] = useState('');
//   const [language, setLanguage] = useState('en');  // State for language selection

//   // Handle file input change for video upload
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile);
//       setVideoSrc(url);
//     }
//   };

//   // Upload the video to the backend and get transcription & summary
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a video file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', file);

//     try {
//       const response = await fetch('http://localhost:5000/uploads', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTranscription(data.transcription);
//         setSummary(data.summary);
//       } else {
//         setTranscription("Error: " + (data.error || "An unknown error occurred."));
//         setSummary('');
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setTranscription("Error: Could not upload the file.");
//       setSummary('');
//     }
//   };

//   // Play the generated answer audio file
//   const handlePlayAudio = () => {
//     if (audioFile) {
//       const audio = new Audio(`http://localhost:5000/uploads/${audioFile}`);
//       audio.play();
//     } else {
//       alert("No audio file available.");
//     }
//   };

//   return (
//     <Box sx={{ my: 4 }}>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>
//         Upload Video
//       </Button>
//       {videoSrc && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Video Preview:</Typography>
//           <video
//             src={videoSrc}
//             controls
//             style={{ maxWidth: '100%', maxHeight: '400px' }}
//           />
//         </Box>
//       )}
//       <Transcription transcription={transcription} />
//       <Summary summary={summary} />
      
//       {/* Language Selection */}
//       <FormControl sx={{ mt: 2, minWidth: 120 }}>
//         <InputLabel>Language</InputLabel>
//         <Select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           label="Language"
//         >
//           <MenuItem value="en">English</MenuItem>
//           <MenuItem value="fr">French</MenuItem>
//           <MenuItem value="es">Spanish</MenuItem>
//           <MenuItem value="de">German</MenuItem>
//         </Select>
//       </FormControl>

//       {/* QA component to handle Q&A and set audio file */}
//       <QA setAnswer={setAnswer} setAudioFile={setAudioFile} language={language} />
      
//       {answer && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Answer:</Typography>
//           <Typography>{answer}</Typography>
//           <Button variant="contained" onClick={handlePlayAudio} sx={{ mt: 1 }}>
//             Hear Answer
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default VideoUpload;
import React, { useState } from 'react';
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import Transcription from './Transcription';
import Summary from './Summary';
import QA from './QA';
import KeyMoments from './KeyMoments'; // Import the new KeyMoments component

const VideoUpload = () => {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [answer, setAnswer] = useState(''); 
  const [audioFile, setAudioFile] = useState(''); 
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [keyMoments, setKeyMoments] = useState([]); // State for storing key moments
  const [language, setLanguage] = useState('en');  // State for language selection
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle file input change for video upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setVideoSrc(url);
    }
  };

  // Handle video upload and processing
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscription(data.transcription);
      setSummary(data.summary);
      setKeyMoments(data.keyMoments); // Set key moments from the response
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle language change
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // Handle Q&A submission
  const handleQA = async (question) => {
    const response = await fetch('http://localhost:5000/qa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        target_lang: language,
      }),
    });

    const data = await response.json();
    setAnswer(data.answer);
    setAudioFile(data.audio_file); // Store audio file for playback
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upload Video
      </Typography>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>

      {videoSrc && <video controls width="600" src={videoSrc} />}
      
      <Transcription transcription={transcription} />
      <Summary summary={summary} />
      <QA handleQA={handleQA} answer={answer} audioFile={audioFile} />

      <FormControl variant="outlined" fullWidth sx={{ marginTop: 2 }}>
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

      <KeyMoments keyMoments={keyMoments} /> {/* Render Key Moments component */}
    </Box>
  );
};

export default VideoUpload;

