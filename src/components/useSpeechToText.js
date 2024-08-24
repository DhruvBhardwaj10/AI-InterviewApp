import { useState, useEffect, useRef } from 'react';

const useSpeechToText = ({ onSpeechEnd }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(new Error('Speech recognition not supported in this browser.'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const results = event.results;
      let finalTranscript = '';
      for (let i = event.resultIndex; i < results.length; i++) {
        finalTranscript += results[i][0].transcript;
      }
      setTranscript(finalTranscript);
      if (onSpeechEnd) onSpeechEnd(finalTranscript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSpeechEnd]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening
  };
};

export default useSpeechToText;
