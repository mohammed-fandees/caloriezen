import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";
import GlassCard from "../components/ui/GlassCard";

const Calendar = ({ records }) => {
  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getRecordsForDate = (date) => {
    if (!date) return [];
    return records.filter(record => {
      // Ensure both are Date objects
      const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
      return recordDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>

          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          >
            <ArrowLeftIcon className="w-5 h-5 rotate-180" />
          </motion.button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className={`text-center text-sm font-medium p-2 ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayRecords = getRecordsForDate(day);
            const totalCalories = dayRecords.reduce((sum, record) => sum + record.calories, 0);
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = day && day.toDateString() === selectedDate.toDateString();

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`aspect-square p-2 rounded-xl relative ${day
                  ? `cursor-pointer ${isSelected
                    ? 'ring-2 ring-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100'
                    : isToday
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : isDark
                        ? 'hover:bg-white/10'
                        : 'hover:bg-black/5'
                  }`
                  : ''
                  } ${dayRecords.length > 0 && !isToday && !isSelected
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : ''
                  }`}
                whileHover={day ? { scale: 1.05 } : {}}
                whileTap={day ? { scale: 0.95 } : {}}
                onClick={day ? () => setSelectedDate(day) : undefined}
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-medium ${isToday || isSelected
                        ? 'text-white'
                        : isDark
                          ? 'text-white'
                          : 'text-gray-800'
                        } md:text-left text-center md:block flex items-center justify-center md:justify-start h-full w-full`}
                    >
                      {day.getDate()}
                    </div>
                    {/* Show calories number only on desktop (md+), but absolutely positioned to avoid affecting height */}
                    {dayRecords.length > 0 && (
                      <div
                        className={`hidden md:block text-xs ${isToday || isSelected ? 'text-white/80' : 'text-green-600 dark:text-green-400'} absolute bottom-1 left-1 right-auto`}
                        style={{ pointerEvents: 'none' }}
                      >
                        {totalCalories}cal
                      </div>
                    )}
                    {dayRecords.length > 0 && (
                      <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${isToday || isSelected ? 'bg-white/50' : 'bg-green-500'}`}
                      />
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Selected Date Records */}
      <GlassCard>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {selectedDate.toDateString()} Meals
        </h3>
        <div className="space-y-3">
          {getRecordsForDate(selectedDate).length > 0 ? (
            getRecordsForDate(selectedDate).map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {record.content}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {record.meal}
                    </div>
                  </div>
                  <div className={`font-bold ${record.calories < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {record.calories < 0 ? 'Invalid' : `${record.calories} cal`}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No meals recorded for this day
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Calendar;