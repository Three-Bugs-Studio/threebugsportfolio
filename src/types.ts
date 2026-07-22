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
  liveUrl?: string;
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
  colorTag: {
    name: string;      // Color label name e.g. "Cyber Orange"
    hex: string;       // Primary HEX code e.g. "#FF6A00"
    badgeClass: string; // Tailwind badge classes
    glowClass: string;  // Tailwind border glow / shadow classes
    borderHex: string;
  };
  diagramRole: string; // Workflow node title e.g. "PROJECT SPEC & EXECUTION"
  nodeId: string;
  connectsTo?: string[]; // Connections in workflow diagram
}

export interface PricingPlan {
  id: string;
  phaseNumber: string;
  name: string;
  tagline: string;
  priceVnd: string;
  priceUsd: string;
  timeline: string;
  recommended?: boolean;
  phaseFocus: string;
  benefits: string[];
  milestones: {
    stage: string;
    percentage: string;
    description: string;
  }[];
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


