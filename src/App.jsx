import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MicrophoneButton from './components/MicrophoneButton';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import Nav from './components/Nav';
import './App.css';

const App = () => {
  const [transcriptions, setTranscriptions] = useState([]);

  // Verify the environment variable is available


  const handleStopRecording = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    //console.log('Audio Blob:', audioBlob); // Debugging line
   console.log('Audio Blob Type:', audioBlob.type); // Debugging line

    try {
      const response = await axios.post('https://api.deepgram.com/v1/listen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${import.meta.env.VITE_DEEPGRAM_API_KEY}`
        }
      });

      const transcriptionText = response.data.results.channels[0].alternatives[0].transcript;
      setTranscriptions((prev) => [...prev, transcriptionText]);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setTranscriptions((prev) => [...prev, 'Error transcribing audio']);
    }
  };

  return (
    <>
    <Nav/>
    <div className="App">
     
    <h1 class="text-4xl font-bold text-blue-600 mb-4 shadow-lg">Click the recorder to record and transcribe audio</h1>
      <div class="flex items-center justify-center h-full">
        <img src="https://raw.githubusercontent.com/akash543214/DeepgramTranscriber/main/src/assets/audio.jpg" alt="Audio Image" class="max-w-full h-auto w-64"/>
    </div>      <MicrophoneButton onStop={handleStopRecording} />
      {transcriptions.map((transcription, index) => (
        <TranscriptionDisplay key={index} transcription={transcription} />
      ))}
    </div>
    </>
  );
};

export default App;
