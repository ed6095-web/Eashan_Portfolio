import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/sections/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import FeaturedProject from './components/sections/FeaturedProject';
import Journey from './components/sections/Journey';
import Skills from './components/sections/Skills';
import Extras from './components/sections/Extras';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <div className="relative min-h-screen bg-[#0a0a0f]">
          {/* Global subtle dot grid bg */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <FeaturedProject />
            <Journey />
            <Skills />
            <Extras />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}
