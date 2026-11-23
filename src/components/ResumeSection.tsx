import React from 'react';
import { FileDown, Eye, CheckCircle2, Sparkles, Award } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  onOpenResume,
  onDownloadResume,
}) => {
  return (
    <section id="resume" className="py-20 relative border-t border-zinc-900 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#12121a] to-[#0d0d12] border border-blue-500/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>CURRICULUM VITAE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Ready to work together?
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Download my resume and learn more about my technical capabilities, production-tested
                Spring Boot & React applications, and software engineering credentials.
              </p>

              {/* Quick Resume highlights */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Java 17+ & Spring Boot 3
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  React 19 & REST Standards
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  MySQL & Hibernate JPA
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={onDownloadResume}
                id="btn-download-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenResume}
                id="btn-preview-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium text-sm transition-all hover:border-zinc-500"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Interactive Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
