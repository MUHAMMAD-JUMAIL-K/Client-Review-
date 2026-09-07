import { ReviewAIProvider } from './provider';
import { AIRewriteRequest, AIRewriteResponse } from '../../src/types/review';

export class GeminiReviewProvider implements ReviewAIProvider {
  name = 'Gemini';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-1.5-flash') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async rewriteReview(request: AIRewriteRequest): Promise<AIRewriteResponse> {
    const systemPrompt = `You are an expert customer review writing assistant.

CRITICAL UNIQUENESS & INDEPENDENCE RULE:
- Every customer review MUST be generated independently.
- Multiple customers selecting the same service MUST receive unique, distinct, fresh reviews.
- Do NOT use a fixed review template, boilerplate opening, or repetitive sentence structure.
- Dynamically vary sentence structure, word choice, opening hook, sentence order, writing style, tone, sentence length, and natural transitions for every single generation.

IMPORTANT AUTHENTICITY RULE (NEVER INVENT FACTS):
- Uniqueness MUST NEVER come from inventing false details.
- ONLY use information provided directly by the customer (rating, service, liked details, team qualities, follow-up, standout features, recommendation, and additional comments).
- Do NOT invent: employees, names, dates, prices, results, claims, awards, products, locations, or promises.

Target Tone: ${request.tone}
Target Length: ${request.length}
Generation Nonce: ${request.nonce || Math.random()}`;

    const contextDetails = [
      request.rating ? `Star Rating: ${request.rating}/5` : null,
      request.service ? `Service Used: ${request.service}` : null,
      request.liked ? `Liked Experience: "${request.liked}"` : null,
      request.teamQualities?.length ? `Team Qualities: ${request.teamQualities.join(', ')}` : null,
      request.followUp ? `Follow-up Quality: ${request.followUp}` : null,
      request.standout ? `Standout Feature: "${request.standout}"` : null,
      request.recommendation ? `Recommendation: ${request.recommendation}` : null,
      request.additionalComments ? `Additional Comments: "${request.additionalComments}"` : null,
      `Raw Review Input: "${request.review}"`,
    ].filter(Boolean).join('\n');

    const promptText = `${systemPrompt}\n\nCustomer Input Data:\n${contextDetails}\n\nGenerate a fresh, unique, natural customer review:`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.75, // Higher temperature guarantees unique phrasing every request
            maxOutputTokens: 450,
          },
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errJson.error?.message || `Gemini API returned status ${response.status}`,
        };
      }

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!resultText) {
        return { success: false, error: 'Empty response from Gemini provider.' };
      }

      return { success: true, review: resultText };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to connect to Gemini service.' };
    }
  }
}
