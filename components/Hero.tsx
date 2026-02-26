import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLUBS_LIST } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PopUp {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  colors: { bg: string; text: string };
}

const COLORS = [
  { bg: 'bg-blue-600', text: 'text-white' },
  { bg: 'bg-emerald-500', text: 'text-white' },
  { bg: 'bg-rose-500', text: 'text-white' },
  { bg: 'bg-yellow-400', text: 'text-black' },
  { bg: 'bg-purple-600', text: 'text-white' },
  { bg: 'bg-gray-900', text: 'text-white' },
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePopUp, setActivePopUp] = useState<PopUp | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // Calculate distance
    const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);
    
    // Only trigger if moved significantly to prevent spamming
    if (dist > 50 && !timeoutRef.current) {
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Randomize content
      const randomClub = CLUBS_LIST[Math.floor(Math.random() * CLUBS_LIST.length)];
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      const newPopUp: PopUp = {
        id: Date.now(),
        text: randomClub,
        x: Math.min(Math.max(relativeX + (Math.random() * 40 - 20), 50), rect.width - 150), // Keep roughly near cursor but bounded
        y: Math.min(Math.max(relativeY + (Math.random() * 40 - 20), 50), rect.height - 50),
        rotation: Math.random() * 10 - 5, // -5 to 5 deg
        colors: randomColor
      };

      setActivePopUp(newPopUp);

      // Clear popup after a delay
      timeoutRef.current = setTimeout(() => {
        setActivePopUp(null);
        timeoutRef.current = null; // Allow new popup
      }, 1500); 
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 border border-white/60 text-xs font-semibold tracking-wider text-gray-500 mb-6 backdrop-blur-sm">
            COLLEGE OF ENGINEERING PATHANAPURAM
          </span>
        </motion.div>
        
        <motion.h1 
          className="font-display text-8xl md:text-[10rem] leading-none text-gray-900 tracking-tighter mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          PEC<br />PORTAL
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The central hub for student innovation, events, and community leadership.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            to="/events" 
            className="group px-8 py-4 bg-gray-900 text-white rounded-full font-medium transition-all hover:bg-black hover:scale-105 flex items-center gap-2"
          >
            Explore Events <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/clubs"
            className="px-8 py-4 bg-white/50 backdrop-blur-md border border-white/50 text-gray-900 rounded-full font-medium hover:bg-white/80 transition-all hover:shadow-lg"
          >
            Join a Club
          </Link>
        </motion.div>
      </div>

      {/* Interactive Popups */}
      <AnimatePresence>
        {activePopUp && (
          <motion.div
            key={activePopUp.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: 'absolute',
              left: activePopUp.x,
              top: activePopUp.y,
              rotate: activePopUp.rotation,
            }}
            className={`h-12 flex items-center justify-center px-6 rounded-lg shadow-2xl z-20 pointer-events-none overflow-hidden whitespace-nowrap ${activePopUp.colors.bg}`}
          >
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.1 }}
               className={`font-display text-2xl ${activePopUp.colors.text}`}
             >
               {activePopUp.text}
             </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;