/**
 * AuroraLayer - Simplified
 * Very subtle, static aurora effect for night mode
 * No animations, no banding - just a soft atmospheric glow
 */

import { motion } from 'framer-motion';

export const AuroraLayer = ({ visualState, performanceLevel }) => {
  if (!visualState?.aurora?.enabled || performanceLevel === 'low') {
    return null;
  }

  const auroraConfig = visualState.aurora;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single subtle aurora glow - no banding, no heavy animations */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${auroraConfig.colors[0]}15 0%, ${auroraConfig.colors[1]}08 40%, transparent 70%)`,
          opacity: auroraConfig.intensity * 0.8,
          mixBlendMode: 'screen',
          filter: performanceLevel === 'high' ? 'blur(60px)' : 'blur(40px)',
          willChange: 'opacity'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: auroraConfig.intensity * 0.8 }}
        transition={{
          duration: 3,
          ease: 'easeInOut'
        }}
      />

      {/* Very subtle second layer for depth - high performance only */}
      {performanceLevel === 'high' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${auroraConfig.colors[2] || auroraConfig.colors[0]}10 0%, transparent 60%)`,
            opacity: auroraConfig.intensity * 0.5,
            mixBlendMode: 'screen',
            filter: 'blur(80px)',
            willChange: 'transform'
          }}
          animate={{
            x: ['-2%', '2%', '-2%'],
            opacity: [auroraConfig.intensity * 0.4, auroraConfig.intensity * 0.6, auroraConfig.intensity * 0.4]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </div>
  );
};

export default AuroraLayer;
