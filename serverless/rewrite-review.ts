import { OpenAIReviewProvider } from './ai/openai';
import { GeminiReviewProvider } from './ai/gemini';
import { ReviewAIProvider } from './ai/provider';
import { AIRewriteRequest, AIRewriteResponse } from '../src/types/review';

/**
  * Core serverless API handler for POST /api/rewrite-review
  */
export async function handleRewriteReview(body: any): Promise<{ statusCode: number; body: AIRewriteResponse }> {
  // Input validation
  if (!body || typeof body !== 'object') {
    return {
      statusCode: 400,
      body: { success: false, error: 'Invalid JSON request payload.' },
    };
  }

  const { review, tone = 'Natural', length = 'Medium', action = 'improve' } = body as AIRewriteRequest;

  if (!review || typeof review !== 'string' || !review.trim()) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Review text is required.' },
    };
  }

  if (review.length > 3000) {
    return {
      statusCode: 400,
      body: { success: false, error: 'Review text exceeds maximum allowed length.' },
    };
  }

  const aiProviderEnv = (process.env.AI_PROVIDER || 'openai').toLowerCase();
  const apiKey = process.env.AI_API_KEY || '';
  const model = process.env.AI_MODEL;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: { success: false, error: 'AI provider key is not configured on serverless environment.' },
    };
  }

  let provider: ReviewAIProvider;
  if (aiProviderEnv === 'gemini') {
    provider = new GeminiReviewProvider(apiKey, model || 'gemini-1.5-flash');
  } else {
    provider = new OpenAIReviewProvider(apiKey, model || 'gpt-4o-mini');
  }

  const result = await provider.rewriteReview({
    ...body,
    review: review.trim(),
    tone,
    length,
    action,
    nonce: body.nonce || `${Date.now()}_${Math.random()}`,
  });

  return {
    statusCode: result.success ? 200 : 500,
    body: result,
  };
}
