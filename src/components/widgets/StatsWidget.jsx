import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import GlassCard from "../ui/GlassCard";
import { TrophyIcon } from "@heroicons/react/24/outline";

const StatsWidget = ({ records }) => {
  const { isDark } = useTheme();
  const today = new Date();
  const todayRecords = records.filter(record =>
    record.date.toDateString() === today.toDateString()
  );

  const totalCalories = todayRecords.reduce((sum, record) => sum + record.calories, 0);
  const goal = 2000;
  const progress = Math.min((totalCalories / goal) * 100, 100);

  return (
    <GlassCard className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(249,115,22,0.1), rgba(239,68,68,0.1))',
            'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))',
            'linear-gradient(225deg, rgba(249,115,22,0.1), rgba(239,68,68,0.1))'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
            }`}>
            Today's Progress
          </h3>
          <TrophyIcon className="w-6 h-6 text-orange-500" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
              }`}>
              {totalCalories}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
              / {goal} cal
            </span>
          </div>

          <div className="relative">
            <div className={`h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-orange-500"
              animate={{ left: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ marginLeft: '-8px' }}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default StatsWidget;