import { InferenceClient, InferenceClientInputError } from "@huggingface/inference";
import { InferenceClientProviderApiError, InferenceClientProviderOutputError, InferenceClientHubApiError } from "@huggingface/inference";
import { useEffect, useRef, useState } from "react";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || "";

const client = new InferenceClient(HF_TOKEN);

interface ImageGeneratorProps {
	onGenerate?: boolean;
}

function ImageGenerator({ onGenerate }: ImageGeneratorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (onGenerate) {
			generateImage();
		}
	}, [onGenerate]);

	async function generateImage() {
		try {
			const result = await client.textToImage({
				model: "black-forest-labs/FLUX.1-dev",
				inputs: "a picture of a green bird",
			});
			console.log("Image URL:", result);
			if (containerRef.current) {
				const img = document.createElement("img");
				img.src = result;
				img.alt = "Generated";
				img.className = "image-generated";
				containerRef.current.appendChild(img);
			}
		} catch (error) {
			//TODO: improve UI for error handling
			if (error instanceof InferenceClientProviderApiError) {
				console.error("Provider API Error:", error.message);
				console.error("HTTP Request details:", error);
				console.error("HTTP Response details:", error);
				if (error instanceof InferenceClientHubApiError) {
					console.error("Hub API Error:", error.message);
					console.error("HTTP Request details:", error);
					console.error("HTTP Response details:", error);
				} else if (error instanceof InferenceClientProviderOutputError) {
					console.error("Provider Output Error:", error.message);
				} else if (error instanceof InferenceClientInputError) {
					console.error("Input Error:", error.message);
				} else {
					console.error("Unexpected error:", error);
				}
			}
		} finally {
			setLoading(false);
		}
	}
	return <div>{loading ? <p>Generating image...</p> : <div ref={containerRef} className="player-container"></div>}</div>;
}

export default ImageGenerator;
