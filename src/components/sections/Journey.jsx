import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Zap, Brain, Star } from 'lucide-react';

const milestones = [
  {
    phase: '01', year: 'Aug 2023',
    title: 'I stopped consuming tech.',
    subtitle: 'And started building it.',
    copy: 'Walked into SRM University\'s CSE (AI/ML) program on day one. Left that first semester with a question I haven\'t stopped answering: what can I build today?',
    Icon: GraduationCap, color: '#8b5cf6',
  },
  {
    phase: '02', year: 'Early 2024',
    title: 'The first line broke everything.',
    subtitle: "That's when I got hooked.",
    copy: 'A Java Library Management System that crashed seventeen times. Fixed it eighteen. That\'s when I learned — debugging is just problem solving with a better error message.',
    Icon: Code2, color: '#06b6d4',
  },
  {
    phase: '03', year: 'Mid 2024',
    title: 'Real problems. Real users.',
    subtitle: 'I started shipping.',
    copy: 'Wavvy Blog went live. Droporia handled real downloads. Not tutorials — products. The gap between "I built a thing" and "people use my thing" changed everything.',
    Icon: Rocket, color: '#f59e0b',
  },
  {
    phase: '04', year: 'Late 2024',
    title: 'Pressure builds diamonds.',
    subtitle: 'I build under pressure.',
    copy: 'Hackathons. Tech clubs. Leadership across 3 organisations. Learned that great software isn\'t just written — it\'s communicated, defended, and shipped fast.',
    Icon: Zap, color: '#ef4444',
  },
  {
    phase: '05', year: '2025 — Now',
    title: 'AI that sees, decides, acts.',
    subtitle: "That's what I'm building.",
    copy: 'TRAFFIC.AI. Wavvy Music. KavachSathi at Guidewire DEVTrails. Each project pushes deeper into computer vision and real-time AI. I don\'t study AI — I build with it.',
    Icon: Brain, color: '#10b981',
  },
];

const visionGoals = [
  'Build AI systems that work at scale, in the real world.',
  'Contribute to open-source tooling developers actually use.',
  'Land an AI/ML role where real decisions happen.',
  'Ship a product that reaches one million users.',
];

// ─── Milestone Visual ──────────────────────────────────────────────────────────
function MilestoneVisual({ milestone, isActive }) {
  const { Icon, color, phase } = milestone;
  return (
    <div className="relative flex items-center justify-center h-72 w-full select-none">
      {/* Phase watermark */}
      <span className="absolute font-retro select-none pointer-events-none"
        style={{ fontSize: '11rem', color: `${color}06`, lineHeight: 1, userSelect: 'none' }}>
        {phase}
      </span>

      {/* Outer pulse */}
      <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.04, 0.12] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-64 h-64 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}18 0%, transparent 70%)` }}
      />
      {/* Orbit ring 1 */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-52 h-52 rounded-full"
        style={{ border: `1px dashed ${color}20` }}
      />
      {/* Orbit ring 2 */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute w-36 h-36 rounded-full"
        style={{ border: `1px solid ${color}15` }}
      />

      {/* Orbiting dots */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: color, opacity: 0.45,
            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 104}px)`,
            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 104}px)`,
            transform: 'translate(-50%,-50%)',
          }}
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Center icon */}
      <motion.div animate={isActive ? { scale: [1, 1.06, 1], boxShadow: [`0 0 30px ${color}25`, `0 0 50px ${color}40`, `0 0 30px ${color}25`] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ background: `${color}12`, border: `1px solid ${color}30`, boxShadow: `0 0 30px ${color}20` }}
      >
        <Icon size={36} style={{ color }} />
      </motion.div>
    </div>
  );
}

// ─── Single Milestone Section ──────────────────────────────────────────────────
function MilestoneSection({ milestone, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const isEven = index % 2 === 0;

  const textVariants = {
    hidden: { opacity: 0, x: isEven ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] } },
  };
  const visualVariants = {
    hidden: { opacity: 0, x: isEven ? 40 : -40, scale: 0.88 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, delay: 0.15, ease: [0.43, 0.13, 0.23, 0.96] } },
  };

  return (
    <div ref={ref} className="min-h-screen flex items-center relative">
      {/* Section bg tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at ${isEven ? '80%' : '20%'} 50%, ${milestone.color}05 0%, transparent 60%)` }}
      />

      <div className={`section-container w-full grid md:grid-cols-2 gap-16 items-center py-24 ${!isEven ? 'direction-rtl' : ''}`}>
        {/* Text */}
        <motion.div animate={inView ? 'visible' : 'hidden'} variants={textVariants}
          className={isEven ? '' : 'md:order-2'}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: milestone.color }}>
              {milestone.phase}
            </span>
            <div className="h-px w-8" style={{ background: milestone.color }} />
            <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
              {milestone.year}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-retro text-white/90 leading-tight mb-2">
            {milestone.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-retro mb-8" style={{ color: milestone.color }}>
            {milestone.subtitle}
          </h3>

          <p className="text-white/45 text-base leading-relaxed max-w-md">
            {milestone.copy}
          </p>

          {/* Animated bottom line */}
          <motion.div animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px mt-8 origin-left max-w-xs"
            style={{ background: `linear-gradient(90deg, ${milestone.color}, transparent)` }}
          />
        </motion.div>

        {/* Visual */}
        <motion.div animate={inView ? 'visible' : 'hidden'} variants={visualVariants}
          className={isEven ? '' : 'md:order-1'}
        >
          <MilestoneVisual milestone={milestone} isActive={inView} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Vision Section ────────────────────────────────────────────────────────────
function VisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  return (
    <div ref={ref} className="min-h-screen flex items-center relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)' }}
      />
      <div className="section-container w-full text-center py-24">
        <motion.div animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-mono text-purple-400/50 tracking-[0.3em] uppercase mb-6">
            The Destination
          </p>
          <h2 className="text-4xl md:text-6xl font-retro text-white/90 mb-4 leading-tight">
            Where I'm Heading
          </h2>
          <p className="text-xl font-retro mb-16" style={{ color: '#a78bfa' }}>
            The intersection of intelligence and impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {visionGoals.map((goal, i) => (
            <motion.div key={i}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl text-left"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <Star size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/50 text-sm leading-relaxed">{goal}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Journey() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progressScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section ref={sectionRef} id="journey" className="relative">
      {/* Scrolling progress line */}
      <div className="absolute left-6 top-0 bottom-0 w-px hidden lg:block"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <motion.div className="w-full origin-top h-full"
          style={{
            scaleY: progressScaleY,
            background: 'linear-gradient(180deg, #8b5cf6, #06b6d4, #10b981)',
            boxShadow: '0 0 8px rgba(139,92,246,0.4)',
          }}
        />
      </div>

      {milestones.map((m, i) => (
        <MilestoneSection key={i} milestone={m} index={i} />
      ))}

      <VisionSection />
    </section>
  );
}
