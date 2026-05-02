import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveringName, setHoveringName] = useState(false);
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  // Cursor-based ambient glow
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      if (!glowRef.current) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background =
        `radial-gradient(600px circle at ${x}% ${y}%, rgba(124,58,237,0.08) 0%, transparent 60%)`;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: iframeLoaded ? 1 : 0, y: iframeLoaded ? 0 : 20 },
    transition: { delay, duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] },
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-between"
          style={{
            background: 'linear-gradient(160deg, #0a0a18 0%, #080810 50%, #060610 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Cursor glow layer */}
          <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0 transition-all duration-300" />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px',
            }}
          />

          {/* ── TOP: Logo ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10 flex items-center gap-2.5 pt-6"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.25)',
              }}
            >
              <span className="text-xs font-orbitron font-black" style={{ color: '#a78bfa' }}>ED</span>
            </div>
            <span
              className="text-[11px] font-mono tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Portfolio v2.0
            </span>
          </motion.div>

          {/* ── MIDDLE: Robot + Name + Subtitle ─────────────────── */}
          <div className="relative z-10 flex flex-col items-center flex-1 justify-center w-full px-6" style={{ gap: 0 }}>

            {/* Robot iframe — reduced size, floating */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
              style={{ width: 'min(240px, 60vw)', height: 'min(240px, 60vw)', marginBottom: '-8px' }}
            >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <iframe
                src="https://my.spline.design/genkubgreetingrobot-cGfOs2mjmRDB944J84eIItar/"
                frameBorder="0"
                title="Greeting Robot"
                allow="autoplay"
                onLoad={() => setIframeLoaded(true)}
                style={{
                  border: 'none',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                }}
              />
              {/* Solid overlay to perfectly hide the Spline badge pill */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 140,
                height: 50,
                background: 'linear-gradient(160deg, #0a0a18, #080810)',
                zIndex: 50
              }} />
            </div>
              {/* Soft ambient glow under robot */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: '70%', height: 40,
                  background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              {...fadeUp(0.3)}
              className="font-orbitron font-black text-center leading-none select-none mt-6 mb-3 cursor-default"
              style={{ fontSize: 'clamp(2rem, 10vw, 4.5rem)', letterSpacing: '-0.02em' }}
              onMouseEnter={() => setHoveringName(true)}
              onMouseLeave={() => setHoveringName(false)}
            >
              <span
                style={{
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  filter: hoveringName
                    ? 'drop-shadow(0 0 12px rgba(167,139,250,0.5))'
                    : 'none',
                  transition: 'filter 0.3s ease',
                }}
              >
                {hoveringName && (
                  <>
                    <span style={{
                      position: 'absolute', inset: 0, color: '#00e5ff',
                      opacity: 0.4, transform: 'translate(-2px, 0)', pointerEvents: 'none'
                    }}>EASHAN&nbsp;DARSH</span>
                    <span style={{
                      position: 'absolute', inset: 0, color: '#ff2d78',
                      opacity: 0.4, transform: 'translate(2px, 0)', pointerEvents: 'none'
                    }}>EASHAN&nbsp;DARSH</span>
                  </>
                )}
                EASHAN&nbsp;DARSH
              </span>
            </motion.h1>

            {/* Thin divider */}
            <motion.div
              {...fadeUp(0.45)}
              style={{
                width: 48, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
                marginBottom: 16,
              }}
            />

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.55)}
              className="font-mono text-center uppercase"
              style={{
                fontSize: 'clamp(9px, 2.2vw, 12px)',
                letterSpacing: '0.18em',
                color: 'rgba(0,245,255,0.7)',
                marginBottom: 32,
              }}
            >
              AI Developer &amp; Full-Stack Engineer
            </motion.p>

            {/* CTA Button */}
            <motion.div {...fadeUp(0.7)}>
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-3 font-semibold text-sm tracking-wide overflow-hidden"
                style={{
                  padding: '14px 36px',
                  borderRadius: 14,
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(139,92,246,0.35)',
                  color: '#c4b5fd',
                  boxShadow: '0 0 0 rgba(124,58,237,0)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.35)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(124,58,237,0)'}
              >
                {/* Gradient shimmer on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.08) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative">Enter Portfolio</span>
                <motion.span
                  className="relative"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── BOTTOM: Scroll hint ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: iframeLoaded ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-2 pb-6"
          >
            <motion.div
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 1, height: 28,
                background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)',
              }}
            />
          </motion.div>

          {/* ── Loading skeleton ─────────────────────────────────── */}
          <AnimatePresence>
            {!iframeLoaded && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(160deg, #0a0a18, #080810)' }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  <span className="text-lg font-orbitron font-black" style={{ color: '#a78bfa' }}>ED</span>
                </motion.div>
                <motion.p
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="text-[10px] font-mono tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  Loading...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
