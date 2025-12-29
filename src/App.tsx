import "./App.css";
import Dice from "./Dice";

function App() {
	return (
		<>
			<h1>You have been summoned for The Awakening</h1>
			{/* <div style={{ display: "flex", justifyContent: "center" }}> */}
			<Dice />
			{/* </div> */}
			<div className="card">
				{/* <button onClick={() => setCount((count) => count + 1)}></button> */}
				<button>Throw Stardust for intergalactic travel</button>
			</div>
		</>
	);
}

export default App;
