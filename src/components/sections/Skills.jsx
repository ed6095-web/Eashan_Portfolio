import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus,
  SiReact, SiNextdotjs, SiNodedotjs, SiFlask, SiVite,
  SiTailwindcss, SiDocker, SiFirebase, SiGit, SiLinux,
  SiVercel, SiTensorflow, SiOpencv,
  SiHtml5,
} from 'react-icons/si';
import { FaJava, FaCode } from 'react-icons/fa';
import { X, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/portfolio';

// ─── Skill Data ────────────────────────────────────────────────────────────────
const skillsData = [
  // Languages
  {
    id: 'python', name: 'Python', category: 'Languages', level: 'Advanced',
    Icon: SiPython, color: '#3776AB', glow: 'rgba(55,118,171,0.35)',
    description: 'Primary language for AI, scripting, and backend APIs.',
    projects: ['TRAFFIC.AI', 'KavachSathi'],
    related: ['tensorflow', 'opencv', 'flask'],
    delay: 0,
  },
  {
    id: 'javascript', name: 'JavaScript', category: 'Languages', level: 'Advanced',
    Icon: SiJavascript, color: '#F7DF1E', glow: 'rgba(247,223,30,0.3)',
    description: 'Core language for interactive web apps and Node backends.',
    projects: ['Wavvy Blog', 'Droporia', 'Wavvy Music'],
    related: ['react', 'nodejs', 'vite'],
    delay: 0.1,
  },
  {
    id: 'typescript', name: 'TypeScript', category: 'Languages', level: 'Intermediate',
    Icon: SiTypescript, color: '#3178C6', glow: 'rgba(49,120,198,0.35)',
    description: 'Type-safe JavaScript for scalable frontend and backend code.',
    projects: ['Cryptarithmetic Solver'],
    related: ['react', 'nextjs'],
    delay: 0.2,
  },
  {
    id: 'java', name: 'Java', category: 'Languages', level: 'Intermediate',
    Icon: FaJava, color: '#ED8B00', glow: 'rgba(237,139,0,0.3)',
    description: 'Used for OOP, data structures, and the Library Management System.',
    projects: ['Library Management System'],
    related: [],
    delay: 0.3,
  },
  {
    id: 'cpp', name: 'C / C++', category: 'Languages', level: 'Intermediate',
    Icon: SiCplusplus, color: '#00599C', glow: 'rgba(0,89,156,0.35)',
    description: 'Systems programming, DSA, and competitive problem solving.',
    projects: [],
    related: [],
    delay: 0.4,
  },
  {
    id: 'html', name: 'HTML / CSS', category: 'Languages', level: 'Advanced',
    Icon: SiHtml5, color: '#E34F26', glow: 'rgba(227,79,38,0.3)',
    description: 'Markup and styling fundamentals for every web project.',
    projects: ['Droporia', 'Wavvy Blog'],
    related: ['react', 'tailwindcss'],
    delay: 0.5,
  },
  // Frameworks
  {
    id: 'react', name: 'React', category: 'Frameworks', level: 'Advanced',
    Icon: SiReact, color: '#61DAFB', glow: 'rgba(97,218,251,0.3)',
    description: 'Primary UI framework for all web projects. Heavy daily use.',
    projects: ['Wavvy Blog', 'Wavvy Music', 'Droporia'],
    related: ['javascript', 'vite', 'nextjs'],
    delay: 0,
  },
  {
    id: 'nextjs', name: 'Next.js', category: 'Frameworks', level: 'Intermediate',
    Icon: SiNextdotjs, color: '#ffffff', glow: 'rgba(255,255,255,0.2)',
    description: 'SSR/SSG for production-grade React apps.',
    projects: ['Cryptarithmetic Solver'],
    related: ['react', 'typescript'],
    delay: 0.1,
  },
  {
    id: 'nodejs', name: 'Node.js', category: 'Frameworks', level: 'Advanced',
    Icon: SiNodedotjs, color: '#339933', glow: 'rgba(51,153,51,0.3)',
    description: 'Backend runtime for REST APIs, sockets, and streaming.',
    projects: ['Wavvy Music', 'TRAFFIC.AI'],
    related: ['javascript', 'flask'],
    delay: 0.2,
  },
  {
    id: 'flask', name: 'Flask', category: 'Frameworks', level: 'Advanced',
    Icon: SiFlask, color: '#ffffff', glow: 'rgba(255,255,255,0.2)',
    description: 'Python microframework for AI service APIs.',
    projects: ['TRAFFIC.AI', 'KavachSathi'],
    related: ['python', 'nodejs'],
    delay: 0.3,
  },
  {
    id: 'tailwindcss', name: 'Tailwind CSS', category: 'Frameworks', level: 'Advanced',
    Icon: SiTailwindcss, color: '#06B6D4', glow: 'rgba(6,182,212,0.3)',
    description: 'Utility-first CSS. Every modern project uses it.',
    projects: ['Wavvy Blog', 'Cryptarithmetic Solver'],
    related: ['react', 'html'],
    delay: 0.4,
  },
  {
    id: 'vite', name: 'Vite', category: 'Frameworks', level: 'Advanced',
    Icon: SiVite, color: '#646CFF', glow: 'rgba(100,108,255,0.3)',
    description: 'Lightning fast build tool for React projects.',
    projects: ['Wavvy Music'],
    related: ['react', 'javascript'],
    delay: 0.5,
  },
  // Tools
  {
    id: 'docker', name: 'Docker', category: 'Tools', level: 'Intermediate',
    Icon: SiDocker, color: '#2496ED', glow: 'rgba(36,150,237,0.3)',
    description: 'Containerizing services for consistent dev environments.',
    projects: ['TRAFFIC.AI'],
    related: ['linux'],
    delay: 0,
  },
  {
    id: 'firebase', name: 'Firebase', category: 'Tools', level: 'Advanced',
    Icon: SiFirebase, color: '#FFCA28', glow: 'rgba(255,202,40,0.3)',
    description: 'Auth, real-time DB, and hosting for full-stack web apps.',
    projects: ['Wavvy Blog'],
    related: ['react', 'javascript'],
    delay: 0.1,
  },
  {
    id: 'git', name: 'Git', category: 'Tools', level: 'Advanced',
    Icon: SiGit, color: '#F05032', glow: 'rgba(240,80,50,0.3)',
    description: 'Version control for every project. Daily use.',
    projects: ['All Projects'],
    related: ['linux'],
    delay: 0.2,
  },
  {
    id: 'linux', name: 'Linux', category: 'Tools', level: 'Intermediate',
    Icon: SiLinux, color: '#FCC624', glow: 'rgba(252,198,36,0.3)',
    description: 'Dev environment, servers, and deployment.',
    projects: ['TRAFFIC.AI'],
    related: ['docker', 'git'],
    delay: 0.3,
  },
  {
    id: 'vercel', name: 'Vercel', category: 'Tools', level: 'Advanced',
    Icon: SiVercel, color: '#ffffff', glow: 'rgba(255,255,255,0.2)',
    description: 'Deployment platform for all frontend projects.',
    projects: ['Wavvy Blog', 'Cryptarithmetic Solver'],
    related: ['nextjs', 'react'],
    delay: 0.4,
  },
  // AI/ML
  {
    id: 'tensorflow', name: 'TensorFlow', category: 'AI/ML', level: 'Intermediate',
    Icon: SiTensorflow, color: '#FF6F00', glow: 'rgba(255,111,0,0.3)',
    description: 'ML model training and inference for computer vision tasks.',
    projects: ['TRAFFIC.AI'],
    related: ['python', 'opencv'],
    delay: 0,
  },
  {
    id: 'opencv', name: 'OpenCV', category: 'AI/ML', level: 'Advanced',
    Icon: SiOpencv, color: '#5C3EE8', glow: 'rgba(92,62,232,0.3)',
    description: 'Real-time computer vision pipeline for vehicle detection.',
    projects: ['TRAFFIC.AI', 'KavachSathi'],
    related: ['python', 'tensorflow'],
    delay: 0.1,
  },
  {
    id: 'yolo', name: 'YOLOv8', category: 'AI/ML', level: 'Advanced',
    Icon: FaCode, color: '#00f5c0', glow: 'rgba(0,245,192,0.3)',
    description: 'Real-time object detection. Powers TRAFFIC.AI vehicle counting.',
    projects: ['TRAFFIC.AI', 'KavachSathi'],
    related: ['python', 'opencv', 'tensorflow'],
    delay: 0.2,
  },
];

const CATEGORIES = ['All', 'Languages', 'Frameworks', 'Tools', 'AI/ML'];
const LEVEL_COLOR = { Advanced: '#4ade80', Intermediate: '#fb923c', Beginner: '#a78bfa' };

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function SkillCard({ skill, isHighlighted, isDimmed, onHover, onLeave, onClick, floatDelay }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    onLeave();
  }, [x, y, onLeave]);

  const { Icon, name, category, level, color, glow } = skill;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: floatDelay, type: 'spring', stiffness: 180, damping: 14 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(skill)}
      className="relative cursor-pointer select-none"
    >
      {/* Float idle animation wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + floatDelay * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay * 3,
        }}
      >
        <motion.div
          animate={{
            opacity: isDimmed ? 0.18 : 1,
            scale: isDimmed ? 0.92 : isHighlighted ? 1.06 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl p-5 flex flex-col items-center gap-3 overflow-hidden"
          style={{
            background: isDimmed
              ? 'rgba(255,255,255,0.01)'
              : isHighlighted
                ? `${glow.replace(')', ', 0.25)').replace('rgba', 'rgba')}`
                : 'rgba(255,255,255,0.025)',
            border: `1px solid ${isHighlighted ? `${color}50` : 'rgba(255,255,255,0.06)'}`,
            boxShadow: isHighlighted ? `0 0 30px ${glow}, 0 0 60px ${glow.replace('0.3', '0.1')}` : 'none',
            backdropFilter: 'blur(16px)',
            transition: 'all 0.3s ease',
            width: '110px',
          }}
        >
          {/* Glow blob */}
          {isHighlighted && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `radial-gradient(circle at 50% 40%, ${glow}, transparent 70%)`,
              }}
            />
          )}

          {/* Icon */}
          <motion.div
            animate={{ scale: isHighlighted ? 1.15 : 1 }}
            transition={{ duration: 0.25 }}
            className="relative z-10"
          >
            <Icon size={36} color={color} />
          </motion.div>

          {/* Name */}
          <div className="relative z-10 text-center">
            <p className="text-white/80 text-[11px] font-semibold leading-tight">{name}</p>
            <p className="text-[9px] font-mono mt-1" style={{ color: `${color}aa` }}>
              {category}
            </p>
          </div>

          {/* Level dot */}
          <div className="relative z-10 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: LEVEL_COLOR[level] || '#a78bfa', boxShadow: `0 0 6px ${LEVEL_COLOR[level]}` }}
            />
            <span className="text-[9px] font-mono" style={{ color: LEVEL_COLOR[level] }}>{level}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function SkillModal({ skill, onClose }) {
  const usedInProjects = projects.filter(p =>
    skill.projects.some(name => p.title.toLowerCase().includes(name.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,4,12,0.92)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
        className="rounded-2xl max-w-md w-full overflow-hidden"
        style={{
          background: 'rgba(10,10,22,0.98)',
          border: `1px solid ${skill.color}30`,
          backdropFilter: 'blur(24px)',
          boxShadow: `0 0 60px ${skill.glow}, 0 40px 80px rgba(0,0,0,0.6)`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />

        {/* Glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${skill.glow}, transparent 70%)` }}
        />

        <div className="relative p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
              >
                <skill.Icon size={32} color={skill.color} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-white/40">{skill.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: LEVEL_COLOR[skill.level] }} />
                    <span className="text-xs font-mono" style={{ color: LEVEL_COLOR[skill.level] }}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose}
              className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/04 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6">{skill.description}</p>

          {/* Used in projects */}
          {usedInProjects.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
                Used In
              </p>
              <div className="space-y-2">
                {usedInProjects.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                      <span className="text-sm text-white/70">{p.title}</span>
                    </div>
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-white/25 hover:text-white/60 transition-colors"
                    >
                      <Github size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related skills */}
          {skill.related.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
                Often Used With
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.related.map(relId => {
                  const rel = skillsData.find(s => s.id === relId);
                  if (!rel) return null;
                  return (
                    <div key={relId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${rel.color}10`, border: `1px solid ${rel.color}25` }}
                    >
                      <rel.Icon size={12} color={rel.color} />
                      <span className="text-xs font-mono" style={{ color: rel.color }}>{rel.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filtered = activeFilter === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeFilter);

  const hoveredSkill = hoveredId ? skillsData.find(s => s.id === hoveredId) : null;

  const getCardState = (skill) => {
    if (!hoveredId) return { isHighlighted: false, isDimmed: false };
    if (skill.id === hoveredId) return { isHighlighted: true, isDimmed: false };
    if (hoveredSkill?.related.includes(skill.id)) return { isHighlighted: true, isDimmed: false };
    return { isHighlighted: false, isDimmed: true };
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Ambient BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container">
        {/* ─── Heading ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-purple-400/50 mb-4">
            Tech Ecosystem
          </p>
          <h2 className="mb-2 flex items-center justify-center gap-3 flex-wrap" style={{ fontFamily: "'Russo One', sans-serif" }}>
            <span className="text-4xl md:text-5xl text-white/90">The </span>
            <span className="pixel-heading uppercase mt-1 text-4xl md:text-5xl">STACK</span>
          </h2>
          <p className="text-white/30 text-sm font-mono mt-3">
            Hover to explore · Click for details
          </p>
          <div className="glow-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* ─── Filter tabs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-xl text-xs font-mono font-medium tracking-wide transition-all duration-300"
              style={{
                color: activeFilter === cat ? '#c4b5fd' : 'rgba(255,255,255,0.25)',
                background: activeFilter === cat ? 'rgba(139,92,246,0.12)' : 'transparent',
                border: activeFilter === cat ? '1px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ─── Floating Card Grid ─── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-5"
            style={{ perspective: '1200px' }}
          >
            {filtered.map((skill, i) => {
              const { isHighlighted, isDimmed } = getCardState(skill);
              return (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  onHover={setHoveredId}
                  onLeave={() => setHoveredId(null)}
                  onClick={setSelectedSkill}
                  floatDelay={i * 0.04}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ─── Hint bar ─── */}
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full z-30"
            style={{
              background: 'rgba(10,10,22,0.92)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p className="text-xs font-mono text-white/40">
              <span className="text-purple-400">{hoveredSkill?.name}</span>
              {hoveredSkill?.related.length > 0 && (
                <> · Glowing related: {hoveredSkill.related.length} skills</>
              )}
              {' '}· Click for details
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
