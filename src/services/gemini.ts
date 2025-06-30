const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const classifySideEffect = async (description: string): Promise<{
  severity: 'mild' | 'moderate' | 'severe';
  classification: string;
  requiresCaregiver: boolean;
}> => {
  const prompt = `
    Analyze this side effect description and classify it:
    "${description}"
    
    Respond with JSON format:
    {
      "severity": "mild|moderate|severe",
      "classification": "brief medical classification",
      "requiresCaregiver": true/false
    }
    
    Severe symptoms requiring caregiver notification include: chest pain, difficulty breathing, severe allergic reactions, vomiting, dizziness, fainting, severe headaches, or any emergency symptoms.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to classify side effect');
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!text) {
      throw new Error('No response from AI');
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error classifying side effect:', error);
    return {
      severity: 'moderate',
      classification: 'Unable to classify',
      requiresCaregiver: false
    };
  }
};

export const chatWithAI = async (message: string, context?: string): Promise<string> => {
  const prompt = `
    You are a helpful medical assistant for MediMinder, a medication reminder app. 
    ${context ? `Context: ${context}` : ''}
    
    User message: "${message}"
    
    Provide helpful, empathetic advice about medication management, side effects, or general health questions. 
    Always recommend consulting healthcare providers for serious concerns.
    Keep responses concise and supportive.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'I apologize, but I cannot provide a response right now. Please try again later.';
  } catch (error) {
    console.error('Error chatting with AI:', error);
    return 'I apologize, but I cannot provide a response right now. Please try again later.';
  }
};