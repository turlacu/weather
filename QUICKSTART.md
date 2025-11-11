# Quick Start Guide

Get the weather background demo running in 3 minutes!

## 🚀 Installation (1 minute)

```bash
# Navigate to the project
cd weather-background-demo

# Install dependencies
npm install
```

## ▶️ Run the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**That's it!** The app is now running in demo mode with placeholder weather.

## 🔧 Optional: Add Real Weather (2 minutes)

Want to see your actual local weather?

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up (free tier is plenty)
   - Navigate to API Keys section
   - Copy your API key

2. Create `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your API key:
   ```
   VITE_WEATHER_API_KEY=your_actual_api_key_here
   ```

4. Restart the dev server:
   ```bash
   npm run dev
   ```

The app will now fetch your local weather automatically!

## 🎮 Using the App

### Control Panel (Top Right)

Click to expand the Weather Control panel:

- **Mode Toggle**: Switch between Auto (real weather) and Manual (testing)
- **Time of Day**: Choose Day or Night (Manual mode only)
- **Weather Type**: Select weather condition to test (Manual mode only)
- **Performance**: Adjust visual quality (Low/Medium/High)

### Manual Testing

1. Click **Manual** mode
2. Select **Day** or **Night**
3. Click any weather type (Sunny, Rainy, Snowy, etc.)
4. Watch the background smoothly transition!

Try all combinations to see different effects:
- Clear Night → Aurora ribbons
- Storm → Lightning flashes and pulse effects
- Snow → Drifting snowflakes
- Rain → Diagonal rain streaks
- Fog → Blurred atmospheric layers

## 🎨 Quick Customization

Want to change colors or effects?

Open `src/config/visualStates.js` and modify any weather state.

Example - Make sunny day warmer:
```javascript
sunny_day: {
  gradients: [
    { color: '#FFA500', opacity: 1, position: 0 },    // More orange
    { color: '#FF8C00', opacity: 0.9, position: 50 },
    { color: '#FF4500', opacity: 0.8, position: 100 }
  ],
  // ... rest stays the same
}
```

Save the file and see changes instantly (hot reload)!

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed customization guide.

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy!

## 🐛 Troubleshooting

### App won't start?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Particles not showing?
- Check browser console for errors
- Try switching performance to "Medium" or "High"
- Ensure JavaScript is enabled

### Weather not loading?
- Works offline without API key (demo mode)
- Check API key in `.env` if using real weather
- Check browser console for API errors

## 🎯 Next Steps

1. **Explore all weather states** using Manual mode
2. **Customize colors** in `visualStates.js` to match your brand
3. **Test performance** on different devices
4. **Integrate** the modules you need into your main app

## 📚 Documentation

- [README.md](README.md) - Full documentation
- [CUSTOMIZATION.md](CUSTOMIZATION.md) - Detailed customization guide
- `src/config/visualStates.js` - All visual configurations
- `src/components/` - React components
- `src/modules/` - Core logic

## 💡 Tips

- **Use Manual mode** to quickly test all weather states
- **Medium performance** is recommended for most devices
- **Check the console** for device info and debugging
- **Hot reload** works - changes appear instantly
- **Demo mode** works perfectly without internet

---

**Need help?** Check the full [README.md](README.md) for detailed information.

Enjoy testing your weather backgrounds! 🌈
