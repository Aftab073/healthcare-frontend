import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  onClick,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      className={`relative overflow-hidden rounded-xl bg-white/10 p-6 shadow-glass backdrop-blur-glass dark:bg-gray-800/10 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/30 dark:from-gray-800/5 dark:to-gray-800/30" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  );
} 