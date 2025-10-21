// ============= PARTICLES.JS CONFIGURATION =============

particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#00bfff', '#00f0ff', '#8a2be2']
    },
    shape: {
      type: ['circle', 'edge', 'triangle'],
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00bfff',
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.8
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// ============= CUSTOM PARTICLE ENHANCEMENTS =============

// Add glow effect to particles
const particleCanvas = document.querySelector('#particles-js canvas');
if (particleCanvas) {
  particleCanvas.style.filter = 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.3))';
}

// Dynamic particle color based on scroll
let hue = 180; // Start with cyan

window.addEventListener('scroll', () => {
  const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  hue = 180 + (scrollPercent * 1.2); // Shift from cyan to purple
  
  // Update particle colors (if you want dynamic color change)
  // Note: This requires accessing particles.js internal state
});

// ============= ALTERNATIVE: CUSTOM CANVAS PARTICLES =============
// Uncomment below if you want a custom particle system instead of particles.js

/*
const canvas = document.createElement('canvas');
canvas.id = 'custom-particles';
canvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
`;
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class CustomParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const customParticles = [];
for (let i = 0; i < 100; i++) {
  customParticles.push(new CustomParticle());
}

function animateCustomParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  customParticles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw connections
  customParticles.forEach((p1, i) => {
    customParticles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        ctx.save();
        ctx.globalAlpha = (1 - distance / 150) * 0.3;
        ctx.strokeStyle = '#00bfff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }
    });
  });
  
  requestAnimationFrame(animateCustomParticles);
}

animateCustomParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
*/

// ============= SHOOTING STARS EFFECT =============
const shootingStarsCanvas = document.createElement('canvas');
shootingStarsCanvas.id = 'shooting-stars';
shootingStarsCanvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
`;
document.body.insertBefore(shootingStarsCanvas, document.getElementById('particles-js'));

const ssCtx = shootingStarsCanvas.getContext('2d');
shootingStarsCanvas.width = window.innerWidth;
shootingStarsCanvas.height = window.innerHeight;

class ShootingStar {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * shootingStarsCanvas.width;
    this.y = 0;
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 5 + 3;
    this.opacity = 1;
    this.active = false;
  }
  
  update() {
    if (!this.active) return;
    
    this.x += this.speed;
    this.y += this.speed;
    this.opacity -= 0.01;
    
    if (this.opacity <= 0 || this.y > shootingStarsCanvas.height) {
      this.active = false;
    }
  }
  
  draw() {
    if (!this.active || this.opacity <= 0) return;
    
    const gradient = ssCtx.createLinearGradient(
      this.x, this.y,
      this.x - this.length, this.y - this.length
    );
    
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(0, 191, 255, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ssCtx.strokeStyle = gradient;
    ssCtx.lineWidth = 2;
    ssCtx.beginPath();
    ssCtx.moveTo(this.x, this.y);
    ssCtx.lineTo(this.x - this.length, this.y - this.length);
    ssCtx.stroke();
  }
  
  trigger() {
    if (!this.active) {
      this.reset();
      this.active = true;
    }
  }
}

const shootingStars = [];
for (let i = 0; i < 3; i++) {
  shootingStars.push(new ShootingStar());
}

function animateShootingStars() {
  ssCtx.clearRect(0, 0, shootingStarsCanvas.width, shootingStarsCanvas.height);
  
  shootingStars.forEach(star => {
    star.update();
    star.draw();
  });
  
  requestAnimationFrame(animateShootingStars);
}

animateShootingStars();

// Trigger shooting stars randomly
setInterval(() => {
  if (Math.random() > 0.7) {
    const randomStar = shootingStars[Math.floor(Math.random() * shootingStars.length)];
    randomStar.trigger();
  }
}, 3000);

window.addEventListener('resize', () => {
  shootingStarsCanvas.width = window.innerWidth;
  shootingStarsCanvas.height = window.innerHeight;
});

// ============= CONSTELLATION EFFECT (OPTIONAL) =============
// Creates constellation patterns in the background

function drawConstellation() {
  const constellationCanvas = document.createElement('canvas');
  constellationCanvas.id = 'constellation';
  constellationCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    pointer-events: none;
    opacity: 0.3;
  `;
  document.body.insertBefore(constellationCanvas, document.getElementById('particles-js'));
  
  const cCtx = constellationCanvas.getContext('2d');
  constellationCanvas.width = window.innerWidth;
  constellationCanvas.height = window.innerHeight;
  
  // Draw a simple constellation pattern
  const stars = [
    { x: 0.2, y: 0.3 },
    { x: 0.25, y: 0.25 },
    { x: 0.3, y: 0.35 },
    { x: 0.35, y: 0.3 },
    { x: 0.3, y: 0.2 }
  ];
  
  cCtx.strokeStyle = 'rgba(0, 191, 255, 0.4)';
  cCtx.lineWidth = 1;
  
  for (let i = 0; i < stars.length - 1; i++) {
    cCtx.beginPath();
    cCtx.moveTo(stars[i].x * constellationCanvas.width, stars[i].y * constellationCanvas.height);
    cCtx.lineTo(stars[i + 1].x * constellationCanvas.width, stars[i + 1].y * constellationCanvas.height);
    cCtx.stroke();
  }
  
  // Draw star points
  stars.forEach(star => {
    cCtx.fillStyle = 'rgba(0, 191, 255, 0.6)';
    cCtx.beginPath();
    cCtx.arc(
      star.x * constellationCanvas.width,
      star.y * constellationCanvas.height,
      3, 0, Math.PI * 2
    );
    cCtx.fill();
  });
}

// Uncomment to add constellation
// drawConstellation();

// ============= NEBULA GLOW EFFECT =============
const nebulaCanvas = document.createElement('canvas');
nebulaCanvas.id = 'nebula';
nebulaCanvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  pointer-events: none;
  opacity: 0.4;
  filter: blur(80px);
`;
document.body.insertBefore(nebulaCanvas, document.getElementById('space-bg'));

const nCtx = nebulaCanvas.getContext('2d');
nebulaCanvas.width = window.innerWidth;
nebulaCanvas.height = window.innerHeight;

function drawNebula() {
  const gradient = nCtx.createRadialGradient(
    nebulaCanvas.width * 0.3,
    nebulaCanvas.height * 0.3,
    0,
    nebulaCanvas.width * 0.5,
    nebulaCanvas.height * 0.5,
    nebulaCanvas.width * 0.6
  );
  
  gradient.addColorStop(0, 'rgba(0, 191, 255, 0.3)');
  gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.2)');
  gradient.addColorStop(1, 'transparent');
  
  nCtx.fillStyle = gradient;
  nCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
}

drawNebula();

window.addEventListener('resize', () => {
  nebulaCanvas.width = window.innerWidth;
  nebulaCanvas.height = window.innerHeight;
  drawNebula();
});

console.log('✨ Particle effects initialized');
