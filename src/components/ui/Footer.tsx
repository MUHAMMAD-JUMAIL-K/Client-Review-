import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <Star className="w-5 h-5 fill-amber-300 stroke-amber-200 stroke-[1.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">REVORA</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Turn real customer experiences into better reviews. Simple, transparent, and 100% compliant with Google review guidelines.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Zero Google Automation</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/create" className="hover:text-emerald-600 transition-colors">Create Link</Link></li>
              <li><a href="/#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a></li>
              <li><a href="/#features" className="hover:text-emerald-600 transition-colors">AI Assistant</a></li>
            </ul>
          </div>

          {/* Col 3: Policy & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Compliance & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/help" className="hover:text-emerald-600 transition-colors">Google Policy Guarantee</Link></li>
            </ul>
          </div>

          {/* Col 4: Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Architecture</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              REVORA is built as a static client application with serverless AI rewriting endpoints. No customer review data is stored on remote servers.
            </p>
            <span className="inline-block text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
              Static Build v1.0.0
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">© {new Date().getFullYear()} REVORA. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-500">
            Crafted for genuine customer feedback <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
