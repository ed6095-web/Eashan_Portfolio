import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/portfolio';

const GAP = 32;

// ─── Flip Card ─────────────────────────────────────────────────────────────────
function FlipCard({ project, active, cardW }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-perspective cursor-pointer"
      style={{ width: cardW, height: 440, flexShrink: 0 }}
      onClick={() => active && setFlipped(f => !f)}
    >
      <motion.div
        className="flip-inner w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ height: 440 }}
      >
        {/* FRONT */}
        <div className="flip-face" style={{ height: 440 }}>
          <img
            src={project.image} alt={project.title} draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = `linear-gradient(135deg, ${project.color}20, rgba(8,8,16,0.9))`;
            }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(8,8,16,0.05) 0%, rgba(8,8,16,0.45) 55%, rgba(8,8,16,0.95) 100%)'
          }} />

          {/* Top badges */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <span className="px-3 py-1 text-[10px] font-mono rounded-lg uppercase tracking-widest"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}35`, color: project.color }}>
              {project.category}
            </span>
            <span className={`status-badge ${project.status === 'completed' ? 'status-completed' : 'status-ongoing'}`}>
              {project.status}
            </span>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <h3 className="font-retro text-white text-2xl leading-tight mb-1">{project.title}</h3>
            <p className="text-white/40 text-sm font-mono mb-4">{project.tagline}</p>
            {active && (
              <div className="flex items-center gap-1.5">
                <RotateCcw size={11} className="text-white/30" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Click to flip</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          />
        </div>

        {/* BACK */}
        <div className="flip-face flip-back" style={{ height: 440 }}>
          <div className="absolute inset-0 rounded-2xl"
            style={{ background: 'rgba(8,8,16,0.98)', border: `1px solid ${project.color}25`, backdropFilter: 'blur(24px)' }}
          />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-retro text-white text-xl leading-tight">{project.title}</h3>
                <p className="text-xs font-mono mt-1" style={{ color: project.color }}>{project.tagline}</p>
              </div>
              <RotateCcw size={14} className="text-white/20 mt-1 flex-shrink-0 cursor-pointer" onClick={() => setFlipped(false)} />
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

            <div className="p-4 rounded-xl mb-5"
              style={{ background: `${project.color}08`, border: `1px solid ${project.color}18` }}
            >
              <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: project.color }}>Impact</p>
              <p className="text-white/45 text-sm leading-relaxed">{project.impact}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.slice(0, 5).map(t => (
                <span key={t} className="tech-tag text-[10px]">{t}</span>
              ))}
              {project.tech.length > 5 && <span className="tech-tag text-[10px]">+{project.tech.length - 5}</span>}
            </div>

            <div className="flex gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="btn-secondary flex-1 justify-center py-2.5 text-xs flex items-center gap-2"
              >
                <Github size={12} /> View Code
              </a>
              {project.demo !== '#' && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="btn-primary flex-1 justify-center py-2.5 text-xs flex items-center gap-2"
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const [cardW, setCardW] = useState(620);

  useEffect(() => {
    const handleResize = () => {
      setCardW(window.innerWidth < 768 ? window.innerWidth * 0.85 : 620);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goTo = (i) => setCurrent(Math.max(0, Math.min(i, projects.length - 1)));
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Center offset calculation
  const getX = (idx) => {
    if (!trackRef.current) return 0;
    const containerW = trackRef.current.offsetWidth;
    return containerW / 2 - (idx * (cardW + GAP)) - cardW / 2;
  };

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="section-container">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">What I've Built</p>
          <h2 className="section-title flex items-center justify-center gap-4 flex-wrap">
            <span>Selected</span> <span className="pixel-heading uppercase mt-1">Projects</span>
          </h2>
          <p className="text-white/25 text-sm font-mono mt-3">Swipe or click arrows · Click card to flip</p>
          <div className="glow-divider max-w-xs mx-auto mt-6" />
        </motion.div>
      </div>

      {/* Carousel track */}
      <div ref={trackRef} className="relative w-full overflow-hidden" style={{ height: 480 }}>
        {/* Left/right fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #080810, transparent)' }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #080810, transparent)' }}
        />

        <motion.div
          className="absolute top-4 flex items-center cursor-grab active:cursor-grabbing"
          style={{ gap: GAP, left: 0, right: 0, touchAction: 'pan-y' }}
          animate={{ x: getX(current) }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const swipeThreshold = 40;
            if (info.offset.x < -swipeThreshold || info.velocity.x < -300) next();
            else if (info.offset.x > swipeThreshold || info.velocity.x > 300) prev();
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              animate={{
                scale: i === current ? 1 : 0.85,
                opacity: i === current ? 1 : 0.35,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <FlipCard project={project} active={i === current} cardW={cardW} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-2">
        {/* Prev arrow */}
        <motion.button
          onClick={prev} disabled={current === 0}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <ChevronLeft size={18} className="text-purple-400" />
        </motion.button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === current ? 24 : 6,
                opacity: i === current ? 1 : 0.3,
                background: i === current ? '#a78bfa' : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
              style={{ minWidth: 6 }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <motion.button
          onClick={next} disabled={current === projects.length - 1}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-20"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <ChevronRight size={18} className="text-purple-400" />
        </motion.button>
      </div>

      {/* Counter */}
      <p className="text-center text-[10px] font-mono text-white/20 mt-3 tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
      </p>
    </section>
  );
}
