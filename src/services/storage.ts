import { ContactMessage, Experience, Profile, Project, Service, Skill, Testimonial } from '../types';
import {
  initialExperience,
  initialMessages,
  initialProfile,
  initialProjects,
  initialServices,
  initialSkills,
  initialTestimonials,
} from '../data/mockData';

const STORAGE_KEYS = {
  PROFILE: 'rajforge_profile',
  PROJECTS: 'rajforge_projects',
  SKILLS: 'rajforge_skills',
  SERVICES: 'rajforge_services',
  EXPERIENCE: 'rajforge_experience',
  TESTIMONIALS: 'rajforge_testimonials',
  MESSAGES: 'rajforge_messages',
  AUTH_TOKEN: 'rajforge_jwt_token',
  AUTH_USER: 'rajforge_auth_user',
};

// Safe LocalStorage helpers with fallbacks
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultVal;
    return JSON.parse(item) as T;
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage key: ${key}`, e);
  }
}

export const storageService = {
  // Profile
  getProfile: (): Profile => getStored<Profile>(STORAGE_KEYS.PROFILE, initialProfile),
  updateProfile: (profile: Profile): Profile => {
    setStored(STORAGE_KEYS.PROFILE, profile);
    return profile;
  },

  // Projects
  getProjects: (): Project[] => {
    const projects = getStored<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    // Remove locallink if it was saved in localStorage previously
    const filtered = projects.filter(
      (p) =>
        !p.title.toLowerCase().includes('locallink') &&
        !p.title.toLowerCase().includes('localling')
    );
    // Update any projects whose images are still using old unsplash URLs
    const updated = filtered.map((p) => {
      const initialMatch = initialProjects.find(
        (ip) => ip.id === p.id || ip.title.toLowerCase() === p.title.toLowerCase()
      );
      if (initialMatch && p.imageUrl.includes('images.unsplash.com')) {
        return { ...p, imageUrl: initialMatch.imageUrl };
      }
      return p;
    });
    if (
      filtered.length !== projects.length ||
      JSON.stringify(updated) !== JSON.stringify(projects)
    ) {
      setStored(STORAGE_KEYS.PROJECTS, updated);
    }
    return updated;
  },
  getProjectById: (id: number): Project | undefined => {
    const projects = storageService.getProjects();
    return projects.find((p) => p.id === id);
  },
  saveProject: (project: Omit<Project, 'id'> & { id?: number }): Project => {
    const projects = storageService.getProjects();
    let saved: Project;
    if (project.id) {
      saved = { ...(project as Project), updatedAt: new Date().toISOString() };
      const updated = projects.map((p) => (p.id === project.id ? saved : p));
      setStored(STORAGE_KEYS.PROJECTS, updated);
    } else {
      const nextId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      saved = {
        ...(project as Project),
        id: nextId,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStored(STORAGE_KEYS.PROJECTS, [saved, ...projects]);
    }
    return saved;
  },
  deleteProject: (id: number): boolean => {
    const projects = storageService.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    setStored(STORAGE_KEYS.PROJECTS, filtered);
    return true;
  },

  // Skills
  getSkills: (): Skill[] => getStored<Skill[]>(STORAGE_KEYS.SKILLS, initialSkills),
  saveSkill: (skill: Omit<Skill, 'id'> & { id?: number }): Skill => {
    const skills = storageService.getSkills();
    let saved: Skill;
    if (skill.id) {
      saved = skill as Skill;
      const updated = skills.map((s) => (s.id === skill.id ? saved : s));
      setStored(STORAGE_KEYS.SKILLS, updated);
    } else {
      const nextId = skills.length > 0 ? Math.max(...skills.map((s) => s.id)) + 1 : 1;
      saved = { ...(skill as Skill), id: nextId };
      setStored(STORAGE_KEYS.SKILLS, [...skills, saved]);
    }
    return saved;
  },
  deleteSkill: (id: number): boolean => {
    const skills = storageService.getSkills();
    setStored(
      STORAGE_KEYS.SKILLS,
      skills.filter((s) => s.id !== id)
    );
    return true;
  },

  // Services
  getServices: (): Service[] => getStored<Service[]>(STORAGE_KEYS.SERVICES, initialServices),
  saveService: (service: Omit<Service, 'id'> & { id?: number }): Service => {
    const services = storageService.getServices();
    let saved: Service;
    if (service.id) {
      saved = service as Service;
      const updated = services.map((s) => (s.id === service.id ? saved : s));
      setStored(STORAGE_KEYS.SERVICES, updated);
    } else {
      const nextId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
      saved = { ...(service as Service), id: nextId };
      setStored(STORAGE_KEYS.SERVICES, [...services, saved]);
    }
    return saved;
  },
  deleteService: (id: number): boolean => {
    const services = storageService.getServices();
    setStored(
      STORAGE_KEYS.SERVICES,
      services.filter((s) => s.id !== id)
    );
    return true;
  },

  // Experience
  getExperience: (): Experience[] => getStored<Experience[]>(STORAGE_KEYS.EXPERIENCE, initialExperience),
  saveExperience: (exp: Omit<Experience, 'id'> & { id?: number }): Experience => {
    const list = storageService.getExperience();
    let saved: Experience;
    if (exp.id) {
      saved = exp as Experience;
      const updated = list.map((e) => (e.id === exp.id ? saved : e));
      setStored(STORAGE_KEYS.EXPERIENCE, updated);
    } else {
      const nextId = list.length > 0 ? Math.max(...list.map((e) => e.id)) + 1 : 1;
      saved = { ...(exp as Experience), id: nextId };
      setStored(STORAGE_KEYS.EXPERIENCE, [saved, ...list]);
    }
    return saved;
  },
  deleteExperience: (id: number): boolean => {
    const list = storageService.getExperience();
    setStored(
      STORAGE_KEYS.EXPERIENCE,
      list.filter((e) => e.id !== id)
    );
    return true;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    const list = getStored<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const updated = list.map((t) => {
      if (
        t.clientName.toLowerCase().includes('raj saroj') &&
        t.imageUrl.includes('images.unsplash.com')
      ) {
        return { ...t, imageUrl: '/Raj Saroj.jpeg' };
      }
      return t;
    });
    if (JSON.stringify(updated) !== JSON.stringify(list)) {
      setStored(STORAGE_KEYS.TESTIMONIALS, updated);
    }
    return updated;
  },
  saveTestimonial: (t: Omit<Testimonial, 'id'> & { id?: number }): Testimonial => {
    const list = storageService.getTestimonials();
    let saved: Testimonial;
    if (t.id) {
      saved = t as Testimonial;
      const updated = list.map((item) => (item.id === t.id ? saved : item));
      setStored(STORAGE_KEYS.TESTIMONIALS, updated);
    } else {
      const nextId = list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;
      saved = { ...(t as Testimonial), id: nextId, createdAt: new Date().toISOString().split('T')[0] };
      setStored(STORAGE_KEYS.TESTIMONIALS, [saved, ...list]);
    }
    return saved;
  },
  deleteTestimonial: (id: number): boolean => {
    const list = storageService.getTestimonials();
    setStored(
      STORAGE_KEYS.TESTIMONIALS,
      list.filter((item) => item.id !== id)
    );
    return true;
  },

  // Messages (Inquiries)
  getMessages: (): ContactMessage[] => getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, initialMessages),
  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
    const messages = storageService.getMessages();
    const nextId = messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
    const newMsg: ContactMessage = {
      ...msg,
      id: nextId,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    setStored(STORAGE_KEYS.MESSAGES, [newMsg, ...messages]);
    return newMsg;
  },
  updateMessageStatus: (id: number, status: ContactMessage['status']): boolean => {
    const messages = storageService.getMessages();
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    setStored(STORAGE_KEYS.MESSAGES, updated);
    return true;
  },
  deleteMessage: (id: number): boolean => {
    const messages = storageService.getMessages();
    setStored(
      STORAGE_KEYS.MESSAGES,
      messages.filter((m) => m.id !== id)
    );
    return true;
  },

  // Stats for Admin Dashboard
  getStats: () => {
    const projects = storageService.getProjects();
    const services = storageService.getServices();
    const messages = storageService.getMessages();
    const testimonials = storageService.getTestimonials();
    const newMessages = messages.filter((m) => m.status === 'NEW').length;

    return {
      projectsCount: projects.length,
      servicesCount: services.length,
      messagesCount: messages.length,
      testimonialsCount: testimonials.length,
      newMessagesCount: newMessages,
    };
  },

  // Reset database back to default seed
  resetDefaults: () => {
    setStored(STORAGE_KEYS.PROFILE, initialProfile);
    setStored(STORAGE_KEYS.PROJECTS, initialProjects);
    setStored(STORAGE_KEYS.SKILLS, initialSkills);
    setStored(STORAGE_KEYS.SERVICES, initialServices);
    setStored(STORAGE_KEYS.EXPERIENCE, initialExperience);
    setStored(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    setStored(STORAGE_KEYS.MESSAGES, initialMessages);
  },
};
