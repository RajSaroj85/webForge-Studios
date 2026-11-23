import React from 'react';
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Coffee,
  Leaf,
  Atom,
  Database,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid line background overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-zinc-300">
                Available for Freelance & Full-Stack Roles
              </span>
            </div>

            {/* Main Greeting & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">Raj</span> <span className="inline-block animate-wave origin-bottom-right">👋</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-200 font-heading">
                Java Full Stack Developer
                <span className="block text-xl sm:text-2xl font-normal text-blue-400/90 mt-1">
                  & Founder of <span className="font-semibold text-white">RajForge Studio</span>
                </span>
              </h2>
            </div>

            {/* Tagline & Elevator Pitch */}
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase">
                "Forge Ideas. Build Digital Experiences."
              </p>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                I build modern, scalable and user-focused web applications with
                enterprise Java backends, high-performance Spring Boot REST APIs, and reactive frontend experiences.
              </p>
            </div>

            {/* Tech Stack Mini Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-zinc-400 mr-1">Core Stack:</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                <span>Java</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spring Boot</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Atom className="w-3.5 h-3.5 text-sky-400" />
                <span>React.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>MySQL</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>REST API</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                id="hero-view-work-btn"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-medium text-sm px-6 py-3 rounded-xl transition-all hover:border-zinc-500 hover:-translate-y-0.5"
              >
                <span>Let's Work Together</span>
                <Send className="w-4 h-4 text-blue-400" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-4 px-2 py-2 transition-colors"
              >
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-zinc-800/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-medium mr-1">Connect:</span>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600/20 text-zinc-400 hover:text-white border border-zinc-800 hover:border-blue-500/40 flex items-center justify-center transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600/20 text-zinc-400 hover:text-white border border-zinc-800 hover:border-blue-500/40 flex items-center justify-center transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={profile.twitterUrl || 'https://x.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600/20 text-zinc-400 hover:text-white border border-zinc-800 hover:border-blue-500/40 flex items-center justify-center transition-all"
                  aria-label="X (Twitter) Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600/20 text-zinc-400 hover:text-white border border-zinc-800 hover:border-blue-500/40 flex items-center justify-center transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-blue-600/20 text-zinc-400 hover:text-white border border-zinc-800 hover:border-blue-500/40 flex items-center justify-center transition-all"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="text-xs font-mono text-zinc-400">
                📍 {profile.location.split('(')[0].trim()}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Graphic & Architecture Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

              {/* Terminal / Code Card */}
              <div className="relative rounded-2xl bg-[#0e0e12] border border-zinc-800 shadow-2xl p-6 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>RajForgeApplication.java</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    200 OK
                  </span>
                </div>

                {/* Java Spring Boot Code Snippet */}
                <div className="font-mono text-xs text-zinc-300 space-y-1.5 leading-relaxed bg-[#08080a] p-4 rounded-xl border border-zinc-900">
                  <div className="text-zinc-400">// Spring Boot + React Layered Architecture</div>
                  <div>
                    <span className="text-purple-400">@RestController</span>
                  </div>
                  <div>
                    <span className="text-purple-400">@RequestMapping</span>(
                    <span className="text-emerald-400">"/api/v1/forge"</span>)
                  </div>
                  <div>
                    <span className="text-blue-400">public class</span>{' '}
                    <span className="text-yellow-300">RajStudioController</span> {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">@GetMapping</span>(
                    <span className="text-emerald-400">"/status"</span>)
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">public</span> ResponseEntity&lt;
                    <span className="text-yellow-300">StudioProfile</span>&gt;{' '}
                    <span className="text-sky-300">getIdentity</span>() {'{'}
                  </div>
                  <div className="pl-8 text-zinc-300">
                    <span className="text-blue-400">return</span> ResponseEntity.ok(
                  </div>
                  <div className="pl-12 text-zinc-300">
                    <span className="text-yellow-300">StudioProfile</span>.builder()
                  </div>
                  <div className="pl-16 text-zinc-400">
                    .developer(<span className="text-emerald-400">"Raj"</span>)
                  </div>
                  <div className="pl-16 text-zinc-400">
                    .stack(<span className="text-emerald-400">"Java + Spring Boot + React"</span>)
                  </div>
                  <div className="pl-16 text-zinc-400">
                    .database(<span className="text-emerald-400">"MySQL"</span>)
                  </div>
                  <div className="pl-16 text-zinc-400">
                    .readyForWork(<span className="text-amber-400">true</span>)
                  </div>
                  <div className="pl-16 text-zinc-300">.build()</div>
                  <div className="pl-8 text-zinc-300">);</div>
                  <div className="pl-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>

                {/* Micro Metrics row */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <div className="text-base font-bold text-white font-heading">10+</div>
                    <div className="text-[10px] text-zinc-400">Full-Stack Projects</div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <div className="text-base font-bold text-blue-400 font-heading">Sub-50ms</div>
                    <div className="text-[10px] text-zinc-400">API Response</div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
                    <div className="text-base font-bold text-emerald-400 font-heading">100%</div>
                    <div className="text-[10px] text-zinc-400">Clean Architecture</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
