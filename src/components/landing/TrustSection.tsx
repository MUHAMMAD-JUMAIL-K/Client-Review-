import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      title: 'Customer Chooses Their Own Rating',
      desc: 'Alpha Tech Portal does not default to 5 stars or hide 1-3 star rating buttons. Freedom of choice is guaranteed.',
    },
    {
      title: 'Customer Provides Their Genuine Experience',
      desc: 'All key facts, services used, and sentiment originate directly from the customer.',
    },
    {
      title: 'AI Only Improves Wording',
      desc: 'Our strict AI safety guidelines prevent the AI from creating false statements, fake dates, or unprovided claims.',
    },
    {
      title: 'Customer Reviews & Edits Final Text',
      desc: 'Before copying, customers have full control to edit, shorten, or change the wording.',
    },
    {
      title: 'Customer Submits Directly to Google',
      desc: 'Alpha Tech Portal never injects scripts into Google or automates Google DOM elements. Customer performs the final submission.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0D333C]/5 via-[#164954]/10 to-[#0D333C]/10 border border-[#0D333C]/20 rounded-3xl p-8 sm:p-12 text-slate-900 relative overflow-hidden shadow-sm">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D333C]/10 blur-[100px] pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#0D333C] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
              <ShieldAlert className="w-4 h-4 text-[#C9A84E]" />
              <span>Ethical & Compliant Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A30] tracking-tight">
              Built around genuine customer feedback.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We engineered Alpha Tech Review Portal as a customer assistance tool, not a rating manipulation engine. Trust is at the center of every review created.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {trustPoints.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#0D333C]/20 p-6 rounded-2xl shadow-xs space-y-2 hover:shadow-md hover:border-[#0D333C]/40 transition-all">
                <div className="flex items-center gap-2 text-[#0D333C] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#0D333C] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
