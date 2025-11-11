/**
 * Visual State Configuration
 * Defines all possible visual states and their properties for Style C (Hybrid Modern Weather)
 *
 * Each state includes:
 * - Gradient colors (soft, modern, premium feel)
 * - Particle settings (type, density, speed, direction)
 * - Aurora settings (for night modes)
 * - Animation parameters
 */

export const VISUAL_STATES = {
  // ===== DAY STATES =====
  sunny_day: {
    name: 'Sunny Day',
    gradients: [
      { color: '#FFE082', opacity: 1, position: 0 },
      { color: '#FFD54F', opacity: 1, position: 30 },
      { color: '#FFA726', opacity: 1, position: 60 },
      { color: '#FF7043', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'dust',
      count: 30,
      speed: 0.3,
      size: { min: 1, max: 3 },
      opacity: { min: 0.2, max: 0.5 },
      direction: 'float'
    },
    aurora: false,
    overlayColor: 'rgba(255, 255, 255, 0.1)',
    animationSpeed: 0.5
  },

  cloudy_day: {
    name: 'Cloudy Day',
    gradients: [
      { color: '#B0BEC5', opacity: 1, position: 0 },
      { color: '#90A4AE', opacity: 1, position: 40 },
      { color: '#78909C', opacity: 1, position: 70 },
      { color: '#607D8B', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'dust',
      count: 20,
      speed: 0.4,
      size: { min: 2, max: 4 },
      opacity: { min: 0.1, max: 0.3 },
      direction: 'drift'
    },
    aurora: false,
    overlayColor: 'rgba(255, 255, 255, 0.15)',
    animationSpeed: 0.6
  },

  rain_day: {
    name: 'Rainy Day',
    gradients: [
      { color: '#546E7A', opacity: 1, position: 0 },
      { color: '#455A64', opacity: 1, position: 35 },
      { color: '#37474F', opacity: 1, position: 70 },
      { color: '#263238', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'rain',
      count: 100,
      speed: 2.5,
      size: { min: 1, max: 2 },
      opacity: { min: 0.3, max: 0.6 },
      direction: 'diagonal',
      angle: 75
    },
    aurora: false,
    overlayColor: 'rgba(100, 120, 140, 0.2)',
    animationSpeed: 1.2
  },

  storm_day: {
    name: 'Stormy Day',
    gradients: [
      { color: '#455A64', opacity: 1, position: 0 },
      { color: '#37474F', opacity: 1, position: 30 },
      { color: '#263238', opacity: 1, position: 60 },
      { color: '#1C2833', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'rain',
      count: 150,
      speed: 3.5,
      size: { min: 1, max: 3 },
      opacity: { min: 0.4, max: 0.7 },
      direction: 'diagonal',
      angle: 70
    },
    aurora: false,
    overlayColor: 'rgba(70, 80, 90, 0.3)',
    animationSpeed: 2.0,
    pulseEffect: true
  },

  snow_day: {
    name: 'Snowy Day',
    gradients: [
      { color: '#CFD8DC', opacity: 1, position: 0 },
      { color: '#B0BEC5', opacity: 1, position: 40 },
      { color: '#90A4AE', opacity: 1, position: 70 },
      { color: '#78909C', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'snow',
      count: 80,
      speed: 0.8,
      size: { min: 2, max: 5 },
      opacity: { min: 0.4, max: 0.8 },
      direction: 'drift',
      sway: true
    },
    aurora: false,
    overlayColor: 'rgba(255, 255, 255, 0.2)',
    animationSpeed: 0.7
  },

  fog_day: {
    name: 'Foggy Day',
    gradients: [
      { color: '#ECEFF1', opacity: 1, position: 0 },
      { color: '#CFD8DC', opacity: 1, position: 35 },
      { color: '#B0BEC5', opacity: 1, position: 70 },
      { color: '#90A4AE', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'fog',
      count: 15,
      speed: 0.2,
      size: { min: 40, max: 80 },
      opacity: { min: 0.1, max: 0.25 },
      direction: 'drift'
    },
    aurora: false,
    overlayColor: 'rgba(255, 255, 255, 0.25)',
    animationSpeed: 0.3,
    blurEffect: true
  },

  // ===== NIGHT STATES =====
  clear_night: {
    name: 'Clear Night',
    gradients: [
      { color: '#1A237E', opacity: 1, position: 0 },
      { color: '#283593', opacity: 1, position: 40 },
      { color: '#303F9F', opacity: 1, position: 70 },
      { color: '#3949AB', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'stars',
      count: 100,
      speed: 0.1,
      size: { min: 1, max: 2 },
      opacity: { min: 0.3, max: 0.9 },
      direction: 'static',
      twinkle: true
    },
    aurora: {
      enabled: true,
      colors: ['#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5'],
      intensity: 0.3,
      speed: 0.5
    },
    overlayColor: 'rgba(26, 35, 126, 0.2)',
    animationSpeed: 0.4
  },

  cloudy_night: {
    name: 'Cloudy Night',
    gradients: [
      { color: '#37474F', opacity: 1, position: 0 },
      { color: '#455A64', opacity: 1, position: 40 },
      { color: '#546E7A', opacity: 1, position: 70 },
      { color: '#607D8B', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'dust',
      count: 15,
      speed: 0.3,
      size: { min: 2, max: 4 },
      opacity: { min: 0.1, max: 0.2 },
      direction: 'drift'
    },
    aurora: {
      enabled: true,
      colors: ['#546E7A', '#607D8B', '#78909C'],
      intensity: 0.15,
      speed: 0.3
    },
    overlayColor: 'rgba(55, 71, 79, 0.3)',
    animationSpeed: 0.5
  },

  rain_night: {
    name: 'Rainy Night',
    gradients: [
      { color: '#263238', opacity: 1, position: 0 },
      { color: '#37474F', opacity: 1, position: 35 },
      { color: '#455A64', opacity: 1, position: 70 },
      { color: '#546E7A', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'rain',
      count: 100,
      speed: 2.5,
      size: { min: 1, max: 2 },
      opacity: { min: 0.3, max: 0.6 },
      direction: 'diagonal',
      angle: 75
    },
    aurora: false,
    overlayColor: 'rgba(38, 50, 56, 0.4)',
    animationSpeed: 1.2
  },

  storm_night: {
    name: 'Stormy Night',
    gradients: [
      { color: '#1C2833', opacity: 1, position: 0 },
      { color: '#263238', opacity: 1, position: 30 },
      { color: '#37474F', opacity: 1, position: 60 },
      { color: '#455A64', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'rain',
      count: 150,
      speed: 3.5,
      size: { min: 1, max: 3 },
      opacity: { min: 0.4, max: 0.7 },
      direction: 'diagonal',
      angle: 70
    },
    aurora: false,
    overlayColor: 'rgba(28, 40, 51, 0.5)',
    animationSpeed: 2.0,
    pulseEffect: true
  },

  snow_night: {
    name: 'Snowy Night',
    gradients: [
      { color: '#455A64', opacity: 1, position: 0 },
      { color: '#546E7A', opacity: 1, position: 40 },
      { color: '#607D8B', opacity: 1, position: 70 },
      { color: '#78909C', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'snow',
      count: 80,
      speed: 0.8,
      size: { min: 2, max: 5 },
      opacity: { min: 0.4, max: 0.8 },
      direction: 'drift',
      sway: true
    },
    aurora: {
      enabled: true,
      colors: ['#80DEEA', '#4DD0E1', '#26C6DA'],
      intensity: 0.2,
      speed: 0.4
    },
    overlayColor: 'rgba(69, 90, 100, 0.3)',
    animationSpeed: 0.7
  },

  fog_night: {
    name: 'Foggy Night',
    gradients: [
      { color: '#37474F', opacity: 1, position: 0 },
      { color: '#455A64', opacity: 1, position: 35 },
      { color: '#546E7A', opacity: 1, position: 70 },
      { color: '#607D8B', opacity: 1, position: 100 }
    ],
    particles: {
      type: 'fog',
      count: 15,
      speed: 0.2,
      size: { min: 40, max: 80 },
      opacity: { min: 0.1, max: 0.25 },
      direction: 'drift'
    },
    aurora: false,
    overlayColor: 'rgba(55, 71, 79, 0.4)',
    animationSpeed: 0.3,
    blurEffect: true
  }
};

/**
 * Maps OpenWeatherMap condition codes to visual states
 */
export const WEATHER_CODE_MAP = {
  // Thunderstorm
  200: 'storm', 201: 'storm', 202: 'storm',
  210: 'storm', 211: 'storm', 212: 'storm',
  221: 'storm', 230: 'storm', 231: 'storm', 232: 'storm',

  // Drizzle
  300: 'rain', 301: 'rain', 302: 'rain',
  310: 'rain', 311: 'rain', 312: 'rain',
  313: 'rain', 314: 'rain', 321: 'rain',

  // Rain
  500: 'rain', 501: 'rain', 502: 'rain',
  503: 'rain', 504: 'rain', 511: 'rain',
  520: 'rain', 521: 'rain', 522: 'rain', 531: 'rain',

  // Snow
  600: 'snow', 601: 'snow', 602: 'snow',
  611: 'snow', 612: 'snow', 613: 'snow',
  615: 'snow', 616: 'snow', 620: 'snow',
  621: 'snow', 622: 'snow',

  // Atmosphere (Fog, Mist, etc.)
  701: 'fog', 711: 'fog', 721: 'fog',
  731: 'fog', 741: 'fog', 751: 'fog',
  761: 'fog', 762: 'fog', 771: 'fog', 781: 'fog',

  // Clear
  800: 'sunny',

  // Clouds
  801: 'cloudy', 802: 'cloudy', 803: 'cloudy', 804: 'cloudy'
};

/**
 * Time-based configuration
 */
export const TIME_CONFIG = {
  dayStart: 6,    // 6 AM
  dayEnd: 18,     // 6 PM
  sunriseBuffer: 1,  // 1 hour buffer for sunrise
  sunsetBuffer: 1    // 1 hour buffer for sunset
};

/**
 * Performance configuration
 * Defines particle counts for different device capabilities
 */
export const PERFORMANCE_CONFIG = {
  high: {
    particleMultiplier: 1.0,
    auroraEnabled: true,
    effectsEnabled: true
  },
  medium: {
    particleMultiplier: 0.6,
    auroraEnabled: true,
    effectsEnabled: true
  },
  low: {
    particleMultiplier: 0.3,
    auroraEnabled: false,
    effectsEnabled: false
  }
};
