import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const LINES = [
  "Hello, I'm Eashan.",
  "I build AI systems.",
  "Welcome to my world.",
];

export default function LoadingScreen({ onComplete }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Cycle through taglines every 2s after iframe loads
  useEffect(() => {
    if (!iframeLoaded) return;
    const t = setInterval(() => {
      setLineIndex(prev => (prev + 1) % LINES.length);
    }, 2000);
    return () => clearInterval(t);
  }, [iframeLoaded]);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: '#080810' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* ── Spline Robot fullscreen ───────────────────────────── */}
          <iframe
            src="https://my.spline.design/genkubgreetingrobot-cGfOs2mjmRDB944J84eIItar/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ border: 'none', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            onLoad={() => setIframeLoaded(true)}
            title="Greeting Robot"
            allow="autoplay"
          />

          {/* ── Overlays ─────────────────────────────────────────── */}
          {/* Bottom dark fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.98) 0%, rgba(8,8,16,0.6) 60%, transparent 100%)' }}
          />
          {/* Top subtle vignette */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,0.7) 0%, transparent 100%)' }}
          />
          {/* Purple ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(124,58,237,0.12) 0%, transparent 65%)' }}
          />

          {/* ── Centered bottom text + CTA ───────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-12 px-6">

            {/* Animated tagline */}
            <div className="h-10 mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-lg md:text-xl font-mono text-center"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {LINES[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: iframeLoaded ? 1 : 0, y: iframeLoaded ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-orbitron font-black text-center leading-none mb-6 select-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              <span
                className="glitch-text"
                data-text="EASHAN DARSH"
                style={{ color: '#ffffff' }}
              >
                EASHAN&nbsp;DARSH
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: iframeLoaded ? 1 : 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xs font-mono tracking-[0.35em] uppercase mb-10 text-center"
              style={{ color: '#00f5ff', textShadow: '0 0 20px rgba(0,245,255,0.35)' }}
            >
              AI Developer &amp; Full-Stack Engineer
            </motion.p>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: iframeLoaded ? 1 : 0, y: iframeLoaded ? 0 : 12 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={handleEnter}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(139,92,246,0.45)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-semibold tracking-wider transition-all duration-300"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#c4b5fd',
                  boxShadow: '0 0 24px rgba(124,58,237,0.2)',
                }}
              >
                Enter Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>
          </div>

          {/* ── Top-left corner tag ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: iframeLoaded ? 1 : 0, x: iframeLoaded ? 0 : -16 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 left-6 z-20 flex items-center gap-2.5"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <span className="text-sm font-orbitron font-black" style={{ color: '#c4b5fd' }}>ED</span>
            </div>
            <span className="text-xs font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Portfolio v2.0
            </span>
          </motion.div>

          {/* ── Skeleton shimmer while iframe loads ─────────────── */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center"
              style={{ background: '#080810' }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
              >
                <span className="text-xl font-orbitron font-black" style={{ color: '#c4b5fd' }}>ED</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="text-[10px] font-mono tracking-[0.35em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Loading Experience...
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
