import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Instagram, Mail, MessageCircle } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

function FloatingInput({ label, type = 'text', name, value, onChange, multiline = false }) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const inputClass = `w-full bg-transparent text-text-primary text-sm outline-none pt-5 pb-2 px-4 resize-none`;
  const containerClass = `relative rounded-xl border transition-all duration-300 overflow-hidden ${
    isActive ? 'border-[rgba(0,245,255,0.4)]' : 'border-[rgba(255,255,255,0.08)]'
  }`;

  return (
    <div className={containerClass} style={{ background: 'rgba(255,255,255,0.02)' }}>
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none font-mono"
        style={{
          top: isActive ? '8px' : '50%',
          transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isActive ? '10px' : '13px',
          color: isActive ? '#00f5ff' : '#6b7280',
          ...(multiline && !isActive ? { top: '16px', transform: 'none' } : {}),
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className={inputClass}
          style={{ paddingTop: '24px' }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={inputClass}
        />
      )}
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[1px] transition-all duration-300"
        style={{
          width: isActive ? '100%' : '0%',
          background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)',
        }}
      />
    </div>
  );
}

const socialLinks = [
  { icon: Github, label: 'GitHub', href: personalInfo.github, color: '#f0f0f0' },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin, color: '#0a66c2' },
  { icon: Instagram, label: 'Instagram', href: personalInfo.instagram, color: '#e1306c' },
  { icon: Mail, label: 'Email', href: `mailto:${personalInfo.email}`, color: '#00f5ff' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container">
        {/* Title */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#00f5ff] tracking-[0.3em] uppercase mb-3">Let's Talk</p>
          <h2 className="section-title flex items-center justify-center gap-4 flex-wrap">
            <span>Get in</span> <span className="pixel-heading uppercase mt-1">Touch</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-md mx-auto">
            Open for internships, collaborations, and interesting conversations. Don't be a stranger.
          </p>
          <div className="glow-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-10 text-center h-full flex flex-col items-center justify-center"
                  style={{ border: '1px solid rgba(57,255,20,0.3)' }}
                >
                  <motion.div
                    animate={{ scale: [0, 1.3, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle size={64} className="text-[#39ff14] mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">I'll get back to you soon. Promise. 🚀</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-card p-8 space-y-5"
                  exit={{ opacity: 0 }}
                >
                  <FloatingInput label="Your Name" name="name" value={form.name} onChange={handleChange} />
                  <FloatingInput label="Your Email" type="email" name="email" value={form.email} onChange={handleChange} />
                  <FloatingInput label="Your Message" name="message" value={form.message} onChange={handleChange} multiline />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full justify-center py-4 text-sm tracking-wider"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-[#00f5ff] border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Quick contact */}
            <div className="glass-card p-6 space-y-4">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Quick Contact</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(0,245,255,0.05)] transition-all group"
              >
                <Mail size={18} className="text-[#00f5ff]" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary">{personalInfo.email}</span>
              </a>
              <a
                href={`https://wa.me/91XXXXXXXXXX`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(57,255,20,0.05)] transition-all group"
              >
                <MessageCircle size={18} className="text-[#39ff14]" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary">WhatsApp Message</span>
              </a>
            </div>

            {/* Social grid */}
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">Find Me Online</p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card p-4 flex items-center gap-3 transition-all duration-300 group"
                    style={{ '--hover-color': color }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${color}33`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = ''}
                  >
                    <Icon size={20} style={{ color }} />
                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="glass-card p-5"
              style={{ border: '1px solid rgba(57,255,20,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">Currently Available</p>
                  <p className="text-xs text-text-muted">For internships & collaborations • Response within 24h</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
