import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { storageService } from './services/storage';
import {
  ContactMessage,
  Experience as ExperienceType,
  MessageStatus,
  Profile,
  Project,
  ProjectType,
  Service,
  Skill,
  Testimonial,
} from './types';

function MainApp() {
  const { isAuthenticated } = useAuth();

  // Primary persistent state loaded from storageService
  const [profile, setProfile] = useState<Profile>(() => storageService.getProfile());
  const [projects, setProjects] = useState<Project[]>(() => storageService.getProjects());
  const [skills, setSkills] = useState<Skill[]>(() => storageService.getSkills());
  const [services, setServices] = useState<Service[]>(() => storageService.getServices());
  const [experience, setExperience] = useState<ExperienceType[]>(() => storageService.getExperience());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => storageService.getTestimonials());
  const [messages, setMessages] = useState<ContactMessage[]>(() => storageService.getMessages());

  // Modal and navigation views
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [preselectedProjectType, setPreselectedProjectType] = useState<ProjectType | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy for active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'services',
        'experience',
        'testimonials',
        'resume',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for state updates
  const handleUpdateProfile = (updated: Profile) => {
    const res = storageService.updateProfile(updated);
    setProfile(res);
  };

  const handleSaveProject = (p: Omit<Project, 'id'> & { id?: number }) => {
    storageService.saveProject(p);
    setProjects(storageService.getProjects());
  };

  const handleDeleteProject = (id: number) => {
    storageService.deleteProject(id);
    setProjects(storageService.getProjects());
  };

  const handleSaveService = (s: Omit<Service, 'id'> & { id?: number }) => {
    storageService.saveService(s);
    setServices(storageService.getServices());
  };

  const handleDeleteService = (id: number) => {
    storageService.deleteService(id);
    setServices(storageService.getServices());
  };

  const handleSaveSkill = (s: Omit<Skill, 'id'> & { id?: number }) => {
    storageService.saveSkill(s);
    setSkills(storageService.getSkills());
  };

  const handleDeleteSkill = (id: number) => {
    storageService.deleteSkill(id);
    setSkills(storageService.getSkills());
  };

  const handleSaveExperience = (e: Omit<ExperienceType, 'id'> & { id?: number }) => {
    storageService.saveExperience(e);
    setExperience(storageService.getExperience());
  };

  const handleDeleteExperience = (id: number) => {
    storageService.deleteExperience(id);
    setExperience(storageService.getExperience());
  };

  const handleSaveTestimonial = (t: Omit<Testimonial, 'id'> & { id?: number }) => {
    storageService.saveTestimonial(t);
    setTestimonials(storageService.getTestimonials());
  };

  const handleDeleteTestimonial = (id: number) => {
    storageService.deleteTestimonial(id);
    setTestimonials(storageService.getTestimonials());
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    storageService.addMessage(msg);
    setMessages(storageService.getMessages());
  };

  const handleUpdateMessageStatus = (id: number, status: MessageStatus) => {
    storageService.updateMessageStatus(id, status);
    setMessages(storageService.getMessages());
  };

  const handleDeleteMessage = (id: number) => {
    storageService.deleteMessage(id);
    setMessages(storageService.getMessages());
  };

  const handleResetDefaults = () => {
    storageService.resetDefaults();
    setProfile(storageService.getProfile());
    setProjects(storageService.getProjects());
    setSkills(storageService.getSkills());
    setServices(storageService.getServices());
    setExperience(storageService.getExperience());
    setTestimonials(storageService.getTestimonials());
    setMessages(storageService.getMessages());
  };

  const handleSelectService = (serviceType: ProjectType) => {
    setPreselectedProjectType(serviceType);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminNavigate = () => {
    if (isAuthenticated) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleDownloadResume = () => {
    setResumeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onNavigateAdmin={handleAdminNavigate}
        activeSection={activeSection}
      />

      {/* Main Public Page Content */}
      <main className="flex-1">
        <Hero
          profile={profile}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <About profile={profile} />

        <Skills skills={skills} />

        <Projects projects={projects} />

        <Services
          services={services}
          onSelectService={handleSelectService}
        />

        <Experience experience={experience} />

        <Testimonials testimonials={testimonials} />

        <ResumeSection
          onOpenResume={() => setResumeModalOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <Contact
          profile={profile}
          preselectedProjectType={preselectedProjectType}
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onNavigateAdmin={handleAdminNavigate}
      />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        profile={profile}
      />

      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => {
          setAdminLoginOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {adminDashboardOpen && (
        <AdminDashboard
          onClose={() => setAdminDashboardOpen(false)}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          projects={projects}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
          services={services}
          onSaveService={handleSaveService}
          onDeleteService={handleDeleteService}
          skills={skills}
          onSaveSkill={handleSaveSkill}
          onDeleteSkill={handleDeleteSkill}
          experience={experience}
          onSaveExperience={handleSaveExperience}
          onDeleteExperience={handleDeleteExperience}
          testimonials={testimonials}
          onSaveTestimonial={handleSaveTestimonial}
          onDeleteTestimonial={handleDeleteTestimonial}
          messages={messages}
          onUpdateMessageStatus={handleUpdateMessageStatus}
          onDeleteMessage={handleDeleteMessage}
          onResetDefaults={handleResetDefaults}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
