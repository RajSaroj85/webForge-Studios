import React from 'react';
import {
  UserCheck,
  Code2,
  GraduationCap,
  MapPin,
  Clock,
  HeartHandshake,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const infoItems = [
    { label: 'Name', value: profile.name, icon: UserCheck },
    { label: 'Primary Role', value: 'Java Full Stack Developer', icon: Code2 },
    { label: 'Location', value: profile.location, icon: MapPin },
    { label: 'Experience', value: '2024 - Present (Production & Freelance)', icon: Clock },
    { label: 'Education', value: profile.education || 'B.Tech in Computer Science', icon: GraduationCap },
    { label: 'Philosophy', value: profile.philosophy || 'Clean architecture and scalable REST APIs', icon: HeartHandshake },
  ];

  const pillars = [
    {
      title: 'Layered MVC Architecture',
      description: 'Strict separation of Controller, Service, DTO, Repository, and Entity layers for robust, testable enterprise backends.',
      icon: Layers,
    },
    {
      title: 'Spring Security & JWT',
      description: 'Hardened authentication middleware, BCrypt password hashing, and stateless token role-based access control.',
      icon: ShieldCheck,
    },
    {
      title: 'Relational Database Integrity',
      description: 'Normalized MySQL schemas, foreign key constraints, JPA transactional management, and query indexing for instant lookup.',
      icon: Cpu,
    },
    {
      title: 'Responsive Modern UI',
      description: 'Component-driven React frontends with Tailwind CSS, micro-animations, fast hydration, and WCAG AA accessibility.',
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-zinc-900 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <span>01 / ABOUT RAJ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Who I Am & How I Build
          </h2>
          <p className="mt-3 text-zinc-400 text-base max-w-2xl">
            A developer dedicated to engineering end-to-end digital solutions from foundational database schema to interactive client interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story & Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0f0f13] border border-zinc-800/80 shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Who I Am
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                I'm <strong className="text-white font-semibold">Raj</strong>, a Java Full Stack Developer passionate about building modern web applications and digital experiences.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I work with <strong className="text-zinc-200">Java, Spring Boot, React, MySQL, and REST APIs</strong> to build complete full-stack applications. Through <span className="text-blue-400 font-semibold">RajForge Studio</span>, I collaborate with founders, businesses, and development teams to turn complex ideas into robust, production-ready digital solutions.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                My approach bridges the rigor of enterprise backend architecture—such as Spring Security JWT authentication, JPA transactional cascades, and normalized relational databases—with fluid, design-forward React interfaces that delight users.
              </p>

              {/* Engineering Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-zinc-800/80">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                        <Icon className="w-4 h-4" />
                        <h4 className="text-xs font-bold text-zinc-200 font-heading">{pillar.title}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Key Facts & Profile Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-zinc-800/80 shadow-lg space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-3">
                Quick Profile Matrix
              </h3>
              <div className="space-y-3.5">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/40"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                          {item.label}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-zinc-200 mt-0.5 break-words">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct contact prompt */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-blue-300">Ready to start a project?</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Consultations and project estimates are free.</div>
              </div>
              <a
                href="#contact"
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shrink-0"
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
