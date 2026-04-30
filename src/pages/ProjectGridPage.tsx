import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, X } from 'lucide-react';

import aiVideo1 from '../assets/ai/oka.mp4';
import aiVideo2 from '../assets/ai/loman.mp4';
import aiVideo3 from '../assets/ai/dontcall.mp4';
import aiVideo4 from '../assets/ai/hara.mp4';
import aiVideo5 from '../assets/ai/shehab.mp4';
import aiVideo6 from '../assets/ai/vangough.mp4';
import aiVideo7 from '../assets/ai/nos.mp4';
import aiVideo8 from '../assets/ai/mgabd.mp4';
import aiVideo9 from '../assets/ai/masak.mp4';

import d2Video1 from '../assets/2d/intro.mp4';
import d2Video2 from '../assets/2d/animation.mp4';
import d2Video3 from '../assets/2d/mosv.mp4';
import d2Video4 from '../assets/2d/turkey.mp4';
import d2Video5 from '../assets/2d/making.mp4';
import d2Video6 from '../assets/2d/yhya.mp4';
import d2Video7 from '../assets/2d/khf.mp4';


import filmVideo1 from '../assets/film/ops.mp4';
import filmVideo2 from '../assets/film/ships.mp4';
import filmVideo3 from '../assets/film/calcks.mp4';
import filmVideo4 from '../assets/film/contrast.mp4';

import { Project, CategoryData } from '../types';

const categoryData: Record<string, CategoryData> = {
  ai: {
    title: 'AI Projects',
    projects: [
      { id: 1, title: 'vid 1', category: 'AI', video: aiVideo1, aspectRatio: 'square' },
      { id: 2, title: 'vid 2', category: 'AI', video: aiVideo2, aspectRatio: 'portrait' },
      { id: 3, title: 'vid 3', category: 'AI', video: aiVideo3, aspectRatio: 'wide' },
      { id: 4, title: 'vid 4', category: 'AI', video: aiVideo4, aspectRatio: 'portrait' },
      { id: 5, title: 'vid 5', category: 'AI', video: aiVideo5, aspectRatio: 'square' },
      { id: 6, title: 'vid 6', category: 'AI', video: aiVideo6, aspectRatio: 'wide' },
      { id: 7, title: 'vid 7', category: 'AI', video: aiVideo7, aspectRatio: 'portrait' },
      { id: 8, title: 'vid 8', category: 'AI', video: aiVideo8, aspectRatio: 'square' },
      { id: 9, title: 'vid 9', category: 'AI', video: aiVideo9, aspectRatio: 'wide' },

    ]
  },
  '2d': {
    title: '2D Animation',
    projects: [
      { id: 11, title: 'vid 1', category: '2D', video: d2Video1, aspectRatio: 'portrait' },
      { id: 12, title: 'vid 2', category: '2D', video: d2Video2, aspectRatio: 'wide' },
      { id: 13, title: 'vid 3', category: '2D', video: d2Video3, aspectRatio: 'square' },
      { id: 14, title: 'vid 4', category: '2D', video: d2Video4, aspectRatio: 'square' },
      { id: 15, title: 'vid 5', category: '2D', video: d2Video5, aspectRatio: 'portrait' },
      { id: 16, title: 'vid 6', category: '2D', video: d2Video6, aspectRatio: 'wide' },
      { id: 17, title: 'vid 7', category: '2D', video: d2Video7, aspectRatio: 'portrait' },
      
    ]
  },
  films: {
    title: 'Films',
    projects: [
      { id: 21, title: 'vid 1', category: 'Film', video: filmVideo1, aspectRatio: 'wide' },
      { id: 22, title: 'vid 2', category: 'Film', video: filmVideo2, aspectRatio: 'portrait' },
      { id: 23, title: 'vid 3', category: 'Film', video: filmVideo3, aspectRatio: 'square' },
      { id: 24, title: 'vid 4', category: 'Film', video: filmVideo4, aspectRatio: 'square' },
      
    ]
  }
};

const transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1]
};

export default function ProjectGridPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const data = categoryData[category?.toLowerCase() || ''];

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Category not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center px-6 bg-background/80 backdrop-blur-md border-b border-white/5">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <ArrowLeft size={14} />
          Back
        </button>

        <h1 className="flex-1 text-center text-sm uppercase tracking-widest">
          {data.title}
        </h1>
      </header>

      {/* Grid */}
      <main className="pt-32 px-6 max-w-[1400px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {data.projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} />
            </button>

            <motion.video
              src={selectedProject.video}
              autoPlay
              controls
              className="max-w-[90%] max-h-[90%]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, onClick }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // render first frame (no black)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playAndPause = async () => {
      try {
        await video.play();
        video.pause();
        video.currentTime = 2;
      } catch {
        video.currentTime = 0.01;
      }
    };

    playAndPause();
  }, []);

  const handleEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[16/9]'
  }[project.aspectRatio];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...transition, delay: index * 0.05 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative ${aspectClass} rounded-xl overflow-hidden cursor-pointer`}
    >
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
          isHovered ? 'scale-100' : 'scale-105'
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition" />

      {/* Info */}
      <div className="absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition">
        <h3>{project.title}</h3>
        <p className="text-xs opacity-70">{project.category}</p>
      </div>

      {/* Play icon */}
      <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition text-white">
        <Play size={16} />
      </div>
    </motion.div>
  );
}