import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { ArrowLeftIcon, Bars3Icon, FireIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = ({ onMenuToggle, currentView, onBackClick }) => {
  const { isDark, toggleTheme } = useTheme();

  const getViewTitle = () => {
    switch (currentView) {
      case 'analytics': return 'Analytics';
      case 'calendar': return 'Calendar';
      case 'goals': return 'Goals';
      case 'health': return 'Health';
      default: return 'CalorieZen';
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-50 p-4"
    >
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentView !== 'home' ? (
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBackClick}
              className={`p-2 rounded-xl ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                }`}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMenuToggle}
              className={`p-2 rounded-xl ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                }`}
            >
              <Bars3Icon className="w-6 h-6" />
            </motion.button>
          )}

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-3"
          >
            <FireIcon className="w-8 h-8 text-orange-500" />
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
              }`}>
              {getViewTitle()}
            </h1>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 rounded-full ${isDark
              ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
              : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30'
            }`}
        >
          {isDark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </motion.button>
      </GlassCard>
    </motion.header>
  );
};

export default Header;