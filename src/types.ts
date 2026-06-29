export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  shortStory: string;
  technologies: string[];
  timeline: string;
  outcome: string;
  coverImage: string; // Dynamic graphic representation or visual motif
  metrics?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface Value {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
  description: string;
  level: string; // e.g. "Primary" or "Core"
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

