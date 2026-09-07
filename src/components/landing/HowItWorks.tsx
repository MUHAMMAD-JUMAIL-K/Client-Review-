import React from 'react';
import { Card } from '../ui/Card';
import { Link2, Share2, PenTool, ExternalLink } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Link',
      desc: 'Add your Google review URL and customize your business name and branding in seconds.',
      icon: <Link2 className="w-6 h-6 text-emerald-600" />,
      tag: 'For Business',
      tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
    {
      num: '02',
      title: 'Share Anywhere',
      desc: 'Display your custom QR code on counter stands or share the direct link via SMS & email.',
      icon: <Share2 className="w-6 h-6 text-emerald-600" />,
      tag: 'For Business',
      tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
    {
      num: '03',
      title: 'Customer Writes',
      desc: 'Customers choose their own rating, detail their real experience, or use our smart AI wizard.',
      icon: <PenTool className="w-6 h-6 text-teal-600" />,
      tag: 'For Customer',
      tagBg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    },
    {
      num: '04',
      title: 'Submit on Google',
      desc: 'Customers copy their polished review draft with one tap and complete posting on Google Maps.',
      icon: <ExternalLink className="w-6 h-6 text-emerald-600" />,
      tag: 'For Customer',
      tagBg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How REVORA Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A frictionless bridge between genuine customer experiences and authentic Google reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-50/90 border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-slate-200 group-hover:text-emerald-500 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/80 flex items-center justify-center shadow-xs">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6">
                <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${step.tagBg}`}>
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
