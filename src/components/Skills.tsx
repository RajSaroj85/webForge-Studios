import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { Skill, SkillCategory } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const categories: (SkillCategory | 'All')[] = ['All', 'Backend', 'Frontend', 'Database', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getCategoryColor = (category: SkillCategory) => {
    switch (category) {
      case 'Backend':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Frontend':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'Database':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Tools':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    }
  };

  const getCategoryIcon = (category: SkillCategory | 'All') => {
    switch (category) {
      case 'Backend':
        return Server;
      case 'Frontend':
        return Code2;
      case 'Database':
        return Database;
      case 'Tools':
        return Wrench;
      default:
        return SlidersHorizontal;
    }
  };

  // Top core competencies highlighted
  const coreHighlights = [
    { name: 'Java & Spring Boot', rating: 'Enterprise Microservices', percent: 90, bar: '90%' },
    { name: 'React.js & Tailwind', rating: 'Modern SPAs & Components', percent: 85, bar: '85%' },
    { name: 'MySQL & JPA Hibernate', rating: 'Relational Design & ACID', percent: 90, bar: '90%' },
    { name: 'REST APIs & JWT Security', rating: 'Stateless API Authorization', percent: 88, bar: '88%' },
  ];

  return (
    <section id="skills" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
              <span>02 / TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Skills & Competencies
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Equipped with a battle-tested technical arsenal across enterprise Java backend development, relational database engineering, and reactive frontend design.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 self-start sm:self-auto">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Mastery Showcase Cards (PRD Section 6 ascii bar inspiration) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {coreHighlights.map((hl) => (
            <div
              key={hl.name}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 shadow-md relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-zinc-200 font-heading">{hl.name}</span>
                <span className="text-xs font-mono font-bold text-blue-400">{hl.percent}%</span>
              </div>
              <div className="text-[11px] text-zinc-400 mb-3">{hl.rating}</div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                  style={{ width: `${hl.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills Grid with Animated Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const badgeClass = getCategoryColor(skill.category);
            return (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-[#0f0f14] border border-zinc-800/70 hover:border-zinc-700 transition-all group hover:bg-[#121218]"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}
                    >
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-400">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-zinc-800/80 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400 font-mono">
                  <span>Proficiency</span>
                  <span>{skill.experienceYears || 'Experienced'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Environment footnote */}
        <div className="mt-10 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Dev Environment: IntelliJ IDEA Ultimate, VS Code, Postman, Docker, Git CLI</span>
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            Build Tool: Apache Maven & Vite Bundler
          </div>
        </div>
      </div>
    </section>
  );
};
