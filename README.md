# Weather Background Demo - Style C (Hybrid Modern Weather)

A standalone React 18 demo app featuring a dynamic, animated weather-reactive background system. Built to test and refine animated weather backgrounds before integration into production apps.

## 🎨 Design Philosophy

**Style C: Hybrid Modern Weather** combines the best of real weather patterns with stylized, premium aesthetics:

- Modern UI feel inspired by Apple Music and Spotify
- Soft gradients and abstract shapes that represent weather moods
- Subtle but expressive animations
- Not realistic, but emotionally resonant with actual weather conditions

## ✨ Features

### Core Modules

1. **WeatherManager** - Fetches live weather data and determines visual states
2. **BackgroundRenderer** - Renders dynamic animated gradients
3. **ParticleLayer** - Canvas-based particle system for weather effects
4. **AuroraLayer** - Flowing ribbons for night mode atmospherics
5. **TransitionController** - Smooth crossfades between states (via Framer Motion)
6. **DebugPanel** - Testing interface for manual weather control

### Weather States

**Day States:**
- ☀️ Sunny Day - Warm gradients with floating dust particles
- ☁️ Cloudy Day - Cool grays with drifting particles
- 🌧️ Rainy Day - Deep blues with diagonal rain streaks
- ⛈️ Stormy Day - Dark atmosphere with heavy rain and pulse effects
- ❄️ Snowy Day - Cool whites with drifting snowflakes
- 🌫️ Foggy Day - Soft grays with large blurred particles

**Night States:**
- 🌙 Clear Night - Deep blues with twinkling stars and aurora
- ☁️ Cloudy Night - Muted tones with subtle aurora
- 🌧️ Rainy Night - Dark atmosphere with rain
- ⛈️ Stormy Night - Very dark with intense rain and lightning flashes
- ❄️ Snowy Night - Cool blues with snow and gentle aurora
- 🌫️ Foggy Night - Muted darkness with fog layers

### Performance Optimization

- **Auto-detection** of device capabilities (mobile, tablet, desktop, TV)
- **Three performance levels**: Low, Medium, High
- **Automatic scaling** of particle counts and effects
- **Efficient rendering** using canvas and optimized animations
- Works smoothly on mobile, desktop, and smart TV devices

### Special Effects

- **Aurora ribbons** for night modes (flowing gradient animations)
- **Particle systems** (rain, snow, stars, dust, fog)
- **Lightning flashes** during storms
- **Pulse effects** for dramatic weather
- **Blur effects** for atmospheric fog
- **Smooth transitions** between all weather states

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. (Optional) Get an OpenWeatherMap API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Copy `.env.example` to `.env`
   - Add your API key to `.env`

**Note:** The app works in offline/demo mode without an API key!

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

## 🎮 Using the App

### Auto Mode (Default)
- Automatically fetches your local weather
- Updates every 10 minutes
- Shows real-time weather conditions

### Manual Mode
- Click **Manual** in the Debug Panel
- Select **Day** or **Night**
- Choose any weather type to test
- Perfect for development and testing

### Performance Controls
- Switch between **Low**, **Medium**, and **High** performance
- Low: Reduced particles, no aurora, no blur effects
- Medium: Balanced experience (recommended)
- High: Full effects with maximum visual quality

## 🛠️ Technical Stack

- **React 18** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Canvas API** - High-performance particle rendering
- **OpenWeatherMap API** - Live weather data

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BackgroundRenderer.jsx   # Gradient backgrounds
│   ├── ParticleLayer.jsx        # Canvas particle system
│   ├── AuroraLayer.jsx          # Night mode aurora
│   ├── DebugPanel.jsx           # Testing controls
│   └── WeatherStatus.jsx        # Weather info display
├── modules/            # Core logic modules
│   └── WeatherManager.js        # Weather fetching & state
├── utils/              # Utility functions
│   └── performanceDetector.js   # Device capability detection
├── config/             # Configuration
│   └── visualStates.js          # Weather-to-visual mappings
├── App.jsx             # Main app component
└── main.jsx            # React entry point
```

## 🎨 Customization Guide

### Tweaking Colors

Edit `src/config/visualStates.js`:

```javascript
sunny_day: {
  gradients: [
    { color: '#FFE082', opacity: 1, position: 0 },
    { color: '#FFD54F', opacity: 0.9, position: 30 },
    // Add more gradient stops...
  ],
  // ...
}
```

### Adjusting Particle Behavior

In `visualStates.js`:

```javascript
particles: {
  type: 'rain',           // rain, snow, stars, dust, fog
  count: 100,             // Number of particles
  speed: 2.5,             // Movement speed
  size: { min: 1, max: 2 }, // Size range
  opacity: { min: 0.3, max: 0.6 }, // Opacity range
  direction: 'diagonal',  // Movement direction
  angle: 75               // Angle for directional particles
}
```

### Modifying Animation Speed

In `visualStates.js`:

```javascript
animationSpeed: 1.2  // Higher = faster animations
```

### Performance Tuning

Edit `src/config/visualStates.js`:

```javascript
export const PERFORMANCE_CONFIG = {
  high: {
    particleMultiplier: 1.0,    // 100% particles
    auroraEnabled: true,
    effectsEnabled: true
  },
  // Customize other levels...
};
```

## 🔧 Advanced Configuration

### Adding New Weather States

1. Open `src/config/visualStates.js`
2. Add a new state to `VISUAL_STATES`:

```javascript
windy_day: {
  name: 'Windy Day',
  gradients: [...],
  particles: {...},
  aurora: false,
  overlayColor: 'rgba(...)',
  animationSpeed: 0.8
}
```

3. Map weather codes to your new state in `WEATHER_CODE_MAP`

### Creating Custom Particle Types

Edit `src/components/ParticleLayer.jsx` and add a new draw function:

```javascript
function drawCustomParticle(ctx, particle) {
  // Your custom drawing code
}
```

Then add it to the `drawParticle` switch statement.

## 📱 Device Support

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablet (iPad, Android tablets)
- ✅ Smart TVs (tested on modern smart TV browsers)

## ⚡ Performance Tips

1. **Use Medium performance** as default for best balance
2. **Low performance mode** for older devices or battery saving
3. **High performance** only on powerful devices
4. The app automatically detects and adjusts for your device

## 🐛 Troubleshooting

### Weather not loading?
- Check your internet connection
- The app will work in demo mode without API key
- Check browser console for errors

### Performance issues?
- Switch to Low performance mode in Debug Panel
- Close other browser tabs
- Try a different browser

### Particles not showing?
- Ensure JavaScript is enabled
- Check if canvas is supported in your browser
- Try refreshing the page

## 📄 License

MIT License - Feel free to use in your projects!

## 🤝 Contributing

This is a demo/testing app. Feel free to:
- Fork and customize for your needs
- Report issues or suggestions
- Share improvements

## 🎯 Next Steps

Once you're happy with the background system:

1. Extract the modules you need
2. Integrate into your main app
3. Customize colors and animations to match your brand
4. Optimize particle counts for your target devices

## 💡 Tips for Integration

- The `WeatherManager` can be used as-is
- `BackgroundRenderer` and `ParticleLayer` are self-contained
- All visual configs are in one file (`visualStates.js`)
- Easy to extend with new weather states
- Performance detection is automatic

---

**Built with ❤️ for testing weather-reactive backgrounds**

Style C: Hybrid Modern Weather Design
