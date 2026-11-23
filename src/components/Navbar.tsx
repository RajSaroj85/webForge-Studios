import React, { useState, useEffect } from 'react';
import {
  Hammer,
  Code2,
  Menu,
  X,
  FileDown,
  ShieldAlert,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigateAdmin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigateAdmin, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Hammer className="w-5 h-5 text-blue-100" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                RajForge
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Studio
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 tracking-wide font-mono hidden sm:inline">
              Java Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/70 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="inline-flex items-center gap-2 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 px-3.5 py-2 rounded-lg transition-all hover:border-zinc-600 shadow-sm"
          >
            <FileDown className="w-4 h-4 text-blue-400" />
            <span>Resume</span>
          </button>

          <button
            onClick={onNavigateAdmin}
            id="nav-admin-btn"
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg transition-all border ${
              isAuthenticated
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-blue-600/10 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-white'
            }`}
            title="Spring Boot & MySQL Admin Panel"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isAuthenticated ? 'Admin Panel' : 'Admin Login'}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onNavigateAdmin}
            className="p-2 text-blue-400 bg-zinc-900 border border-zinc-800 rounded-lg text-xs"
            title="Admin Login"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e0e11] border-b border-zinc-800 px-5 pt-3 pb-6 space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-lg"
            >
              <FileDown className="w-4 h-4 text-blue-400" />
              Download Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm bg-blue-600 text-white rounded-lg font-medium"
            >
              <ShieldAlert className="w-4 h-4" />
              {isAuthenticated ? 'Open Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
