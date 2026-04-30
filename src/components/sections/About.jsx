import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedCounter from '../ui/AnimatedCounter';
import { personalInfo } from '../../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
      />

      <div className="section-container">
        {/* Title */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          transition={{ duration: 0.5 }} className="text-center mb-20"
        >
          <p className="eyebrow mb-3">Who I Am</p>
          <h2 className="section-title flex items-center justify-center gap-4">
            <span>About</span> <span className="pixel-heading uppercase">Me</span>
          </h2>
          <div className="glow-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Profile image */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Rotating dashed rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ margin: '-24px', border: '1px dashed rgba(139,92,246,0.12)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ margin: '-48px', border: '1px dashed rgba(139,92,246,0.07)' }}
              />

              {/* Image */}
              <motion.div
                onHoverStart={() => setImgHovered(true)}
                onHoverEnd={() => setImgHovered(false)}
                animate={imgHovered ? { rotateY: 4, rotateX: -3, scale: 1.03 } : { rotateY: 0, rotateX: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden"
                style={{
                  border: '1.5px solid rgba(139,92,246,0.25)',
                  boxShadow: imgHovered
                    ? '0 0 50px rgba(139,92,246,0.35), 0 0 100px rgba(139,92,246,0.12)'
                    : '0 0 25px rgba(139,92,246,0.15)',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Eashan Darsh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(99,102,241,0.2));display:flex;align-items:center;justify-content:center;font-family:Orbitron,sans-serif;font-size:4rem;font-weight:900;color:#a78bfa;">ED</div>`;
                  }}
                />
                {/* Hover shimmer */}
                <motion.div
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  className="absolute inset-0 shimmer-bg"
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              </motion.div>

              {/* Status chip */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap"
                style={{
                  background: 'rgba(8,8,16,0.9)',
                  border: '1px solid rgba(74,222,128,0.25)',
                  color: '#4ade80',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="space-y-6">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-4"
            >
              {personalInfo.aboutLines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className={
                    line.startsWith('const')
                      ? 'code-block'
                      : i === 0
                        ? 'text-xl font-semibold text-white/90 leading-snug'
                        : 'text-white/50 text-base leading-relaxed'
                  }
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {['AI/ML', 'Full-Stack', 'React', 'Python', 'Systems Design', 'Problem Solving'].map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Counters */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} transition={{ delay: 0.2 }}
          className="mt-24 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {personalInfo.counters.map((counter, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter value={counter.value} suffix={counter.suffix} />
              <p className="text-white/35 text-xs mt-2 font-medium tracking-wide">{counter.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
