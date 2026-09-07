import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { InteractivePreview } from './InteractivePreview';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden bg-gradient-to-b from-[#0D333C]/5 via-slate-50 to-white text-slate-900">
      {/* Dynamic Ambient Background Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#0D333C]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b2c3308_1px,transparent_1px),linear-gradient(to_bottom,#0b2c3308_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#0D333C]/10 border border-[#0D333C]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0D333C] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0D333C] animate-pulse" />
                <span>Alpha Tech Client Review & Feedback Assistant</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              Turn client satisfaction into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D333C] via-teal-700 to-[#14535E]">
                authentic reviews.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Empower your clients to share their genuine project experience with Alpha Tech Business Solutions. Enhance wording with zero-hallucination AI and post directly to Google Business.
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
                  className="w-full sm:w-auto bg-[#0D333C] hover:bg-[#14535E] text-white font-bold shadow-xl shadow-[#0D333C]/25 border border-[#0D333C]/20 text-base transition-all hover:scale-[1.02]"
                  leftIcon={<PlusCircle className="w-5 h-5 text-teal-400" />}
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
                <CheckCircle2 className="w-4 h-4 text-[#0D333C]" />
                <span>100% Policy Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0D333C]" />
                <span>Zero Hallucinations AI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0D333C]" />
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
