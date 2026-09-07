import { AIRewriteRequest, AIRewriteResponse } from './review';

export interface ReviewAIProvider {
  name: string;
  rewriteReview(request: AIRewriteRequest): Promise<AIRewriteResponse>;
}
