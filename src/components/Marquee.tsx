import { motion } from 'motion/react';

const marqueeText = "Cinematic Motion — 2D & 3D Animation — AI Films — Visual Storytelling — Direction — Creative Vision — Digital Art — ";

export default function Marquee() {
  return (
    <div className="relative w-full h-[70px] bg-black/20 backdrop-blur-sm border-y border-white/5 overflow-hidden flex items-center z-30">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 220,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap"
      >
        <span className="text-[20px] md:text-xs uppercase tracking-[0.4em] text-text/60 px-4">
          {marqueeText.repeat(4)}
        </span>
        <span className="text-[20px] md:text-xs uppercase tracking-[0.4em] text-text/60 px-4">
          {marqueeText.repeat(4)}
        </span>
      </motion.div>
    </div>
  );
}
