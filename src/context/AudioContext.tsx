import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playWhoosh: () => void;
  playTone: () => void;
  hasInteracted: boolean;
  setHasInteracted: (val: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const SOUNDS = {
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Subtle mechanical click
  click: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3', // Punchier tech click
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Very light air whoosh
  tone: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3' // Minimalist clean tone
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioRefs.current[key] = audio;
    });

    // Auto-detect first interaction to enable audio context
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const playSound = (name: keyof typeof SOUNDS, volume: number) => {
    if (isMuted || !hasInteracted) return;
    const audio = audioRefs.current[name];
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(() => {
        // Handle potential autoplay restriction
      });
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  const playSyntheticSound = (freq: number, duration: number, vol: number) => {
    if (isMuted || !hasInteracted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.error('Audio Context Error', e);
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      playHover: () => {
        playSound('hover', 0.05);
        playSyntheticSound(880, 0.05, 0.02);
      },
      playClick: () => {
        playSound('click', 0.12);
        playSyntheticSound(440, 0.1, 0.02);
      },
      playWhoosh: () => playSound('whoosh', 0.08),
      playTone: () => playSound('tone', 0.15),
      hasInteracted,
      setHasInteracted
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
