import React from 'react';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Help: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Google Compliance Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Google Review Policy & Compliance Guidance
          </h1>
          <p className="text-sm text-slate-600">
            How Alpha Tech Business Solutions ensures 100% compliance with Google Maps & Review guidelines.
          </p>
        </div>

        <Card className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-sky-600" />
              <span>Strict Non-Automation Policy</span>
            </h2>
            <p>
              Alpha Tech Business Solutions review portal does <strong>NOT</strong> automate Google's review interface. We do not inject scripts into Google, manipulate Google's DOM, automatically click stars, or automatically submit reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2 p-4 bg-sky-50/60 border border-sky-200/80 rounded-2xl">
              <h3 className="font-bold text-sky-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" /> What Alpha Tech Portal Does
              </h3>
              <ul className="space-y-1.5 text-xs text-sky-950">
                <li>• Prepares and polishes genuine client project review text.</li>
                <li>• Copies review text to client's clipboard.</li>
                <li>• Safely opens Alpha Tech's official Google Maps listing in a new tab.</li>
                <li>• Displays clear step-by-step instructions for manual submission.</li>
              </ul>
            </div>

            <div className="space-y-2 p-4 bg-rose-50/60 border border-rose-200/80 rounded-2xl">
              <h3 className="font-bold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> What Alpha Tech Portal Never Does
              </h3>
              <ul className="space-y-1.5 text-xs text-rose-950">
                <li>• Never automatically selects Google stars.</li>
                <li>• Never automatically pastes review text.</li>
                <li>• Never automatically submits a review to Google.</li>
                <li>• Never fabricates false services, dates, or experiences.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-900">AI Safety Guarantee</h3>
            <p className="text-xs text-slate-600">
              Our AI system mandates that the AI assistant only refines spelling, grammar, and readability for details provided directly by the customer. It will never invent facts, claims, or artificial positive experiences.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
