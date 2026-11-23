import React, { useState } from 'react';
import {
  ShieldAlert,
  Layers,
  Briefcase,
  Wrench,
  MessageSquare,
  Star,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Github,
  Mail,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  ContactMessage,
  Experience,
  MessageStatus,
  Profile,
  Project,
  Service,
  Skill,
  SkillCategory,
  Testimonial,
} from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  profile: Profile;
  onUpdateProfile: (p: Profile) => void;
  projects: Project[];
  onSaveProject: (p: Omit<Project, 'id'> & { id?: number }) => void;
  onDeleteProject: (id: number) => void;
  services: Service[];
  onSaveService: (s: Omit<Service, 'id'> & { id?: number }) => void;
  onDeleteService: (id: number) => void;
  skills: Skill[];
  onSaveSkill: (s: Omit<Skill, 'id'> & { id?: number }) => void;
  onDeleteSkill: (id: number) => void;
  experience: Experience[];
  onSaveExperience: (e: Omit<Experience, 'id'> & { id?: number }) => void;
  onDeleteExperience: (id: number) => void;
  testimonials: Testimonial[];
  onSaveTestimonial: (t: Omit<Testimonial, 'id'> & { id?: number }) => void;
  onDeleteTestimonial: (id: number) => void;
  messages: ContactMessage[];
  onUpdateMessageStatus: (id: number, status: MessageStatus) => void;
  onDeleteMessage: (id: number) => void;
  onResetDefaults: () => void;
}

