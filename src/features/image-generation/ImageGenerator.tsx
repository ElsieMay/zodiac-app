import { useState, useEffect } from "react";
import { ImageService, blobToDataURL } from "../../services/ImageService";

interface ImageGeneratorProps {
  onGenerate: number;
  userPrompt: string;
}

export default function ImageGenerator({
  onGenerate,
  userPrompt,
}: ImageGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState(0);

  useEffect(() => {
    if (onGenerate > 0 && onGenerate !== lastGenerated) {
      setLastGenerated(onGenerate);

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

      generate();
    }
  }, [onGenerate, lastGenerated, userPrompt]);

  //TODO: Improve the UI of these states
  return (
    <div className="image-generator">
      {isLoading && <p>Generating your character...</p>}
      {error && <p className="error">{error}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated character"
          className="generated-image"
        />
      )}
      {!isLoading && !imageUrl && onGenerate === 0 && (
        <p>Click "Generate Character" to create your avatar</p>
      )}
    </div>
  );
}
