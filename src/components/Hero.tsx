import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import backgroundVideo from '../assets/hero-video.mp4';
import Magnetic from './Magnetic';
import { useAudio } from '../context/AudioContext';

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  // Cinematic scroll transitions
  const videoBlur = useTransform(smoothProgress, [0, 0.6], ["blur(0px)", "blur(15px)"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -40]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.35], [0.4, 0.9]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* FULL SCREEN BACKGROUND (STATIC & CINEMATIC) */}
        <motion.div 
          style={{ 
            filter: videoBlur
          }}
          className="absolute inset-0 w-full h-full overflow-hidden z-10"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover origin-center"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>

          {/* Premium Vignette Layer */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 z-[11] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" 
          />
          <div className="absolute inset-0 z-[12] pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </motion.div>

        {/* EDITORIAL UI LAYER */}
        <div className="relative z-20 w-full h-full max-w-[1700px] mx-auto px-8 md:px-16 flex flex-col justify-center py-10 md:py-16">
          
          {/* Center: Split Content Grid */}
          <div className="grid grid-cols-12 h-fit items-center">
            
            {/* Left: Main Content (Proprietary spacing) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ opacity: textOpacity, y: textY }}
              className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex flex-col">
                {/* TITLE BLOCK */}
                <div className="flex flex-col text-white">
                  <span className="text-[12px] uppercase tracking-[0.8em] text-white/40 block mb-3">Moka</span>
                  <h1 className="text-6xl md:text-7xl lg:text-[100px] font-display italic leading-[0.85] tracking-tighter">
                    Beyond <br/> Motion
                  </h1>
                </div>

                {/* SUBTEXT - 20px Spacing */}
                <p className="mt-5 text-[11px] md:text-xs uppercase tracking-[0.35em] text-white/70 font-light leading-relaxed max-w-[400px]">
                  Master’s in Animation · Director · <br className="hidden md:block" /> AI Video Creator.
                </p>

                {/* CTA BUTTONS - 32px Spacing from subtext */}
                <div className="flex items-center gap-4 mt-8 pointer-events-auto">
                  <Magnetic strength={0.05}>
                    <button 
                      onMouseEnter={() => playHover()}
                      onClick={() => {
                        playClick();
                        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 min-w-[150px] rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/20 text-[10px] uppercase tracking-[0.4em] text-white/80 hover:bg-white/[0.08] hover:border-white/40 hover:text-white transition-all duration-500 font-medium cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                      View Work
                    </button>
                  </Magnetic>
                  <Magnetic strength={0.05}>
                    <button 
                      onMouseEnter={() => playHover()}
                      onClick={() => {
                        playClick();
                        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 min-w-[150px] rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/20 text-[10px] uppercase tracking-[0.4em] text-white/80 hover:bg-white/[0.08] hover:border-white/40 hover:text-white transition-all duration-500 font-medium cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                      Start Project
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>

            {/* Right: Breeding Space (Empty for centered character) */}
            <div className="hidden md:block col-span-6 lg:col-span-7" />
          </div>

          {/* Bottom Indicators */}
          <div className="absolute bottom-10 left-8 md:left-16 right-8 md:right-16 flex justify-between items-end pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="hidden lg:flex items-center gap-8"
            >
              <div className="w-12 h-px bg-white/10" />
              <span className="text-[9px] uppercase tracking-[0.6em] text-white/10">Establishing Studio</span>
            </motion.div>
            
            <div className="flex flex-col items-center gap-4 mx-auto md:mx-0">
              <span className="text-[9px] uppercase tracking-[1em] text-white/10">Discover</span>
              <div className="w-px h-12 bg-white/10 relative overflow-hidden">
                <motion.div 
                  animate={{ y: [-48, 48] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent via-white/40 to-transparent" 
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

