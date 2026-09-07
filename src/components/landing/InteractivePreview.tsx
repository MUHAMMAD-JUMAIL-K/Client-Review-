import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Copy, ExternalLink, Check, ShieldCheck } from 'lucide-react';

export const InteractivePreview: React.FC = () => {
  const [stars, setStars] = useState<number>(5);
  const [tone, setTone] = useState<'Natural' | 'Friendly' | 'Professional'>('Natural');
  const [copied, setCopied] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const sampleReviews = {
    Natural: "I used Apex Studio for our company website redesign. The team was friendly, answered all our questions, and finished ahead of deadline. The new design looks clean and works well on mobile.",
    Friendly: "Huge shoutout to Apex Studio for our fantastic new website! The team was super friendly, quick, and easy to work with. We love the fresh design!",
    Professional: "Apex Studio delivered exceptional website development services. The team demonstrated professionalism, met all project milestones on schedule, and delivered a responsive, modern interface.",
  };

  const handleImprove = () => {
    setIsImproving(true);
    setTimeout(() => {
      setIsImproving(false);
    }, 600);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] rounded-[40px] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden text-slate-900">
      {/* Mobile Notch */}
      <div className="w-36 h-5 bg-slate-900 mx-auto rounded-b-xl flex items-center justify-center gap-2 px-3">
        <div className="w-3 h-3 rounded-full bg-slate-800" />
        <div className="w-10 h-1.5 rounded-full bg-slate-800" />
      </div>

      {/* Screen Body */}
      <div className="bg-slate-50 p-5 min-h-[580px] flex flex-col justify-between text-left space-y-4">
        {/* Business Branding */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-2">
            AS
          </div>
          <h3 className="font-bold text-base text-slate-900">Apex Web Studio</h3>
          <p className="text-xs text-slate-500">San Francisco, CA</p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <p className="text-xs font-semibold text-slate-800">"How was your experience?"</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Your honest feedback matters to us.</p>

          {/* Interactive 5-Star Selector */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStars(s)}
                className="p-1 transition-transform hover:scale-125 focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 ${
                    s <= stars
                      ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                      : 'fill-slate-100 text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="inline-block mt-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {stars === 5 ? 'Wonderful! Thank you' : `${stars} Stars Selected`}
          </span>
        </div>

        {/* Review Box & AI Enhancer */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Your Review</span>
            <div className="flex gap-1">
              {(['Natural', 'Friendly', 'Professional'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTone(t);
                    handleImprove();
                  }}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg transition-colors ${
                    tone === t ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={tone + isImproving}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="relative bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed min-h-[90px]"
          >
            {isImproving ? (
              <div className="flex items-center justify-center py-6 text-emerald-600 text-xs gap-2 font-medium">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Improving review tone...</span>
              </div>
            ) : (
              sampleReviews[tone]
            )}
          </motion.div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <Sparkles className="w-3 h-3" /> AI Wording Enhanced
            </span>
            <span>Fact Check Passed</span>
          </div>
        </div>

        {/* Copy & Continue CTA */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : '1. Copy Review'}</span>
          </button>

          <div className="w-full py-2 px-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-between opacity-90 cursor-pointer">
            <span>2. Continue to Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Customer submits manually on Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};
