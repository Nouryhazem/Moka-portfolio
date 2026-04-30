import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'play'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      if (cursorAttr === 'view') {
        setCursorType('view');
      } else if (cursorAttr === 'play') {
        setCursorType('play');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 250,
            mass: 0.5,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: cursorType === 'default' ? 1 : 4,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative flex items-center justify-center"
          >
            {/* Main Cursor Dot */}
            <div className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity duration-300 ${cursorType !== 'default' ? 'opacity-0' : 'opacity-100'}`} />
            
            {/* Cursor Text */}
            <AnimatePresence mode="wait">
              {cursorType !== 'default' && (
                <motion.span
                  key={cursorType}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute text-[3px] uppercase tracking-[0.2em] font-bold text-black z-10"
                >
                  {cursorType}
                </motion.span>
              )}
            </AnimatePresence>
            
            {/* Outer Ring for interactive states */}
            {cursorType !== 'default' && (
              <motion.div
                layoutId="cursor-ring"
                className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-sm rounded-full -z-10 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
