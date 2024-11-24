import { Place, Building } from '../types/navigation';

const OPENAI_API_KEY = 'your-api-key-here'; // Replace with actual API key

interface NavigationRequest {
  place: Place;
  building: Building;
  startLocation: string;
  endLocation: string;
}

export async function getNavigationDirections({
  place,
  building,
  startLocation,
  endLocation
}: NavigationRequest): Promise<string> {
  try {
    // Construct a detailed prompt for the AI
    const prompt = `
      Generate detailed, step-by-step indoor navigation directions with the following context:
      
      Location: ${place.name}
      Building: ${building.name}
      Starting Point: ${startLocation}
      Destination: ${endLocation}

      Please provide:
      1. Clear, numbered steps
      2. Specific landmarks and reference points
      3. Approximate distances
      4. Direction changes (left, right, straight)
      5. Floor level changes if applicable
      6. Notable waypoints or checkpoints

      Format the response as natural, easy-to-follow instructions.
    `.trim();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert indoor navigation assistant. Provide clear, concise, and accurate directions using common landmarks and reference points. Focus on user-friendly instructions that are easy to follow.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate directions');
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Navigation service error:', error);
    throw new Error('Failed to generate navigation directions');
  }
}