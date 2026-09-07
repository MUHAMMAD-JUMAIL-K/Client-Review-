export type StarRating = 1 | 2 | 3 | 4 | 5;

export type ReviewMethod = 'own' | 'ai_wizard';

export interface AIWizardAnswers {
  serviceUsed: string;
  likedExperience: string;
  teamKeywords: string[];
  followUp: string; // "Great follow-up", "Good follow-up", "Quick & responsive", "Regular updates", etc.
  standoutDetails: string;
  recommend: 'Yes' | 'Maybe' | 'No' | '';
  additionalNotes: string;
}

export type ReviewTone = 'Natural' | 'Friendly' | 'Professional';
export type ReviewLength = 'Short' | 'Medium' | 'Detailed';
export type AIAction = 'improve' | 'shorten' | 'friendly' | 'professional' | 'regenerate';

export interface AIRewriteRequest {
  review: string;
  rating?: StarRating;
  service?: string;
  liked?: string;
  teamQualities?: string[];
  followUp?: string;
  standout?: string;
  recommendation?: string;
  additionalComments?: string;
  tone: ReviewTone;
  length: ReviewLength;
  action: AIAction;
  nonce?: string; // Random seed to guarantee fresh generations
}

export interface AIRewriteResponse {
  success: boolean;
  review?: string;
  error?: string;
}
