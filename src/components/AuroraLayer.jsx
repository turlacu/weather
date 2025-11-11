/**
 * AuroraLayer - Canvas-Based
 * Renders aurora using canvas with smooth gradients
 * No CSS gradient banding, better performance
 */

import { useEffect, useRef } from 'react';

export const AuroraLayer = ({ visualState, performanceLevel }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!visualState?.aurora?.enabled || performanceLevel === 'low') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const auroraConfig = visualState.aurora;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawAurora = (time) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Very slow animation (if high performance)
      const animationProgress = performanceLevel === 'high' ? Math.sin(time * 0.0001) * 0.02 : 0;

      // Parse colors from hex
      const colors = auroraConfig.colors.map(hexToRgb);

      // Main aurora glow
      const gradient1 = ctx.createRadialGradient(
        width * (0.5 + animationProgress),
        height * 0.1,
        0,
        width * 0.5,
        height * 0.4,
        width * 0.6
      );

      gradient1.addColorStop(0, `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, ${auroraConfig.intensity * 0.4})`);
      gradient1.addColorStop(0.4, `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, ${auroraConfig.intensity * 0.2})`);
      gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // Second subtle layer (high performance only)
      if (performanceLevel === 'high') {
        const gradient2 = ctx.createRadialGradient(
          width * (0.3 - animationProgress * 0.5),
          height * 0.15,
          0,
          width * 0.35,
          height * 0.35,
          width * 0.5
        );

        const color2 = colors[2] || colors[0];
        gradient2.addColorStop(0, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${auroraConfig.intensity * 0.25})`);
        gradient2.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${auroraConfig.intensity * 0.1})`);
        gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);
      }

      if (performanceLevel === 'high') {
        timeRef.current = time;
        animationFrameRef.current = requestAnimationFrame(drawAurora);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial draw
    drawAurora(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visualState, performanceLevel]);

  if (!visualState?.aurora?.enabled || performanceLevel === 'low') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        mixBlendMode: 'screen',
        filter: performanceLevel === 'high' ? 'blur(60px)' : 'blur(40px)',
        opacity: 0.9
      }}
    />
  );
};

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

export default AuroraLayer;
