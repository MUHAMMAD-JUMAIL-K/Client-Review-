import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Phone, Building2, MessageCircle } from 'lucide-react';
import { AlphaTechLogo } from './AlphaTechLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D333C] text-slate-300 py-12 border-t border-[#164954]/60 relative overflow-hidden">
      {/* Background ambient glow accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#164954]/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 lg:col-span-4">
            <Link to="/" className="inline-block group">
              <AlphaTechLogo size="md" variant="light" />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300/90 max-w-sm">
              Innovative IT solutions that transform your business operations, empower growth, and deliver seamless digital infrastructure.
            </p>
            
            {/* WhatsApp Chat Support Pill Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/916238687692"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-slate-300/40 hover:border-emerald-400/80 bg-[#164954]/30 hover:bg-[#164954]/60 text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Chat Support</span>
              </a>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://www.alphatechbusinesssolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84E] transition-colors">Official Website</a></li>
              <li><Link to="/create" className="hover:text-[#C9A84E] transition-colors">Create Client Review Link</Link></li>
              <li><a href="/#how-it-works" className="hover:text-[#C9A84E] transition-colors">How It Works</a></li>
              <li><a href="/#features" className="hover:text-[#C9A84E] transition-colors">AI Review Assistant</a></li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Compliance & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" className="hover:text-[#C9A84E] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#C9A84E] transition-colors">Terms of Service</Link></li>
              <li><Link to="/help" className="hover:text-[#C9A84E] transition-colors">Google Review Policy Guarantee</Link></li>
            </ul>
          </div>

          {/* Col 4: Our Offices */}
          <div className="space-y-3 lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#C9A84E]" />
              Our Offices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Head Office */}
              <div className="bg-[#164954]/30 border border-[#164954]/80 p-3 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-[#C9A84E]/60 transition-colors">
                <div>
                  <p className="font-semibold text-white text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C9A84E] shrink-0" />
                    Head Office
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-300/80 mt-1">
                    No. AP 6/454G, KVVES Bldg, Kuttikaitha Road, Ambalavayal Sulthanbathery, Wayanad, Kerala -673593
                  </p>
                </div>
                <a href="tel:+919633126408" className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C9A84E] hover:underline pt-1">
                  <Phone className="w-3 h-3 shrink-0" />
                  +91 96331 26408
                </a>
              </div>

              {/* Calicut Office */}
              <div className="bg-[#164954]/30 border border-[#164954]/80 p-3 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-[#C9A84E]/60 transition-colors">
                <div>
                  <p className="font-semibold text-white text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C9A84E] shrink-0" />
                    Calicut Office
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-300/80 mt-1">
                    Near Water Authority, Malaparamba, Calicut - Kerala
                  </p>
                </div>
                <a href="tel:04952062068" className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C9A84E] hover:underline pt-1">
                  <Phone className="w-3 h-3 shrink-0" />
                  0495 206 2068
                </a>
              </div>

              {/* Dubai Office */}
              <div className="bg-[#164954]/30 border border-[#164954]/80 p-3 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-[#C9A84E]/60 transition-colors">
                <div>
                  <p className="font-semibold text-white text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C9A84E] shrink-0" />
                    Dubai, UAE (Regional)
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-300/80 mt-1">
                    Sherina Plazza - 3, 1st Floor Near Gold Souk Metro Station Dubai | UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#164954]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">© {new Date().getFullYear()} Alpha Tech Business Solutions. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Engineered with precision for Alpha Tech clients <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

