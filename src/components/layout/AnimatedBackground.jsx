import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import FloatingParticles from './FloatingParticles';

const AnimatedBackground = () => {
  const { isDark } = useTheme();

  // To achieve a smooth transition between dark and light gradients, we cross-fade two backgrounds
  // and animate their opacity based on isDark. This avoids abrupt changes.
  return (
    <div className="fixed inset-0 -z-10">
      {/* Light background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50"
        animate={{
          opacity: isDark ? 0 : 1,
          background: [
            'linear-gradient(45deg, #eff6ff, #fdf4ff, #fef7cd)',
            'linear-gradient(135deg, #fdf4ff, #eff6ff, #fef7cd)',
            'linear-gradient(225deg, #fef7cd, #fdf4ff, #eff6ff)'
          ]
        }}
        initial={{ opacity: isDark ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.3, ease: "easeInOut" },
          background: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      {/* Dark background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-800"
        animate={{
          opacity: isDark ? 1 : 0,
          background: [
            'linear-gradient(45deg, #1f2937, #374151, #1f2937)',
            'linear-gradient(135deg, #374151, #1f2937, #374151)',
            'linear-gradient(225deg, #1f2937, #374151, #1f2937)'
          ]
        }}
        initial={{ opacity: isDark ? 1 : 0 }}
        transition={{
          opacity: { duration: 0.2, ease: "easeInOut" },
          background: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <FloatingParticles />
    </div>
  );
};

export default AnimatedBackground;