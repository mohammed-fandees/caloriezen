import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";


const FloatingActionButton = ({ onClick }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.button
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
          : 'bg-gradient-to-r from-blue-500 to-purple-600'
      }`}
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        boxShadow: isDark 
          ? '0 20px 40px rgba(168, 85, 247, 0.4)' 
          : '0 20px 40px rgba(59, 130, 246, 0.4)'
      }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        y: [0, -10, 0],
        boxShadow: [
          isDark ? '0 10px 30px rgba(168, 85, 247, 0.3)' : '0 10px 30px rgba(59, 130, 246, 0.3)',
          isDark ? '0 20px 40px rgba(168, 85, 247, 0.4)' : '0 20px 40px rgba(59, 130, 246, 0.4)',
          isDark ? '0 10px 30px rgba(168, 85, 247, 0.3)' : '0 10px 30px rgba(59, 130, 246, 0.3)'
        ]
      }}
      transition={{ 
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 2, repeat: Infinity }
      }}
      onClick={onClick}
    >
      <PlusIcon className="w-8 h-8 text-white" />
    </motion.button>
  );
};

export default FloatingActionButton;