// ============= THEME TOGGLE SYSTEM =============

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
const body = document.body;

// ============= THEME STATE =============
let currentTheme = 'dark';

// ============= INITIALIZE THEME ON PAGE LOAD =============
function initTheme() {
  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  console.log('🎨 Initializing theme system...');
  console.log(`💾 Saved theme: ${savedTheme || 'none'}`);
  console.log(`🖥️ System preference: ${prefersDark ? 'dark' : 'light'}`);
  
  // Determine which theme to use
  if (savedTheme === 'light') {
    setLightTheme();
  } else if (savedTheme === 'dark') {
    setDarkTheme();
  } else {
    // No saved preference, use system preference
    if (prefersDark) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
}

// ============= SET LIGHT THEME =============
function setLightTheme() {
  body.classList.add('light-theme');
  currentTheme = 'light';
  
  if (themeIcon) {
    themeIcon.textContent = '☀️';
  }
  
  localStorage.setItem('theme', 'light');
  
  // Update CSS custom properties
  updateCSSVariables('light');
  
  // Dispatch theme change event
  const themeChangeEvent = new CustomEvent('themeChange', { 
    detail: { theme: 'light' } 
  });
  document.dispatchEvent(themeChangeEvent);
  
  console.log('☀️ Light theme activated');
}

// ============= SET DARK THEME =============
function setDarkTheme() {
  body.classList.remove('light-theme');
  currentTheme = 'dark';
  
  if (themeIcon) {
    themeIcon.textContent = '🌙';
  }
  
  localStorage.setItem('theme', 'dark');
  
  // Update CSS custom properties
  updateCSSVariables('dark');
  
  // Dispatch theme change event
  const themeChangeEvent = new CustomEvent('themeChange', { 
    detail: { theme: 'dark' } 
  });
  document.dispatchEvent(themeChangeEvent);
  
  console.log('🌙 Dark theme activated');
}

// ============= UPDATE CSS VARIABLES =============
function updateCSSVariables(theme) {
  const root = document.documentElement;
  
  if (theme === 'light') {
    // Light theme colors
    root.style.setProperty('--neon-blue', '#0080ff');
    root.style.setProperty('--neon-cyan', '#0099ff');
    root.style.setProperty('--neon-purple', '#6a5acd');
    root.style.setProperty('--dark-bg', 'rgba(240, 248, 255, 0.4)');
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.3)');
    root.style.setProperty('--glass-border', 'rgba(0, 128, 255, 0.3)');
    root.style.setProperty('--text-primary', '#1a1a2e');
    root.style.setProperty('--text-secondary', '#4a5568');
    root.style.setProperty('--glow-sm', '0 0 10px rgba(0, 128, 255, 0.5)');
    root.style.setProperty('--glow-md', '0 0 20px rgba(0, 128, 255, 0.6)');
    root.style.setProperty('--glow-lg', '0 0 30px rgba(0, 128, 255, 0.7)');
  } else {
    // Dark theme colors
    root.style.setProperty('--neon-blue', '#00bfff');
    root.style.setProperty('--neon-cyan', '#00f0ff');
    root.style.setProperty('--neon-purple', '#8a2be2');
    root.style.setProperty('--dark-bg', 'rgba(10, 20, 40, 0.3)');
    root.style.setProperty('--glass-bg', 'rgba(15, 25, 45, 0.25)');
    root.style.setProperty('--glass-border', 'rgba(0, 191, 255, 0.3)');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-secondary', '#b8c5d6');
    root.style.setProperty('--glow-sm', '0 0 10px var(--neon-cyan)');
    root.style.setProperty('--glow-md', '0 0 20px var(--neon-cyan), 0 0 40px var(--neon-blue)');
    root.style.setProperty('--glow-lg', '0 0 30px var(--neon-cyan), 0 0 60px var(--neon-blue), 0 0 90px var(--neon-purple)');
  }
}

// ============= TOGGLE THEME =============
function toggleTheme() {
  // Add transition class for smooth animation
  body.classList.add('theme-transitioning');
  
  if (body.classList.contains('light-theme')) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  
  // Add theme transition animation
  addThemeTransitionAnimation();
  
  // Remove transition class after animation
  setTimeout(() => {
    body.classList.remove('theme-transitioning');
  }, 500);
}

// ============= THEME TRANSITION ANIMATION =============
function addThemeTransitionAnimation() {
  const overlay = document.createElement('div');
  overlay.className = 'theme-transition-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${currentTheme === 'light' ? 'rgba(15, 20, 25, 0.8)' : 'rgba(240, 248, 255, 0.8)'};
    opacity: 0;
    pointer-events: none;
    z-index: 9998;
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(overlay);
  
  // Trigger animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
  
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 150);
  
  setTimeout(() => {
    overlay.remove();
  }, 450);
}

// ============= EVENT LISTENERS =============
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
  
  // Add hover effect
  themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'rotate(180deg) scale(1.1)';
  });
  
  themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'rotate(0deg) scale(1)';
  });
}

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
  // Ctrl + Shift + T to toggle theme
  if (e.ctrlKey && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    toggleTheme();
    console.log('⌨️ Theme toggled via keyboard shortcut');
  }
  
  // Alt + T to toggle theme
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    toggleTheme();
    console.log('⌨️ Theme toggled via keyboard shortcut (Alt+T)');
  }
});

// ============= LISTEN FOR SYSTEM THEME CHANGES =============
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkModeQuery.addEventListener('change', (e) => {
  // Only auto-switch if user hasn't manually set a preference
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      setDarkTheme();
      console.log('🖥️ System theme changed to dark');
    } else {
      setLightTheme();
      console.log('🖥️ System theme changed to light');
    }
  }
});

