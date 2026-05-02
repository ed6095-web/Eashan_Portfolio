import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, Zap } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Spline 3D Robot — fullscreen background ───────────────────── */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/genkubgreetingrobot-cGfOs2mjmRDB944J84eIItar/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
          onLoad={() => setLoaded(true)}
          title="3D Greeting Robot"
          allow="autoplay"
        />
      </div>

      {/* ── Atmospheric overlays ────────────────────────────────────────── */}
      {/* Left dark vignette so text is always readable */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,  rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.65) 45%, rgba(8,8,16,0.05) 100%),
            linear-gradient(to top,    rgba(8,8,16,0.95) 0%, transparent 35%),
            linear-gradient(to bottom, rgba(8,8,16,0.55) 0%, transparent 20%)
          `
        }}
      />

      {/* Purple accent glow behind text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)' }}
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #080810 0%, transparent 100%)' }}
      />

      {/* ── Main Content — left-aligned for cinematic feel ───────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-start justify-center min-h-screen pb-20 pt-28">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-purple-300/75 tracking-[0.2em] uppercase">
            Available for opportunities
          </span>
          <Zap size={11} className="text-purple-400/60" />
        </motion.div>

        {/* Kicker line */}
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-sm font-mono tracking-[0.35em] uppercase mb-4"
          style={{ color: '#00f5ff', textShadow: '0 0 20px rgba(0,245,255,0.4)' }}
        >
          AI Developer &amp; Full-Stack Engineer
        </motion.p>

        {/* Big name — RGB glitch */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="font-orbitron font-black leading-none select-none mb-3"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 9rem)' }}
        >
          <span
            className="glitch-text"
            data-text="EASHAN"
            style={{ color: '#ffffff', display: 'block', letterSpacing: '-0.02em' }}
          >
            EASHAN
          </span>
          <span
            className="glitch-text"
            data-text="DARSH"
            style={{
              color: '#ffffff',
              display: 'block',
              letterSpacing: '-0.02em',
              marginTop: '-0.08em',
              background: 'linear-gradient(135deg, #c4b5fd 0%, #7c3aed 50%, #00f5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DARSH
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="h-8 mb-10"
        >
          <TypeAnimation
            sequence={[
              'I build intelligent systems.', 2500,
              'I design scalable solutions.', 2500,
              'I solve real problems.', 2500,
              'I ship things that matter.', 2500,
            ]}
            wrapper="span"
            repeat={Infinity}
            className="text-base md:text-lg font-mono"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          />
        </motion.div>

        {/* Tagline card */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05 }}
          className="mb-12 max-w-md"
        >
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            2nd year <span style={{ color: '#a78bfa' }}>CSE (AI/ML)</span> student at SRM University,
            building AI-powered systems that <span style={{ color: '#00f5ff' }}>solve real-world problems</span> —
            from neural traffic management to music streaming engines.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            onClick={() => scrollTo('#projects')}
            className="btn-primary px-8 py-4 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(139,92,246,0.5)',
              boxShadow: '0 0 30px rgba(124,58,237,0.2)',
            }}
          >
            View Projects
            <ArrowRight size={15} />
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="btn-secondary px-8 py-4 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={15} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
