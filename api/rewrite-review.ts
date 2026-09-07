import { handleRewriteReview } from '../serverless/rewrite-review';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const { statusCode, body } = await handleRewriteReview(req.body);
  return res.status(statusCode).json(body);
}
