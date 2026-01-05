import "./App.css";
import Button from "./Button";
import Dice from "./Dice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import { Background } from "./Background";

function Home() {
  const navigation = useNavigate();

  return (
    <>
      <Dice />
      <Background />
      <div className="text-overlay">
        <h1>You have been summoned for The Awakening</h1>
      </div>
      <div className="button-overlay">
        <Button
          onPress={() => navigation("/solaria-map")}
          text={"Enter Solaria"}
          bgColour="#080048"
          colour="white"
        />
      </div>
    </>
  );
}

function Solaria() {
  const navigation = useNavigate();
  // const [generateTrigger, setGenerateTrigger] = useState(0);

  return (
    <>
      <Carousel />
      <Background />
      {/* <Modal /> */}
      <div className="text-overlay">
        <h1>Select Your Player Class</h1>
      </div>
      {/* <ImageGenerator onGenerate={generateTrigger} userPrompt={"a mystical fantasy character, intricate costume, vibrant colors"} />
			<Button onPress={() => setGenerateTrigger((prev) => prev + 1)} text={"Generate Character"} /> */}
      <div className="button-overlay">
        <Button
          onPress={() => navigation(-1)}
          text={"Go Back to Home"}
          bgColour="#080048"
          colour="white"
        />
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
