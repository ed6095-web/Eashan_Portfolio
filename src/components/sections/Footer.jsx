import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-[rgba(255,255,255,0.05)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(139,92,246,0.2))',
                border: '1px solid rgba(0,245,255,0.3)',
                color: '#00f5ff',
              }}
            >
              ED
            </div>
            <span className="text-sm text-text-muted">
              Built by{' '}
              <span className="neon-text font-semibold">Eashan Darsh</span>
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
            <span>const dev = {'{ build: true, ship: true }'}</span>
          </div>

          {/* Year */}
          <p className="text-xs text-text-muted font-mono">
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
