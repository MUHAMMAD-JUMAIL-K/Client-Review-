import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-emerald-50/50 to-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200/60">
      {/* Dynamic Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-400/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30 border border-emerald-500/30">
          <Star className="w-8 h-8 fill-amber-300 stroke-amber-200 stroke-[1.5]" />
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Ready to turn real customer experiences into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">better reviews?</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Create your custom review link in less than 60 seconds. No account, database, or credit card required.
          </p>
        </div>

        <div className="pt-2 flex flex-col items-center justify-center gap-4">
          <Link to="/create" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-600/30 border border-emerald-500/20 transition-all hover:scale-[1.02]"
              leftIcon={<PlusCircle className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Create Review Link Now
            </Button>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 pt-2 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free & Instant Setup
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1 rounded-full shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Policy Compliant
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Registration Required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

