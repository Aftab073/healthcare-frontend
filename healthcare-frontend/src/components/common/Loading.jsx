import { motion } from 'framer-motion';

export default function Loading({ size = 'md', fullScreen = false }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const spinner = (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 dark:border-gray-700`}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'currentColor',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent`}
        style={{
          borderTopColor: 'currentColor',
          opacity: 0.2,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="flex flex-col items-center space-y-4">
          {spinner}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  return spinner;
} 