import React from 'react';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            <span>Privacy Policy</span>
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        <Card className="p-8 space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">1. Architecture & Privacy First</h2>
            <p>
              Alpha Tech Business Solutions Review Portal is built as a static application with URL-encoded parameters and browser local storage. We do not maintain a central database of customer reviews or personal identifiers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">2. AI Processing</h2>
            <p>
              When a customer requests AI wording improvement, the review text is securely sent to a serverless API endpoint (`/api/rewrite-review`) to execute the AI provider call without exposing API credentials. The review text is processed solely to generate the rewritten output and is not permanently stored or used to train third-party models.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3. Local Storage</h2>
            <p>
              Campaign configurations created on the portal are stored locally in your web browser under the `alphatech_` namespace. You can clear this data at any time via your browser settings.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">4. External Destinations</h2>
            <p>
              Alpha Tech Business Solutions Review Portal connects customers to third-party destinations (Google Maps / Google Write-Review). Google's standard privacy policies apply when customers interact with Google Maps.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
