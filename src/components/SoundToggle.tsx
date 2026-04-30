import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function SoundToggle() {
  const { isMuted, toggleMute, hasInteracted, setHasInteracted } = useAudio();

  const handleToggle = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    toggleMute();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 left-8 z-[100]"
    >
      <button
        onClick={handleToggle}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white hover:text-black"
        title={isMuted ? "Unmute" : "Mute"}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={16} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing indicator if not interacted yet */}
        {!hasInteracted && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
          </span>
        )}
      </button>
    </motion.div>
  );
}
