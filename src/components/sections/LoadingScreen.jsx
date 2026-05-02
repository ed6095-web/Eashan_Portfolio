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
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col"
          style={{ background: '#080810' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* ── Spline Robot — top 55% of screen ─────────────────── */}
          <div className="relative w-full" style={{ height: '58%', flexShrink: 0 }}>
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-cGfOs2mjmRDB944J84eIItar/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
              onLoad={() => setIframeLoaded(true)}
              title="Greeting Robot"
              allow="autoplay"
            />
            {/* ── Hide "Built with Spline" badge ── */}
            <div
              className="absolute bottom-0 right-0 z-50"
              style={{ width: 160, height: 44, background: '#080810' }}
            />
            {/* Bottom fade into text area */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ height: 80, background: 'linear-gradient(to top, #080810 0%, transparent 100%)' }}
            />
          </div>

          {/* ── Text + CTA — bottom 45% ───────────────────────────── */}
          <div
            className="flex flex-col items-center justify-center flex-1 px-6 pb-8 pt-2"
            style={{ background: '#080810' }}
          >
            {/* Purple glow behind text */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 400, height: 300,
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)',
                bottom: '15%', left: '50%', transform: 'translateX(-50%)',
              }}
            />

            {/* Animated tagline */}
            <div className="h-8 mb-3 overflow-hidden w-full text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-sm md:text-base font-mono text-center"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {LINES[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: iframeLoaded ? 1 : 0, y: iframeLoaded ? 0 : 16 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-orbitron font-black text-center leading-none mb-2 select-none"
              style={{ fontSize: 'clamp(2rem, 9vw, 5rem)', letterSpacing: '-0.02em' }}
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
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-8 text-center"
              style={{ color: '#00f5ff', textShadow: '0 0 16px rgba(0,245,255,0.35)' }}
            >
              AI Developer &amp; Full-Stack Engineer
            </motion.p>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: iframeLoaded ? 1 : 0, y: iframeLoaded ? 0 : 10 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              onClick={handleEnter}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(139,92,246,0.45)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-semibold tracking-wider transition-all duration-300"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#c4b5fd',
                  boxShadow: '0 0 20px rgba(124,58,237,0.2)',
                }}
              >
                Enter Portfolio
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>
          </div>

          {/* ── Top-left ED badge ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: iframeLoaded ? 1 : 0, x: iframeLoaded ? 0 : -16 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-4 z-30 flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <span className="text-xs font-orbitron font-black" style={{ color: '#c4b5fd' }}>ED</span>
            </div>
            <span className="text-[10px] font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Portfolio v2.0
            </span>
          </motion.div>

          {/* ── Skeleton while iframe loads ───────────────────────── */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center"
              style={{ background: '#080810' }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
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
