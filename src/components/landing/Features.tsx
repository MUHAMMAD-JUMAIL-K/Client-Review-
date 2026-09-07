import React from 'react';
import { Card } from '../ui/Card';
import { Smartphone, Sparkles, Star, ShieldCheck, Lock, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      title: 'Simple for Customers',
      desc: 'Mobile-first design optimized for touch screens. No signups, apps, or downloads required.',
      icon: <Smartphone className="w-6 h-6 text-[#0D333C]" />,
      gradient: 'from-[#0D333C]/10 to-[#164954]/20 text-[#0D333C]',
    },
    {
      title: 'AI-Assisted Writing',
      desc: 'Refines spelling, grammar, and sentence structure without inventing fake details or facts.',
      icon: <Sparkles className="w-6 h-6 text-[#0D333C]" />,
      gradient: 'from-[#0D333C]/10 to-[#164954]/20 text-[#0D333C]',
    },
    {
      title: 'Customer-Controlled Ratings',
      desc: 'Customers choose their own star rating (1–5 stars) without default manipulation or gating.',
      icon: <Star className="w-6 h-6 text-[#C9A84E]" />,
      gradient: 'from-[#C9A84E]/10 to-[#C9A84E]/20 text-[#C9A84E]',
    },
    {
      title: 'No Fake Experiences',
      desc: 'Enforces strict AI safety guidelines that prevent hallucinating fake services or dates.',
      icon: <ShieldCheck className="w-6 h-6 text-[#0D333C]" />,
      gradient: 'from-[#0D333C]/10 to-[#164954]/20 text-[#0D333C]',
    },
    {
      title: 'Zero Google Automation',
      desc: '100% compliant with Google policies. Customer manually pastes review and clicks submit on Google.',
      icon: <Lock className="w-6 h-6 text-[#0D333C]" />,
      gradient: 'from-[#0D333C]/10 to-[#164954]/20 text-[#0D333C]',
    },
    {
      title: 'Instant Shareable Links & QR',
      desc: 'No database setup needed. Encodes brand info directly in shareable URLs with client-side QR codes.',
      icon: <Zap className="w-6 h-6 text-[#0D333C]" />,
      gradient: 'from-[#0D333C]/10 to-[#164954]/20 text-[#0D333C]',
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D333C]/10 text-[#0D333C] uppercase tracking-wider">
            Built for Modern Businesses
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A30] tracking-tight">
            Designed for Trust & Maximum Quality
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to collect authentic feedback and guide customers directly to Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#0D333C]/30 transition-all duration-300 group space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center border border-slate-200/60 shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-[#102A30] group-hover:text-[#0D333C] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
