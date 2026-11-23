import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Info,
  X,
  CheckCircle2,
  Server,
  Database,
  Code2,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ['All', 'Full Stack', 'Backend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => (p.category ? p.category.includes(activeFilter) : true));

  return (
    <section id="projects" className="py-24 relative border-t border-zinc-900 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
              <span>03 / PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Featured Full Stack Projects
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Real-world systems engineered with modern architecture, rigorous database modeling, and production-grade code.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0e0e13] border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden group flex flex-col shadow-xl hover:-translate-y-1"
            >
              {/* Image Preview with Hover Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/20" />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-semibold tracking-wide uppercase shadow-md flex items-center gap-1 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Quick Details Trigger */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700/80 flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-lg"
                >
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  <span>Architecture Details</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {project.category || 'Full Stack'}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills (PRD format: Java | Spring Boot | React | MySQL) */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Tech Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Live Demo & GitHub */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-zinc-400 hover:text-blue-400 transition-colors underline underline-offset-4"
                  >
                    View Stack Specs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Architectural Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#111116] border border-zinc-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                  Project Deep Dive
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">
                  System Architecture & Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architectural Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">
                    Key Engineering Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* REST Architecture Diagram Box */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-1">
                <div className="text-zinc-400">// Layered Data Flow</div>
                <div className="text-blue-400">Client React Component (State & UI)</div>
                <div className="text-zinc-400 pl-4">└── Axios / Fetch Request with Bearer JWT</div>
                <div className="text-emerald-400 pl-8">└── Spring Boot Controller (@CrossOrigin & @Valid DTO)</div>
                <div className="text-yellow-400 pl-12">└── Service Layer (@Transactional Business Logic)</div>
                <div className="text-purple-400 pl-16">└── Spring Data JPA / Hibernate Repository</div>
                <div className="text-sky-400 pl-20">└── MySQL Relational Database Tables (InnoDB)</div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live Application
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </a>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
