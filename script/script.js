// ============= SCROLL TO TOP ON PAGE LOAD/REFRESH =============
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Force scroll to top on page load
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

// Scroll to top immediately
window.scrollTo(0, 0);

// ============= INITIALIZE AOS ANIMATIONS =============
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: false,
  offset: 100,
  delay: 100
});

// ============= TYPEWRITER EFFECT =============
const typewriterElement = document.getElementById('typewriter-text');
const phrases = [
  "AI Enthusiast & Developer",
  "Building the Future with Code",
  "Full-Stack Web Developer",
  "An Explorer",
  "Turning Ideas into Reality"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
  if (!typewriterElement) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  }
  
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeWriter, typingSpeed);
}

// Start typewriter on load
window.addEventListener('load', () => {
  // Scroll to top first
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
  
  // Then start typewriter
  setTimeout(typeWriter, 1000);
});

// ============= SMOOTH SCROLLING =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#" or empty
    if (!href || href === '#' || href.length <= 1) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============= NAVBAR SCROLL EFFECT =============
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScroll = currentScroll;
});

// ============= ACTIVE NAVIGATION LINK =============
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============= SCROLL TO TOP BUTTON =============
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============= FORM SUBMISSION =============
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const formData = {};
    
    formInputs.forEach(input => {
      if (input.name) {
        formData[input.name] = input.value;
      }
    });
    
    // Show success notification
    showNotification(`Thanks ${formData.name || 'there'}! Your message has been sent. 🚀`);
    
    // Reset form
    contactForm.reset();
  });
}

// ============= NOTIFICATION SYSTEM =============
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 20px 30px;
    background: rgba(15, 25, 45, 0.9);
    backdrop-filter: blur(15px);
    border: 2px solid var(--neon-cyan);
    border-radius: 10px;
    color: var(--text-primary);
    font-weight: 500;
    z-index: 10000;
    animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    box-shadow: var(--glow-md);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add notification animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(50px);
    }
  }
`;
document.head.appendChild(notificationStyle);

// ============= CURSOR TRAIL EFFECT =============
let cursorTrail = [];
const maxTrail = 10;

document.addEventListener('mousemove', (e) => {
  // Skip on mobile
  if (window.innerWidth <= 768) return;
  
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: 5px;
    height: 5px;
    background: var(--neon-cyan);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    box-shadow: var(--glow-sm);
    animation: trailFade 0.5s ease forwards;
  `;
  
  document.body.appendChild(trail);
  cursorTrail.push(trail);
  
  if (cursorTrail.length > maxTrail) {
    const oldTrail = cursorTrail.shift();
    if (oldTrail && oldTrail.parentNode) {
      oldTrail.remove();
    }
  }
  
  setTimeout(() => {
    if (trail && trail.parentNode) {
      trail.remove();
    }
  }, 500);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
  @keyframes trailFade {
    to {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(trailStyle);

// ============= PROJECT CARD TILT EFFECT =============
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============= SKILL ITEMS HOVER EFFECT =============
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.1) rotate(5deg)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1) rotate(0deg)';
  });
});

// ============= PARALLAX EFFECT FOR HERO =============
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Parallax for hero section
  const hero = document.querySelector('.hero');
  if (hero && scrolled < window.innerHeight) {
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

// ============= NEON BUTTON RIPPLE EFFECT =============
const neonButtons = document.querySelectorAll('.neon-btn');

neonButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(0, 191, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .neon-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(rippleStyle);

// ============= CONSOLE MESSAGE =============
console.log(`
%c
╔═══════════════════════════════════════╗
║   EASHAN DARSH PORTFOLIO V2.0        ║
║   🚀 Built with passion & code       ║
║   © 2025 All Rights Reserved         ║
╚═══════════════════════════════════════╝
`, 'color: #00bfff; font-weight: bold; font-size: 12px;');

// ============= INITIALIZE ALL ON LOAD =============
window.addEventListener('load', () => {
  console.log('✅ Portfolio fully loaded and initialized!');
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Trigger AOS refresh
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
  
  // Add loaded class to body
  document.body.classList.add('loaded');
});

// ============= REFRESH AOS ON SCROLL =============
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 100);
});

// ============= PREVENT DEFAULT ON EMPTY LINKS =============
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// ============= FORCE SCROLL TO TOP ON DOM READY =============
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

