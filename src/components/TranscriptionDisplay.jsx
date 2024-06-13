import React from 'react';

const TranscriptionDisplay = ({ transcription }) => {
  return (
    <div class="flex items-center justify-center">
    <div class="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">Transcription</h2>
        <p class="text-lg text-gray-700">{transcription}</p>
    </div>
</div>
  );
};

export default TranscriptionDisplay;
