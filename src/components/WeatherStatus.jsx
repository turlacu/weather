/**
 * WeatherStatus
 * Displays current weather information on screen
 * Minimal, modern UI that doesn't interfere with background
 * Enhanced with premium micro-interactions
 */

import { motion } from 'framer-motion';
import { useState } from 'react';

export const WeatherStatus = ({ weatherData, visualState }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!weatherData || !visualState) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 40
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(40px)',
          borderRadius: '1.25rem',
          padding: '1.25rem 1.75rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          cursor: 'default',
          willChange: 'transform, box-shadow'
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered
            ? '0 35px 60px -15px rgba(0, 0, 0, 0.6)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem' }}>
          {/* Temperature - with subtle animation */}
          <motion.div
            style={{
              fontSize: '3.75rem',
              fontWeight: 300,
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-0.025em'
            }}
            animate={{
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {weatherData.temp}°
          </motion.div>

          {/* Details */}
          <div style={{ paddingBottom: '0.5rem' }}>
            <motion.div
              style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '1.125rem',
                fontWeight: 500,
                textTransform: 'capitalize',
                marginBottom: '0.25rem',
                letterSpacing: '-0.01em'
              }}
              animate={{
                x: isHovered ? 2 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {weatherData.condition}
            </motion.div>
            <motion.div
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.875rem'
              }}
              animate={{
                x: isHovered ? 2 : 0,
                color: isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.65)'
              }}
              transition={{ duration: 0.3 }}
            >
              {weatherData.cityName}
              {weatherData.isPlaceholder && (
                <span style={{
                  marginLeft: '0.5rem',
                  padding: '0.125rem 0.5rem',
                  background: 'rgba(59, 130, 246, 0.3)',
                  borderRadius: '0.375rem',
                  fontSize: '0.625rem',
                  fontWeight: 500
                }}>
                  DEMO
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Additional info */}
        <motion.div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.75rem'
          }}
          animate={{
            opacity: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Humidity </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              fontSize: '0.8125rem'
            }}>
              {weatherData.humidity}%
            </span>
          </div>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Wind </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              fontSize: '0.8125rem'
            }}>
              {weatherData.windSpeed} m/s
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherStatus;
