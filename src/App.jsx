import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  PlusIcon, 
  ChartBarIcon, 
  ClockIcon, 
  X,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  Flame
} from "lucide-react";

// Utility functions
const getDateFromString = (dateString) => {
  const tokens = dateString.split("-");
  return new Date(Number(tokens[0]), Number(tokens[1]) - 1, Number(tokens[2]));
};

const getDateStringNoTimezone = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// Floating particles component
const FloatingParticles = ({ isDarkMode }) => {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute w-2 h-2 rounded-full ${
            isDarkMode ? 'bg-purple-400/20' : 'bg-blue-400/20'
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -20, 20, -20],
            x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Morphing background
const MorphingBackground = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}
        animate={{
          background: isDarkMode
            ? [
                'radial-gradient(circle at 20% 50%, #1e293b 0%, #581c87 35%, #0f172a 100%)',
                'radial-gradient(circle at 80% 20%, #581c87 0%, #1e293b 35%, #0f172a 100%)',
                'radial-gradient(circle at 40% 80%, #0f172a 0%, #581c87 35%, #1e293b 100%)',
              ]
            : [
                'radial-gradient(circle at 20% 50%, #dbeafe 0%, #fdf4ff 35%, #fef7cd 100%)',
                'radial-gradient(circle at 80% 20%, #fdf4ff 0%, #dbeafe 35%, #fef7cd 100%)',
                'radial-gradient(circle at 40% 80%, #fef7cd 0%, #fdf4ff 35%, #dbeafe 100%)',
              ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

// Interactive Button Component
const InteractiveButton = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.button
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
        variant === "primary"
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
          : variant === "secondary"
          ? "bg-white/10 backdrop-blur-lg border border-white/20 text-current"
          : "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/25"
      } ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === "primary" 
          ? "0 20px 40px rgba(59, 130, 246, 0.3)"
          : "0 20px 40px rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
      onClick={onClick}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          scale: isPressed ? 0.95 : 1,
        }}
      >
        {children}
      </motion.div>
      
      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Calorie Record Date Component
const CalorieRecordDate = ({ date, isDarkMode }) => {
  const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return (
    <motion.div 
      className="flex items-center gap-1 text-sm"
      whileHover={{ scale: 1.05 }}
    >
      <motion.span 
        className={`font-bold ${isDarkMode ? 'text-purple-300' : 'text-blue-600'}`}
        animate={{ 
          textShadow: isDarkMode 
            ? "0 0 10px rgba(196, 181, 253, 0.5)"
            : "0 0 10px rgba(37, 99, 235, 0.3)"
        }}
      >
        {day}
      </motion.span>
      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{month}</span>
      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{year}</span>
    </motion.div>
  );
};

