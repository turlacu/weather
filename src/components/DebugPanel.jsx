/**
 * DebugPanel
 * Testing UI for manually switching weather types
 * Displays current state and allows toggling between auto/manual mode
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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

  const weatherTypes = [
    { id: 'sunny', label: 'Sunny', icon: '☀️' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { id: 'rain', label: 'Rain', icon: '🌧️' },
    { id: 'storm', label: 'Storm', icon: '⛈️' },
    { id: 'snow', label: 'Snow', icon: '❄️' },
    { id: 'fog', label: 'Fog', icon: '🌫️' }
  ];

  const handleWeatherSelect = (weatherId) => {
    const isNight = selectedTimeOfDay === 'night';
    onSelectWeather(weatherId, isNight);
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
          >
            <svg
              style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255, 255, 255, 0.6)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
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
                        boxShadow: isAutoMode ? '0 10px 15px -3px rgba(59, 130, 246, 0.5)' : 'none'
                      }}
                    >
                      🌍 Auto
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
                        boxShadow: !isAutoMode ? '0 10px 15px -3px rgba(168, 85, 247, 0.5)' : 'none'
                      }}
                    >
                      🎮 Manual
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
                          onClick={() => setSelectedTimeOfDay('day')}
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
                            boxShadow: selectedTimeOfDay === 'day' ? '0 4px 12px rgba(245, 158, 11, 0.4)' : 'none'
                          }}
                        >
                          ☀️ Day
                        </button>
                        <button
                          onClick={() => setSelectedTimeOfDay('night')}
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
                            boxShadow: selectedTimeOfDay === 'night' ? '0 4px 12px rgba(79, 70, 229, 0.4)' : 'none'
                          }}
                        >
                          🌙 Night
                        </button>
                      </div>
                    </div>

                    {/* Weather Types */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem', fontWeight: 500 }}>Weather Type</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {weatherTypes.map((weather) => (
                          <button
                            key={weather.id}
                            onClick={() => handleWeatherSelect(weather.id)}
                            style={{
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: 'rgba(255, 255, 255, 0.8)',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                            }}
                          >
                            <span>{weather.icon}</span>
                            <span>{weather.label}</span>
                          </button>
                        ))}
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
