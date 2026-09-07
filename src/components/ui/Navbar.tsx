import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { AlphaTechLogo } from './AlphaTechLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCustomerPage = location.pathname.startsWith('/r');
  if (isCustomerPage) return null; // Clean experience without main nav on customer review pages

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group">
          <AlphaTechLogo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-[#0B2C33] transition-colors">
            Home
          </Link>
          <a href="/#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-[#0B2C33] transition-colors">
            How It Works
          </a>
          <a href="/#features" className="text-sm font-semibold text-slate-600 hover:text-[#0B2C33] transition-colors">
            Features
          </a>
          <a href="/#faq" className="text-sm font-semibold text-slate-600 hover:text-[#0B2C33] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/create">
            <Button
              size="sm"
              className="bg-[#0B2C33] hover:bg-[#14535E] text-white font-bold shadow-md shadow-[#0B2C33]/25"
              leftIcon={<PlusCircle className="w-4 h-4 text-teal-400" />}
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
              <Button className="w-full bg-[#0B2C33] hover:bg-[#14535E] text-white font-bold" leftIcon={<PlusCircle className="w-5 h-5 text-teal-400" />}>
                Create Review Link
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
