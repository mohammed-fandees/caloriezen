import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../ui/GlassCard';
import { ChartBarIcon, CalendarIcon, TrophyIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SideMenu = ({ isOpen, onClose, onNavigate }) => {
  const { isDark } = useTheme();

  const menuItems = [
    { icon: ChartBarIcon, label: 'Analytics', view: 'analytics', color: 'text-blue-500' },
    { icon: CalendarIcon, label: 'Calendar', view: 'calendar', color: 'text-green-500' },
    { icon: TrophyIcon, label: 'Goals', view: 'goals', color: 'text-yellow-500' },
    { icon: HeartIcon, label: 'Health', view: 'health', color: 'text-red-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 z-50 p-6"
          >
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-8 ">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  Menu
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 rounded-xl ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                    }`}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onNavigate(item.view);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                      }`}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;