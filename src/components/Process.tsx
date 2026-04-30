import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import backgroundVideo from '../assets/hero-video.mp4';

interface Step {
  number: string;
  title: string;
  description: string;
  video: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Concept",
    description: "Every project starts with a clear idea — emotion, message, and purpose.",
    video: backgroundVideo
  },
  {
    number: "02",
    title: "Visual Direction",
    description: "Designing the world — style, lighting, composition, and storytelling.",
    video: backgroundVideo
  },
  {
    number: "03",
    title: "Production",
    description: "Bringing it to life using 2D, 3D, and AI-driven workflows.",
    video: backgroundVideo
  },
  {
    number: "04",
    title: "Final Output",
    description: "Polished visuals crafted for impact, clarity, and cinematic presence.",
    video: backgroundVideo
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Header animations
  const headerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.1], [0, -40]);

  // Timeline line growth
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);
  
  // Dot position
  const dotY = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section 
      id="process-section" 
      ref={containerRef} 
      className="relative h-[400vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Header (Initial View) */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h2 className="text-5xl lg:text-6xl font-sans font-medium tracking-tight text-foreground">
            From Idea to Motion
          </h2>
          <p className="text-foreground/60 mt-4 text-lg max-w-[480px]">
            A structured approach to crafting cinematic experiences.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center">
          
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-[40%] top-[20%] bottom-[20%] w-[1px] bg-foreground/10">
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-foreground/40 origin-top"
            />
            {/* Moving Dot */}
            <motion.div
              style={{ top: dotY }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
            />
          </div>

          {/* Steps */}
          <div className="ml-16 md:ml-[45%] w-full max-w-[420px] relative">
            {steps.map((step, index) => {
              const stepStart = 0.1 + (index * 0.2);
              const stepEnd = stepStart + 0.2;
              
              // Reveal animations
              const opacity = useTransform(smoothProgress, [stepStart, stepStart + 0.05, stepEnd - 0.05, stepEnd], [0, 1, 1, 0]);
              const y = useTransform(smoothProgress, [stepStart, stepStart + 0.05], [40, 0]);
              const blur = useTransform(smoothProgress, [stepStart, stepStart + 0.05], ["blur(4px)", "blur(0px)"]);
              const scale = useTransform(smoothProgress, [stepStart, stepStart + 0.05, stepEnd - 0.05, stepEnd], [1, 1.03, 1.03, 1]);
              const x = useTransform(smoothProgress, [stepStart, stepEnd], [0, 20]);

              return (
                <div key={step.number} className="absolute top-1/2 -translate-y-1/2 w-full">
                  <motion.div
                    style={{ 
                      opacity, 
                      y, 
                      filter: blur,
                      scale,
                      x
                    }}
                    className="flex flex-col gap-4"
                  >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-foreground/40 font-medium">
                      {step.number} — {step.title}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-foreground leading-tight">
                      {step.description}
                    </h3>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>
    </section>
  );
}
