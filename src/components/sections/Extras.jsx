import { motion } from 'framer-motion';
import { Cpu, Brain, Server, Zap, Globe, Layers, Rocket, Search } from 'lucide-react';
import { currentlyBuilding, wantToLearn, strengths } from '../../data/portfolio';
import { ScannerCardStream } from '../ui/scanner-card-stream';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const iconMap = {
  cpu: Cpu,
  brain: Brain,
  server: Server,
  zap: Zap,
  globe: Globe,
  layers: Layers,
  rocket: Rocket,
  search: Search,
};

export default function Extras() {
  // Aggregate data into a single "Arsenal" stream
  const streamItems = [
    ...currentlyBuilding.map(item => ({
      ...item,
      category: 'Currently Building',
      icon: Zap, // Default to Zap if none specified
    })),
    ...wantToLearn.map(item => ({
      title: item.name,
      description: item.reason,
      category: 'Roadmap',
      icon: iconMap[item.icon] || Rocket,
    })),
    ...strengths.map(item => ({
      title: item.title,
      description: item.description,
      category: 'Core Strength',
      icon: iconMap[item.icon] || Brain,
    })),
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-[#060610]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
      />
      
      <div className="section-container relative z-10 mb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center"
        >
          <p className="eyebrow mb-3">The Blueprint</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold flex items-center justify-center gap-4 flex-wrap">
            <span>The</span> <span className="pixel-heading-cyan uppercase mt-1">Arsenal</span>
          </h2>
          <p className="text-white/30 text-sm font-mono mt-4">Drag to scan my current stack, roadmap, and strengths</p>
          <div className="glow-divider max-w-[200px] mx-auto mt-8 opacity-50" />
        </motion.div>
      </div>

      {/* The Scanner Stream */}
      <div className="relative w-full max-w-[100vw] overflow-hidden -mx-[calc((100vw-100%)/2)]">
        <ScannerCardStream
          items={streamItems}
          initialSpeed={120}
          direction={-1}
          cardGap={40}
          friction={0.97}
          scanEffect="scramble"
          repeat={3}
        />
      </div>
    </section>
  );
}
