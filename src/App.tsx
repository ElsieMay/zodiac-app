import "./App.css";
import Button from "./Button";
import Dice from "./Dice";

function App() {
	return (
		<>
			<Dice />
			<div className="text-overlay">
				<h1>You have been summoned for The Awakening</h1>
			</div>
			<div className="button-overlay">
				<Button />
			</div>
		</>
	);
}

export default App;
