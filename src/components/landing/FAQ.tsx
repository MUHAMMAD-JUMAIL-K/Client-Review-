import React from 'react';
import { AccordionItem } from '../ui/Accordion';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'Does REVORA post reviews to Google?',
      a: 'No. REVORA prepares your review, copies the text to your clipboard, and opens Google Maps. You choose your rating, paste your review, and submit it yourself.',
    },
    {
      q: 'Can REVORA choose my stars?',
      a: 'No. You always choose your own star rating (1–5 stars) based on your real experience.',
    },
    {
      q: 'Can AI create a fake review for me?',
      a: "No. REVORA's AI assistant helps organize and improve wording for information you provide. It strictly will not invent experiences, services, people, dates, or false facts.",
    },
    {
      q: 'Do customers need an account or app installation?',
      a: 'No. Customers simply tap the link or scan your QR code on their phone browser without installing anything or signing up.',
    },
    {
      q: 'Is REVORA static?',
      a: 'Yes! The main frontend is 100% static React and can be hosted anywhere (Vercel, Hostinger, Netlify, Cloudflare Pages). AI rewriting is handled securely through a small serverless API endpoint so your API keys remain 100% private.',
    },
    {
      q: 'How does campaign URL storage work without a database?',
      a: 'Campaign settings (business name, logo URL, brand colors, Google link) are safely encoded into compressed URL parameters. You can generate unlimited review links with zero database setup!',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base text-slate-600">
            Learn more about REVORA's policy compliance and architecture.
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
