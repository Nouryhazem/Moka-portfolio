import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Magnetic from './Magnetic';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled 
          ? 'py-4 bg-black/40 backdrop-blur-xl border-b border-white/5' 
          : 'py-10 bg-transparent'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-8 md:px-16 flex justify-between items-center">
        <Magnetic strength={0.1}>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[12px] tracking-[0.6em] font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            MOKA
          </button>
        </Magnetic>
        
        <nav className="flex gap-10 md:gap-16">
          {['Work', 'About', 'Contact'].map((item) => (
            <Magnetic key={item} strength={0.05}>
              <button 
                onClick={() => {
                  const idMap: Record<string, string> = {
                    'Work': 'projects-section',
                    'About': 'about-section',
                    'Contact': 'contact-section'
                  };
                  const el = document.getElementById(idMap[item]);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else if (item === 'Contact') {
                    onContactClick();
                  }
                }}
                className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors cursor-pointer"
              >
                {item}
              </button>
            </Magnetic>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
