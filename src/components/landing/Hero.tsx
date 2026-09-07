import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { InteractivePreview } from './InteractivePreview';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white text-slate-900">
      {/* Dynamic Ambient Background Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-400/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-teal-400/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966908_1px,transparent_1px),linear-gradient(to_bottom,#05966908_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Mobile-First Customer Review Assistant</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              Turn real experiences into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
                better reviews.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Give your customers a simple, trustworthy way to share what they genuinely experienced, improve their wording with privacy-focused AI, and continue directly to Google.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link to="/create" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-600/25 border border-emerald-500/20 text-base transition-all hover:scale-[1.02]"
                  leftIcon={<PlusCircle className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Review Link
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base border-slate-300 text-slate-700 hover:bg-slate-100 bg-white shadow-xs"
                >
                  How It Works
                </Button>
              </a>
            </motion.div>

            {/* Trust Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Policy Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Hallucinations AI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Account Required</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Mobile Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <InteractivePreview />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
