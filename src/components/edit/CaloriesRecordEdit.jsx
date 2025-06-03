import {useState} from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

function CaloriesRecordEdit(props) {
	const DEFAULT_VALUES = {
		date: "",
		meal: "Breakfast",
		content: "",
		calories: 0,
	};
	const [mealRecord, setMealRecord] = useState(DEFAULT_VALUES);

	const onDateChangeHandler = (event) => {
		setMealRecord({...mealRecord, date: event.target.value});
	};
	const onMealChangeHandler = (event) => {
		setMealRecord({...mealRecord, meal: event.target.value});
	};

	const onContentChangeHandler = (event) => {
		setMealRecord({...mealRecord, content: event.target.value});
	};

	const onCaloriesChangeHandler = (event) => {
		setMealRecord({...mealRecord, calories: event.target.value});
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		props.onFormSubmit(mealRecord);
		setMealRecord({
			...mealRecord,
			DEFAULT_VALUES,
		});
	};

	const onCancelHandler = () => {
		setMealRecord({
			...mealRecord,
			DEFAULT_VALUES,
		});
		props.onCancel();
	};
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			className="relative"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold text-gray-800">Track Food</h2>
				<button
					onClick={onCancelHandler}
					className="p-1 rounded-full hover:bg-gray-100 transition-colors"
				>
					<XMarkIcon className="w-6 h-6 text-gray-500" />
				</button>
			</div>
			<form onSubmit={onSubmitHandler} className="space-y-4">
				<div className="space-y-1">
					<label htmlFor="date" className="block text-sm font-medium text-gray-700">
						Date
					</label>
					<input
						type="date"
						value={mealRecord.date}
						id="date"
						onChange={onDateChangeHandler}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
						required
					/>
				</div>

				<div className="space-y-1">
					<label htmlFor="meal" className="block text-sm font-medium text-gray-700">
						Meal
					</label>
					<select
						id="meal"
						onChange={onMealChangeHandler}
						value={mealRecord.meal}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
					>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Dinner">Dinner</option>
						<option value="Snack">Snack</option>
					</select>
				</div>

				<div className="space-y-1">
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">
						Food Item
					</label>
					<input
						type="text"
						id="content"
						value={mealRecord.content}
						onChange={onContentChangeHandler}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
						required
						placeholder="What did you eat?"
					/>
				</div>

				<div className="space-y-1">
					<label htmlFor="calories" className="block text-sm font-medium text-gray-700">
						Calories
					</label>
					<input
						type="number"
						id="calories"
						value={mealRecord.calories}
						onChange={onCaloriesChangeHandler}
						className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors ${
							mealRecord.calories < 0
								? 'border-red-300 focus:ring-red-500 focus:border-red-500'
								: 'border-gray-300 focus:ring-primary focus:border-primary'
						}`}
						required
						placeholder="Enter calories"
					/>
					{mealRecord.calories < 0 && (
						<p className="text-sm text-red-600 mt-1">Calories cannot be negative</p>
					)}
				</div>

				<div className="flex gap-3 pt-4">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
					>
						Add Record
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="button"
						onClick={onCancelHandler}
						className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
					>
						Cancel
					</motion.button>
				</div>
			</form>
		</motion.div>
	);
}

export default CaloriesRecordEdit;
