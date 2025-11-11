/**
 * BackgroundRenderer
 * Renders the dynamic animated gradient background based on visual state
 * Uses Framer Motion for smooth transitions
 * Style C: Hybrid Modern Weather Design
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BackgroundRenderer = ({ visualState, performanceLevel }) => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (!visualState) return;

    // Generate gradient layers
    const gradientLayers = generateGradientLayers(visualState);
    setLayers(gradientLayers);
  }, [visualState]);

  if (!visualState) {
    return (
      <div className="bg-layer" style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)' }} />
    );
  }

  const gradientString = createGradientString(visualState.gradients);
  console.log('BackgroundRenderer - gradient string:', gradientString);

  return (
    <div className="bg-layer">
      {/* Main gradient background */}
      <motion.div
        className="bg-layer"
        style={{
          background: gradientString
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut'
        }}
      />

      {/* Animated gradient layers for depth - DISABLED due to banding */}
      {/* {layers.map((layer, index) => (
        <motion.div
          key={`layer-${index}`}
          className="absolute inset-0"
          style={{
            background: layer.gradient,
            opacity: layer.opacity,
            mixBlendMode: layer.blendMode
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: layer.opacity,
            scale: [1.1, 1.05, 1.1],
            rotate: [0, 0.5, 0]
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: layer.delay
          }}
        />
      ))} */}

      {/* Overlay for additional color tinting - DISABLED due to banding */}
      {/* {visualState.overlayColor && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: visualState.overlayColor
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: 'easeInOut'
          }}
        />
      )} */}

      {/* Pulse effect for storms */}
      {visualState.pulseEffect && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Blur effect for fog */}
      {visualState.blurEffect && performanceLevel !== 'low' && (
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
};

/**
 * Generate gradient layers for depth and animation
 */
function generateGradientLayers(visualState) {
  const layers = [];
  const baseColors = visualState.gradients;

  // Create 2-3 additional layers for depth
  for (let i = 0; i < 2; i++) {
    const angle = 135 + (i * 45);
    const colors = baseColors.map((c, idx) => {
      // Slightly modify colors for variation
      return {
        ...c,
        opacity: c.opacity * 0.3
      };
    });

    layers.push({
      gradient: createRadialGradient(colors, angle),
      opacity: 0.4 - (i * 0.1),
      blendMode: 'overlay',
      duration: 20 + (i * 10),
      delay: i * 2
    });
  }

  return layers;
}

/**
 * Create CSS gradient string from gradient configuration
 */
function createGradientString(gradients) {
  const colorStops = gradients.map(g => {
    const hex = g.color;
    const opacity = g.opacity;
    const position = g.position;

    // Convert hex to rgba
    const rgba = hexToRgba(hex, opacity);

    return `${rgba} ${position}%`;
  }).join(', ');

  return `linear-gradient(135deg, ${colorStops})`;
}

/**
 * Create radial gradient for overlay layers
 */
function createRadialGradient(gradients, angle = 135) {
  const colorStops = gradients.map(g => {
    const rgba = hexToRgba(g.color, g.opacity);
    return `${rgba} ${g.position}%`;
  }).join(', ');

  return `radial-gradient(ellipse at ${angle % 180}% ${angle % 90}%, ${colorStops})`;
}

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, opacity = 1) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default BackgroundRenderer;
