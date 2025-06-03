import { motion } from "framer-motion";
import RecordList from "./RecordList";
import { useState } from "react";
import { getDateFromString, getDateStringNoTimezone } from "../../utils";

function ListingSection(props) {
	const { allRecords } = props;
	const [currentDate, setCurrentDate] = useState(new Date());

	const dateChangeHandler = (event) => {
		setCurrentDate(getDateFromString(event.target.value));
	};

	const dateFilter = (record) =>
		record.date.getDate() === currentDate.getDate() &&
		record.date.getMonth() === currentDate.getMonth() &&
		record.date.getFullYear() === currentDate.getFullYear();
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
				<label 
					className="text-gray-700 font-medium" 
					htmlFor="ListingDate"
				>
					Select date:
				</label>
				<motion.input
					whileFocus={{ scale: 1.02 }}
					id="ListingDate"
					type="date"
					className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
					value={getDateStringNoTimezone(currentDate)}
					onChange={dateChangeHandler}
				/>
			</div>
			
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<RecordList records={allRecords.filter(dateFilter)} />
			</motion.div>
		</div>
	);
}

export default ListingSection;
