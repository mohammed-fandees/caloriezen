import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import RecordCard from "./RecordCard";

const RecordsList = ({ records }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 my-6">
        <EyeIcon className="w-6 h-6 text-blue-500" />
        <h2 className={`text-xl font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Recent Meals
        </h2>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-2 h-2 bg-blue-500 rounded-full"
        />
      </div>
      
      <div className="grid gap-4">
        {records.map((record, index) => (
          <RecordCard key={record.id} record={record} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecordsList;