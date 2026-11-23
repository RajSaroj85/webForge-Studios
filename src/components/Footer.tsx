import React from 'react';
import { Hammer, Github, Linkedin, Instagram, Twitter, Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigateAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-[#060608] pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Hammer className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                RajForge <span className="text-blue-400">Studio</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              "Forge Ideas. Build Digital Experiences."
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Crafting scalable enterprise architectures, resilient Spring Boot REST APIs, and reactive React applications for modern companies and forward-thinking creators.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.twitterUrl || 'https://x.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Developer
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">
                  Skills & Tech Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Studio Services
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-400 transition-colors">
                  Experience & Timeline
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-400 transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Architecture & Admin Access (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Architecture & Admin
            </h4>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2 text-xs">
              <div className="text-zinc-300 font-semibold">Production Tech Stack</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                React.js • Tailwind CSS • Java 17+ • Spring Boot 3 • Spring Security • JWT • Hibernate JPA • MySQL 8
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors border border-zinc-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Control Center</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Status: All systems operational</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {currentYear} RajForge Studio. All rights reserved. Built with pride by <strong className="text-zinc-400">Raj</strong>.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>REST API + Layered Architecture</span>
            <span>•</span>
            <span>JWT Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
