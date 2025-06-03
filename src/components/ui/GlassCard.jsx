import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GlassCard = ({ children, className = "", ...props }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      className={`
          backdrop-blur-xl rounded-3xl border p-6 shadow-xl
          ${isDark
          ? 'bg-white/5 border-white/20 shadow-black/20'
          : 'bg-white/70 border-white/30 shadow-black/10'
        }
          ${className}
        `}
      whileHover={{
        scale: 1.02,
        boxShadow: isDark
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;