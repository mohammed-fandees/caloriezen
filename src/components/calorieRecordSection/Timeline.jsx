import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

const Timeline = ({ records }) => {
  // Group records by date
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
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20"></div>
      {Object.entries(groupedRecords).map(([date, dateRecords], index) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-8 ml-6"
        >
          <div className="flex items-center mb-2">            <div className="absolute -left-2">
              <motion.div 
                className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: index * 0.2 }}
              />
            </div>
            <ClockIcon className="w-5 h-5 text-primary/60 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </h3>
          </div>
          <div className="space-y-3">
            {dateRecords.map((record) => (
              <motion.div
                key={record.id}
                whileHover={{ scale: 1.02, translateX: 4 }}
                transition={{ type: "spring" }}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {record.meal}
                    </span>
                    <p className="text-gray-800 font-medium">{record.content}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    record.calories < 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {record.calories < 0 ? 'Invalid' : `${record.calories} cal`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Timeline;
