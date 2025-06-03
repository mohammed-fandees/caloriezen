import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import GlassCard from "../ui/GlassCard";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";

const RecordCard = ({ record, index }) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const mealColors = {
    Breakfast: 'from-yellow-400 to-orange-500',
    Lunch: 'from-green-400 to-blue-500',
    Dinner: 'from-purple-400 to-pink-500',
    Snack: 'from-red-400 to-yellow-500',
    'Quick Add': 'from-indigo-400 to-purple-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0
      }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        z: 50
      }}
      onViewportEnter={() => setIsVisible(true)}
      className="perspective-1000"
    >
      <GlassCard className="relative overflow-hidden group">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${mealColors[record.meal] || mealColors.Snack} opacity-10`}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5
          }}
        />

        <div className="relative z-10 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <motion.span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${mealColors[record.meal] || mealColors.Snack} text-white`}
                whileHover={{ scale: 1.1 }}
              >
                {record.meal}
              </motion.span>
              <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'
                }`}>
                {record.content}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {record.date.toLocaleDateString()}
              </p>
              {record.rating && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < record.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <motion.div
              className={`text-right ${record.calories < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              <div className="text-2xl font-bold">
                {record.calories < 0 ? 'Invalid' : record.calories}
              </div>
              {record.calories >= 0 && (
                <div className="text-sm opacity-70">calories</div>
              )}
            </motion.div>
          </div>

          {record.notes && (
            <div className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
              "{record.notes}"
            </div>
          )}

          <motion.div
            className="flex items-center gap-2 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <HeartIcon className="w-4 h-4 text-red-400" />
            <div className={`h-1 flex-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((record.calories / 800) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default RecordCard;