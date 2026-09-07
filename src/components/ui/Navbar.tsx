import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Menu, X, PlusCircle, LayoutDashboard, HelpCircle, Shield } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCustomerPage = location.pathname.startsWith('/r');
  if (isCustomerPage) return null; // Clean experience without main nav on customer review pages

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Star className="w-5 h-5 fill-amber-300 stroke-amber-200 stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              REVORA
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 tracking-wider uppercase mt-0.5">
              Review Assistant
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <a href="/#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
            How It Works
          </a>
          <a href="/#features" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
            Features
          </a>
          <a href="/#faq" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/create">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/25"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Create Review Link
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </a>
          <Link
            to="/help"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            <HelpCircle className="w-5 h-5 text-slate-500" />
            Help & Guidelines
          </Link>
          <div className="pt-2">
            <Link to="/create" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" leftIcon={<PlusCircle className="w-5 h-5" />}>
                Create Review Link
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
