/**
 * DebugPanel
 * Testing UI for manually switching weather types
 * Displays current state and allows toggling between auto/manual mode
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Phosphor Icons as inline SVGs
const Icons = {
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
    </svg>
  ),
  Cloud: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"/>
    </svg>
  ),
  CloudRain: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M158.66,196.44l-32,56a8,8,0,1,1-13.86-8l32-56a8,8,0,0,1,13.86,8ZM231.87,87.55a76,76,0,0,0-151.78.73A8.18,8.18,0,0,1,72,96l-.6,0A8.14,8.14,0,0,1,64,87.39a92.48,92.48,0,0,1,2.33-16.51,4,4,0,0,0-5-4.78A52.09,52.09,0,0,0,24,116.36C24.2,145.07,48.12,168,76.84,168h87.91a76.21,76.21,0,0,0,67.12-80.45ZM164.75,152H76.84c-20,.34-36.84-16-36.84-35.64a36.07,36.07,0,0,1,28.43-35.22,76.53,76.53,0,0,1,113.19,46.13A60.34,60.34,0,0,1,164.75,152Zm-42.09,28.44-32,56a8,8,0,0,0,13.86,8l32-56a8,8,0,1,0-13.86-8Zm70.4,0a8,8,0,0,0-10.92,2.92l-12,21a8,8,0,0,0,13.86,8l12-21A8,8,0,0,0,193.06,180.44Z"/>
    </svg>
  ),
  Lightning: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"/>
    </svg>
  ),
  Snowflake: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M223.22,123.51l-20.58-6.87,13.42-13.42a8,8,0,1,0-11.32-11.32l-18.34,18.34L168,103.43V72.57l18.34-18.34a8,8,0,0,0-11.32-11.32L162.06,55.87l-6.84-20.58a8,8,0,0,0-15.16,5.05l8.42,25.26L136,72.42V41.37l25.26-8.42a8,8,0,0,0-5.05-15.16l-20.58,6.84L123.51,4.05a8,8,0,0,0-15.16,0L101.49,24.63,80.91,17.79a8,8,0,1,0-5.05,15.16L101.12,41.37V72.42l-12.48-6.82,8.42-25.26a8,8,0,1,0-15.16-5.05l-6.84,20.58L62.1,42.91a8,8,0,0,0-11.32,11.32L69.12,72.57v31l-18.34-6.81L32.44,78.44a8,8,0,0,0-5.05,15.16l25.26,8.42L32.78,103.22a8,8,0,0,0,11.32,11.32l18.34-18.34L88,103.43v31.14L69.66,141.38,51.32,123a8,8,0,0,0-11.32,11.32l13.44,13.44-20.58,6.87a8,8,0,1,0,5.05,15.16L63.18,161.37,88,152.57V184.1l-25.26,8.42a8,8,0,0,0,5.05,15.16l20.58-6.84,6.84,20.58a8,8,0,0,0,15.16,0l6.84-20.58,20.58,6.84a8,8,0,0,0,5.05-15.16L117.12,184.1V152.57l24.82,8.8,25.26,8.42a8,8,0,0,0,5.05-15.16L146.78,146.2,168,134.57V103.43l25.56,7.38,18.34,18.34a8,8,0,0,0,11.32-11.32l-13.44-13.44,20.58-6.87a8,8,0,1,0-5.05-15.16l-25.26,8.42L168,103.43v31.14l-18.34-6.81-32-18.34a8,8,0,0,0-8,0l-32,18.34L69.12,134.57V103.43l18.34-6.81,32-18.34a8,8,0,0,0,4-6.93V41.37L136,49.79l12.48,37.45a8,8,0,0,0,15.16,0L176.12,49.79l12.48,6.82V87.35a8,8,0,0,0,4,6.93l32,18.34,18.34,6.81V87.35l-18.34,6.81L216,103.43V72.57l18.34,18.34a8,8,0,0,0,11.32-11.32l-13.44-13.44,20.58-6.87a8,8,0,1,0-5.05-15.16l-25.26,8.42L168,72.57V41.37l25.26-8.42a8,8,0,1,0-5.05-15.16l-20.58,6.84L161.79,4.05a8,8,0,0,0-15.16,0l-6.84,20.58L119.21,17.79a8,8,0,1,0-5.05,15.16L139.88,41.37V72.57L101.12,52.24,75.86,43.82a8,8,0,1,0-5.05,15.16L96.07,67.4,88,72.57V41.37L62.74,32.95a8,8,0,1,0-5.05,15.16L88,56.53V87.35a8,8,0,0,0,4,6.93l32,18.34L142.34,121a8,8,0,0,0,8,0l18.34-8.34,32-18.34a8,8,0,0,0,4-6.93V56.53l25.26-8.42a8,8,0,1,0-5.05-15.16L200.07,41.37V72.57l-8.07-5.17,25.26-8.42a8,8,0,1,0-5.05-15.16l-20.58,6.84L185.79,30.08a8,8,0,0,0-15.16,0l-6.84,20.58L143.21,43.82a8,8,0,1,0-5.05,15.16l25.26,8.42V87.35l-32,18.34L120,113.2V87.35L139.88,78.93,165.14,70.51a8,8,0,1,0-5.05-15.16L134.83,63.77,120,71.2V41.37l25.26-8.42a8,8,0,1,0-5.05-15.16l-20.58,6.84L113.79,4.05a8,8,0,0,0-15.16,0L92.79,24.63,72.21,17.79a8,8,0,1,0-5.05,15.16L92.42,41.37V71.2L77.17,63.77,51.91,55.35a8,8,0,1,0-5.05,15.16L72.12,78.93,88,87.35V113.2l-11.42-6.51-32-18.34V41.37L69.86,32.95a8,8,0,1,0-5.05-15.16L44.23,24.63,37.39,4.05a8,8,0,0,0-15.16,0L15.39,24.63,15.17,24.77a8,8,0,1,0,5.05,15.16L45.48,31.51,53.56,41.37V87.35a8,8,0,0,0,4,6.93l32,18.34L107.66,121a8,8,0,0,0,4,1.07h32.69a8,8,0,0,0,4-1.07l18.34-10.48,32-18.34a8,8,0,0,0,4-6.93V41.37L223.22,32.95a8,8,0,1,0-5.05-15.16Z"/>
    </svg>
  ),
  CloudFog: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M120,208H72a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm64-16H168a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16Zm-24,32H104a8,8,0,0,0,0,16h56a8,8,0,0,0,0-16Zm71.87-104.45a76,76,0,0,0-151.78.73A8.18,8.18,0,0,1,72,128l-.6,0A8.14,8.14,0,0,1,64,119.39,92.48,92.48,0,0,1,66.33,103a4,4,0,0,0-5-4.78A52.09,52.09,0,0,0,24,148.36C24.2,177.07,48.12,200,76.84,200H156a76.08,76.08,0,0,0,75.87-80.45ZM156,184H76.84c-20,.34-36.84-16-36.84-35.64a36.07,36.07,0,0,1,28.43-35.22A76.47,76.47,0,0,1,149.7,129.45,60.23,60.23,0,0,1,156,184Z"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.71a142.39,142.39,0,0,0-20.26-45.11A88.37,88.37,0,0,1,206.37,88ZM105.55,42.89A142.39,142.39,0,0,0,85.29,88H49.63A88.37,88.37,0,0,1,105.55,42.89ZM49.63,168H85.29a142.39,142.39,0,0,0,20.26,45.11A88.37,88.37,0,0,1,49.63,168Zm100.82,45.11A142.39,142.39,0,0,0,170.71,168h35.66A88.37,88.37,0,0,1,150.45,213.11Z"/>
    </svg>
  ),
  GameController: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M176,112H152a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16Zm-72-8a8,8,0,0,0-8-8H88V88a8,8,0,0,0-16,0v8H64a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8A8,8,0,0,0,104,104Zm152,24A88.09,88.09,0,0,1,168,216c-27.92,0-48.07-13.81-57.18-24.69a4,4,0,0,0-5.64,0C96.07,202.19,75.92,216,48,216A88,88,0,0,1,9.33,57.88,15.91,15.91,0,0,1,20.1,45.88l43.36-8.36A16,16,0,0,1,82.34,48.35L96.4,79.42a16,16,0,0,1-8.11,21.23L70.58,108c10.67,18.17,28.82,32,52.42,32s41.75-13.83,52.42-32l-17.71-7.34a16,16,0,0,1-8.11-21.23l14.06-31.07A16,16,0,0,1,173.54,37.5l43.36,8.36A15.94,15.94,0,0,1,227.67,57.88,87.9,87.9,0,0,1,256,128Z"/>
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/>
    </svg>
  ),
  CaretDown: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
    </svg>
  )
};

export const DebugPanel = ({
  isAutoMode,
  onToggleMode,
  onSelectWeather,
  currentState,
  weatherData,
  performanceLevel,
  onPerformanceChange
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('day');
  const [selectedWeather, setSelectedWeather] = useState(null);

  // Track current state to enable immediate day/night switching
  useEffect(() => {
    if (currentState?.stateKey) {
      const isNight = currentState.stateKey.includes('_night');
      setSelectedTimeOfDay(isNight ? 'night' : 'day');

      // Extract weather type from state key (e.g., "sunny_day" -> "sunny")
      const weatherType = currentState.stateKey.replace('_day', '').replace('_night', '');
      setSelectedWeather(weatherType === 'clear' ? 'sunny' : weatherType);
    }
  }, [currentState]);

  const weatherTypes = [
    { id: 'sunny', label: 'Sunny', Icon: Icons.Sun },
    { id: 'cloudy', label: 'Cloudy', Icon: Icons.Cloud },
    { id: 'rain', label: 'Rain', Icon: Icons.CloudRain },
    { id: 'storm', label: 'Storm', Icon: Icons.Lightning },
    { id: 'snow', label: 'Snow', Icon: Icons.Snowflake },
    { id: 'fog', label: 'Fog', Icon: Icons.CloudFog }
  ];

  const handleWeatherSelect = (weatherId) => {
    setSelectedWeather(weatherId);
    const isNight = selectedTimeOfDay === 'night';
    onSelectWeather(weatherId, isNight);
  };

  const handleTimeOfDayChange = (timeOfDay) => {
    setSelectedTimeOfDay(timeOfDay);

    // Immediately apply to current weather if in manual mode and weather is selected
    if (!isAutoMode && selectedWeather) {
      const isNight = timeOfDay === 'night';
      onSelectWeather(selectedWeather, isNight);
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(40px)',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div
          style={{
            padding: '1rem',
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} />
            <h3 style={{ color: 'white', fontWeight: 500, fontSize: '0.875rem' }}>Weather Control</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', color: 'rgba(255, 255, 255, 0.6)' }}
          >
            <Icons.CaretDown />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Current State Info */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>Current State</span>
                    <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 500 }}>
                      {currentState?.name || 'Loading...'}
                    </span>
                  </div>
                  {weatherData && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>Location</span>
                        <span style={{ color: 'white', fontSize: '0.75rem' }}>
                          {weatherData.cityName}
                          {weatherData.isPlaceholder && ' (Demo)'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>Temperature</span>
                        <span style={{ color: 'white', fontSize: '0.75rem' }}>{weatherData.temp}°C</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>Condition</span>
                        <span style={{ color: 'white', fontSize: '0.75rem', textTransform: 'capitalize' }}>{weatherData.condition}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Mode Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', fontWeight: 500 }}>Mode</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      onClick={() => onToggleMode(true)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        background: isAutoMode ? '#3B82F6' : 'rgba(255, 255, 255, 0.05)',
                        color: isAutoMode ? 'white' : 'rgba(255, 255, 255, 0.4)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: isAutoMode ? '0 10px 15px -3px rgba(59, 130, 246, 0.5)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Icons.Globe />
                      <span>Auto</span>
                    </button>
                    <button
                      onClick={() => onToggleMode(false)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        background: !isAutoMode ? '#A855F7' : 'rgba(255, 255, 255, 0.05)',
                        color: !isAutoMode ? 'white' : 'rgba(255, 255, 255, 0.4)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: !isAutoMode ? '0 10px 15px -3px rgba(168, 85, 247, 0.5)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Icons.GameController />
                      <span>Manual</span>
                    </button>
                  </div>
                </div>

                {/* Manual Controls */}
                {!isAutoMode && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                  >
                    {/* Time of Day */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', fontWeight: 500 }}>Time of Day</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleTimeOfDayChange('day')}
                          style={{
                            padding: '0.65rem 0.75rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            background: selectedTimeOfDay === 'day'
                              ? 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: selectedTimeOfDay === 'day' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                            border: selectedTimeOfDay === 'day' ? '2px solid rgba(251, 146, 60, 0.5)' : '2px solid transparent',
                            cursor: 'pointer',
                            boxShadow: selectedTimeOfDay === 'day' ? '0 4px 12px rgba(245, 158, 11, 0.4)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Icons.Sun />
                          <span>Day</span>
                        </button>
                        <button
                          onClick={() => handleTimeOfDayChange('night')}
                          style={{
                            padding: '0.65rem 0.75rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            background: selectedTimeOfDay === 'night'
                              ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: selectedTimeOfDay === 'night' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                            border: selectedTimeOfDay === 'night' ? '2px solid rgba(124, 58, 237, 0.5)' : '2px solid transparent',
                            cursor: 'pointer',
                            boxShadow: selectedTimeOfDay === 'night' ? '0 4px 12px rgba(79, 70, 229, 0.4)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Icons.Moon />
                          <span>Night</span>
                        </button>
                      </div>
                    </div>

                    {/* Weather Types */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', fontWeight: 500 }}>Weather Type</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {weatherTypes.map((weather) => {
                          const isSelected = selectedWeather === weather.id;
                          return (
                            <button
                              key={weather.id}
                              onClick={() => handleWeatherSelect(weather.id)}
                              style={{
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                background: isSelected
                                  ? 'rgba(59, 130, 246, 0.2)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                color: isSelected ? '#60A5FA' : 'rgba(255, 255, 255, 0.8)',
                                border: isSelected ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.color = 'white';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                                }
                              }}
                            >
                              <weather.Icon />
                              <span>{weather.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Performance Level */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', fontWeight: 500 }}>Performance</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => onPerformanceChange(level)}
                        style={{
                          padding: '0.375rem 0.5rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                          background: performanceLevel === level ? '#10B981' : 'rgba(255, 255, 255, 0.05)',
                          color: performanceLevel === level ? 'white' : 'rgba(255, 255, 255, 0.4)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  Style C: Hybrid Modern Weather
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DebugPanel;
