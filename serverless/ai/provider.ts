import { AIRewriteRequest, AIRewriteResponse } from '../../src/types/review';

export interface ReviewAIProvider {
  name: string;
  rewriteReview(request: AIRewriteRequest): Promise<AIRewriteResponse>;
}
