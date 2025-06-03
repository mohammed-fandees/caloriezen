import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";
import GlassCard from "../ui/GlassCard";

const QuickAdd = ({ onAdd }) => {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickMeal, setQuickMeal] = useState('');
  const [quickCalories, setQuickCalories] = useState('');

  const handleQuickAdd = () => {
    if (quickMeal && quickCalories) {
      onAdd({
        meal: 'Quick Add',
        content: quickMeal,
        calories: parseInt(quickCalories),
        date: new Date().toISOString().split('T')[0]
      });
      setQuickMeal('');
      setQuickCalories('');
      setIsExpanded(false);
    }
  };

  return (
    <GlassCard>
      <motion.div
        layout
        className="space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <SparklesIcon className="w-6 h-6 text-purple-500" />
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'
              }`}>
              Quick Add
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <PlusIcon className="w-5 h-5 text-purple-500" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 overflow-hidden"
            >
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                type="text"
                placeholder="What did you eat?"
                value={quickMeal}
                onChange={(e) => setQuickMeal(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border-none outline-none ${isDark
                    ? 'bg-white/10 text-white placeholder-gray-300'
                    : 'bg-black/5 text-gray-800 placeholder-gray-500'
                  }`}
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                type="number"
                placeholder="Calories"
                value={quickCalories}
                onChange={(e) => setQuickCalories(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border-none outline-none ${isDark
                    ? 'bg-white/10 text-white placeholder-gray-300'
                    : 'bg-black/5 text-gray-800 placeholder-gray-500'
                  }`}
              />
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuickAdd}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium"
              >
                Add Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </GlassCard>
  );
};

export default QuickAdd;