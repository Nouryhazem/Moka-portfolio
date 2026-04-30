import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Magnetic from './Magnetic';

import aiCover from '../assets/cover/ai.png';
import d2Cover from '../assets/cover/2D.png';
import filmCover from '../assets/cover/film.png';

import aiVideo from '../assets/ai/loman.mp4';
import d2Video from '../assets/2d/mosv.mp4';
import filmVideo from '../assets/film/ops.mp4';

interface Category {
  id: string;
  label: string;
  previewImage: string;
  previewVideo: string;
  description: string;
}

const categories: Category[] = [
  { 
    id: 'ai', 
    label: 'AI Direction', 
    previewImage: aiCover, 
    previewVideo: aiVideo,
    description: 'Neural synthesis and generative cinematic experiences.'
  },
  { 
    id: '2d', 
    label: '2D Animation', 
    previewImage: d2Cover, 
    previewVideo: d2Video,
    description: 'Fluid motion and hand-crafted digital storytelling.'
  },
  { 
    id: 'films', 
    label: 'Cinematic Films', 
    previewImage: filmCover, 
    previewVideo: filmVideo,
    description: 'High-end direction for commercial and artistic films.'
  }
];

export default function Projects() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-background flex flex-col justify-center py-24 md:py-32 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="px-6 md:px-12 mb-12 relative z-10">
        <motion.div
          style={{ 
            opacity: headerOpacity,
            y: headerY
          }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.6em] text-foreground/40 mb-4 block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-foreground">
              Selected <span className="text-foreground/60 italic font-serif">Works</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Magnetic strength={0.2}>
              <button 
                onClick={() => scroll('left')}
                className="p-3 md:p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 glass-sweep"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button 
                onClick={() => scroll('right')}
                className="p-3 md:p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 glass-sweep"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 md:gap-12 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 relative z-10"
      >
        {categories.map((cat, index) => (
          <ProjectCard
            key={cat.id}
            cat={cat}
            index={index}
            onClick={() => navigate(`/projects/${cat.id}`)}
            scrollYProgress={scrollYProgress}
            containerRef={scrollRef}
          />
        ))}
        
        {/* Spacer for ending scroll */}
        <div className="flex-shrink-0 w-[10vw] md:w-[20vw]" />
      </div>

      {/* Scroll Hint */}
      <div className="px-6 md:px-12 mt-8 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/10" />
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
          Scroll to explore
        </span>
        <div className="h-[1px] w-20 bg-white/10" />
      </div>
    </section>
  );
}

function ProjectCard({ 
  cat, 
  index, 
  onClick, 
  scrollYProgress,
  containerRef
}: { 
  cat: Category, 
  index: number, 
  onClick: () => void, 
  key?: string | number,
  scrollYProgress: any,
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Horizontal scroll-based parallax and focus
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Spring configuration for premium feel
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // 1. Center Focus Logic (based on horizontal position)
  const focusScale = useSpring(useTransform(scrollXProgress, [0, 0.5, 1], [0.92, 1, 0.92]), springConfig);
  const focusOpacity = useSpring(useTransform(scrollXProgress, [0, 0.5, 1], [0.6, 1, 0.6]), springConfig);
  
  // 2. Vertical Scroll Influence (Depth & Parallax)
  const verticalShift = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
  const verticalRotate = useSpring(useTransform(scrollYProgress, [0, 1], [5, -5]), springConfig);
  
  // 3. Layered Parallax
  const cardX = useSpring(useTransform(scrollXProgress, [0, 1], [60, -60]), springConfig);
  const innerParallaxX = useSpring(useTransform(scrollXProgress, [0, 1], [-30, 30]), springConfig);
  const glowParallaxX = useSpring(useTransform(scrollXProgress, [0, 1], [-50, 50]), springConfig);

  // Mouse position for 3D tilt (Keep existing)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Parallax for content (Mouse-based)
  const mouseContentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const mouseContentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="view"
      whileHover={{ scale: 1.04 }}
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[50vh] md:h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer group snap-center liquid-glass glass-sweep"
      style={{ 
        perspective: '1200px',
        rotateX: isHovered ? mouseRotateX : verticalRotate,
        rotateY: isHovered ? mouseRotateY : 0,
        scale: focusScale,
        opacity: focusOpacity,
        x: cardX,
        y: verticalShift
      }}
    >
      {/* Glassmorphism Border */}
      <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] z-30 pointer-events-none group-hover:border-white/30 transition-colors duration-500" />
      
      {/* Main Content Container */}
      <motion.div 
        className="relative w-full h-full overflow-hidden"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image Layer with Parallax */}
        <motion.img
          src={cat.previewImage}
          alt={cat.label}
          style={{ 
            x: isHovered ? mouseContentX : innerParallaxX, 
            y: mouseContentY, 
            scale: 1.2 
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
            isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Video Layer with Parallax */}
        <motion.video
          ref={videoRef}
          src={cat.previewVideo}
          muted
          loop
          playsInline
          style={{ 
            x: isHovered ? mouseContentX : innerParallaxX, 
            y: mouseContentY, 
            scale: 1.25 
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out brightness-[0.6] group-hover:brightness-100 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-110'
          }`}
        />

        {/* Dynamic Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-60' : 'opacity-100'}`} />
        
        {/* Info Overlay */}
        <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-end z-20">
          <motion.div
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/50 mb-3 block">
              {cat.id === 'ai' ? 'Generative' : cat.id === '2d' ? 'Animation' : 'Film'}
            </span>
            <h3 className="text-3xl md:text-5xl font-sans font-medium tracking-tighter text-white mb-4">
              {cat.label}
            </h3>
            
            <motion.div
              initial={false}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm text-white/60 max-w-[300px] leading-relaxed mb-6">
                {cat.description}
              </p>
              <div className="flex items-center gap-3 text-white group/btn">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">View Project</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Play Icon Hint */}
        <div className="absolute top-10 right-10 z-20">
          <motion.div
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5,
              rotate: isHovered ? 0 : -45
            }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
          >
            <Play size={18} className="text-white fill-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Hover Glow Effect with Parallax */}
      <motion.div 
        style={{ x: glowParallaxX }}
        className={`absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 pointer-events-none z-0`} 
      />
    </motion.div>
  );
}
