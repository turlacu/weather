/**
 * BackgroundRenderer - REFACTORED
 * Renders ultra-smooth gradient backgrounds with advanced anti-banding
 *
 * Anti-banding techniques:
 * - High-resolution gradient stops (no artificial intermediate stops)
 * - CSS dithering with SVG noise texture
 * - Minimal blend mode usage to avoid compounding artifacts
 * - Performance-aware layer management
 * - No overlay colors that can cause banding
 */

import { motion } from 'framer-motion';

export const BackgroundRenderer = ({ visualState, performanceLevel }) => {
  if (!visualState) {
    return (
      <div className="bg-layer" style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)' }} />
    );
  }

  const gradientString = createGradientString(visualState.gradients);
  const showNoise = performanceLevel === 'high' || performanceLevel === 'medium';
  const showDepthLayer = performanceLevel === 'high';

  return (
    <div className="bg-layer" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Main gradient background - Pure, clean gradient */}
      <motion.div
        className="bg-layer"
        style={{
          background: gradientString,
          willChange: 'opacity',
          // Force browser to use high-quality gradient rendering
          imageRendering: 'high-quality',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)' // GPU acceleration
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2.5,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />

      {/* Single subtle depth layer - only on high performance */}
      {showDepthLayer && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: createRadialOverlay(visualState.gradients),
            mixBlendMode: 'soft-light',
            opacity: 0.15,
            willChange: 'transform',
            pointerEvents: 'none'
          }}
          animate={{
            scale: [1, 1.03, 1],
            x: ['0%', '1%', '0%'],
            y: ['0%', '0.5%', '0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* High-quality noise texture - critical for preventing banding */}
      {showNoise && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: performanceLevel === 'high' ? 0.025 : 0.02,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            imageRendering: 'pixelated' // Ensures noise doesn't blur
          }}
        />
      )}

      {/* Pulse effect for storms */}
      {visualState.pulseEffect && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
            mixBlendMode: 'overlay',
            willChange: 'opacity, transform'
          }}
          animate={{
            opacity: [0, 0.6, 0],
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

      {/* Blur effect for fog */}
      {visualState.blurEffect && performanceLevel !== 'low' && (
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            willChange: 'opacity'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

/**
 * Lightning Flash Component
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
 * Create CSS gradient string directly from configuration
 * Uses the gradient stops exactly as defined - no artificial interpolation
 */
function createGradientString(gradients) {
  const colorStops = gradients.map(g => {
    const rgba = hexToRgba(g.color, g.opacity);
    return `${rgba} ${g.position}%`;
  }).join(', ');

  return `linear-gradient(135deg, ${colorStops})`;
}

/**
 * Create a subtle radial overlay for depth (high performance only)
 */
function createRadialOverlay(gradients) {
  // Use the middle colors for a subtle radial effect
  const midIndex = Math.floor(gradients.length / 2);
  const midColor = gradients[midIndex]?.color || gradients[0].color;
  const startColor = gradients[0].color;

  return `radial-gradient(ellipse at 40% 40%, ${hexToRgba(midColor, 0.3)} 0%, ${hexToRgba(startColor, 0.1)} 50%, transparent 100%)`;
}

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, opacity = 1) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default BackgroundRenderer;
