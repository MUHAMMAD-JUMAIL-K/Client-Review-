import React from 'react';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-8 h-8 text-emerald-600" />
            <span>Terms of Service</span>
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        <Card className="p-8 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">1. Acceptable Use</h2>
            <p>
              Alpha Tech Business Solutions Review Portal is provided to assist clients in preparing genuine, honest project feedback and reviews. You agree not to use this portal to generate spam, defamatory content, or automated fake review campaigns.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">2. Customer Responsibility</h2>
            <p>
              The client remains the sole author and owner of their submitted review. Clients retain final approval of all text copied to their clipboard and submitted to Google.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3. Google Platform Policies</h2>
            <p>
              Alpha Tech Business Solutions explicitly complies with Google Review Policies. We do not guarantee Google will accept or retain any specific review, as Google applies its own automated review algorithms and moderation rules.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
