import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import Magnetic from './Magnetic';
import img1 from '../assets/floating/1.jpg';
import img2 from '../assets/floating/2.png';
import img3 from '../assets/floating/3.png';
import img4 from '../assets/floating/4.jpg';
import img5 from '../assets/floating/5.jpg';
import img6 from '../assets/floating/6.jpg';
import img7 from '../assets/floating/7.jpg';
import img8 from '../assets/floating/8.jpg';
import img9 from '../assets/floating/9.jpg';


interface FloatingItem {
  id: number;
  src: string;
  size: number;
  initialPos: { top?: string; left?: string; right?: string; bottom?: string };
  targetPos: { x: number; y: number }; // Relative to center
}

const floatingItems: FloatingItem[] = [
  { id: 1, src: img1, size: 72, initialPos: { top: '10%', left: '15%' }, targetPos: { x: -100, y: -50 } },
  { id: 2, src: img2, size: 56, initialPos: { top: '5%', left: '45%' }, targetPos: { x: 0, y: -120 } },
  { id: 3, src: img3, size: 64, initialPos: { top: '15%', right: '15%' }, targetPos: { x: 120, y: -60 } },
  { id: 4, src: img4, size: 56, initialPos: { top: '40%', left: '8%' }, targetPos: { x: -150, y: 0 } },
  { id: 5, src: img5, size: 72, initialPos: { top: '35%', right: '10%' }, targetPos: { x: 150, y: 20 } },
  { id: 6, src: img6, size: 64, initialPos: { bottom: '15%', left: '12%' }, targetPos: { x: -120, y: 80 } },
  { id: 7, src: img7, size: 56, initialPos: { bottom: '10%', left: '40%' }, targetPos: { x: -20, y: 150 } },
  { id: 8, src: img8, size: 72, initialPos: { bottom: '12%', right: '18%' }, targetPos: { x: 100, y: 100 } },
  { id: 9, src: img9, size: 60, initialPos: { top: '50%', right: '5%' }, targetPos: { x: 180, y: -30 } },
];

export default function Collaborations() {
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

  // Floating items inward movement on scroll
  const ecosystemScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  return (
    <div id="social-section" ref={containerRef} className="relative h-[100vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* FLOATING ECOSYSTEM */}
        <motion.div 
          style={{ scale: ecosystemScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Floating Images */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingItems.map((item) => {
              // Subtle movement based on scroll
              const xMove = useTransform(smoothProgress, [0, 1], [0, item.targetPos.x * 0.5]);
              const yMove = useTransform(smoothProgress, [0, 1], [0, item.targetPos.y * 0.5]);

              const style: any = { ...item.initialPos };
              
              return (
                <Magnetic key={item.id} strength={1.2}>
                  <motion.div
                    style={{
                      ...style,
                      width: item.size,
                      height: item.size,
                      position: 'absolute',
                      x: xMove,
                      y: yMove,
                    }}
                    whileHover={{ scale: 1.04 }}
                    animate={{
                      y: [0, 12, 0, -12, 0],
                      x: [0, -8, 0, 8, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 8 + (item.id % 4) * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.id * 0.5
                    }}
                    data-cursor="view"
                    className="rounded-xl overflow-hidden liquid-glass shadow-2xl cursor-pointer glass-sweep"
                  >
                    <img src={item.src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                </Magnetic>
              );
            })}
          </div>

          <div className="max-w-[720px] relative z-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-foreground leading-[1.1]">
              You don’t just watch motion<br />
              <span className="text-foreground/80 italic font-serif">you become part of it</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-[540px] mx-auto leading-relaxed">
              A network of creators, brands, and stories brought to life through motion.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
