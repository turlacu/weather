/**
 * BackgroundRenderer
 * Renders the dynamic animated gradient background based on visual state
 * Uses Framer Motion for smooth transitions
 * Style C: Hybrid Modern Weather Design
 *
 * Anti-banding techniques used:
 * - Subtle opacity variations
 * - Soft blend modes
 * - Smooth animations with proper easing
 * - Multiple gradient stops for smooth color transitions
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BackgroundRenderer = ({ visualState, performanceLevel }) => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (!visualState) return;

    // Generate gradient layers only for medium/high performance
    if (performanceLevel !== 'low') {
      const gradientLayers = generateGradientLayers(visualState, performanceLevel);
      setLayers(gradientLayers);
    } else {
      setLayers([]);
    }
  }, [visualState, performanceLevel]);

  if (!visualState) {
    return (
      <div className="bg-layer" style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)' }} />
    );
  }

  const gradientString = createGradientString(visualState.gradients);

  return (
    <div className="bg-layer" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Main gradient background - Base layer */}
      <motion.div
        className="bg-layer"
        style={{
          background: gradientString,
          willChange: 'opacity'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2.5,
          ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoothness
        }}
      />

      {/* Animated gradient layers for depth - FIXED banding with proper techniques */}
      {layers.map((layer, index) => (
        <motion.div
          key={`layer-${visualState.stateKey}-${index}`}
          className="absolute inset-0"
          style={{
            background: layer.gradient,
            mixBlendMode: layer.blendMode,
            willChange: 'transform, opacity',
            pointerEvents: 'none'
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: [0, layer.opacity, layer.opacity, 0],
            scale: [1.05, 1, 0.98, 1.02, 1.05],
            x: ['0%', '2%', '-1%', '1%', '0%'],
            y: ['0%', '-1%', '1%', '-0.5%', '0%']
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: layer.delay,
            times: [0, 0.2, 0.8, 1] // Control animation timing
          }}
        />
      ))}

      {/* Subtle overlay for color depth - Uses very low opacity to avoid banding */}
      {visualState.overlayColor && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: visualState.overlayColor,
            mixBlendMode: 'soft-light',
            willChange: 'opacity'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Pulse effect for storms - Enhanced */}
      {visualState.pulseEffect && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            mixBlendMode: 'overlay',
            willChange: 'opacity, transform'
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.95, 1.15, 0.95]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
            repeatDelay: 0.5
          }}
        />
      )}

      {/* Lightning flash for storms */}
      {visualState.pulseEffect && performanceLevel !== 'low' && (
        <LightningFlash />
      )}

      {/* Blur effect for fog - Enhanced */}
      {visualState.blurEffect && performanceLevel !== 'low' && (
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            willChange: 'opacity'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      )}

      {/* Subtle noise overlay to prevent banding (high performance only) */}
      {performanceLevel === 'high' && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            opacity: 0.015,
            mixBlendMode: 'overlay',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

/**
 * Lightning Flash Component - Random flashes for storms
 */
const LightningFlash = () => {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.4) 20%, transparent 50%)',
        mixBlendMode: 'screen',
        willChange: 'opacity'
      }}
      animate={{
        opacity: [0, 0, 0, 0, 0.8, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.1, 0.12, 0.14, 0.15, 0.16, 0.18, 0.19, 0.2, 0.5, 0.7, 0.8, 0.9, 0.95, 1]
      }}
    />
  );
};

/**
 * Generate gradient layers for depth and animation
 * Fixed anti-banding with proper techniques:
 * - Subtle opacity for layers
 * - Better blend modes
 * - Smooth color variations
 */
function generateGradientLayers(visualState, performanceLevel) {
  const layers = [];
  const baseColors = visualState.gradients;
  const layerCount = performanceLevel === 'high' ? 3 : 2;

  for (let i = 0; i < layerCount; i++) {
    // Use different gradient angles for variety
    const angle = 45 + (i * 60);

    // Create subtle color variations to avoid harsh transitions
    const colors = baseColors.map((c, idx) => {
      // Slightly shift colors and reduce opacity significantly
      return {
        ...c,
        opacity: c.opacity * 0.15 * (1 - i * 0.05), // Very subtle opacity
        position: c.position
      };
    });

    // Add extra gradient stops for smoother transitions
    const enhancedColors = enhanceGradientStops(colors);

    layers.push({
      gradient: createSmoothGradient(enhancedColors, angle, i),
      opacity: 0.25 - (i * 0.05), // Very subtle layers
      blendMode: i === 0 ? 'soft-light' : 'overlay',
      duration: 25 + (i * 15), // Slower, smoother animations
      delay: i * 3
    });
  }

  return layers;
}

/**
 * Enhance gradient stops to prevent banding
 * Add intermediate stops for smoother color transitions
 */
function enhanceGradientStops(colors) {
  const enhanced = [];

  for (let i = 0; i < colors.length - 1; i++) {
    enhanced.push(colors[i]);

    // Add an intermediate stop between each pair
    const current = colors[i];
    const next = colors[i + 1];
    const midPosition = (current.position + next.position) / 2;

    enhanced.push({
      color: current.color, // Keep same color for smooth blend
      opacity: (current.opacity + next.opacity) / 2,
      position: midPosition
    });
  }

  enhanced.push(colors[colors.length - 1]);
  return enhanced;
}

/**
 * Create CSS gradient string from gradient configuration
 * Enhanced with smoother transitions
 */
function createGradientString(gradients) {
  // Add intermediate stops for ultra-smooth gradients
  const enhanced = enhanceGradientStops(gradients);

  const colorStops = enhanced.map(g => {
    const rgba = hexToRgba(g.color, g.opacity);
    return `${rgba} ${g.position}%`;
  }).join(', ');

  return `linear-gradient(135deg, ${colorStops})`;
}

/**
 * Create smooth gradient for animated layers
 * Uses multiple techniques to prevent banding
 */
function createSmoothGradient(gradients, angle, layerIndex) {
  const colorStops = gradients.map(g => {
    const rgba = hexToRgba(g.color, g.opacity);
    return `${rgba} ${g.position}%`;
  }).join(', ');

  // Alternate between radial and linear for variety
  if (layerIndex % 2 === 0) {
    const xPos = 30 + (layerIndex * 20);
    const yPos = 40 + (layerIndex * 15);
    return `radial-gradient(ellipse at ${xPos}% ${yPos}%, ${colorStops})`;
  } else {
    return `linear-gradient(${angle}deg, ${colorStops})`;
  }
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
