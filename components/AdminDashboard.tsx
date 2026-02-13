
import React, { useState } from 'react';
import { Project, NewsItem, SiteSettings } from '../types.ts';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, setProjects, news, setNews, settings, setSettings, onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'projects' | 'news'>('settings');

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: "새 프로젝트",
      category: "카테고리",
      date: "2024.00",
      image: "https://picsum.photos/800/600?random=" + Math.random(),
      description: "간략한 설명을 입력하세요."
    };
    setProjects([newProj, ...projects]);
  };

  const deleteNews = (id: string) => {
    setNews(news.filter(n => n.id !== id));
  };

  const addNews = () => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: "새 공지사항",
      date: new Date().toISOString().split('T')[0],
      content: "내용을 입력하세요.",
      isImportant: false
    };
    setNews([newItem, ...news]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold">ADMIN</span>
            <h1 className="text-xl font-bold">콘텐츠 관리 시스템</h1>
          </div>
          <button 
            onClick={onClose}
            className="text-sm font-bold text-gray-500 hover:text-red-500 flex items-center gap-2"
          >
            대시보드 나가기
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Nav */}
        <div className="w-64 flex-shrink-0 space-y-2">
          {[
            { id: 'settings', label: '사이트 기본 설정', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            { id: 'projects', label: '포트폴리오 관리', icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' },
            { id: 'news', label: '공지사항 관리', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white rounded-3xl p-8 shadow-sm">
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold mb-8">기본 정보 수정</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">회사명</label>
                  <input name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                  <input name="contactEmail" value={settings.contactEmail} onChange={handleSettingChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">메인 히어로 타이틀</label>
                <textarea name="heroTitle" rows={2} value={settings.heroTitle} onChange={handleSettingChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">비전 설명</label>
                <textarea name="aboutVision" rows={4} value={settings.aboutVision} onChange={handleSettingChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all">설정 저장하기</button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">프로젝트 목록</h2>
                <button onClick={addProject} className="px-4 py-2 bg-purple-100 text-purple-600 font-bold rounded-lg hover:bg-purple-200 transition-all">+ 새 프로젝트</button>
              </div>
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id} className="flex items-center gap-6 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img src={p.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">{p.title}</h4>
                      <p className="text-sm text-gray-500">{p.category} | {p.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => deleteProject(p.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">공지사항 관리</h2>
                <button onClick={addNews} className="px-4 py-2 bg-purple-100 text-purple-600 font-bold rounded-lg hover:bg-purple-200 transition-all">+ 새 공지</button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs font-black border-b border-gray-100 uppercase tracking-widest">
                    <th className="pb-4 font-black">구분</th>
                    <th className="pb-4 font-black">제목</th>
                    <th className="pb-4 font-black">날짜</th>
                    <th className="pb-4 text-right font-black">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {news.map(n => (
                    <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${n.isImportant ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                          {n.isImportant ? 'IMPORTANT' : 'NORMAL'}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-gray-900">{n.title}</td>
                      <td className="py-4 text-sm text-gray-500">{n.date}</td>
                      <td className="py-4 text-right">
                        <button onClick={() => deleteNews(n.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-4 text-sm font-bold underline decoration-dotted">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
