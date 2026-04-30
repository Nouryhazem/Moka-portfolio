import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import backgroundVideo from '../assets/about.mp4';
import { useAudio } from '../context/AudioContext';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const { isMuted } = useAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // 🎬 TEXT (faster + cinematic)
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.45, 0.6], [0, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [50, 0]);

  // 🎬 VIDEO (tighter + more alive)
  const videoOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const videoScale = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0.92, 1, 0.95]);
  const videoRotateX = useTransform(smoothProgress, [0.2, 0.5, 0.8], [10, 0, -8]);
  const videoY = useTransform(smoothProgress, [0.2, 0.5, 0.8], [80, 0, -80]);

  // 🎯 focus micro detail
  const focusScale = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0.97, 1, 0.97]);

  // 🎬 Sync mute state instantly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 🚀 Play when in view, pause when out
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const playVideo = async () => {
        try {
          // Sync mute state before playing
          video.muted = isMuted;
          await video.play();
        } catch (error) {
          // If autoplay with sound is blocked, fallback to muted play
          video.muted = true;
          video.play().catch(e => console.error("Video play failed:", e));
        }
      };
      playVideo();
    } else {
      video.pause();
    }
  }, [isInView]); // Removed isMuted from here to prevent video restart on toggle

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-background py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">

        {/* TEXT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center mb-20 md:mb-28 max-w-[900px]"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-foreground/40 mb-6 block">
            The Philosophy
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
            I don’t create visuals<br />
            <span className="italic font-serif text-foreground/80">
              I create worlds
            </span>
          </h2>

          <p className="text-lg md:text-xl text-foreground/50 max-w-[600px] mx-auto leading-relaxed">
            Moka is a creative studio specializing in high-end animation and cinematic direction.
            We bridge imagination and reality.
          </p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          style={{
            opacity: videoOpacity,
            scale: videoScale,
            rotateX: videoRotateX,
            y: videoY
          }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden group cursor-pointer shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] glass-sweep"
        >
          <motion.video
            ref={videoRef}
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0.05;
              }
            }}
            playsInline
            loop
            muted
            style={{
              scale: focusScale
            }}
            className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.08] transition-all duration-1000 ease-[0.22,1,0.36,1]"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </motion.video>

          {/* 🎬 DEPTH OVERLAY */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700" />

          {/* ✨ LIGHT REFLECTION */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

          {/* 🎬 CINEMATIC FADE */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/20 pointer-events-none" />

          {/* INFO */}
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end text-white pointer-events-none">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-white/40">Studio</span>
              <p className="text-sm font-medium">Moka Visuals ©2026</p>
            </div>

            <div className="flex gap-10">
              <div className="text-right">
                <span className="text-[10px] tracking-[0.3em] text-white/40">Direction</span>
                <p className="text-sm font-medium">Cinematic</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] tracking-[0.3em] text-white/40">Motion</span>
                <p className="text-sm font-medium">High-End</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✨ GRAIN */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-[grain_8s_steps(10)_infinite]" />
      </div>
    </section>
  );
}