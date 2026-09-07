import { ReviewAIProvider } from './provider';
import { AIRewriteRequest, AIRewriteResponse } from '../../src/types/review';

export class OpenAIReviewProvider implements ReviewAIProvider {
  name = 'OpenAI';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
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

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Customer Input Data:\n${contextDetails}\n\nGenerate a fresh, unique, natural customer review:` }
          ],
          temperature: 0.75, // Higher temperature guarantees unique phrasing every request
          max_tokens: 450,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errJson.error?.message || `OpenAI API returned status ${response.status}`,
        };
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content?.trim();

      if (!resultText) {
        return { success: false, error: 'Empty response from AI provider.' };
      }

      return { success: true, review: resultText };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to connect to OpenAI service.' };
    }
  }
}
