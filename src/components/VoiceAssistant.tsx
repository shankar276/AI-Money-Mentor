"use client";
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionContext, setRecognitionContext] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          handleProcessVoice(text);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
        
        setRecognitionContext(recognition);
      }
    }
  }, []);

  const handleProcessVoice = (text: string) => {
    setIsProcessing(true);
    // Simulate AI parsing intent from voice text
    setTimeout(() => {
      let reply = "I've logged that for you.";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("spend") || lowerText.includes("expense") || lowerText.includes("buy") || lowerText.includes("bought")) {
        reply = "I've categorized that as a new expense. Your safe-to-spend balance has been updated.";
      } else if (lowerText.includes("balance") || lowerText.includes("how much")) {
        reply = "You currently have 45000 rupees in your main account, and are on track for your FIRE goals.";
      } else {
        reply = "I'm your AI Money Mentor. Ask me to track expenses, check balances, or give FIRE advice.";
      }
      
      setResponse(reply);
      setIsProcessing(false);
      
      // Speak back
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(reply);
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionContext?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponse('');
      try {
        recognitionContext?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!recognitionContext) return null; // Browser doesn't support or unmounted

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-fade-in">
      {(transcript || response || isProcessing) && (
        <div className="glass-panel p-4 max-w-xs rounded-2xl rounded-br-none shadow-[0_10px_40px_rgba(0,173,216,0.15)] border border-[var(--accent-primary)] bg-[#0f172a]/95 backdrop-blur-xl">
          {transcript && (
            <p className="text-sm text-gray-300 mb-2 italic">&quot;{transcript}&quot;</p>
          )}
          {isProcessing && <div className="flex items-center gap-2 text-[var(--accent-primary)] text-sm"><Loader2 className="animate-spin" size={14} /> AI Processing...</div>}
          {response && (
            <p className="text-sm font-semibold text-emerald-400">{response}</p>
          )}
        </div>
      )}
      
      <button 
        onClick={toggleListen}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(0,173,216,0.5)] transition-all transform hover:scale-105 duration-300 ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse outline outline-4 outline-red-500/30' : 'bg-[var(--accent-primary)] hover:bg-[#0092b7]'}`}
      >
        {isListening ? <MicOff className="text-white" size={24} /> : <Mic className="text-white" size={24} />}
      </button>
    </div>
  );
}
