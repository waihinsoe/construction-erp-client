export type Locale = "en" | "ja" | "my";
export type Localized = Record<Locale, string>;
export type Category =
  "residential" | "commercial" | "industrial" | "infrastructure" | "renovation";
export type ProjectStatus = "completed" | "inProgress" | "planned";
export interface Project {
  id: string;
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  category: Category;
  status: ProjectStatus;
  location: Localized;
  startDate: string;
  completionDate?: string;
  thumbnail: string;
  heroImage: string;
  cutoutImage?: string;
  gallery: string[];
  teamMemberIds: string[];
  featured: boolean;
  scope: Localized;
  challenges: Localized;
  solutions: Localized;
}
export interface TeamMember {
  id: string;
  slug: string;
  name: Localized;
  role: Localized;
  biography: Localized;
  expertise: Localized;
  portrait: string;
  socialLinks?: { label: string; url: string }[];
}
export interface CompanyMilestone {
  id: string;
  year: number;
  title: Localized;
  description: Localized;
  image: string;
}
export interface Service {
  id: string;
  slug: string;
  title: Localized;
  description: Localized;
  image: string;
  icon: "home" | "building" | "factory" | "ruler" | "compass";
}
export interface Testimonial {
  id: string;
  clientName: Localized;
  organization: Localized;
  quote: Localized;
  projectId?: string;
}
