/**
 * AuroraLayer
 * Subtle, flowing aurora ribbons for night mode
 * Creates soft gradient motion that doesn't dominate the UI
 * Style C: Premium, minimal, and modern
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AuroraLayer = ({ visualState, performanceLevel }) => {
  const [ribbons, setRibbons] = useState([]);

  useEffect(() => {
    if (!visualState?.aurora?.enabled) return;

    // Generate aurora ribbons
    const auroraConfig = visualState.aurora;
    const ribbonCount = performanceLevel === 'low' ? 2 : 3;

    const newRibbons = Array.from({ length: ribbonCount }, (_, i) => ({
      id: i,
      colors: auroraConfig.colors,
      intensity: auroraConfig.intensity,
      speed: auroraConfig.speed,
      offset: i * 30,
      delay: i * 0.5
    }));

    setRibbons(newRibbons);
  }, [visualState, performanceLevel]);

  if (!visualState?.aurora?.enabled || ribbons.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ribbons.map((ribbon) => (
        <AuroraRibbon
          key={ribbon.id}
          ribbon={ribbon}
          performanceLevel={performanceLevel}
        />
      ))}
    </div>
  );
};

/**
 * Individual Aurora Ribbon Component
 */
const AuroraRibbon = ({ ribbon, performanceLevel }) => {
  // Create gradient from ribbon colors
  const gradient = createAuroraGradient(ribbon.colors, ribbon.intensity);

  // Animation variants based on performance
  const duration = performanceLevel === 'low' ? 30 : 20 / ribbon.speed;

  return (
    <motion.div
      className="absolute"
      style={{
        width: '200%',
        height: '100%',
        left: '-50%',
        top: `${ribbon.offset}%`,
        background: gradient,
        opacity: ribbon.intensity,
        mixBlendMode: 'screen',
        filter: performanceLevel === 'low' ? 'none' : 'blur(40px)'
      }}
      animate={{
        x: ['-10%', '10%', '-10%'],
        y: ['-5%', '5%', '-5%'],
        rotate: [0, 3, -3, 0],
        scale: [1, 1.1, 0.9, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: ribbon.delay
      }}
    />
  );
};

/**
 * Create aurora gradient from colors
 */
function createAuroraGradient(colors, intensity) {
  if (!colors || colors.length === 0) {
    return 'linear-gradient(90deg, transparent, rgba(100,150,255,0.2), transparent)';
  }

  // Create flowing gradient with multiple color stops
  const stops = [];

  stops.push('transparent 0%');

  colors.forEach((color, index) => {
    const position = 20 + (index * (60 / colors.length));
    stops.push(`${color} ${position}%`);
  });

  stops.push('transparent 100%');

  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

/**
 * SVG-based Aurora (Alternative implementation for better quality)
 */
export const AuroraLayerSVG = ({ visualState, performanceLevel }) => {
  if (!visualState?.aurora?.enabled || performanceLevel === 'low') {
    return <AuroraLayer visualState={visualState} performanceLevel={performanceLevel} />;
  }

  const auroraConfig = visualState.aurora;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: auroraConfig.intensity }}
    >
      <defs>
        {/* Aurora gradient definition */}
        <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          {auroraConfig.colors.map((color, index) => (
            <stop
              key={index}
              offset={`${20 + (index * 60 / auroraConfig.colors.length)}%`}
              stopColor={color}
              stopOpacity="0.6"
            />
          ))}
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Blur filter for softness */}
        <filter id="auroraBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
        </filter>
      </defs>

      {/* Multiple aurora paths for depth */}
      {Array.from({ length: 3 }, (_, i) => (
        <AuroraPath
          key={i}
          index={i}
          speed={auroraConfig.speed}
          offset={i * 30}
        />
      ))}
    </svg>
  );
};

/**
 * Animated SVG path for aurora
 */
const AuroraPath = ({ index, speed, offset }) => {
  // Generate smooth wave path
  const pathData = generateWavePath(offset);

  return (
    <motion.path
      d={pathData}
      fill="url(#auroraGradient)"
      filter="url(#auroraBlur)"
      style={{ mixBlendMode: 'screen' }}
      animate={{
        d: [
          generateWavePath(offset),
          generateWavePath(offset + 20),
          generateWavePath(offset - 20),
          generateWavePath(offset)
        ]
      }}
      transition={{
        duration: 20 / speed,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.5
      }}
    />
  );
};

/**
 * Generate smooth wave path for aurora
 */
function generateWavePath(yOffset = 0) {
  const width = 100;
  const height = 100;
  const waves = 3;
  const amplitude = 15;

  let path = `M 0,${50 + yOffset}`;

  for (let x = 0; x <= width; x += 1) {
    const y = 50 + yOffset + Math.sin((x / width) * Math.PI * waves) * amplitude;
    path += ` L ${x},${y}`;
  }

  path += ` L ${width},${height} L 0,${height} Z`;

  return path;
}

export default AuroraLayer;
