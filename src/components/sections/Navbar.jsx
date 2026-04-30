import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div
          className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300"
          style={scrolled ? {
            background: 'rgba(8,8,16,0.9)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
          } : {}}
        >
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.04 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-orbitron font-bold text-xs"
              style={{
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.35)',
                color: '#c4b5fd',
              }}
            >
              ED
            </div>
            <span className="hidden sm:block text-sm font-medium text-white/40 group-hover:text-white/65 transition-colors">
              Eashan Darsh
            </span>
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <li key={item.href}>
                <motion.button
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors"
                  style={{
                    color: activeSection === item.href.slice(1) ? '#c4b5fd' : 'rgba(255,255,255,0.35)',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>

          {/* CTA + mobile */}
          <div className="flex items-center gap-3">
            <motion.a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex btn-primary text-xs py-2 px-4"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Resume
            </motion.a>
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white/30 hover:text-white/60"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-4 md:hidden"
            style={{
              background: 'rgba(10,10,20,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-white/40 hover:text-white/80 rounded-xl hover:bg-[rgba(139,92,246,0.06)] transition-all"
              >
                {item.label}
              </motion.button>
            ))}
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <a href="/resume.pdf" download className="btn-primary w-full justify-center py-2.5 text-xs">
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
