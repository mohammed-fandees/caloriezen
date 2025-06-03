import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import GlassCard from "../components/ui/GlassCard";
import { TrophyIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";


const Goals = ({ records }) => {
  const { isDark } = useTheme();

  // --- Daily Calories Goal ---
  const today = new Date();
  const todayRecords = records.filter(record =>
    (record.date instanceof Date ? record.date : new Date(record.date)).toDateString() === today.toDateString()
  );
  const totalCalories = todayRecords.reduce((sum, record) => sum + record.calories, 0);

  // --- Weekly Calories Goal ---

  // Get the start of the current week (Monday)
  const getMonday = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
  };
  const weekStart = getMonday(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
  // Calculate daily calories for each day in the week
  const dailyCalories = weekDays.map(day => {
    return records
      .filter(record => {
        const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
        return recordDate.toDateString() === day.toDateString();
      })
      .reduce((sum, record) => sum + record.calories, 0);
  });

  // --- Weekly Progress for "goal met" days ---
  const dailyGoal = 2000;
  const daysGoalMet = dailyCalories.filter(cal => cal >= dailyGoal).length;

  // --- Goals Array ---
  const goals = [
    { id: 1, title: 'Daily Calories', target: dailyGoal, current: totalCalories, unit: 'cal' },
    { id: 2, title: 'Weekly Calories Goal Met', target: 7, current: daysGoalMet, unit: 'days' },
    // You can add more goals here, e.g. weekly total calories, etc.
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <TrophyIcon className="w-8 h-8 text-yellow-500" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Your Goals
          </h2>
        </div>

        <div className="space-y-6">
          {goals.map((goal, index) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const isCompleted = progress >= 100;

            return (
              <motion.div
                key={goal.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                      <ExclamationCircleIcon className="w-6 h-6 text-orange-500" />
                    )}
                    <div>
                      <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {goal.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${isCompleted ? 'text-green-500' : 'text-orange-500'
                    }`}>
                    {Math.round(progress)}%
                  </div>
                </div>

                <div className="relative">
                  <div className={`h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                    <motion.div
                      className={`h-full rounded-full ${isCompleted
                        ? 'bg-gradient-to-r from-green-400 to-green-600'
                        : 'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Weekly Progress
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, index) => {
            const met = dailyCalories[index] >= dailyGoal;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium ${met
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                  : isDark
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {label}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Goals;