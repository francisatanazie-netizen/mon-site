
import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';

export interface NavProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
}
