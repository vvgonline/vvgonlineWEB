export interface ServiceItem {
  id: string;
  number: string; // "01.", "02."
  title: string;
  description: string;
  highlighted: boolean;
}

export interface WorkflowNode {
  hex: string; // "0x01: TRIGGER"
  title: string;
  description: string;
}

export type BlogTag = 'Technology' | 'Business' | 'Analytics' | 'Marketing' | 'E-commerce';

export interface BlogPost {
  slug: string;
  title: string;
  tag: BlogTag;
  readTime: string; // "15 MIN READ"
  date: string; // ISO
  excerpt: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface SiteConfig {
  heroText: string;
  tagline: string;
  social: {
    linkedin: string;
    github: string;
    youtube: string;
  };
  navItems: NavItem[];
}
