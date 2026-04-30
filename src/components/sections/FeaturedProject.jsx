import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/portfolio';

const featured = projects.find(p => p.featured);

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function FeaturedProject() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container">
        {/* Label */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            <Star size={11} className="text-purple-400" fill="currentColor" />
            <span className="text-xs font-mono text-purple-400/80 tracking-widest">Featured Project</span>
          </div>
          <h2 className="section-title flex items-center justify-center gap-4 flex-wrap">
            <span>Project</span> <span className="pixel-heading uppercase mt-1">Spotlight</span>
          </h2>
          <div className="glow-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Main container */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(139,92,246,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top gradient bar */}
          <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent)' }} />

          {/* Screenshot */}
          <motion.div variants={fadeUp} className="overflow-hidden relative" style={{ maxHeight: '400px' }}>
            <img
              src={featured.image}
              alt={featured.title}
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            {/* Gradient fade bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(12,12,22,0.95), transparent)' }}
            />
            {/* Live badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(12,12,22,0.85)', border: '1px solid rgba(74,222,128,0.3)', backdropFilter: 'blur(10px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
            </div>
          </motion.div>

          <div className="p-8 md:p-12">
            {/* Title row */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-display font-black mb-2">
                  <span className="neon-text">{featured.title}</span>
                </h3>
                <p className="text-white/40 font-mono text-sm">{featured.tagline}</p>
              </div>
              <div className="flex items-start gap-3 flex-shrink-0">
                <a href={featured.github} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm py-2.5"
                >
                  <Github size={15} /> Code
                </a>
                <a href={featured.demo} target="_blank" rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm py-2.5"
                >
                  <ArrowUpRight size={15} /> Open Live
                </a>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-white/55 text-base leading-relaxed mb-8 max-w-3xl">
              {featured.description}
            </motion.p>

            {/* PSI blocks */}
            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Problem', content: featured.problem, color: '#f87171' },
                { label: 'Solution', content: featured.solution, color: '#818cf8' },
                { label: 'Impact', content: featured.impact, color: '#4ade80' },
              ].map(({ label, content, color }) => (
                <div key={label} className="p-5 rounded-xl"
                  style={{ background: `${color}08`, border: `1px solid ${color}18` }}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-2"
                    style={{ color }}>{label}
                  </span>
                  <p className="text-white/50 text-sm leading-relaxed">{content}</p>
                </div>
              ))}
            </motion.div>

            {/* What makes it unique */}
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                What makes it unique
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Full social media experience — create posts, follow users, real-time feed',
                  'Deployed on Vercel, actively live and accessible to real users',
                  'Clean, modern UI with dark mode support',
                  'Firebase-powered authentication and real-time database',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span className="text-purple-400/60 font-mono text-xs mt-0.5 flex-shrink-0">0{i + 1}</span>
                    <p className="text-sm text-white/45">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={fadeUp}>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {featured.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
