
import { GoogleGenAI } from "@google/genai";
import { Chemical, Rule, SafetyLevel, ReactionResult } from '../types';
import { COMMON_CHEMICALS, REACTION_RULES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function normalizeInput(input: string): Chemical | null {
  const sanitized = input.trim().toLowerCase();
  if (!sanitized) return null;

  // Search by name, formula, or alias
  return COMMON_CHEMICALS.find(c => 
    c.name.toLowerCase() === sanitized || 
    c.formula.toLowerCase() === sanitized || 
    c.aliases.some(a => a.toLowerCase() === sanitized)
  ) || null;
}

export async function checkReaction(c1: Chemical, c2: Chemical): Promise<ReactionResult> {
  if (c1.id === c2.id) {
    return {
      type: SafetyLevel.SAFE,
      title: 'Same Substance',
      explanation: `You are mixing ${c1.name} with itself. No reaction will occur beyond volume increase.`,
      recommendations: ['Mixing identical substances is safe.'],
      chemicals: [c1.name, c2.name],
      timestamp: Date.now()
    };
  }

  // Check predefined rules (order independent)
  const rule = REACTION_RULES.find(r => 
    (r.chemicals[0] === c1.id && r.chemicals[1] === c2.id) ||
    (r.chemicals[0] === c2.id && r.chemicals[1] === c1.id)
  );

  if (rule) {
    return {
      ...rule.result,
      chemicals: [c1.name, c2.name],
      timestamp: Date.now()
    };
  }

  // If no rule found, use Gemini to intelligently assess if it's safe or unknown
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the safety of mixing ${c1.name} (${c1.formula}) with ${c2.name} (${c2.formula}). 
      Provide a JSON response with:
      - type: "Safe", "Mild", "Exothermic", "Dangerous", or "Very Dangerous"
      - title: A short descriptive title
      - explanation: One sentence about the reaction
      - recommendations: A list of 2-3 safety tips`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(response.text);
    return {
      type: data.type as SafetyLevel,
      title: data.title,
      explanation: data.explanation,
      recommendations: data.recommendations,
      chemicals: [c1.name, c2.name],
      timestamp: Date.now()
    };
  } catch (error) {
    console.error("AI Check failed:", error);
    return {
      type: SafetyLevel.UNKNOWN,
      title: 'No Data Available',
      explanation: 'This chemical combination is not in our primary safety database and AI analysis failed.',
      recommendations: ['Assume it is unsafe', 'Do not mix unknown chemicals', 'Refer to MSDS sheets for both substances'],
      chemicals: [c1.name, c2.name],
      timestamp: Date.now()
    };
  }
}
