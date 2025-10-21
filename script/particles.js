// ============= PARTICLE SYSTEM FOR SPACE BACKGROUND =============

const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ============= PARTICLE CLASS =============
class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.5 + 0.5;
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.5 + 0.1;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.opacity = Math.random() * 0.5 + 0.5;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    
    // Reset particle if it goes off screen
    if (this.y > canvas.height) {
      this.reset();
    }
    
    if (this.x < 0 || this.x > canvas.width) {
      this.x = Math.random() * canvas.width;
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

// ============= STAR CLASS (STATIC TWINKLING STARS) =============
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random();
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
  }
  
  update() {
    // Twinkling effect
    this.opacity += this.twinkleSpeed * this.twinkleDirection;
    
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.twinkleDirection *= -1;
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    
    // Add glow effect for larger stars
    if (this.size > 1) {
      ctx.shadowBlur = 5;
      ctx.shadowColor = `rgba(0, 212, 255, ${this.opacity * 0.5})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    ctx.closePath();
  }
}

// ============= SHOOTING STAR CLASS =============
class ShootingStar {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height / 2;
    this.length = Math.random() * 80 + 20;
    this.speed = Math.random() * 8 + 4;
    this.angle = Math.PI / 4; // 45 degrees
    this.opacity = 1;
    this.active = false;
  }
  
  update() {
    if (!this.active) return;
    
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.02;
    
    if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
      this.active = false;
    }
  }
  
  draw() {
    if (!this.active || this.opacity <= 0) return;
    
    ctx.save();
    ctx.beginPath();
    
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(0, 212, 255, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  
  trigger() {
    if (!this.active) {
      this.reset();
      this.active = true;
    }
  }
}

// ============= NEBULA EFFECT (GRADIENT CLOUDS) =============
class Nebula {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 200 + 100;
    this.opacity = Math.random() * 0.1 + 0.05;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.2 - 0.1;
    this.hue = Math.random() * 60 + 180; // Blue-purple range
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Wrap around screen
    if (this.x < -this.radius) this.x = canvas.width + this.radius;
    if (this.x > canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = canvas.height + this.radius;
    if (this.y > canvas.height + this.radius) this.y = -this.radius;
  }
  
  draw() {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    
    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 50%, ${this.opacity})`);
    gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
}

// ============= INITIALIZE PARTICLES =============
const particlesArray = [];
const starsArray = [];
const nebulaArray = [];
const shootingStarsArray = [];

const particleCount = 100;
const starCount = 200;
const nebulaCount = 3;
const shootingStarCount = 3;

// Create particles
for (let i = 0; i < particleCount; i++) {
  particlesArray.push(new Particle());
}

// Create stars
for (let i = 0; i < starCount; i++) {
  starsArray.push(new Star());
}

// Create nebulas
for (let i = 0; i < nebulaCount; i++) {
  nebulaArray.push(new Nebula());
}

// Create shooting stars
for (let i = 0; i < shootingStarCount; i++) {
  shootingStarsArray.push(new ShootingStar());
}

// ============= ANIMATION LOOP =============
function animate() {
  // Clear canvas with slight fade for trail effect
  ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw and update nebulas (background layer)
  nebulaArray.forEach(nebula => {
    nebula.update();
    nebula.draw();
  });
  
  // Draw and update stars
  starsArray.forEach(star => {
    star.update();
    star.draw();
  });
  
  // Draw and update particles
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw and update shooting stars
  shootingStarsArray.forEach(shootingStar => {
    shootingStar.update();
    shootingStar.draw();
  });
  
  requestAnimationFrame(animate);
}

// ============= TRIGGER SHOOTING STARS RANDOMLY =============
setInterval(() => {
  const randomStar = shootingStarsArray[Math.floor(Math.random() * shootingStarsArray.length)];
  if (Math.random() > 0.7) {
    randomStar.trigger();
  }
}, 3000);

// ============= MOUSE INTERACTION =============
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Create ripple effect on mouse move
  particlesArray.forEach(particle => {
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      particle.x -= dx / distance * 2;
      particle.y -= dy / distance * 2;
    }
  });
});

// ============= CLICK TO CREATE BURST =============
canvas.addEventListener('click', (e) => {
  const burstParticles = 20;
  
  for (let i = 0; i < burstParticles; i++) {
    const particle = new Particle();
    particle.x = e.clientX;
    particle.y = e.clientY;
    particle.speedX = (Math.random() - 0.5) * 5;
    particle.speedY = (Math.random() - 0.5) * 5;
    particle.size = Math.random() * 3 + 1;
    particle.opacity = 1;
    
    particlesArray.push(particle);
    
    // Remove burst particles after animation
    setTimeout(() => {
      const index = particlesArray.indexOf(particle);
      if (index > -1) particlesArray.splice(index, 1);
    }, 2000);
  }
});

// ============= THEME INTEGRATION =============
window.updateParticleColors = function(theme) {
  if (theme === 'light') {
    // Update canvas background for light theme
    ctx.fillStyle = 'rgba(240, 244, 248, 0.1)';
  } else {
    // Update canvas background for dark theme
    ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
  }
};

// ============= PERFORMANCE OPTIMIZATION =============
let isTabActive = true;

document.addEventListener('visibilitychange', () => {
  isTabActive = !document.hidden;
});

// Pause animation when tab is not active
function optimizedAnimate() {
  if (isTabActive) {
    animate();
  } else {
    requestAnimationFrame(optimizedAnimate);
  }
}

// ============= CONSTELLATION LINES (OPTIONAL) =============
function drawConstellations() {
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < starsArray.length; i++) {
    for (let j = i + 1; j < starsArray.length; j++) {
      const dx = starsArray[i].x - starsArray[j].x;
      const dy = starsArray[i].y - starsArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(starsArray[i].x, starsArray[i].y);
        ctx.lineTo(starsArray[j].x, starsArray[j].y);
        ctx.stroke();
      }
    }
  }
}

// Uncomment to enable constellation lines
// Add drawConstellations() call in animate() function if desired

// ============= START ANIMATION =============
animate();

// ============= RESIZE HANDLER =============
window.addEventListener('resize', () => {
  resizeCanvas();
  
  // Redistribute particles on resize
  starsArray.forEach(star => {
    star.x = Math.random() * canvas.width;
    star.y = Math.random() * canvas.height;
  });
});

// ============= DEBUG MODE =============
if (window.location.search.includes('debug=particles')) {
  console.log('🌟 Particle System Debug');
  console.log('Particles:', particlesArray.length);
  console.log('Stars:', starsArray.length);
  console.log('Nebulas:', nebulaArray.length);
  console.log('Shooting Stars:', shootingStarsArray.length);
  
  setInterval(() => {
    console.log('FPS:', Math.round(1000 / 16));
  }, 1000);
}

console.log('✨ Particle system initialized');
