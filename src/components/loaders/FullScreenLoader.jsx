import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-blue-600 rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

const FullScreenLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Logo "S" */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">S</span>
        </div>

        {/* Loading dots */}
        <LoadingDots />

        {/* "from blueSpark" text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 text-gray-500 text-sm"
        >
          from blueSpark
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(FullScreenLoader);