import React, { useState } from 'react';
import { AIWizardAnswers } from '../../types/review';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

export interface AIReviewWizardProps {
  onComplete: (wizardAnswers: AIWizardAnswers, wizardSummary: string) => void;
  brandColor?: string;
}

const SERVICE_OPTIONS = [
  'Web Development',
  'Custom Software',
  'Mobile App Development',
  'Digital Marketing',
  'AI Video Generation',
  'Motion Video Generation',
  'Poster Creation',
  'Other',
];

const SERVICE_LIKED_OPTIONS: Record<string, string[]> = {
  'Web Development': [
    'Modern Responsive UI/UX Design',
    'Ultra-Fast Loading Speed',
    'Secure & Scalable Architecture',
    'Clean & Maintainable Code',
    'SEO & Performance Optimization',
    'Clear & Timely Communication',
  ],
  'Custom Software': [
    'Tailored Enterprise Workflows',
    'Seamless Database & API Integration',
    'Robust Automation & Efficiency',
    'High Reliability & Performance',
    'Comprehensive Support & Docs',
    'On-Time Project Delivery',
  ],
  'Mobile App Development': [
    'Smooth iOS & Android Performance',
    'Intuitive Mobile User Interface',
    'Real-Time Push Notifications',
    'Secure Offline & Cloud Sync',
    'Fast Screen Load Times',
    'Dedicated App Store Support',
  ],
  'Digital Marketing': [
    'High Return on Investment (ROI)',
    'Targeted Ad Campaign Strategy',
    'Increased Brand Engagement',
    'Transparent Analytics & Reports',
    'Consistent Brand Positioning',
    'Creative Campaign Execution',
  ],
  'AI Video Generation': [
    'Ultra-Realistic AI Avatars & Voice',
    'Rapid Video Production Turnaround',
    'Engaging Script & Storytelling',
    'High-Definition Visual Output',
    'Multi-Language & Voiceover Options',
    'Cost-Effective Content Creation',
  ],
  'Motion Video Generation': [
    'High-Impact 2D/3D Motion Graphics',
    'Smooth & Dynamic Animations',
    'Professional Sound Design & Audio',
    'Captivating Visual Transitions',
    'Premium Brand Storytelling',
    'Fast Rendering & Turnaround',
  ],
  'Poster Creation': [
    'Eye-Catching & Creative Layouts',
    'High-Resolution Print & Digital Quality',
    'Perfectly Aligned Brand Color Palette',
    'Expressive Typography & Graphics',
    'Quick Revisions & Fast Delivery',
    'Versatile Formats for All Platforms',
  ],
};

const SERVICE_STANDOUT_OPTIONS: Record<string, string[]> = {
  'Web Development': [
    'State-of-the-Art Web Architecture',
    'Flawless Cross-Browser Compatibility',
    'High Search Engine (SEO) Visibility',
    'Intuitive Navigation & User Experience',
    'Rapid Web Page Load Speeds',
    'Exceptional Post-Launch Maintenance',
  ],
  'Custom Software': [
    'Complex Business Logic Automation',
    'High-Performance Database Engine',
    'Scalable System Architecture',
    'Zero System Downtime',
    'Comprehensive Staff Training & Docs',
    'Tailored Industry Features',
  ],
  'Mobile App Development': [
    'Flawless App Store & Play Store Approval',
    'Ultra-Smooth Touch Animations',
    'Minimal Battery & Memory Usage',
    'Seamless Offline Mode Capabilities',
    'Biometric & Secure Payment Integration',
    'Timely App Updates & Maintenance',
  ],
  'Digital Marketing': [
    'Significant Lead & Sales Growth',
    'Lower Customer Acquisition Cost',
    'High-Converting Ad Creatives',
    'In-Depth Weekly Performance Reports',
    'Data-Driven Campaign Optimization',
    'Strategic Market Audience Targeting',
  ],
  'AI Video Generation': [
    'Hyper-Realistic AI Voiceover Quality',
    'Lightning-Fast Video Render Times',
    'Engaging Social Media Video Formats',
    'Seamless AI Avatar Synchronization',
    'Multi-Language Localization',
    'Unmatched Production Cost Savings',
  ],
  'Motion Video Generation': [
    'Cinema-Grade 3D Motion Graphics',
    'Fluid & Engaging Animation Timing',
    'Professional Audio & SFX Mixing',
    'Custom Brand Visual Style',
    'High Conversion Explainer Format',
    'Exceptional Creative Direction',
  ],
  'Poster Creation': [
    'Stunning Visual Hierarchy & Aesthetics',
    'High-DPI Print Ready Asset Quality',
    'Unique Creative Graphic Concepts',
    'Instant Brand Recognition',
    'Super-Fast Design Revisions',
    'Multi-Format Social & Banner Export',
  ],
};

