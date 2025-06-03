import { motion, AnimatePresence } from "framer-motion";
import CalorieRecord from "./CalorieRecord";

function RecordList(props) {
	return (
		<AnimatePresence>
			{props.records?.length ? (
				<motion.ul
					className="space-y-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{props.records.map((rec) => (
						<motion.li
							key={rec.id}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
						>
							<CalorieRecord
								date={rec.date}
								meal={rec.meal}
								content={rec.content}
								calories={rec.calories}
							/>
						</motion.li>
					))}
				</motion.ul>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm"
				>
					No records found for this date
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default RecordList;
