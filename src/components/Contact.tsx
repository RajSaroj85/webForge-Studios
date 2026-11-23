import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { ContactMessage, Profile, ProjectType } from '../types';

interface ContactProps {
  profile: Profile;
  preselectedProjectType?: ProjectType;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
}

export const Contact: React.FC<ContactProps> = ({
  profile,
  preselectedProjectType,
  onSendMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>(
    preselectedProjectType || 'Web Application'
  );
  const [budget, setBudget] = useState('$1,500 - $3,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedProjectType) {
      setProjectType(preselectedProjectType);
      setSubject(`Inquiry for ${preselectedProjectType}`);
    }
  }, [preselectedProjectType]);

  const projectTypes: ProjectType[] = [
    'Website',
    'Web Application',
    'Java Full Stack Project',
    'REST API',
    'Database',
    'UI Development',
    'Other',
  ];

  const budgetRanges = [
    '< $500 (Small Task / Advisory)',
    '$500 - $1,500 (Landing / API module)',
    '$1,500 - $3,000 (Standard MVP / Studio)',
    '$3,000 - $5,000 (Enterprise Full Stack)',
    '$5,000+ (Comprehensive Product)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields (*)');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSendMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        projectType,
        budget,
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-zinc-900 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <span>07 / GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Let's Forge Your Next Digital Solution
          </h2>
          <p className="mt-3 text-zinc-400 text-base max-w-2xl">
            Whether you need an enterprise Java Spring Boot backend, a modern React web application, or a full freelance studio engagement, I'm here to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-[#0f0f15] border border-zinc-800/80 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white font-heading">
                Contact & Studio Details
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Feel free to reach out via the form or through direct communication channels. I reply to all qualified inquiries within 24 hours.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                      Direct Email
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {profile.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                      Phone / WhatsApp
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {profile.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                      Location & Timezone
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Availability */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Accepting new client contracts</span>
                </div>
                <span className="font-mono text-zinc-400">Response &lt; 24h</span>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              <span>
                All inquiries are stored securely in MySQL with full confidentiality and non-disclosure agreement protection upon request.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0e0e13] border border-zinc-800/80 p-8 shadow-2xl relative">
              {submitted ? (
                /* Success feedback state (PRD Section 12) */
                <div className="py-12 px-4 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-heading">
                      Thank you!
                    </h3>
                    <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                      Your message has been successfully submitted. I'll review your project details and get back to you soon.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 max-w-sm mx-auto font-mono">
                    Project Inquiry logged into RajForge database with status <span className="text-emerald-400 font-bold">NEW</span>.
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Phone <span className="text-zinc-400 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Project Type <span className="text-blue-400">*</span>
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value as ProjectType)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject and Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Subject <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Build Web Platform with Spring Boot"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Estimated Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Project Details & Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your requirements, timeline, target features, and any existing codebase or design links..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting Inquiry to Database...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