const SERVICE_TEAM_OPTIONS: Record<string, string[]> = {
  'Web Development': [
    'Tech-Savvy Frontend & Backend Engineers',
    'Creative UI/UX Designers',
    'Responsive & Clear Communicators',
    'Proactive Project Managers',
    'Agile & Efficient Team',
    'Dedicated Support Engineers',
  ],
  'Custom Software': [
    'Expert Software Architects',
    'Full-Stack Engineering Team',
    'Security-Focused Developers',
    'Agile Scrum Masters',
    'Detail-Oriented Analysts',
    '24/7 Dedicated Tech Support',
  ],
  'Mobile App Development': [
    'Skilled iOS & Android Engineers',
    'Mobile UI/UX Specialists',
    'QA & Device Testing Experts',
    'Fast & Responsive Developers',
    'User-Centric Product Managers',
    'Reliable Tech Advisors',
  ],
  'Digital Marketing': [
    'Strategic Growth Marketers',
    'Data-Driven Campaign Specialists',
    'Creative Content Strategy Team',
    'Ad Optimization Experts',
    'Proactive Account Managers',
    'Transparent Communicators',
  ],
  'AI Video Generation': [
    'Pioneering AI Video Specialists',
    'Creative Scriptwriters & Editors',
    'Sound & Voiceover Designers',
    'Fast-Turnaround Producers',
    'Innovative Visual Artists',
    'Responsive Production Managers',
  ],
  'Motion Video Generation': [
    'Master Motion Designers & Animators',
    'Creative Art Directors',
    'Professional Sound Engineers',
    'Detail-Oriented Animators',
    'Visual Storytellers',
    'Reliable Project Coordinators',
  ],
  'Poster Creation': [
    'Talented Graphic Designers',
    'Brand Identity Specialists',
    'Creative Visual Illustrators',
    'Fast & Accommodating Designers',
    'Precision Typesetters',
    'Responsive Account Leads',
  ],
};

const DEFAULT_LIKED_OPTIONS = [
  'State-of-the-Art Technical Execution',
  'On-Time & On-Budget Delivery',
  'Exceptional Work Quality & Reliability',
  'Clear & Responsive Communication',
  'Intuitive Interface & Smooth Workflow',
  'High Return on Investment (ROI)',
];

const DEFAULT_STANDOUT_OPTIONS = [
  'Deep Expertise & Innovation',
  'Rapid Response & Dedicated Support',
  'Flawless System & Asset Delivery',
  'Tailored Features for Our Specific Industry',
  'Transparent Milestone Tracking & Reports',
  'Outstanding Support & Revisions',
];

const DEFAULT_TEAM_TAGS = [
  'Innovative & Tech-Driven',
  'Highly Skilled Engineering & Creative Team',
  'Fast & Clear Communication',
  'Dedicated & Customer-Centric',
  'Reliable & Trustworthy',
  'Proactive Problem Solvers',
];

const FOLLOWUP_OPTIONS = [
  'Regular milestone progress updates',
  'Quick & responsive technical support',
  'Smooth revision & enhancement cycles',
  'On-time project delivery',
  'N/A',
];

