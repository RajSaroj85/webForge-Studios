import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <span>06 / REVIEWS & ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Client & Recruiter Testimonials
          </h2>
          <p className="mt-3 text-zinc-400 text-base max-w-2xl">
            Feedback from team leads, startup founders, and engineering managers who have partnered with RajForge Studio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0f0f15] border border-zinc-800/80 p-7 flex flex-col justify-between relative group hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-blue-950/10"
            >
              <div className="space-y-4">
                {/* Rating & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-zinc-700 group-hover:text-blue-500/40 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-zinc-800/70 flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {item.clientName}
                  </h4>
                  <div className="text-xs text-zinc-400">
                    {item.clientRole}
                    {item.company ? ` • ${item.company}` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
