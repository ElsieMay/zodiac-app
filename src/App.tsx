import "./App.css";
import Button from "./Button";
import Dice from "./Dice";
import { Routes, Route, useNavigate } from "react-router-dom";

function Home() {
	const navigation = useNavigate();

	return (
		<>
			<Dice />
			<div className="text-overlay">
				<h1>You have been summoned for The Awakening</h1>
			</div>
			<div className="button-overlay">
				<Button onPress={() => navigation("/solaria-map")} text={"Enter Solaria"} />
			</div>
		</>
	);
}

function Solaria() {
	const navigation = useNavigate();

	return (
		<>
			<div className="text-overlay">
				<h1>Hello World</h1>
			</div>
			<div className="button-overlay">
				<Button onPress={() => navigation(-1)} text={"Go Back to Home"} />
			</div>
		</>
	);
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/solaria-map" element={<Solaria />} />
		</Routes>
	);
}

export default App;