export const AIReviewWizard: React.FC<AIReviewWizardProps> = ({
  onComplete,
  brandColor,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<AIWizardAnswers>({
    serviceUsed: '',
    likedExperience: '',
    teamKeywords: [],
    followUp: '',
    standoutDetails: '',
    recommend: '',
    additionalNotes: '',
  });
  const [customService, setCustomService] = useState('');

  const toggleLikedOption = (opt: string) => {
    setAnswers((prev) => {
      const currentText = prev.likedExperience;
      if (currentText.includes(opt)) {
        const newText = currentText
          .split(', ')
          .filter((item) => item.trim() !== opt)
          .join(', ');
        return { ...prev, likedExperience: newText };
      } else {
        const newText = currentText.trim()
          ? `${currentText.trim()}, ${opt}`
          : opt;
        return { ...prev, likedExperience: newText };
      }
    });
  };

  const toggleStandoutOption = (opt: string) => {
    setAnswers((prev) => {
      const currentText = prev.standoutDetails;
      if (currentText.includes(opt)) {
        const newText = currentText
          .split(', ')
          .filter((item) => item.trim() !== opt)
          .join(', ');
        return { ...prev, standoutDetails: newText };
      } else {
        const newText = currentText.trim()
          ? `${currentText.trim()}, ${opt}`
          : opt;
        return { ...prev, standoutDetails: newText };
      }
    });
  };

  const toggleTeamKeyword = (kw: string) => {
    setAnswers(prev => ({
      ...prev,
      teamKeywords: prev.teamKeywords.includes(kw)
        ? prev.teamKeywords.filter(k => k !== kw)
        : [...prev.teamKeywords, kw],
    }));
  };

  const handleFinish = () => {
    const finalService = answers.serviceUsed === 'Other' ? customService.trim() : answers.serviceUsed;
    const finalAnswers: AIWizardAnswers = {
      ...answers,
      serviceUsed: finalService,
    };

    // Construct raw structured detail string preserving customer's exact words
    const detailsParts: string[] = [];
    if (finalService) detailsParts.push(`Service: ${finalService}.`);
    if (answers.likedExperience.trim()) detailsParts.push(`Liked: ${answers.likedExperience.trim()}`);
    if (answers.teamKeywords.length > 0) detailsParts.push(`Team qualities: ${answers.teamKeywords.join(', ')}.`);
    if (answers.followUp && answers.followUp !== 'N/A') detailsParts.push(`Follow-up: ${answers.followUp}.`);
    if (answers.standoutDetails.trim()) detailsParts.push(`Standout feature: ${answers.standoutDetails.trim()}`);
    if (answers.recommend) detailsParts.push(`Recommendation: ${answers.recommend}.`);
    if (answers.additionalNotes.trim()) detailsParts.push(`Additional comments: ${answers.additionalNotes.trim()}`);

    const summaryText = detailsParts.join(' ');
    onComplete(finalAnswers, summaryText);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Wizard Progress Indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-1 border-b border-slate-100">
        <span className="flex items-center gap-1 text-emerald-600">
          <Sparkles className="w-3.5 h-3.5" /> Review Assistant Questionnaire
        </span>
        <span>Step {step} of 6</span>
      </div>

      {/* Step 1: Service Used */}
      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900">1. What service did you use?</h4>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {SERVICE_OPTIONS.map((svc) => (
              <button
                key={svc}
                type="button"
                onClick={() => setAnswers({ ...answers, serviceUsed: svc })}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                  answers.serviceUsed === svc
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                {svc}
              </button>
            ))}
          </div>

          {answers.serviceUsed === 'Other' && (
            <input
              type="text"
              placeholder="Specify service..."
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
            />
          )}

          <Button
            className="w-full"
            disabled={!answers.serviceUsed || (answers.serviceUsed === 'Other' && !customService.trim())}
            onClick={() => setStep(2)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            customColor={brandColor}
          >
            Next Step
          </Button>
        </div>
      )}

      {/* Step 2: What did you like */}
      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              2. What did you like about the {answers.serviceUsed === 'Other' ? (customService.trim() || 'service') : (answers.serviceUsed || 'service')}?
            </h4>
            <p className="text-xs text-slate-500">Tap options below or write your own details:</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(SERVICE_LIKED_OPTIONS[answers.serviceUsed] || DEFAULT_LIKED_OPTIONS).map((opt) => {
              const isSelected = answers.likedExperience.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleLikedOption(opt)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <textarea
            rows={3}
            value={answers.likedExperience}
            onChange={(e) => setAnswers({ ...answers, likedExperience: e.target.value })}
            placeholder={`e.g. Great quality, fast turnaround, and clear communication throughout our ${answers.serviceUsed === 'Other' ? (customService.trim() || 'project') : answers.serviceUsed} project.`}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
          />
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button
              disabled={!answers.likedExperience.trim()}
              onClick={() => setStep(3)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              customColor={brandColor}
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: How was the team & Follow up */}
      {step === 3 && (
        <div className="space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900">
            3. How was the team & communication during your {answers.serviceUsed === 'Other' ? (customService.trim() || 'service') : answers.serviceUsed}? (Select all that apply)
          </h4>
          <div className="flex flex-wrap gap-2">
            {(SERVICE_TEAM_OPTIONS[answers.serviceUsed] || DEFAULT_TEAM_TAGS).map((tag) => {
              const isSelected = answers.teamKeywords.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTeamKeyword(tag)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700">How was the project follow-up & delivery?</label>
            <div className="flex flex-wrap gap-1.5">
              {FOLLOWUP_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswers({ ...answers, followUp: opt })}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    answers.followUp === opt
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button variant="ghost" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button onClick={() => setStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />} customColor={brandColor}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: What stood out */}
      {step === 4 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              4. What stood out to you in this {answers.serviceUsed === 'Other' ? (customService.trim() || 'service') : answers.serviceUsed}?
            </h4>
            <p className="text-xs text-slate-500">Tap options below or write your own details:</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(SERVICE_STANDOUT_OPTIONS[answers.serviceUsed] || DEFAULT_STANDOUT_OPTIONS).map((opt) => {
              const isSelected = answers.standoutDetails.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleStandoutOption(opt)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <textarea
            rows={3}
            value={answers.standoutDetails}
            onChange={(e) => setAnswers({ ...answers, standoutDetails: e.target.value })}
            placeholder={`e.g. Outstanding execution and high quality results delivered for our ${answers.serviceUsed === 'Other' ? (customService.trim() || 'project') : answers.serviceUsed}.`}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
          />
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button onClick={() => setStep(5)} rightIcon={<ArrowRight className="w-4 h-4" />} customColor={brandColor}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Would you recommend */}
      {step === 5 && (
        <div className="space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900">
            5. Would you recommend them for {answers.serviceUsed === 'Other' ? (customService.trim() || 'this service') : answers.serviceUsed}?
          </h4>
          <div className="flex gap-2">
            {(['Yes', 'Maybe', 'No'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAnswers({ ...answers, recommend: opt })}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  answers.recommend === opt
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <Button variant="ghost" onClick={() => setStep(4)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button
              disabled={!answers.recommend}
              onClick={() => setStep(6)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              customColor={brandColor}
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 6: Additional comments & Submit */}
      {step === 6 && (
        <div className="space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900">
            6. Additional comments about your {answers.serviceUsed === 'Other' ? (customService.trim() || 'service') : answers.serviceUsed} experience (Optional)
          </h4>
          <textarea
            rows={3}
            value={answers.additionalNotes}
            onChange={(e) => setAnswers({ ...answers, additionalNotes: e.target.value })}
            placeholder={`e.g. Overall highly satisfied with the final deliverables for our ${answers.serviceUsed === 'Other' ? (customService.trim() || 'project') : answers.serviceUsed}!`}
            className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
          />

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button variant="ghost" onClick={() => setStep(5)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button
              onClick={handleFinish}
              leftIcon={<Sparkles className="w-4 h-4" />}
              customColor={brandColor}
            >
              Generate Unique Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
