import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const COLORS = [
  'rgba(255, 255, 255, 0.5)',     // Soft White
  'rgba(255, 220, 150, 0.4)',     // Warm
  'rgba(150, 200, 255, 0.4)',     // Cool
];

export default function Atmosphere() {
  const { scrollY } = useScroll();
  
  // Create smooth scroll reactions for 3 layers of parallax
  const bgScroll = useTransform(scrollY, [0, 5000], [0, -30]);
  const midScroll = useTransform(scrollY, [0, 5000], [0, -50]);
  const fgScroll = useTransform(scrollY, [0, 5000], [0, -80]);

  const bgY = useSpring(bgScroll, { stiffness: 50, damping: 20 });
  const midY = useSpring(midScroll, { stiffness: 50, damping: 20 });
  const fgY = useSpring(fgScroll, { stiffness: 50, damping: 20 });

  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => {
      const size = Math.random() * 11 + 3; // 3px to 14px
      const layer = i < 12 ? 'bg' : i < 22 ? 'mid' : 'fg';
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      // Depth-based blur and speed multiplier
      let blur = 0;
      let speedMult = 1;
      if (layer === 'bg') {
        blur = Math.random() * 4 + 6; // 6-10px blur for bg
        speedMult = 0.6;
      } else if (layer === 'mid') {
        blur = Math.random() * 3 + 2; // 2-5px blur for mid
        speedMult = 1;
      } else {
        blur = Math.random() * 1.5; // Sharp for fg
        speedMult = 1.4;
      }

      return {
        id: i,
        layer,
        size,
        color,
        blur,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 120, // ±60px
        driftY: (Math.random() - 0.5) * 160, // ±80px
        oscAmp: 10 + Math.random() * 15,
        duration: (20 + Math.random() * 20) / speedMult,
        delay: Math.random() * -40,
        breathDuration: 6 + Math.random() * 10,
        rareGlow: Math.random() > 0.85 // Rare glow events
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* 1. Base Subtle Light Breathing */}
      <motion.div 
        animate={{ opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
      />

      {/* 2. Particles by Parallax Layer */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.initialX}%`,
            top: `${p.initialY}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '50%',
            filter: `blur(${p.blur}px)`,
            y: p.layer === 'bg' ? bgY : p.layer === 'mid' ? midY : fgY,
            willChange: 'transform, opacity'
          }}
          animate={{
            translateX: [0, p.driftX, -p.driftX / 2, 0],
            translateY: [0, p.driftY, p.driftY / 2, 0],
            scale: [1, 1.15, 0.95, 1],
            opacity: p.rareGlow ? [0.4, 1, 0.4] : [0.3, 0.6, 0.3],
          }}
          transition={{
            translateX: {
              duration: p.driftX ? p.duration : 0,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            },
            translateY: {
              duration: p.driftY ? p.duration * 1.2 : 0,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            },
            scale: {
              duration: p.breathDuration,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: p.rareGlow ? 4 : p.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* 3. Global Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </div>
  );
}

