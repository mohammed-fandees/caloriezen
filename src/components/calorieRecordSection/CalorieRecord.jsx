import { motion } from "framer-motion";
import CalorieRecordDate from "./CalorieRecordDate";

function CalorieRecord(props) {	return (
		<motion.div 
			className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
			whileHover={{ scale: 1.01 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			<div className="flex items-center justify-between gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<span className="text-sm text-gray-500">
							<CalorieRecordDate date={props.date} />
						</span>
						<span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
							{props.meal}
						</span>
					</div>
					<div className="text-gray-800 font-medium">
						{props.content}
					</div>
				</div>
				<div className={`px-4 py-2 rounded-lg font-medium ${
					props.calories < 0 
						? 'bg-red-100 text-red-600' 
						: 'bg-green-100 text-green-600'
				}`}>
					{props.calories < 0 ? 'Invalid' : `${props.calories} cal`}
				</div>
			</div>
		</motion.div>
	);
}

export default CalorieRecord;
