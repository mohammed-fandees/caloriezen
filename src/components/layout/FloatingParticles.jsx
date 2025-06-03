import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingParticles = () => {
  const { isDark } = useTheme();
  const particles = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? 'bg-purple-400/20' : 'bg-blue-400/20'
          }`}
          animate={{
            x: [0, 100, 200, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.8, 0.3, 0.3],
          }}
          transition={{
            duration: 15 + particle * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle * 2,
          }}
          style={{
            left: `${10 + particle * 15}%`,
            top: `${20 + particle * 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;