import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import AnimatedBackground from './components/layout/AnimatedBackground';
import SideMenu from './components/layout/SideMenu';
import FloatingActionButton from './components/ui/FloatingActionButton';
import AddFoodModal from './components/modals/AddFoodModal';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Health from './pages/Health';
import StatsWidget from './components/widgets/StatsWidget';
import QuickAdd from './components/widgets/QuickAdd';
import RecordsList from './components/records/RecordsList';

const App = () => {
	const [records, setRecords] = useState([
		{
			id: 1,
			date: new Date(),
			meal: "Breakfast",
			content: "Avocado Toast with Eggs",
			calories: 1420,
			rating: 5,
			notes: "Perfect start to the day!"
		},
		{
			id: 2,
			date: new Date(),
			meal: "Lunch",
			content: "Grilled Chicken Salad",
			calories: 580,
			rating: 4,
			notes: "Fresh and healthy"
		},
		{
			id: 3,
			date: new Date(Date.now() - 86400000),
			meal: "Dinner",
			content: "Salmon with Quinoa",
			calories: 580,
			rating: 5,
			notes: "Delicious and nutritious"
		},
		{
			id: 4,
			date: new Date(Date.now() - 96400000),
			meal: "Snack",
			content: "Greek Yogurt with Berries",
			calories: 180,
			rating: 4,
			notes: ""
		},
	]);

	const [nextId, setNextId] = useState(5);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentView, setCurrentView] = useState('home');

	const handleAddRecord = (record) => {
		const newRecord = {
			...record,
			id: nextId,
			date: new Date(record.date),
		};
		setRecords([newRecord, ...records]);
		setNextId(nextId + 1);
		setIsModalOpen(false);
	};

	const handleNavigate = (view) => {
		setCurrentView(view);
	};

	const handleBackToHome = () => {
		setCurrentView('home');
	};

	const renderCurrentView = () => {
		switch (currentView) {
			case 'analytics':
				return <Analytics records={records} />;
			case 'calendar':
				return <Calendar records={records} />;
			case 'goals':
				return <Goals records={records} />;
			case 'health':
				return <Health records={records} />;
			default:
				return (
					<>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="grid gap-6 md:grid-cols-2"
						>
							<StatsWidget records={records} />
							<QuickAdd onAdd={handleAddRecord} />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							<RecordsList records={records} />
						</motion.div>
					</>
				);
		}
	};

	return (
		<div className="min-h-screen relative">
			<AnimatedBackground />

			<div className="relative z-10">
				<Header
					onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
					currentView={currentView}
					onBackClick={handleBackToHome}
				/>

				<main className="p-4 space-y-6 pb-24">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentView}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.3 }}
						>
							{renderCurrentView()}
						</motion.div>
					</AnimatePresence>
				</main>

				<FloatingActionButton onClick={() => setIsModalOpen(true)} />
				<SideMenu
					isOpen={isMenuOpen}
					onClose={() => setIsMenuOpen(false)}
					onNavigate={handleNavigate}
				/>
				<AddFoodModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleAddRecord}
				/>
			</div>
		</div>
	);
};

export default App;