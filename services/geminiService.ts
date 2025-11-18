
import { GoogleGenAI, Type } from "@google/genai";
import { Category } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const suggestCategories = async (question: string, availableCategories: Category[]): Promise<Category[]> => {
    if (!API_KEY) return [];
    try {
        const categoryNames = availableCategories.map(c => c.name).join(', ');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following question, suggest up to 3 relevant categories from this list: [${categoryNames}].\n\nQuestion: "${question}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        categories: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
        });
        
        const jsonResponse = JSON.parse(response.text);
        const suggestedNames: string[] = jsonResponse.categories || [];
        
        return availableCategories.filter(cat => suggestedNames.includes(cat.name));

    } catch (error) {
        console.error("Error suggesting categories:", error);
        return [];
    }
};

export const draftAnswer = async (question: string, tone: string, length: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please set your API_KEY.";
    
    const lengthMap: { [key: string]: string } = {
        'Short': 'a brief, single-paragraph answer',
        'Medium': 'a concise answer of about 2-3 paragraphs',
        'Detailed': 'a detailed, multi-paragraph answer with examples if possible',
    };

    const toneMap: { [key: string]: string } = {
        'Expert': 'in an expert and technical tone',
        'Formal': 'in a formal and structured tone',
        'Informal': 'in a casual, informal, and friendly tone',
    };

    const lengthDescription = lengthMap[length] || 'a concise answer';
    const toneDescription = toneMap[tone] || 'in a clear tone';

    const prompt = `Provide ${lengthDescription} to the following technical question, written ${toneDescription}. Format the response using Markdown.\n\nQuestion: "${question}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                 systemInstruction: "You are a senior technology expert writing for a technical audience. Your answers should be accurate, well-structured, and easy to understand."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error drafting answer:", error);
        return "There was an error generating a draft answer.";
    }
};