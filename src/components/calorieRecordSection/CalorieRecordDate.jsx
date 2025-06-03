import { motion } from "framer-motion";

const MONTH = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function CalorieRecordDate(props) {
	// we will use unified date format instead of UTC
	const month = MONTH[props.date.getMonth()];
	const day = props.date.getDate();
	const year = props.date.getFullYear();
	return (
		<div className="flex items-center gap-1 text-sm">
			<span className="font-medium">{day}</span>
			<span className="text-gray-500">{month}</span>
			<span className="text-gray-400">{year}</span>
		</div>
	);
}

export default CalorieRecordDate;
