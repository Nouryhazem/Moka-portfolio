import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Marquee from '../components/Marquee';
import Contact from '../components/Contact';
import Collaborations from '../components/Collaborations';
import About from '../components/About';
import Process from '../components/Process';
import Projects from '../components/Projects';
import Magnetic from '../components/Magnetic';
import SoundToggle from '../components/SoundToggle';
import { useAudio } from '../context/AudioContext';

export default function HomePage() {
  const [showContact, setShowContact] = useState(false);
  const { playWhoosh } = useAudio();
  const currentSection = useRef<string>('');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'process', 'collaborations', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id !== currentSection.current) {
            playWhoosh();
            currentSection.current = id;
          }
        }
      });
    }, { threshold: 0.3 });

    // Find and observe sections
    const observeSections = () => {
      const heroEl = document.querySelector('section'); // Hero is the first section
      if (heroEl) {
        heroEl.id = 'hero';
        observer.observe(heroEl);
      }
      
      ['about-section', 'projects-section', 'process-section', 'collaborations-section', 'contact-section'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeSections();

    return () => observer.disconnect();
  }, [playWhoosh]);

  return (
    <main className="relative min-h-screen bg-bg">
      <SoundToggle />

      <AnimatePresence>
        {showContact && (
          <Contact key="contact" onClose={() => setShowContact(false)} />
        )}
      </AnimatePresence>

      <div 
        id="main-content" 
        className="relative"
      >
        <Header onContactClick={() => setShowContact(true)} />
        
        <Hero onContactClick={() => setShowContact(true)} />
        
        <div className="py-12 md:py-24">
          <Marquee />
        </div>
        
        <div id="about-section" className="py-12 md:py-24">
          <About />
        </div>

        {/* Projects Section (Stacked Slices) */}
        <div id="projects-section">
          <Projects />
        </div>

        <div id="process-section">
          <Process />
        </div>
        
        {/* Main Content Sections */}
        <div className="relative z-30 bg-bg py-12 md:py-24">
          <div id="collaborations-section">
            <Collaborations />
          </div>

          {/* Contact Section as Last Section */}
          <div id="contact-section" className="py-12 md:py-24">
            <Contact isSection={true} />
          </div>

          <div className="w-full max-w-[1280px] mx-auto px-12">
            <footer className="py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              <div className="text-muted text-[10px] uppercase tracking-[0.4em]">
                © 2026 Moka Studio
              </div>
              <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em]">
                <Magnetic strength={0.1}>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Twitter</a>
                </Magnetic>
                <Magnetic strength={0.1}>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">GitHub</a>
                </Magnetic>
                <Magnetic strength={0.1}>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">LinkedIn</a>
                </Magnetic>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}