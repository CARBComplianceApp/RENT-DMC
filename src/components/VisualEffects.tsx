import React from 'react';
import { motion } from 'motion/react';

export const ShimmerEffect: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ x: '-100%', skewX: -20 }}
        animate={{ x: '200%', skewX: -20 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          width: '50%'
        }}
      />
    </div>
  );
};

export const ShimmerBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1A1616]">
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: 'radial-gradient(circle, #A64B4B, transparent)' }}
      />
      <motion.div
        className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: 'radial-gradient(circle, #D18E8E, transparent)' }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
