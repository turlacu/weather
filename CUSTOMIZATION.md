# Customization Guide

Quick reference for customizing the weather background system.

## 📍 Where to Make Changes

All visual customization is centralized in one file:
```
src/config/visualStates.js
```

## 🎨 Changing Colors

### Gradient Colors

Each weather state has a `gradients` array. Each gradient stop has:
- `color`: Hex color code
- `opacity`: 0-1 (transparency)
- `position`: 0-100 (percentage across gradient)

Example:
```javascript
sunny_day: {
  gradients: [
    { color: '#FFE082', opacity: 1, position: 0 },      // Top
    { color: '#FFD54F', opacity: 0.9, position: 30 },   // Upper-mid
    { color: '#FFA726', opacity: 0.7, position: 60 },   // Lower-mid
    { color: '#FF7043', opacity: 0.5, position: 100 }   // Bottom
  ],
  // ...
}
```

**Tips:**
- Use 3-4 gradient stops for smooth transitions
- Keep opacity high (0.7-1.0) for vibrant colors
- Lower opacity (0.3-0.6) for subtle effects

### Overlay Colors

The `overlayColor` adds a tint over the entire background:

```javascript
overlayColor: 'rgba(255, 255, 255, 0.1)'  // Slight white tint
```

Useful for:
- Adding warmth: `rgba(255, 200, 100, 0.1)`
- Adding coolness: `rgba(100, 150, 255, 0.1)`
- Darkening: `rgba(0, 0, 0, 0.2)`

## ✨ Adjusting Particles

### Particle Count

```javascript
particles: {
  count: 100,  // Number of particles
  // ...
}
```

**Recommendations:**
- Rain: 80-150
- Snow: 60-100
- Stars: 80-120
- Dust: 20-40
- Fog: 10-20

### Particle Speed

```javascript
particles: {
  speed: 2.5,  // Movement speed multiplier
  // ...
}
```

**Typical values:**
- Rain: 2.0-3.5
- Snow: 0.6-1.2
- Stars: 0.05-0.15 (barely moving)
- Dust: 0.2-0.5
- Fog: 0.1-0.3

### Particle Size

```javascript
particles: {
  size: { min: 1, max: 2 },  // Pixel size range
  // ...
}
```

**Typical ranges:**
- Rain: 1-2px
- Snow: 2-5px
- Stars: 1-2px
- Dust: 1-3px
- Fog: 40-80px (large and blurred)

### Particle Opacity

```javascript
particles: {
  opacity: { min: 0.3, max: 0.6 },  // Transparency range
  // ...
}
```

**Tips:**
- Lower opacity (0.1-0.4) for subtle effects
- Higher opacity (0.5-0.9) for dramatic effects
- Rain/snow work well at 0.3-0.7

### Particle Direction

```javascript
particles: {
  direction: 'diagonal',  // Movement direction
  angle: 75,              // Angle in degrees (for diagonal)
  // ...
}
```

**Available directions:**
- `'diagonal'` - Angled movement (rain)
- `'drift'` - Gentle side-to-side (snow, fog)
- `'float'` - Slow vertical rise (dust)
- `'static'` - No movement (stars)

## 🌊 Animation Speed

Controls how fast the background animates:

```javascript
animationSpeed: 1.2  // Global animation speed multiplier
```

**Recommendations:**
- Calm weather: 0.3-0.7 (slow, peaceful)
- Normal weather: 0.8-1.2 (moderate)
- Intense weather: 1.5-2.5 (dramatic, energetic)

## 🌈 Aurora Settings (Night Only)

```javascript
aurora: {
  enabled: true,
  colors: ['#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5'],
  intensity: 0.3,  // 0-1, how visible it is
  speed: 0.5       // Animation speed
}
```

**Tips:**
- Use 3-5 colors for aurora
- Keep intensity low (0.15-0.4) for subtlety
- Cool blues/cyans for clear nights
- Muted colors for cloudy nights
- Higher intensity (0.3-0.5) for snowy nights

## 🎭 Special Effects

### Pulse Effect (Storms)

```javascript
pulseEffect: true  // Adds breathing/pulsing effect
```

### Flash Effect (Lightning)

```javascript
flashEffect: true  // Random lightning flashes
```

### Blur Effect (Fog)

```javascript
blurEffect: true  // Adds backdrop blur
```

## ⚙️ Performance Tuning

Edit the `PERFORMANCE_CONFIG` object:

```javascript
export const PERFORMANCE_CONFIG = {
  high: {
    particleMultiplier: 1.0,    // 100% of particles
    auroraEnabled: true,        // Enable aurora
    effectsEnabled: true        // Enable blur/effects
  },
  medium: {
    particleMultiplier: 0.6,    // 60% of particles
    auroraEnabled: true,
    effectsEnabled: true
  },
  low: {
    particleMultiplier: 0.3,    // 30% of particles
    auroraEnabled: false,       // Disable aurora
    effectsEnabled: false       // Disable effects
  }
};
```

## 🎯 Quick Tweaks for Common Goals

### Make it more vibrant
1. Increase gradient opacity values
2. Reduce `overlayColor` opacity
3. Use brighter colors

### Make it more subtle
1. Lower gradient opacity values
2. Increase `overlayColor` opacity with gray
3. Use muted colors
4. Reduce particle count

### Make it faster/more energetic
1. Increase `animationSpeed`
2. Increase particle `speed`
3. Increase particle `count`

### Make it calmer
1. Decrease `animationSpeed`
2. Decrease particle `speed`
3. Decrease particle `count`

### Better performance
1. Reduce particle `count`
2. Disable `blurEffect`
3. Lower aurora `intensity`
4. Adjust `PERFORMANCE_CONFIG` multipliers

## 🔧 Adding New Weather States

1. Copy an existing state in `visualStates.js`
2. Rename it (e.g., `windy_day`)
3. Modify colors, particles, effects
4. Add to `WEATHER_CODE_MAP` if using real weather API

Example:
```javascript
windy_day: {
  name: 'Windy Day',
  gradients: [
    { color: '#B3E5FC', opacity: 1, position: 0 },
    { color: '#81D4FA', opacity: 0.9, position: 50 },
    { color: '#4FC3F7', opacity: 0.8, position: 100 }
  ],
  particles: {
    type: 'dust',
    count: 60,
    speed: 1.5,
    size: { min: 1, max: 2 },
    opacity: { min: 0.2, max: 0.5 },
    direction: 'drift'
  },
  aurora: false,
  overlayColor: 'rgba(200, 220, 240, 0.1)',
  animationSpeed: 1.5
}
```

## 📚 Color Palette Ideas

### Warm Sunset
```javascript
['#FF6B6B', '#FF8E53', '#FCA311', '#FFD700']
```

### Cool Ocean
```javascript
['#0077BE', '#00B4D8', '#90E0EF', '#CAF0F8']
```

### Purple Night
```javascript
['#3D0066', '#5A189A', '#7209B7', '#9D4EDD']
```

### Autumn
```javascript
['#8B4513', '#A0522D', '#CD853F', '#DAA520']
```

### Mint Fresh
```javascript
['#06FFA5', '#00D9FF', '#00B4D8', '#0096C7']
```

---

**Pro Tip:** Make small changes and test in Manual Mode using the Debug Panel before committing to a style!