// Enhanced Calorie Record Component
const CalorieRecord = ({ date, meal, content, calories, isDarkMode, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-white/5 backdrop-blur-lg border border-white/10' 
          : 'bg-white/80 backdrop-blur-lg border border-white/20'
      } shadow-lg`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        boxShadow: isDarkMode
          ? "0 25px 50px rgba(139, 92, 246, 0.15)"
          : "0 25px 50px rgba(59, 130, 246, 0.15)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 opacity-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10'
            : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
        }`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <CalorieRecordDate date={date} isDarkMode={isDarkMode} />
            <motion.span 
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-blue-500/20 text-blue-700 border border-blue-500/30'
              }`}
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(139, 92, 246, 0)",
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 0 rgba(139, 92, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {meal}
            </motion.span>
          </div>
          <motion.div 
            className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            animate={{ 
              scale: isHovered ? 1.05 : 1,
            }}
          >
            {content}
          </motion.div>
        </div>
        
        <motion.div 
          className={`px-4 py-2 rounded-xl font-bold ${
            calories < 0 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : isDarkMode
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-green-500/20 text-green-600 border border-green-500/30'
          }`}
          whileHover={{ 
            scale: 1.1,
            rotate: calories < 0 ? [-2, 2, -2, 0] : [0, 5, -5, 0]
          }}
          animate={{
            boxShadow: calories < 0 
              ? ["0 0 0 rgba(239, 68, 68, 0)", "0 0 15px rgba(239, 68, 68, 0.4)", "0 0 0 rgba(239, 68, 68, 0)"]
              : ["0 0 0 rgba(34, 197, 94, 0)", "0 0 15px rgba(34, 197, 94, 0.4)", "0 0 0 rgba(34, 197, 94, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {calories < 0 ? (
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              Invalid
            </span>
          ) : (
            `${calories} cal`
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Form Component
const CaloriesRecordEdit = ({ onFormSubmit, onCancel, isDarkMode }) => {
  const [mealRecord, setMealRecord] = useState({
    date: "",
    meal: "Breakfast",
    content: "",
    calories: 0,
  });
  
  const [focusedField, setFocusedField] = useState(null);
  
  const onSubmitHandler = (event) => {
    event.preventDefault();
    onFormSubmit(mealRecord);
    setMealRecord({
      date: "",
      meal: "Breakfast", 
      content: "",
      calories: 0,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateX: 20 }}
      className={`relative p-6 rounded-3xl ${
        isDarkMode 
          ? 'bg-slate-800/90 backdrop-blur-xl border border-white/10' 
          : 'bg-white/90 backdrop-blur-xl border border-white/20'
      } shadow-2xl max-w-md w-full mx-4`}
    >
      {/* Animated header */}
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <motion.h2 
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          animate={{
            textShadow: isDarkMode
              ? ["0 0 10px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.8)", "0 0 10px rgba(139, 92, 246, 0.5)"]
              : ["0 0 5px rgba(59, 130, 246, 0.3)", "0 0 15px rgba(59, 130, 246, 0.6)", "0 0 5px rgba(59, 130, 246, 0.3)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SparklesIcon className="w-6 h-6 inline mr-2" />
          Track Food
        </motion.h2>
        
        <InteractiveButton
          onClick={onCancel}
          variant="secondary"
          className="p-2"
        >
          <X className="w-5 h-5" />
        </InteractiveButton>
      </motion.div>
      
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Date Input */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Date
          </label>
          <motion.input
            type="date"
            value={mealRecord.date}
            onChange={(e) => setMealRecord({...mealRecord, date: e.target.value})}
            onFocus={() => setFocusedField('date')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400' 
                : 'bg-white/50 border border-gray-300 text-gray-800'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            animate={{
              scale: focusedField === 'date' ? 1.02 : 1,
              boxShadow: focusedField === 'date' 
                ? "0 0 25px rgba(59, 130, 246, 0.3)"
                : "0 0 0 rgba(59, 130, 246, 0)"
            }}
            required
          />
        </motion.div>

        {/* Meal Select */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Meal
          </label>
          <motion.select
            value={mealRecord.meal}
            onChange={(e) => setMealRecord({...mealRecord, meal: e.target.value})}
            onFocus={() => setFocusedField('meal')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 border border-white/20 text-white' 
                : 'bg-white/50 border border-gray-300 text-gray-800'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            animate={{
              scale: focusedField === 'meal' ? 1.02 : 1,
              boxShadow: focusedField === 'meal' 
                ? "0 0 25px rgba(59, 130, 246, 0.3)"
                : "0 0 0 rgba(59, 130, 246, 0)"
            }}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </motion.select>
        </motion.div>

        {/* Content Input */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Food Item
          </label>
          <motion.input
            type="text"
            value={mealRecord.content}
            onChange={(e) => setMealRecord({...mealRecord, content: e.target.value})}
            onFocus={() => setFocusedField('content')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400' 
                : 'bg-white/50 border border-gray-300 text-gray-800'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            animate={{
              scale: focusedField === 'content' ? 1.02 : 1,
              boxShadow: focusedField === 'content' 
                ? "0 0 25px rgba(59, 130, 246, 0.3)"
                : "0 0 0 rgba(59, 130, 246, 0)"
            }}
            placeholder="What did you eat?"
            required
          />
        </motion.div>

        {/* Calories Input */}
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Calories
          </label>
          <motion.input
            type="number"
            value={mealRecord.calories}
            onChange={(e) => setMealRecord({...mealRecord, calories: Number(e.target.value)})}
            onFocus={() => setFocusedField('calories')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
              mealRecord.calories < 0
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : isDarkMode 
                ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400' 
                : 'bg-white/50 border border-gray-300 text-gray-800'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            animate={{
              scale: focusedField === 'calories' ? 1.02 : 1,
              boxShadow: focusedField === 'calories' 
                ? mealRecord.calories < 0
                  ? "0 0 25px rgba(239, 68, 68, 0.4)"
                  : "0 0 25px rgba(59, 130, 246, 0.3)"
                : "0 0 0 rgba(59, 130, 246, 0)"
            }}
            placeholder="Enter calories"
            required
          />
          <AnimatePresence>
            {mealRecord.calories < 0 && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-red-400 flex items-center gap-1"
              >
                <FireIcon className="w-4 h-4" />
                Calories cannot be negative
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <InteractiveButton
            type="submit"
            className="flex-1 py-3 px-6 font-medium"
          >
            Add Record
          </InteractiveButton>
          <InteractiveButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 py-3 px-6 font-medium"
          >
            Cancel
          </InteractiveButton>
        </div>
      </form>
    </motion.div>
  );
};

// Enhanced Timeline Component
const Timeline = ({ records, isDarkMode }) => {
  const groupedRecords = records.reduce((groups, record) => {
    const date = record.date.toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {});
  
  return (
    <div className="relative mt-8 ml-4">
      <motion.div 
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${
          isDarkMode ? 'bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500' : 'bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500'
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />
      
      {Object.entries(groupedRecords).map(([date, dateRecords], index) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
          className="mb-8 ml-6"
        >
          <div className="flex items-center mb-4">
            <motion.div 
              className="absolute -left-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 200 }}
            >
              <motion.div 
                className={`w-6 h-6 rounded-full ring-4 ${
                  isDarkMode 
                    ? 'bg-purple-500 ring-purple-500/20' 
                    : 'bg-blue-500 ring-blue-500/20'
                }`}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0.7)",
                    "0 0 0 15px rgba(139, 92, 246, 0)",
                    "0 0 0 0 rgba(139, 92, 246, 0.7)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <ClockIcon className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-500'}`} />
            <motion.h3 
              className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              whileHover={{ scale: 1.05 }}
            >
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </motion.h3>
          </div>
          
          <div className="space-y-3">
            {dateRecords.map((record, recordIndex) => (
              <CalorieRecord
                key={record.id}
                {...record}
                isDarkMode={isDarkMode}
                index={recordIndex}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      date: new Date(2023, 2, 1),
      meal: "Breakfast",
      content: "Eggs Benedict",
      calories: 450,
    },
    {
      id: 2,
      date: new Date(2023, 2, 2),
      meal: "Lunch", 
      content: "Grilled Chicken Salad",
      calories: 350,
    },
    {
      id: 3,
      date: new Date(2023, 2, 3),
      meal: "Dinner",
      content: "Salmon with Quinoa",
      calories: 520,
    },
    {
      id: 4,
      date: new Date(2023, 2, 4),
      meal: "Snack",
      content: "Dark Chocolate",
      calories: 200,
    },
  ]);
  
  const [nextId, setNextId] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: getDateFromString(record.date),
      id: nextId,
    };
    setNextId((lastValue) => lastValue + 1);
    setRecords([formattedRecord, ...records]);
    setIsModalOpen(false);
  };
  
  const dateFilter = (record) =>
    record.date.getDate() === currentDate.getDate() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getFullYear() === currentDate.getFullYear();
  
  const filteredRecords = records.filter(dateFilter);
  
  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      isDarkMode ? 'text-white' : 'text-gray-800'
    }`}>
      {/* Dynamic Background */}
      <MorphingBackground isDarkMode={isDarkMode} />
      <FloatingParticles isDarkMode={isDarkMode} />
      
      {/* Mouse follower */}
      <motion.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'
        } backdrop-blur-sm`}
        style={{
          x: useTransform(springX, (x) => x - 16),
          y: useTransform(springY, (y) => y - 16),
        }}
      />
      
      <div className="relative z-10 min-h-screen p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          >
            <motion.h1 
              className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-purple-400 via-pink-400 to-purple-400' 
                  : 'from-blue-600 via-purple-600 to-blue-600'
              } bg-clip-text text-transparent`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              🔥 Calorie Tracker
            </motion.h1>
            
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <InteractiveButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="secondary"
                className="p-3"
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </motion.div>
              </InteractiveButton>
              
              {/* View toggles */}
              <div className="flex gap-2">
                <InteractiveButton
                  onClick={() => setView('list')}
                  variant={view === 'list' ? 'primary' : 'secondary'}
                  className="px-4 py-2 text-sm"
                >
                  <ChartBarIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => setView('timeline')}
                  variant={view === 'timeline' ? 'primary' : 'secondary'}
                  className="px-4 py-2 text-sm"
                >
                  <ClockIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </InteractiveButton>
              </div>
            </div>
          </motion.div>

          {/* Date picker for list view */}
          <AnimatePresence>
            {view === 'list' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <motion.div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl ${
                    isDarkMode 
                      ? 'bg-white/5 backdrop-blur-lg border border-white/10' 
                      : 'bg-white/20 backdrop-blur-lg border border-white/20'
                  } shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                >
                  <label 
                    className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                    htmlFor="ListingDate"
                  >
                    Select date:
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.05 }}
                    id="ListingDate"
                    type="date"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/10 border border-white/20 text-white' 
                        : 'bg-white/50 border border-gray-300 text-gray-800'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                    value={getDateStringNoTimezone(currentDate)}
                    onChange={(e) => setCurrentDate(getDateFromString(e.target.value))}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, rotateX: 15 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              {view === 'list' ? (
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredRecords?.length ? (
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {filteredRecords.map((record, index) => (
                          <CalorieRecord
                            key={record.id}
                            {...record}
                            isDarkMode={isDarkMode}
                            index={index}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`text-center py-12 rounded-2xl ${
                          isDarkMode 
                            ? 'bg-white/5 backdrop-blur-lg border border-white/10' 
                            : 'bg-white/20 backdrop-blur-lg border border-white/20'
                        } shadow-lg`}
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4"
                        >
                          🍽️
                        </motion.div>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          No records found for this date
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Try selecting a different date or add a new record!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Timeline records={records} isDarkMode={isDarkMode} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Floating Action Button */}
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <InteractiveButton
              onClick={() => setIsModalOpen(true)}
              variant="floating"
              className="p-4 rounded-full shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <PlusIcon className="w-6 h-6" />
              </motion.div>
              <span className="hidden sm:inline font-medium ml-2">Track Food</span>
            </InteractiveButton>
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <CaloriesRecordEdit
                    onFormSubmit={formSubmitHandler}
                    onCancel={() => setIsModalOpen(false)}
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ambient lighting effects */}
          <div className="fixed inset-0 pointer-events-none">
            <motion.div
              className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${
                isDarkMode ? 'bg-purple-500/10' : 'bg-blue-500/10'
              } blur-3xl`}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full ${
                isDarkMode ? 'bg-pink-500/10' : 'bg-purple-500/10'
              } blur-3xl`}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;