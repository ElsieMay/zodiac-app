import { useState, useEffect } from "react";
import { ImageService, blobToDataURL } from "./ImageService";

interface ImageGeneratorProps {
	onGenerate: number;
	userPrompt: string;
}

export default function ImageGenerator({ onGenerate, userPrompt }: ImageGeneratorProps) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function generate() {
			setIsLoading(true);
			setError(null);

			try {
				const blob = await ImageService({ userPrompt });

				if (blob) {
					const dataUrl = await blobToDataURL(blob);
					setImageUrl(dataUrl);
				}
			} catch (err) {
				console.error("Failed to generate image:", err);
				setError("Failed to generate image. Please try again.");
			} finally {
				setIsLoading(false);
			}
		}

		if (onGenerate > 0) {
			generate();
		}
	}, [onGenerate, userPrompt]);

	return (
		<div className="image-generator">
			//TODO: Improve the UI of these states
			{isLoading && <p>Generating your character...</p>}
			{error && <p className="error">{error}</p>}
			{imageUrl && <img src={imageUrl} alt="Generated character" style={{ maxWidth: "100%", height: "auto" }} />}
			{!isLoading && !imageUrl && onGenerate === 0 && <p>Click "Generate Character" to create your avatar</p>}
		</div>
	);
}
