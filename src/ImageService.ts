interface ImageGeneratorProps {
	userPrompt?: string;
}

export async function ImageService(options: ImageGeneratorProps): Promise<Blob | undefined> {
	try {
		// This calls Cloudflare Worker which in turn calls the AI service
		// To generate the image from user prompt
		const workerUrl = import.meta.env.VITE_WORKER_URL || "";

		const response = await fetch(workerUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userPrompt: options.userPrompt,
			}),
		});

		if (!response.ok) {
			throw new Error(`Worker request failed: ${response.status}`);
		}

		const blob = await response.blob();
		return blob;
	} catch (error) {
		//TODO: better error handling? User feedback?
		console.error("Image generation error:", error);
		return undefined;
	}
}

export function blobToDataURL(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
