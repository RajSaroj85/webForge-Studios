import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative border-t border-zinc-900 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <span>05 / CAREER JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Experience & Milestone Timeline
          </h2>
          <p className="mt-3 text-zinc-400 text-base max-w-2xl">
            A chronological timeline of engineering training, freelance studio execution, and enterprise technology mastery.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-32 space-y-12">
          {experience.map((item, index) => {
            const isLatest = index === 0;

            return (
              <div key={item.id} className="relative pl-8 sm:pl-10 group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    isLatest
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/50'
                      : 'bg-[#111116] border-zinc-700 text-zinc-400'
                  }`}
                >
                  {item.currentlyWorking ? (
                    <Sparkles className="w-4 h-4" />
                  ) : index === 1 ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                </div>

                {/* Left Date label for desktop */}
                <div className="sm:absolute sm:-left-36 sm:top-2 sm:text-right sm:w-28 text-xs font-mono text-zinc-400 mb-1 sm:mb-0">
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-blue-400 font-semibold inline-block">
                    {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                  </span>
                </div>

                {/* Experience Card */}
                <div className="rounded-2xl bg-[#0f0f15] border border-zinc-800/80 p-6 sm:p-7 hover:border-zinc-700 transition-all shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white font-heading">
                        {item.position}
                      </h3>
                      <div className="text-sm font-semibold text-blue-400 mt-0.5">
                        {item.company}
                      </div>
                    </div>

                    {item.currentlyWorking && (
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        Active Role
                      </span>
                    )}
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.keyAchievements && item.keyAchievements.length > 0 && (
                    <div className="pt-3 border-t border-zinc-800/70 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2">
                        Key Milestones & Impact:
                      </div>
                      {item.keyAchievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
