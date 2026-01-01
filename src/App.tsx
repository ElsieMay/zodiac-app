import "./App.css";
import Button from "./Button";
import Dice from "./Dice";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import ImageGenerator from "./ImageGenerator";
import PlayerSetup from "./PlayerSetup";

function Home() {
	const navigation = useNavigate();

	return (
		<>
			<Dice />
			<PlayerSetup />
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
	const [generateTrigger, setGenerateTrigger] = useState(0);

	return (
		<>
			<Dice cameraPosition={8} />
			<PlayerSetup />
			<div className="text-overlay">
				<h1>Enter Your Player Details</h1>
			</div>
			<ImageGenerator onGenerate={generateTrigger} userPrompt={"a mystical fantasy character, intricate costume, vibrant colors"} />
			<Button onPress={() => setGenerateTrigger((prev) => prev + 1)} text={"Generate Character"} />
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
