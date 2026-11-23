import React from 'react';
import {
  Globe,
  Coffee,
  Zap,
  Database,
  Palette,
  Wrench,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { ProjectType, Service } from '../types';

interface ServicesProps {
  services: Service[];
  onSelectService: (serviceType: ProjectType) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'Coffee':
        return Coffee;
      case 'Zap':
        return Zap;
      case 'Database':
        return Database;
      case 'Palette':
        return Palette;
      case 'Wrench':
        return Wrench;
      default:
        return Globe;
    }
  };

  const mapTitleToProjectType = (title: string): ProjectType => {
    if (title.includes('Java') || title.includes('Full Stack')) return 'Java Full Stack Project';
    if (title.includes('REST') || title.includes('API')) return 'REST API';
    if (title.includes('Database')) return 'Database';
    if (title.includes('UI')) return 'UI Development';
    if (title.includes('Web')) return 'Website';
    return 'Other';
  };

  return (
    <section id="services" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <span>04 / STUDIO SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Freelance & Engineering Services
          </h2>
          <p className="mt-3 text-zinc-400 text-base max-w-2xl">
            From single-page web experiences to full-scale enterprise Java microservices, WebForge Studio provides end-to-end digital craft tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            const projectType = mapTitleToProjectType(service.title);

            return (
              <div
                key={service.id}
                className="rounded-2xl bg-[#0f0f15] border border-zinc-800/80 hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 group hover:-translate-y-1"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Studio Service
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 mb-5">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {service.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-zinc-800/60">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inquiry CTA */}
                <button
                  onClick={() => onSelectService(projectType)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-blue-600 text-zinc-300 hover:text-white border border-zinc-700 hover:border-blue-500 text-xs font-semibold transition-all duration-200"
                >
                  <span>Inquire for {service.title.split(' ')[0]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Solution Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900 to-indigo-950/40 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Have a unique specification or custom stack requirement?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl">
              I collaborate on both greenfield product development and refactoring legacy systems to modern Spring Boot microservices and React frontends.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Other')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-lg shadow-blue-600/30"
          >
            Discuss Custom Project
          </button>
        </div>
      </div>
    </section>
  );
};
