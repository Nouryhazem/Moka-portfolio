import { motion } from 'motion/react';
import Magnetic from './Magnetic';
import { 
  Sparkles, 
  Wand2, 
  BookOpen, 
  ArrowRight, 
  Instagram, 
  Menu,
  X
} from 'lucide-react';
import backgroundVideo from '../assets/hero-video.mp4';

interface ContactProps {
  onClose?: () => void;
  isSection?: boolean;
  key?: string;
}

export default function Contact({ onClose, isSection = false }: ContactProps) {
  const containerClasses = isSection 
    ? "relative w-full min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden"
    : "fixed inset-0 z-[200] bg-background overflow-y-auto flex flex-col lg:flex-row";

  return (
    <motion.section
      initial={isSection ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClasses}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-full">
        
        {/* Left Panel (52%) */}
        <div className="relative w-full lg:w-[52%] min-h-screen lg:h-screen p-4 lg:p-6">
          <div className="liquid-glass-strong h-full rounded-3xl flex flex-col p-8 lg:p-12">
            
            {/* Nav */}
            <div className="flex justify-between items-start mb-12 lg:mb-auto">
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-semibold tracking-tighter text-foreground">
                  Moka
                </div>
                <div className="text-[8px] tracking-[0.3em] uppercase text-foreground/40">
                  AVAILABLE FOR WORK
                </div>
              </div>
              {!isSection && onClose && (
                <Magnetic strength={0.15}>
                  <motion.button 
                    onClick={onClose}
                    whileHover={{ scale: 1.04 }}
                    className="liquid-glass px-6 py-2 rounded-full flex items-center gap-2 text-sm transition-all duration-300 cursor-pointer glass-sweep"
                  >
                    Close <X size={16} />
                  </motion.button>
                </Magnetic>
              )}
            </div>

            {/* Hero Center */}
            <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-[-0.05em] text-foreground leading-[1.1] mb-8">
                Let’s create something that / <em className="font-serif text-foreground/20 not-italic">moves</em>
              </h1>

              <div className="flex flex-wrap gap-3 mb-12">
                {["2D Animation", "3D Motion", "AI Video"].map((pill) => (
                  <span key={pill} className="liquid-glass px-4 py-1.5 rounded-full text-xs text-foreground/80">
                    {pill}
                  </span>
                ))}
              </div>

              <Magnetic strength={0.2} className="self-start">
                <motion.a 
                  href="mailto:adobemoka@gmail.com"
                  whileHover={{ scale: 1.04 }}
                  className="liquid-glass-strong px-8 py-4 rounded-full flex items-center gap-4 transition-all duration-300 group glass-sweep"
                >
                  <span className="text-lg font-medium">Start a Project</span>
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.a>
              </Magnetic>
            </div>

            {/* Bottom Quote */}
            <div className="mt-auto pt-12 lg:pt-0">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-foreground/10" />
                <p className="text-lg font-serif italic text-foreground/80">
                  Animation that feels alive.
                </p>
                <div className="h-[1px] flex-1 bg-foreground/10" />
              </div>
              <div className="text-center mt-4 text-[10px] tracking-[0.4em] text-foreground/40">
                MOKA
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (48%) */}
        <div className="flex w-full lg:w-[48%] min-h-screen lg:h-screen flex-col p-4 lg:p-6 gap-6">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="liquid-glass px-4 py-2 rounded-full flex items-center gap-4">
              <a href="https://www.instagram.com/moka.animation/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Instagram size={18} className="text-foreground/80" />
              </a>
              <a href="https://wa.me/201068318185" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <div className="text-xs font-medium text-foreground/80">WhatsApp</div>
              </a>
              <ArrowRight size={14} className="text-foreground/40" />
            </div>

              <Magnetic strength={0.1}>
                <a 
                  href="mailto:adobemoka@gmail.com"
                  className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 glass-sweep"
                >
                  <Sparkles size={18} className="text-foreground/80" />
                </a>
              </Magnetic>
          </div>

          {/* Community Card */}
          <div className="liquid-glass w-full lg:w-64 p-6 rounded-3xl mt-6 lg:mt-12">
            <h3 className="text-sm font-medium text-foreground mb-2">Get in touch</h3>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Reach out for projects, collaborations, or creative direction.
            </p>
          </div>

          {/* Bottom Feature Section */}
          <div className="mt-auto liquid-glass p-3 rounded-[2.5rem]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <a 
                href="mailto:adobemoka@gmail.com"
                className="liquid-glass rounded-3xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Wand2 size={16} />
                </div>
                <div className="text-sm font-medium">Email</div>
              </a>
              <a 
                href="https://wa.me/201068318185"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass rounded-3xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                <div className="text-sm font-medium">WhatsApp</div>
              </a>
            </div>

            <div className="liquid-glass rounded-3xl p-6 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium mb-1">Follow on Instagram</h4>
                <p className="text-xs text-foreground/50">@moka.animation</p>
              </div>
              <a 
                href="https://www.instagram.com/moka.animation/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-xl font-light">+</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Glass Light Sweep */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] blur-3xl"
      />
    </motion.section>
  );
}