type AdminTab =
  | 'overview'
  | 'messages'
  | 'projects'
  | 'services'
  | 'skills'
  | 'experience'
  | 'testimonials'
  | 'profile';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  profile,
  onUpdateProfile,
  projects,
  onSaveProject,
  onDeleteProject,
  services,
  onSaveService,
  onDeleteService,
  skills,
  onSaveSkill,
  onDeleteSkill,
  experience,
  onSaveExperience,
  onDeleteExperience,
  testimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
  messages,
  onUpdateMessageStatus,
  onDeleteMessage,
  onResetDefaults,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Selected message for viewing modal
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  // Edit / Add modal states
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingExperience, setEditingExperience] = useState<Partial<Experience> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Notifications or messages filter
  const [messageFilter, setMessageFilter] = useState<MessageStatus | 'ALL'>('ALL');

  const filteredMessages =
    messageFilter === 'ALL' ? messages : messages.filter((m) => m.status === messageFilter);

  const newMessagesCount = messages.filter((m) => m.status === 'NEW').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#08080a] text-zinc-200 flex flex-col overflow-hidden animate-fadeIn">
      {/* Admin Top Navigation Bar */}
      <header className="h-16 px-6 bg-[#0f0f14] border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-white tracking-tight">
                RajForge Studio
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Admin Portal
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Spring Security + JWT • MySQL rajforge_db
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 border-r border-zinc-800 pr-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Logged in as: {user?.email}</span>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Back to Public Site
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-[#0c0c10] border-r border-zinc-800/80 flex flex-col justify-between shrink-0 p-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-3 mb-2">
              Management Modules
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Client Messages</span>
              </div>
              {newMessagesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
                  {newMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Skills ({skills.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Experience ({experience.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4" />
                <span>Testimonials ({testimonials.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </div>
            </button>
          </div>

          {/* Database management reset */}
          <div className="pt-4 border-t border-zinc-800/80">
            <button
              onClick={() => {
                if (window.confirm('Reset all portfolio and admin data to default PRD seed?')) {
                  onResetDefaults();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-zinc-800 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Seed Data</span>
            </button>
          </div>
        </aside>

        {/* Center Panel Container */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#08080a]">
          {/* TAB 1: OVERVIEW (PRD Section 14 EXACT LAYOUT) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              {/* Header Title */}
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  RajForge Studio Control Center • Real-Time Database Metrics
                </p>
              </div>

              {/* 4 Stat Counter Blocks (PRD ASCII layout: Projects, Services, Messages, Testimonials) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 shadow-md">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span className="font-semibold">Projects</span>
                    <Briefcase className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {projects.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    {projects.filter((p) => p.featured).length} Featured
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 shadow-md">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span className="font-semibold">Services</span>
                    <Wrench className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {services.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    Active offerings
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 shadow-md">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span className="font-semibold">Messages</span>
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {messages.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono">
                    {newMessagesCount} New Inquiries
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 shadow-md">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span className="font-semibold">Testimonials</span>
                    <Star className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {testimonials.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    Client reviews
                  </div>
                </div>
              </div>

              {/* Recent Messages Table (PRD Section 14) */}
              <div className="rounded-2xl bg-[#0f0f15] border border-zinc-800 overflow-hidden shadow-lg">
                <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Recent Messages & Project Inquiries
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Submissions received via the contact pipeline
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View All Messages ({messages.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900/60 text-zinc-400 uppercase font-mono text-[10px] border-b border-zinc-800">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Project Type</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {messages.slice(0, 5).map((msg) => (
                        <tr key={msg.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="px-6 py-3.5 font-semibold text-white">
                            {msg.name}
                          </td>
                          <td className="px-6 py-3.5 text-zinc-400 font-mono">
                            {msg.email}
                          </td>
                          <td className="px-6 py-3.5 text-zinc-300">
                            {msg.projectType}
                          </td>
                          <td className="px-6 py-3.5 text-zinc-400 font-mono">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                msg.status === 'NEW'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : msg.status === 'READ'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                  : msg.status === 'REPLIED'
                                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {msg.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <button
                              onClick={() => setViewingMessage(msg)}
                              className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] transition-colors"
                            >
                              Read
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Client Inquiries & Messages
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Manage client proposals, status pipelines, and replies
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">Filter:</span>
                  {(['ALL', 'NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setMessageFilter(st)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        messageFilter === st
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f0f15] border border-zinc-800 overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/60 text-zinc-400 uppercase font-mono text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-3">Sender</th>
                      <th className="px-6 py-3">Subject & Type</th>
                      <th className="px-6 py-3">Budget</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredMessages.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-zinc-400">
                          No messages found for this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{msg.name}</div>
                            <div className="text-zinc-400 font-mono text-[11px]">{msg.email}</div>
                            {msg.phone && (
                              <div className="text-zinc-400 text-[10px]">{msg.phone}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-zinc-200">{msg.subject}</div>
                            <div className="text-[11px] text-blue-400">{msg.projectType}</div>
                          </td>
                          <td className="px-6 py-4 text-zinc-300 font-mono">
                            {msg.budget || 'Not specified'}
                          </td>
                          <td className="px-6 py-4 text-zinc-400 font-mono">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={msg.status}
                              onChange={(e) =>
                                onUpdateMessageStatus(msg.id, e.target.value as MessageStatus)
                              }
                              className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-[11px] text-zinc-200 focus:outline-none font-mono"
                            >
                              <option value="NEW">NEW</option>
                              <option value="READ">READ</option>
                              <option value="REPLIED">REPLIED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => setViewingMessage(msg)}
                              className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Delete this inquiry permanently?')) {
                                  onDeleteMessage(msg.id);
                                }
                              }}
                              className="px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Manage Projects
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Add, edit, or toggle featured portfolio applications
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingProject({
                      title: '',
                      description: '',
                      imageUrl:
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
                      githubUrl: 'https://github.com/raj',
                      liveUrl: 'https://demo.rajforge.com',
                      technologies: ['React', 'Java', 'Spring Boot', 'MySQL'],
                      featured: false,
                      category: 'Full Stack',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white font-heading">
                            {p.title}
                          </h3>
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-bold">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingProject(p)}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.title}?`)) {
                              onDeleteProject(p.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Tech list */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span>Category: {p.category || 'Full Stack'}</span>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Manage Studio Services
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Configure service offerings, descriptions, and feature checklists
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingService({
                      title: '',
                      description: '',
                      icon: 'Globe',
                      features: ['Feature 1', 'Feature 2'],
                      technologies: ['Java', 'React'],
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div
                    key={s.id}
                    className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-blue-400">Icon: {s.icon}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingService(s)}
                            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete service: ${s.title}?`)) {
                                onDeleteService(s.id);
                              }
                            }}
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white font-heading">{s.title}</h3>
                      <p className="text-xs text-zinc-400 mt-1">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Manage Skills & Competencies
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Adjust percentage values and categories for public progress bars
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingSkill({
                      name: '',
                      category: 'Backend',
                      percentage: 85,
                      experienceYears: '2+ yrs',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((sk) => (
                  <div
                    key={sk.id}
                    className="p-4 rounded-xl bg-[#0f0f15] border border-zinc-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{sk.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {sk.category}
                        </span>
                      </div>
                      <div className="text-xs text-blue-400 font-mono mt-1">
                        Proficiency: {sk.percentage}% • {sk.experienceYears || 'Experienced'}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingSkill(sk)}
                        className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${sk.name}?`)) {
                            onDeleteSkill(sk.id);
                          }
                        }}
                        className="p-1 rounded bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Manage Career Timeline
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Chronological work milestones, internships, and education
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingExperience({
                      company: '',
                      position: '',
                      description: '',
                      startDate: '2026',
                      endDate: 'Present',
                      currentlyWorking: true,
                      location: 'Remote',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-heading">
                          {exp.position}
                        </h3>
                        <span className="text-xs font-semibold text-blue-400">@ {exp.company}</span>
                        {exp.currentlyWorking && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mt-0.5">
                        {exp.startDate} – {exp.endDate} • {exp.location}
                      </div>
                      <p className="text-xs text-zinc-300 mt-2">{exp.description}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setEditingExperience(exp)}
                        className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete experience @ ${exp.company}?`)) {
                            onDeleteExperience(exp.id);
                          }
                        }}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white font-heading">
                    Manage Testimonials
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Add or modify client reviews and star ratings
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      clientName: '',
                      clientRole: 'Product Lead',
                      company: 'Client Co',
                      message: '',
                      rating: 5,
                      imageUrl:
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-[#0f0f15] border border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingTestimonial(t)}
                            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete review from ${t.clientName}?`)) {
                                onDeleteTestimonial(t.id);
                              }
                            }}
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-300 italic">"{t.message}"</p>
                    </div>
                    <div className="text-xs font-semibold text-white pt-2 border-t border-zinc-800">
                      {t.clientName} • <span className="text-zinc-400 font-normal">{t.clientRole}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-bold text-white font-heading">
                  Profile & Studio Identity
                </h1>
                <p className="text-xs text-zinc-400">
                  Update your public portfolio headline, bio, contact channels, and social profiles
                </p>
              </div>

              {profileSavedNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateProfile(profileForm);
                  setProfileSavedNotice(true);
                  setTimeout(() => setProfileSavedNotice(false), 3000);
                }}
                className="p-6 rounded-2xl bg-[#0f0f15] border border-zinc-800 space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">Developer Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">Primary Headline</label>
                    <input
                      type="text"
                      value={profileForm.headline}
                      onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold">Biography (Who I Am)</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">GitHub URL</label>
                    <input
                      type="url"
                      value={profileForm.githubUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold">LinkedIn URL</label>
                    <input
                      type="url"
                      value={profileForm.linkedinUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* VIEW MESSAGE MODAL */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                Client Inquiry Details
              </h3>
              <button
                onClick={() => setViewingMessage(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">From:</span>
                <span className="font-semibold text-white">{viewingMessage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Email:</span>
                <span className="text-blue-400 font-mono">{viewingMessage.email}</span>
              </div>
              {viewingMessage.phone && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Phone:</span>
                  <span className="text-zinc-200">{viewingMessage.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Project Type:</span>
                <span className="text-zinc-200 font-semibold">{viewingMessage.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Budget:</span>
                <span className="text-emerald-400 font-mono">{viewingMessage.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date Received:</span>
                <span className="text-zinc-400 font-mono">
                  {new Date(viewingMessage.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <span className="text-zinc-400 block mb-1">Subject:</span>
                <div className="p-2.5 rounded bg-zinc-900 font-medium text-zinc-200">
                  {viewingMessage.subject}
                </div>
              </div>

              <div>
                <span className="text-zinc-400 block mb-1">Message Content:</span>
                <div className="p-3.5 rounded bg-zinc-900 text-zinc-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {viewingMessage.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Status:</span>
                  <select
                    value={viewingMessage.status}
                    onChange={(e) => {
                      const newSt = e.target.value as MessageStatus;
                      onUpdateMessageStatus(viewingMessage.id, newSt);
                      setViewingMessage({ ...viewingMessage, status: newSt });
                    }}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-white font-mono text-xs"
                  >
                    <option value="NEW">NEW</option>
                    <option value="READ">READ</option>
                    <option value="REPLIED">REPLIED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <a
                  href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(
                    viewingMessage.subject
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-xl bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4 my-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveProject(editingProject as Project);
                setEditingProject(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. LocalLink"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Image URL</label>
                  <input
                    type="url"
                    required
                    value={editingProject.imageUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Category</label>
                  <select
                    value={editingProject.category || 'Full Stack'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as Project['category'],
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={(editingProject.technologies || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Java, Spring Boot, React, MySQL"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-proj"
                  checked={editingProject.featured || false}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, featured: e.target.checked })
                  }
                  className="rounded bg-zinc-900 border-zinc-700 text-blue-600"
                />
                <label htmlFor="featured-proj" className="text-zinc-300">
                  Feature this project on homepage showcase
                </label>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ADD SKILL MODAL */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveSkill(editingSkill as Skill);
                setEditingSkill(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. Java or React.js"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Category</label>
                <select
                  value={editingSkill.category || 'Backend'}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      category: e.target.value as SkillCategory,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                >
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-zinc-300 font-medium">Proficiency Percentage</label>
                  <span className="font-mono text-blue-400">{editingSkill.percentage || 80}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={editingSkill.percentage || 80}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })
                  }
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Experience Years / Tag</label>
                <input
                  type="text"
                  value={editingSkill.experienceYears || ''}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, experienceYears: e.target.value })
                  }
                  placeholder="e.g. 2+ yrs"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ADD SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveService(editingService as Service);
                setEditingService(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Icon Keyword</label>
                <select
                  value={editingService.icon || 'Globe'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                >
                  <option value="Globe">Globe (Web Development)</option>
                  <option value="Coffee">Coffee (Java Full Stack)</option>
                  <option value="Zap">Zap (REST API)</option>
                  <option value="Database">Database (DB & ORM)</option>
                  <option value="Palette">Palette (UI Frontend)</option>
                  <option value="Wrench">Wrench (Maintenance)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ADD EXPERIENCE MODAL */}
      {editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {editingExperience.id ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button
                onClick={() => setEditingExperience(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveExperience(editingExperience as Experience);
                setEditingExperience(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Position / Role</label>
                <input
                  type="text"
                  required
                  value={editingExperience.position || ''}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, position: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Company / Studio</label>
                <input
                  type="text"
                  required
                  value={editingExperience.company || ''}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, company: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Start Date</label>
                  <input
                    type="text"
                    required
                    value={editingExperience.startDate || ''}
                    onChange={(e) =>
                      setEditingExperience({ ...editingExperience, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">End Date</label>
                  <input
                    type="text"
                    value={editingExperience.endDate || ''}
                    onChange={(e) =>
                      setEditingExperience({ ...editingExperience, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingExperience.description || ''}
                  onChange={(e) =>
                    setEditingExperience({ ...editingExperience, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingExperience(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / ADD TESTIMONIAL MODAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#121217] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {editingTestimonial.id ? 'Edit Review' : 'Add Testimonial'}
              </h3>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveTestimonial(editingTestimonial as Testimonial);
                setEditingTestimonial(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Client Name</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.clientName || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Client Role</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientRole || ''}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-300 font-medium">Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.company || ''}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Review Message</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.message || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, message: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
