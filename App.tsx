
import React, { useState, useEffect } from 'react';
import { Project, NewsItem, SiteSettings } from './types.ts';
import { INITIAL_PROJECTS, INITIAL_NEWS, INITIAL_SETTINGS } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Portfolio from './pages/Portfolio.tsx';
import News from './pages/News.tsx';
import Contact from './pages/Contact.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // 초기 상태 로드 (localStorage 우선)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ieum_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('ieum_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });
  
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ieum_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // 데이터 변경 시 localStorage 동기화
  useEffect(() => {
    localStorage.setItem('ieum_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ieum_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('ieum_settings', JSON.stringify(settings));
  }, [settings]);

  // Simple "Router"
  const renderPage = () => {
    if (isAdminMode) return <AdminDashboard 
      projects={projects} 
      setProjects={setProjects}
      news={news} 
      setNews={setNews}
      settings={settings}
      setSettings={setSettings}
      onClose={() => setIsAdminMode(false)}
    />;

    switch (currentPage) {
      case 'home': return <Home settings={settings} projects={projects} setPage={setCurrentPage} />;
      case 'about': return <About settings={settings} />;
      case 'portfolio': return <Portfolio projects={projects} />;
      case 'news': return <News news={news} />;
      case 'contact': return <Contact settings={settings} />;
      default: return <Home settings={settings} projects={projects} setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-200 selection:text-purple-900">
      {!isAdminMode && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          onAdminClick={() => setIsAdminMode(true)}
        />
      )}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAdminMode && <Footer settings={settings} />}
      
      {/* Floating Admin Toggle for Demo Visibility */}
      {!isAdminMode && (
        <button 
          onClick={() => setIsAdminMode(true)}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all z-50 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">관리자</span>
        </button>
      )}
    </div>
  );
};

export default App;
