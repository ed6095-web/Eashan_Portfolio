import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 500);
          }, 250);
          return 100;
        }
        return prev + Math.random() * 4 + 1.5;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#080810' }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* BG gradient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 65%)' }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="relative mb-10"
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ margin: '-20px', border: '1px solid rgba(139,92,246,0.3)' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              style={{ margin: '-40px', border: '1px solid rgba(139,92,246,0.15)' }}
            />

            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.35)',
                boxShadow: '0 0 40px rgba(139,92,246,0.2)',
              }}
            >
              <span
                className="text-2xl font-orbitron font-black"
                style={{ color: '#c4b5fd' }}
              >
                ED
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs tracking-[0.35em] uppercase mb-10"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Eashan Darsh
          </motion.p>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-56 space-y-2.5"
          >
            <div className="flex justify-between text-[10px] font-mono"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              <span>Initializing</span>
              <span>{Math.min(100, Math.floor(progress))}%</span>
            </div>
            <div className="h-[1px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <motion.div
                className="h-full rounded-full loading-bar"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