// ============= SYNC THEME ACROSS TABS =============
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    if (e.newValue === 'light') {
      setLightTheme();
      console.log('🔄 Theme synced to light (from another tab)');
    } else if (e.newValue === 'dark') {
      setDarkTheme();
      console.log('🔄 Theme synced to dark (from another tab)');
    }
  }
});

// ============= ACCESSIBILITY ANNOUNCEMENT =============
function announceThemeChange(theme) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = `Theme changed to ${theme} mode`;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    announcement.remove();
  }, 1000);
}

// Add screen reader only styles
const srStyle = document.createElement('style');
srStyle.textContent = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .theme-transitioning * {
    transition: background-color 0.5s ease, 
                color 0.5s ease, 
                border-color 0.5s ease !important;
  }
`;
document.head.appendChild(srStyle);

// Announce theme changes
document.addEventListener('themeChange', (e) => {
  announceThemeChange(e.detail.theme);
});

// ============= AUTO THEME BY TIME OF DAY (OPTIONAL) =============
function autoThemeByTime() {
  const hour = new Date().getHours();
  
  // Only apply if no saved preference
  if (!localStorage.getItem('theme')) {
    if (hour >= 6 && hour < 18) {
      // Daytime: 6 AM to 6 PM
      setLightTheme();
      console.log('☀️ Auto theme: Daytime detected, using light theme');
    } else {
      // Nighttime
      setDarkTheme();
      console.log('🌙 Auto theme: Nighttime detected, using dark theme');
    }
  }
}

// Uncomment to enable auto theme by time of day
// autoThemeByTime();

// ============= THEME PREFERENCE HINT =============
function showThemeHint() {
  const hint = document.createElement('div');
  hint.className = 'theme-hint';
  hint.innerHTML = `
    <p>💡 Tip: Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> to toggle theme</p>
  `;
  hint.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 30px;
    padding: 15px 20px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 0.85rem;
    z-index: 9999;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  `;
  
  document.body.appendChild(hint);
  
  setTimeout(() => {
    hint.style.opacity = '1';
    hint.style.transform = 'translateY(0)';
  }, 100);
  
  setTimeout(() => {
    hint.style.opacity = '0';
    hint.style.transform = 'translateY(20px)';
    setTimeout(() => hint.remove(), 400);
  }, 5000);
}

// Show hint after 3 seconds (only once per session)
if (!sessionStorage.getItem('themeHintShown')) {
  setTimeout(() => {
    showThemeHint();
    sessionStorage.setItem('themeHintShown', 'true');
  }, 3000);
}

// ============= THEME PERSISTENCE =============
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
  
  // Also save to cookies for server-side persistence (optional)
  document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
}

// ============= GET CURRENT THEME =============
window.getCurrentTheme = function() {
  return currentTheme;
};

// ============= SET THEME PROGRAMMATICALLY =============
window.setTheme = function(theme) {
  if (theme === 'light') {
    setLightTheme();
  } else if (theme === 'dark') {
    setDarkTheme();
  } else {
    console.warn('⚠️ Invalid theme. Use "light" or "dark"');
  }
};

// ============= THEME DEBUG MODE =============
if (window.location.search.includes('debug=theme')) {
  console.log('🔍 Theme Debug Mode Enabled');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Current Theme:', currentTheme);
  console.log('Saved Theme:', localStorage.getItem('theme'));
  console.log('System Preference:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  console.log('Body Classes:', body.className);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// ============= THEME ANALYTICS (OPTIONAL) =============
document.addEventListener('themeChange', (e) => {
  // Track theme changes with analytics (if you have Google Analytics, etc.)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'theme_change', {
      'event_category': 'engagement',
      'event_label': e.detail.theme
    });
  }
  
  console.log(`📊 Theme changed to: ${e.detail.theme}`);
});

// ============= HIGH CONTRAST MODE DETECTION =============
const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

highContrastQuery.addEventListener('change', (e) => {
  if (e.matches) {
    document.body.classList.add('high-contrast');
    console.log('🔲 High contrast mode enabled');
  } else {
    document.body.classList.remove('high-contrast');
    console.log('🔲 High contrast mode disabled');
  }
});

// ============= REDUCED MOTION DETECTION =============
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

reducedMotionQuery.addEventListener('change', (e) => {
  if (e.matches) {
    document.body.classList.add('reduced-motion');
    console.log('🎬 Reduced motion preference detected');
  } else {
    document.body.classList.remove('reduced-motion');
    console.log('🎬 Normal motion preference detected');
  }
});

// ============= THEME EXPORT FOR OTHER SCRIPTS =============
window.themeController = {
  toggle: toggleTheme,
  setLight: setLightTheme,
  setDark: setDarkTheme,
  getCurrent: () => currentTheme,
  getPreference: () => localStorage.getItem('theme')
};

// ============= INITIALIZE ON PAGE LOAD =============
initTheme();

// ============= PREVENT FLASH OF UNSTYLED CONTENT (FOUC) =============
// This runs before DOM is ready to prevent theme flash
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
  }
})();

// ============= LOG INITIALIZATION =============
console.log('🎨 Theme system initialized successfully');
console.log(`Current theme: ${currentTheme}`);

// ============= EXPORT THEME CHANGE LISTENER =============
window.onThemeChange = function(callback) {
  document.addEventListener('themeChange', (e) => {
    callback(e.detail.theme);
  });
};

// Example usage:
// window.onThemeChange((theme) => {
//   console.log('Theme changed to:', theme);
// });
