import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => ["Moka", "Animation", "World"], []);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2700; // 2.7 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400); // 3.1s total (2.7s + 0.4s buffer)
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordInterval);
        return prev;
      });
    }, 900);

    return () => clearInterval(wordInterval);
  }, [words]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-sans"
    >
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

      {/* TOP LEFT LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 left-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#8a8a8a] font-medium">Moka Studio</span>
      </motion.div>

      {/* CENTER SYSTEM */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* DOT */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 ${12 + (count / 100) * 12}px rgba(137,170,204,${0.5 + (count / 100) * 0.3})`,
          }}
          className="w-2.5 h-2.5 rounded-full bg-[#89aacc] relative"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
        </motion.div>

        {/* ROTATING WORDS */}
        <div className="h-[1.2em] relative flex items-center min-w-[180px] md:min-w-[280px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[wordIndex]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: words[wordIndex] === "World" ? 1 : 0.6, 
                y: 0 
              }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic tracking-tight block absolute inset-0 text-white"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* COUNTER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-20 right-10 md:right-20 pointer-events-none"
      >
        <div className="text-[80px] md:text-[140px] lg:text-[180px] font-display text-white tabular-nums leading-none">
          {count.toString().padStart(3, '0')}
        </div>
      </motion.div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          style={{ originX: 0 }}
          className="w-full h-full bg-linear-to-r from-[#5a7a9c] to-[#89aacc] shadow-[0_0_15px_rgba(137,170,204,0.5)]"
        />
      </div>
    </motion.div>
  );
}
