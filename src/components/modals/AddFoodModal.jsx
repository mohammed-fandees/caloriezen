import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import GlassCard from "../ui/GlassCard";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AddFoodModal = ({ isOpen, onClose, onSubmit }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    meal: 'Breakfast',
    content: '',
    calories: '',
    notes: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.content && formData.calories) {
      onSubmit({
        ...formData,
        calories: parseInt(formData.calories)
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        meal: 'Breakfast',
        content: '',
        calories: '',
        notes: '',
        rating: 5
      });
    }
  };

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md"
          >
            <GlassCard className="space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Track Food
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 rounded-xl ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`w-full px-4 py-3 rounded-2xl border-none outline-none ${
                      isDark 
                        ? 'bg-white/10 text-white' 
                        : 'bg-black/5 text-gray-800'
                    }`}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Meal Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {mealTypes.map((meal) => (
                      <motion.button
                        key={meal}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({...formData, meal})}
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.meal === meal
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : isDark
                              ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                              : 'bg-black/5 text-gray-700 hover:bg-black/10'
                        }`}
                      >
                        {meal}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Food Item
                  </label>
                  <input
                    type="text"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="What did you eat?"
                    className={`w-full px-4 py-3 rounded-2xl border-none outline-none ${
                      isDark 
                        ? 'bg-white/10 text-white placeholder-gray-400' 
                        : 'bg-black/5 text-gray-800 placeholder-gray-500'
                    }`}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Calories
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                    placeholder="Enter calories"
                    className={`w-full px-4 py-3 rounded-2xl border-none outline-none ${
                      isDark 
                        ? 'bg-white/10 text-white placeholder-gray-400' 
                        : 'bg-black/5 text-gray-800 placeholder-gray-500'
                    }`}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Rating (1-5)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({...formData, rating: star})}
                        className={`p-1 ${
                          star <= formData.rating ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                      >
                        <StarIcon className="w-6 h-6 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any additional notes..."
                    rows={3}
                    className={`w-full px-4 py-3 rounded-2xl border-none outline-none resize-none ${
                      isDark 
                        ? 'bg-white/10 text-white placeholder-gray-400' 
                        : 'bg-black/5 text-gray-800 placeholder-gray-500'
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-3 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium"
                  >
                    Track Food
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className={`flex-1 py-4 rounded-2xl font-medium ${
                      isDark 
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-black/10 text-gray-800 hover:bg-black/20'
                    }`}
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddFoodModal;