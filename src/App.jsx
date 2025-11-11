/**
 * Main App Component
 * Integrates all modules: WeatherManager, BackgroundRenderer, ParticleLayer, AuroraLayer, DebugPanel
 * Implements Style C: Hybrid Modern Weather Design
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WeatherManager } from './modules/WeatherManager';
import performanceDetector from './utils/performanceDetector';
import BackgroundRenderer from './components/BackgroundRenderer';
import ParticleLayer from './components/ParticleLayer';
import AuroraLayer from './components/AuroraLayer';
import DebugPanel from './components/DebugPanel';
import WeatherStatus from './components/WeatherStatus';

// Initialize singleton instances
const weatherManager = new WeatherManager();

function App() {
  const [visualState, setVisualState] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [performanceLevel, setPerformanceLevel] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize performance detector
    const detectedLevel = performanceDetector.getPerformanceLevel();
    setPerformanceLevel(detectedLevel);

    console.log('Device Info:', performanceDetector.getDeviceInfo());

    // Initialize weather manager
    const initWeather = async () => {
      try {
        await weatherManager.initialize();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize weather:', error);
        setIsLoading(false);
      }
    };

    initWeather();

    // Subscribe to weather updates
    const unsubscribe = weatherManager.subscribe((newState) => {
      console.log('Visual state updated:', newState);
      setVisualState(newState);
      setWeatherData(weatherManager.getWeatherData());
    });

    // Cleanup
    return () => {
      unsubscribe();
      weatherManager.destroy();
    };
  }, []);

  // Handle mode toggle (Auto / Manual)
  const handleToggleMode = (auto) => {
    setIsAutoMode(auto);

    if (auto) {
      weatherManager.enableAutoMode();
    }
  };

  // Handle manual weather selection
  const handleSelectWeather = (weatherType, isNight) => {
    setIsAutoMode(false);
    weatherManager.setManualWeather(weatherType, isNight);
  };

  // Handle performance level change
  const handlePerformanceChange = (level) => {
    setPerformanceLevel(level);
    performanceDetector.setPerformanceLevel(level);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#000'
    }}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000'
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ textAlign: 'center' }}>
              <motion.div
                style={{
                  width: '4rem',
                  height: '4rem',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  margin: '0 auto 1rem'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                Loading weather data...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Layer - Animated Gradients */}
      <AnimatePresence mode="wait">
        {visualState && (
          <motion.div
            key={visualState.stateKey}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <BackgroundRenderer
              visualState={visualState}
              performanceLevel={performanceLevel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aurora Layer (Night Mode Only) */}
      <AnimatePresence>
        {visualState?.aurora?.enabled && (
          <motion.div
            key="aurora"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <AuroraLayer
              visualState={visualState}
              performanceLevel={performanceLevel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Layer */}
      <AnimatePresence mode="wait">
        {visualState && (
          <motion.div
            key={`particles-${visualState.stateKey}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 20
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <ParticleLayer
              visualState={visualState}
              performanceLevel={performanceLevel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Layer */}
      {!isLoading && (
        <>
          {/* Weather Status Display */}
          <WeatherStatus
            weatherData={weatherData}
            visualState={visualState}
          />

          {/* Debug/Control Panel */}
          <DebugPanel
            isAutoMode={isAutoMode}
            onToggleMode={handleToggleMode}
            onSelectWeather={handleSelectWeather}
            currentState={visualState}
            weatherData={weatherData}
            performanceLevel={performanceLevel}
            onPerformanceChange={handlePerformanceChange}
          />
        </>
      )}

      {/* Branding */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 30
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div style={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.875rem',
          fontWeight: 300,
          textAlign: 'right'
        }}>
          Weather Background Demo
        </div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.2)',
          fontSize: '0.75rem',
          marginTop: '0.25rem',
          textAlign: 'right'
        }}>
          Style C: Hybrid Modern Weather
        </div>
      </motion.div>
    </div>
  );
}

export default App;
