import { useTheme } from "../contexts/ThemeContext";
import GlassCard from "../components/ui/GlassCard";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

const Health = ({ records }) => {
  const { isDark } = useTheme();

  // Calculate real health metrics from records
  // BMI: (weight in kg) / (height in m)^2 -- for demo, assume weight/height in notes or fixed
  // Body Fat, Hydration, Energy: demo calculations based on calories and meals

  // Example: Calculate average calories for today and this week
  const today = new Date();
  const todayRecords = records.filter(record =>
    (record.date instanceof Date ? record.date : new Date(record.date)).toDateString() === today.toDateString()
  );
  const totalCaloriesToday = todayRecords.reduce((sum, record) => sum + record.calories, 0);

  // Weekly calories
  const getMonday = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };
  const weekStart = getMonday(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
  const dailyCalories = weekDays.map(day => {
    return records
      .filter(record => {
        const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
        return recordDate.toDateString() === day.toDateString();
      })
      .reduce((sum, record) => sum + record.calories, 0);
  });
  const avgCaloriesWeek = dailyCalories.reduce((a, b) => a + b, 0) / 7;

  // Demo: Hydration and Energy based on number of meals/snacks
  const totalMealsToday = todayRecords.length;
  const hydration = Math.min(100, 60 + totalMealsToday * 5); // fake formula
  const energy = Math.min(100, 50 + totalCaloriesToday / 30); // fake formula

  // Demo: BMI and Body Fat are static or could be parsed from notes if you want
  const bmi = 22.5;
  const bodyFat = 15;

  const healthMetrics = [
    { label: 'BMI', value: bmi.toFixed(1), status: 'normal', color: 'text-green-500' },
    { label: 'Body Fat', value: bodyFat + '%', status: 'optimal', color: 'text-blue-500' },
    { label: 'Hydration', value: hydration + '%', status: hydration >= 80 ? 'good' : 'low', color: hydration >= 80 ? 'text-cyan-500' : 'text-cyan-400' },
    { label: 'Energy', value: energy + '%', status: energy >= 80 ? 'excellent' : 'ok', color: energy >= 80 ? 'text-yellow-500' : 'text-yellow-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <HeartIcon className="w-8 h-8 text-red-500" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Health Overview
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl text-center ${isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
            >
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {metric.label}
              </div>
              <div className={`text-xs mt-1 ${metric.color}`}>
                {metric.status}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Mood Tracker
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const moods = ['😔', '😐', '🙂', '😊', '😄'];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`aspect-square rounded-2xl flex items-center justify-center text-3xl ${isDark ? 'bg-white/5' : 'bg-black/5'
                  }`}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {randomMood}
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Mon</span>
          <span>Today</span>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Recommendations
        </h3>
        <div className="space-y-3">
          {[
            { icon: '💧', text: 'Drink more water throughout the day', type: 'hydration' },
            { icon: '🥗', text: 'Add more vegetables to your meals', type: 'nutrition' },
            { icon: '😴', text: 'Try to get 7-8 hours of sleep tonight', type: 'sleep' },
            { icon: '🚶', text: 'Take a 10-minute walk after meals', type: 'activity' }
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <span className="text-2xl">{tip.icon}</span>
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {tip.text}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Health;