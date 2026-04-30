import { motion } from 'framer-motion';
import { Cpu, Brain, Server, Zap, Globe, Layers, Rocket, Search } from 'lucide-react';
import { currentlyBuilding, wantToLearn, strengths } from '../../data/portfolio';

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
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-container space-y-28">

        {/* Currently Building */}
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Right Now</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold flex items-center justify-center gap-3 flex-wrap">
              <span>Currently</span> <span className="pixel-heading-green uppercase mt-1">Building</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {currentlyBuilding.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group"
                style={{ borderColor: 'rgba(74,222,128,0.1)' }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest">Active</span>
                </div>
                <h3 className="text-lg font-bold text-white/85 mb-2 group-hover:text-white">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-[10px] rounded-lg font-mono"
                      style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', color: '#4ade80' }}
                    >{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What I Want to Learn */}
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">The Roadmap</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold flex items-center justify-center gap-3 flex-wrap">
              <span>What I Want to Learn</span> <span className="pixel-heading uppercase mt-1">Next</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {wantToLearn.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-card p-5 min-w-[160px] text-center group hover:border-[rgba(139,92,246,0.25)] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}
                  >
                    <Icon size={18} className="text-purple-400" />
                  </div>
                  <p className="font-semibold text-white/80 text-sm mb-1.5">{item.name}</p>
                  <p className="text-[11px] text-white/35 leading-snug">{item.reason}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* My Strengths */}
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">What Sets Me Apart</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold flex items-center justify-center gap-3 flex-wrap">
              <span>My</span> <span className="pixel-heading-cyan uppercase mt-1">Strengths</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {strengths.map((s, i) => {
              const Icon = iconMap[s.icon] || Zap;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 text-center group hover:border-[rgba(139,92,246,0.2)] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)' }}
                  >
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <h3 className="font-bold text-white/80 mb-2 text-sm group-hover:text-white transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-white/35 text-xs leading-relaxed">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
