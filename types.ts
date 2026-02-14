
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
  ceoName: string;
  businessNumber: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutVision: string;
  aboutHistory: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  footerDescription: string;
  footerServices: string; // 기존 호환용
  snsInstagram: string;
  snsYoutube: string;
  snsFacebook: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
}

export interface AppState {
  projects: Project[];
  news: NewsItem[];
  settings: SiteSettings;
  isAdminMode: boolean;
}
