import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useAudio } from '../context/AudioContext';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  key?: React.Key;
}

export default function Magnetic({ children, strength = 0.15, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useAudio();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseEnter = () => {
    playHover();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    playClick();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
