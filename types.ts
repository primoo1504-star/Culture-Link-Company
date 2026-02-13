
export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  isImportant: boolean;
}

export interface SiteSettings {
  companyName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutVision: string;
  aboutHistory: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface AppState {
  projects: Project[];
  news: NewsItem[];
  settings: SiteSettings;
  isAdminMode: boolean;
}
