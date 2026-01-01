export interface Env {
	AI: any;
	ASSETS: Fetcher;
}

// export default {
// 	async fetch(request: Request, env: Env): Promise<Response> {
// 		const url = new URL(request.url);

// 		const corsHeaders = {
// 			'Access-Control-Allow-Origin': '*',
// 			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
// 			'Access-Control-Allow-Headers': 'Content-Type',
// 			'Access-Control-Max-Age': '86400',
// 		};

// 		if (request.method === 'OPTIONS') {
// 			return new Response(null, { headers: corsHeaders });
// 		}

// 		if (request.method === 'OPTIONS') {
// 			return new Response(null, {
// 				headers: corsHeaders,
// 			});
// 		}

// 		if (request.method === 'GET') {
// 			return env.ASSETS.fetch(request);
// 		}

// 		if (request.method !== 'POST') {
// 			return new Response('Method not allowed', {
// 				status: 405,
// 				headers: {
// 					'Access-Control-Allow-Origin': '*',
// 				},
// 			});
// 		}

// 		try {
// 			const { userPrompt } = (await request.json()) as { userPrompt?: string };

// 			const guardrailedPrompt = `Zodiac Academy fantasy art, mystical magical style, DnD game character design`;
// 			const negativePrompt = 'realistic photo, modern, violent, gore, nsfw';

// 			const fullPrompt = userPrompt ? `${guardrailedPrompt}, ${userPrompt}` : guardrailedPrompt;

// 			const inputs = {
// 				prompt: fullPrompt,
// 				negative_prompt: negativePrompt,
// 			};

// 			const response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

// 			return new Response(response, {
// 				headers: {
// 					'Content-Type': 'image/png',
// 					'Access-Control-Allow-Origin': '*',
// 				},
// 			});
// 		} catch (error: any) {
// 			return new Response(JSON.stringify({ error: error.message }), {
// 				status: 500,
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'Access-Control-Allow-Origin': '*',
// 				},
// 			});
// 		}
// 	},
// };

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Max-Age': '86400', // Cache preflight 1 day
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 200,
				headers: corsHeaders,
			});
		}

		// Handle API route for image generation
		if (url.pathname === '/api/generate' || url.pathname === '/api/generate/') {
			if (request.method !== 'POST') {
				return new Response('Method not allowed', {
					status: 405,
					headers: corsHeaders,
				});
			}

			try {
				const { userPrompt } = (await request.json()) as { userPrompt?: string };

				const guardrailedPrompt = `Zodiac Academy fantasy art, mystical magical style, DnD game character design`;
				const negativePrompt = 'realistic photo, modern, violent, gore, nsfw';

				const fullPrompt = userPrompt ? `${guardrailedPrompt}, ${userPrompt}` : guardrailedPrompt;

				const inputs = {
					prompt: fullPrompt,
					negative_prompt: negativePrompt,
				};

				const aiResponse = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

				return new Response(aiResponse, {
					headers: {
						'content-type': 'image/png',
						...corsHeaders,
					},
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
				return new Response(JSON.stringify({ error: errorMessage }), {
					status: 500,
					headers: {
						'content-type': 'application/json',
						...corsHeaders,
					},
				});
			}
		}

		// For all other routes, serve static assets
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
