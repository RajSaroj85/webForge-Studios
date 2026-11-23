import React from 'react';
import { X, FileDown, Printer, Mail, Phone, MapPin, Globe, ExternalLink, Award } from 'lucide-react';
import { Profile } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSimulated = () => {
    // Generate downloadable text / html blob of the resume
    const content = `
RAJ — Java Full Stack Developer & Founder of RajForge Studio
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
GitHub: ${profile.githubUrl} | LinkedIn: ${profile.linkedinUrl}

PROFESSIONAL SUMMARY
${profile.bio}

CORE TECHNICAL SKILLS
- Backend: Java (Java 17/21), Spring Boot, Spring MVC, Spring Security, REST APIs, Hibernate / JPA, Maven
- Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap
- Database: MySQL, PostgreSQL, MongoDB, Database Normalization, Indexing
- Tools & DevOps: Git, GitHub, IntelliJ IDEA, VS Code, Postman, Docker, Linux

FEATURED EXPERIENCE
1. Java Full Stack Developer & Founder | WebForge Studio (2026 - Present)
   - Architecting scalable web applications and Spring Boot microservices
   - Implementing role-based JWT authentication and JPA entity mappings
   - Delivering full-stack client solutions with modern React frontends

2. Java Full Stack Training | QSpiders (2025 - 2026)
   - Comprehensive program covering Core Java, OOP, Collections, Multithreading
   - Built full-stack capstone projects using Spring Boot, Hibernate, MySQL, and React

KEY PROJECTS
- LocalLink: Hyper-local home service provider platform (React, Java, Spring Boot, MySQL, REST API)
- Service Provider Marketplace: Multi-vendor on-demand service platform
- Insurance Policy Management: Enterprise policy lifecycle REST API with Spring Security
- RajPortfolio: Portfolio and freelance studio platform

EDUCATION
${profile.education || 'Bachelor of Technology in Computer Science & Engineering'}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Raj_Java_Full_Stack_Developer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#111116] border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0d] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="text-sm font-semibold text-zinc-200 font-heading">
              Raj — Curriculum Vitae
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadSimulated}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
              title="Download Resume"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto space-y-8 bg-[#0d0d12] text-zinc-200">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
                  RAJ
                </h1>
                <h2 className="text-base font-semibold text-blue-400 mt-0.5">
                  Java Full Stack Developer & Founder of WebForge Studio
                </h2>
              </div>
              <div className="space-y-1 text-xs text-zinc-400 font-mono sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {profile.bio} Experienced in architecting RESTful services, transactional JPA layers, database indexing, and interactive React client web applications.
            </p>
          </div>

          {/* Technical Competencies Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="font-semibold text-zinc-200 block mb-1">Backend & Frameworks</span>
                <span className="text-zinc-400">
                  Java (17+), Spring Boot, Spring MVC, Spring Security, REST APIs, Hibernate, JPA, Maven
                </span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="font-semibold text-zinc-200 block mb-1">Frontend & Styling</span>
                <span className="text-zinc-400">
                  React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Vite
                </span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="font-semibold text-zinc-200 block mb-1">Databases & Architecture</span>
                <span className="text-zinc-400">
                  MySQL, PostgreSQL, MongoDB, Schema Design, Relational Normalization, ACID Transactions
                </span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="font-semibold text-zinc-200 block mb-1">Tools & Environments</span>
                <span className="text-zinc-400">
                  Git, GitHub, IntelliJ IDEA, VS Code, Postman, Docker, Linux, JWT
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Work Experience
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-white">
                    Java Full Stack Developer & Founder
                  </h4>
                  <span className="text-xs font-mono text-zinc-400">2026 – Present</span>
                </div>
                <div className="text-xs font-semibold text-blue-400">WebForge Studio</div>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  Leading full-stack freelance development and client projects. Engineering enterprise Spring Boot microservices, designing relational schemas in MySQL, and building user-centric React frontends.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-white">
                    Java Full Stack Training & Apprenticeship
                  </h4>
                  <span className="text-xs font-mono text-zinc-400">2025 – 2026</span>
                </div>
                <div className="text-xs font-semibold text-blue-400">QSpiders — Software Training Institute</div>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  Rigorous hands-on training in Core Java, Spring Boot, Hibernate ORM, SQL query optimization, and frontend React integration. Built enterprise capstones with full CRUD lifecycle.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Education & Certifications
            </h3>
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {profile.education || 'Bachelor of Technology in Computer Science & Engineering'}
                </div>
                <div className="text-xs text-zinc-400">Full Stack Software Engineering Specialization</div>
              </div>
              <span className="text-xs font-mono text-zinc-400">Completed</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#0a0a0d] border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
