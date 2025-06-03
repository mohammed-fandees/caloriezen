import { useTheme } from "../contexts/ThemeContext";
import GlassCard from "../components/ui/GlassCard";
import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ClockIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";

const Analytics = ({ records }) => {
  const { isDark } = useTheme();

  const getWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => ({
      day,
      calories: Math.floor(Math.random() * 800) + 1200,
      meals: Math.floor(Math.random() * 3) + 3
    }));
    return weekData;
  };

  const weeklyData = getWeeklyData();
  const avgCalories = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7);
  const totalMeals = weeklyData.reduce((sum, day) => sum + day.meals, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="text-center">
          <ArrowTrendingUpIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {avgCalories}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Avg Daily Calories
          </div>
        </GlassCard>

        <GlassCard className="text-center">
          <ClockIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {totalMeals}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Weekly Meals
          </div>
        </GlassCard>

        <GlassCard className="text-center">
          <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            85%
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Goal Achievement
          </div>
        </GlassCard>
      </div>

      {/* Weekly Chart */}
      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Weekly Calories
        </h3>
        <div className="space-y-3">
          {weeklyData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`w-12 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {day.day}
              </div>
              <div className="flex-1 relative">
                <div className={`h-8 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-end pr-3"
                    initial={{ width: 0 }}
                    animate={{ width: `${(day.calories / 2000) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <span className="text-white text-xs font-medium">
                      {day.calories}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Meal Distribution */}
      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Meal Distribution
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, index) => {
            const percentage = [25, 35, 30, 10][index];
            return (
              <motion.div
                key={meal}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`}
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      className="stroke-purple-500"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 175.93" }}
                      animate={{ strokeDasharray: `${percentage * 1.76} 175.93` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {meal}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Analytics;
