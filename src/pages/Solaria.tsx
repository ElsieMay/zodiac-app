import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

export function Solaria() {
  const navigation = useNavigate();
  // const [generateTrigger, setGenerateTrigger] = useState(0);

  return (
    <>
      <Carousel data-testid="carousel-object" />
      {/* <Modal /> */}
      <div className="text-overlay" data-testid="solaria-header">
        <h1>Select Your Player Class</h1>
      </div>
      {/* <ImageGenerator onGenerate={generateTrigger} userPrompt={"a mystical fantasy character, intricate costume, vibrant colors"} />
			<Button onPress={() => setGenerateTrigger((prev) => prev + 1)} text={"Generate Character"} /> */}
      <div className="button-overlay" data-testid="solaria-button">
        <Button onPress={() => navigation(-1)} text={"Go Back to Home"} />
      </div>
    </>
  );
}
