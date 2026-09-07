import React from 'react';
import { AccordionItem } from '../ui/Accordion';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'How does the Alpha Tech Client Review Portal work?',
      a: 'This portal prepares client project feedback, refines sentence structure with AI, copies the finalized draft to your clipboard, and redirects directly to Alpha Tech Business Solutions Google Business page for manual submission.',
    },
    {
      q: 'Do clients need an account or app installation?',
      a: 'No. Clients simply tap the review link or scan the QR code on their mobile browser without downloading apps or creating accounts.',
    },
    {
      q: 'Can the AI invent fake project details or praise?',
      a: 'No. Alpha Tech\'s AI assistant strictly adheres to zero-hallucination policies. It only refines grammar and formatting for details provided directly by the client.',
    },
    {
      q: 'Can clients choose their own star rating?',
      a: 'Yes. Clients retain 100% control over their star rating (1–5 stars) and review text without default manipulation or gating.',
    },
    {
      q: 'Is this portal compliant with Google Review Guidelines?',
      a: 'Yes! It operates in full compliance with Google policies. Clients review their AI-polished draft and manually submit it to Google.',
    },
    {
      q: 'Which Alpha Tech services are supported in the review wizard?',
      a: 'All Alpha Tech offerings including Web Development, Custom Software, Mobile App Development, Digital Marketing, AI Video Generation, Motion Video Generation, Poster Creation, and custom client services.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D333C]">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A30] tracking-tight">
            Alpha Tech Client Review FAQs
          </h2>
          <p className="text-base text-slate-600">
            Learn more about Alpha Tech Business Solutions review portal and policy compliance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
