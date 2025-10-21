// ============= VIDEO BACKGROUND CONTROLLER (SIMPLIFIED & FIXED) =============

const videoBg = document.getElementById('space-bg');
let videoErrorShown = false;

// ============= INITIALIZE VIDEO =============
function initVideoBackground() {
  if (!videoBg) {
    console.error('❌ Video element not found');
    return;
  }
  
  videoBg.play().catch(err => {
    console.log('⚠️ Video autoplay prevented, will play on user interaction');
    
    document.addEventListener('click', () => {
      videoBg.play().then(() => {
        console.log('✅ Video started playing');
      });
    }, { once: true });
    
    document.addEventListener('scroll', () => {
      videoBg.play();
    }, { once: true });
  });
  
  videoBg.style.opacity = '0';
  setTimeout(() => {
    videoBg.style.transition = 'opacity 1.5s ease';
    videoBg.style.opacity = '0.7';
  }, 100);
  
  console.log('🎥 Video background initializing...');
}

// ============= PAUSE VIDEO WHEN TAB IS INACTIVE =============
document.addEventListener('visibilitychange', () => {
  if (!videoBg) return;
  
  if (document.hidden) {
    videoBg.pause();
    console.log('⏸️ Video paused (tab inactive)');
  } else {
    // Resume video when tab becomes active again
    if (!videoBg.ended) {
      videoBg.play().then(() => {
        console.log('▶️ Video resumed (tab active)');
      }).catch(err => {
        // Silently handle resume errors
        console.log('⚠️ Video playback issue');
      });
    }
  }
});

// ============= VIDEO LOADING HANDLERS =============
videoBg.addEventListener('loadeddata', () => {
  console.log('✅ Video background loaded successfully');
  videoBg.style.opacity = '0.7';
});

videoBg.addEventListener('loadedmetadata', () => {
  console.log(`📹 Video duration: ${videoBg.duration.toFixed(2)}s`);
});

videoBg.addEventListener('canplay', () => {
  console.log('✅ Video ready to play');
});

// ============= VIDEO ERROR HANDLER (FIXED) =============
videoBg.addEventListener('error', (e) => {
  // Only show error once and only if video genuinely failed to load
  if (!videoErrorShown && videoBg.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
    videoErrorShown = true;
    console.error('❌ Video failed to load');
    
    // Fallback to gradient background
    videoBg.style.display = 'none';
    document.body.style.background = 'linear-gradient(135deg, #0a1428 0%, #1a1f3a 50%, #2d1b69 100%)';
    
    // Show notification only for real errors
    showNotification('⚠️ Video background unavailable. Using fallback.');
  }
});

// ============= VIDEO STAYS FIXED =============
videoBg.style.position = 'fixed';
videoBg.style.top = '0';
videoBg.style.left = '0';
videoBg.style.transform = 'none';

// ============= MOBILE OPTIMIZATION =============
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
  videoBg.style.opacity = '0.5';
  console.log('📱 Mobile device detected - Adjusted video opacity');
}

// ============= SEAMLESS LOOP =============
videoBg.addEventListener('ended', () => {
  videoBg.currentTime = 0;
  videoBg.play();
});

// ============= BATTERY SAVER MODE =============
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    function updateVideoForBattery() {
      const level = battery.level * 100;
      
      if (level < 20 && !battery.charging) {
        videoBg.pause();
        videoBg.style.opacity = '0.3';
        console.log(`🔋 Low battery (${level.toFixed(0)}%) - Video paused`);
      } else if (battery.charging || level >= 20) {
        if (videoBg.paused && !document.hidden) {
          videoBg.play();
          videoBg.style.opacity = '0.7';
        }
      }
    }
    
    battery.addEventListener('levelchange', updateVideoForBattery);
    battery.addEventListener('chargingchange', updateVideoForBattery);
    updateVideoForBattery();
  }).catch(err => {
    // Battery API not available, silently continue
  });
}

// ============= NETWORK AWARE LOADING =============
if (navigator.connection) {
  const connection = navigator.connection;
  
  function handleConnectionChange() {
    const saveData = connection.saveData;
    const effectiveType = connection.effectiveType;
    
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      videoBg.style.display = 'none';
      console.log('📶 Slow connection - Video hidden');
    } else {
      videoBg.style.display = 'block';
    }
  }
  
  navigator.connection.addEventListener('change', handleConnectionChange);
  handleConnectionChange();
}

// ============= PREVENT CONTEXT MENU =============
videoBg.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// ============= VIDEO VOLUME =============
videoBg.volume = 0;
videoBg.muted = true;

// ============= INITIALIZE ON LOAD =============
window.addEventListener('load', () => {
  initVideoBackground();
  console.log('🎥 Video background system ready');
});

// ============= ERROR RECOVERY (ONLY FOR REAL STALLS) =============
let stallCount = 0;
videoBg.addEventListener('stalled', () => {
  stallCount++;
  if (stallCount > 2) {
    console.log('⚠️ Video stalled multiple times, reloading...');
    videoBg.load();
    videoBg.play().catch(() => {
      // Silently handle reload errors
    });
    stallCount = 0;
  }
});

// ============= CLEANUP ON UNLOAD =============
window.addEventListener('beforeunload', () => {
  videoBg.pause();
  videoBg.src = '';
  videoBg.load();
});

// ============= WINDOW RESIZE HANDLER =============
window.addEventListener('resize', () => {
  videoBg.style.width = '100vw';
  videoBg.style.height = '100vh';
});

// ============= NOTIFICATION HELPER (IMPROVED) =============
function showNotification(message) {
  // Check if notification already exists
  const existingNotification = document.querySelector('.video-notification');
  if (existingNotification) return;
  
  const notification = document.createElement('div');
  notification.className = 'video-notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 15px 25px;
    background: rgba(15, 25, 45, 0.9);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 100, 100, 0.5);
    border-radius: 10px;
    color: #fff;
    font-size: 0.9rem;
    z-index: 10000;
    animation: slideIn 0.5s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Add animation styles
const animStyle = document.createElement('style');
animStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(animStyle);

console.log('✅ Video background controller loaded');
