/**
 * WeatherStatus
 * Displays current weather information on screen
 * Minimal, modern UI that doesn't interfere with background
 */

import { motion } from 'framer-motion';

export const WeatherStatus = ({ weatherData, visualState }) => {
  if (!weatherData || !visualState) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 40
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div style={{
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(40px)',
        borderRadius: '1rem',
        padding: '1rem 1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem' }}>
          {/* Temperature */}
          <div style={{
            fontSize: '3.75rem',
            fontWeight: 300,
            color: 'white',
            lineHeight: 1
          }}>
            {weatherData.temp}°
          </div>

          {/* Details */}
          <div style={{ paddingBottom: '0.5rem' }}>
            <div style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.125rem',
              fontWeight: 500,
              textTransform: 'capitalize',
              marginBottom: '0.25rem'
            }}>
              {weatherData.condition}
            </div>
            <div style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.875rem'
            }}>
              {weatherData.cityName}
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.75rem'
        }}>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Humidity: </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{weatherData.humidity}%</span>
          </div>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Wind: </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{weatherData.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherStatus;
