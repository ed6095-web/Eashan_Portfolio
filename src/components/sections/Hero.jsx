import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import * as THREE from 'three';
import { ArrowRight, Download } from 'lucide-react';

// Neural network mesh
function NeuralNetwork() {
  const groupRef = useRef();

  const nodePositions = [
    [0, 0, 0],
    [1.5, 0.8, 0.3], [-1.5, 0.8, 0.3],
    [1.2, -0.9, 0.5], [-1.2, -0.9, 0.5],
    [0.4, 1.8, -0.4], [-0.4, 1.8, -0.4],
    [0, -1.8, -0.2],
    [2.2, 0, -0.5], [-2.2, 0, -0.5],
    [0.8, 0.4, 1.5], [-0.8, 0.4, 1.5],
  ];

  const connPairs = [
    [0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[3,7],[4,7],
    [1,8],[2,9],[5,10],[6,11],[8,10],[9,11],[0,10],[0,11],
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color={i === 0 ? '#a78bfa' : i % 2 === 0 ? '#7c3aed' : '#6366f1'}
            emissive={i === 0 ? '#7c3aed' : '#4f46e5'}
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>
      ))}

      {connPairs.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...nodePositions[a], ...nodePositions[b]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7c3aed" opacity={0.12} transparent />
        </line>
      ))}

      <Sphere args={[0.32, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#6d28d9"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
          distort={0.25}
          speed={1.5}
          transparent
          opacity={0.65}
        />
      </Sphere>
    </group>
  );
}

function ParticleRing() {
  const ref = useRef();
  const count = 60;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 3 + Math.random() * 0.4;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.035} transparent opacity={0.5} />
    </points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.7 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.25} />
          <pointLight position={[4, 4, 4]} intensity={1.2} color="#8b5cf6" />
          <pointLight position={[-4, -4, -4]} intensity={0.4} color="#6366f1" />
          <Stars radius={100} depth={50} count={1500} factor={2.5} saturation={0} fade speed={0.3} />
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
              <NeuralNetwork />
            </Float>
            <ParticleRing />
          </Suspense>
          <CameraController />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, rgba(8,8,16,0.55) 70%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080810, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
          style={{
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-purple-300/70 tracking-wider">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with RGB-split glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mb-8"
        >
          <h1 className="font-orbitron font-black tracking-tight leading-none select-none text-center">
            <span
              className="glitch-text"
              data-text="EASHAN DARSH"
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.2rem, 7vw, 8rem)',
                display: 'inline-block',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              EASHAN&nbsp;DARSH
            </span>
          </h1>
        </motion.div>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="h-10 mb-12"
        >
          <TypeAnimation
            sequence={[
              'I build intelligent systems.', 2500,
              'I design scalable solutions.', 2500,
              'I solve real problems.', 2500,
              'I ship things that matter.', 2500,
            ]}
            wrapper="span"
            repeat={Infinity}
            className="text-lg md:text-xl font-mono text-white/40"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollTo('#projects')}
            className="btn-primary px-8 py-3.5"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View Projects
            <ArrowRight size={15} />
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="btn-secondary px-8 py-3.5"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={15} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
