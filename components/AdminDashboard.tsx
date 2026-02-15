
import React, { useState, useRef } from 'react';
import { Project, NewsItem, SiteSettings } from '../types.ts';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../constants.tsx';

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
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  /**
   * [프로젝트 관리]
   */
  const deleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (editingProject?.id === id) setEditingProject(null);
    }
  };

  const editProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingProject({ ...project });
  };

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: "새 프로젝트",
      category: "카테고리",
      date: new Date().toISOString().split('T')[0].slice(0, 7).replace('-', '.'),
      image: DEFAULT_PLACEHOLDER_IMAGE, // 랜덤 이미지 대신 기본 플레이스홀더 사용
      description: ""
    };
    setProjects(prev => [newProj, ...prev]);
    setEditingProject(newProj);
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
    setEditingProject(null);
    alert('저장되었습니다.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject({ ...editingProject, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * [공지사항 관리]
   */
  const handleEditNewsStart = (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation();
    setEditingNews({ ...item });
  };

  const deleteNews = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('이 공지사항을 삭제하시겠습니까?')) {
      setNews(prev => prev.filter(n => n.id !== id));
      if (editingNews?.id === id) setEditingNews(null);
    }
  };

  const startAddNews = () => {
    const newItem: NewsItem = {
      id: "new-" + Date.now().toString(),
      title: "",
      date: new Date().toISOString().split('T')[0],
      content: "",
      isImportant: false
    };
    setEditingNews(newItem);
  };

  const handleNewsSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    if (editingNews.id.startsWith('new-')) {
      const finalItem = { ...editingNews, id: Date.now().toString() };
      setNews(prev => [finalItem, ...prev]);
    } else {
      setNews(prev => prev.map(n => n.id === editingNews.id ? editingNews : n));
    }
    setEditingNews(null);
    alert('저장되었습니다.');
  };

  const handleNewsFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingNews) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingNews({ ...editingNews, [name]: checked });
    } else if (name === 'isImportant') {
      setEditingNews({ ...editingNews, isImportant: value === 'true' });
    } else {
      setEditingNews({ ...editingNews, [name]: value });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold tracking-tighter">ADMIN</span>
            <h1 className="text-xl font-bold tracking-tight">콘텐츠 관리 시스템</h1>
          </div>
          <button 
            onClick={onClose}
            className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 transition-colors"
          >
            대시보드 나가기
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {[
            { id: 'settings', label: '사이트 기본 설정', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            { id: 'projects', label: '포트폴리오 관리', icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' },
            { id: 'news', label: '공지사항 관리', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingProject(null);
                setEditingNews(null);
              }}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-purple-600 text-white shadow-xl shadow-purple-200' : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm min-h-[600px]">
          {activeTab === 'settings' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 pb-12">
              <section>
                <h2 className="text-3xl font-black tracking-tight mb-8">사이트 및 사업자 정보</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">회사명</label>
                    <input name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">대표자명</label>
                    <input name="ceoName" value={settings.ceoName} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">사업자 등록 번호</label>
                    <input name="businessNumber" value={settings.businessNumber} onChange={handleSettingChange} placeholder="000-00-00000" className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-black tracking-tight mb-8">연락처 및 주소</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">이메일</label>
                    <input name="contactEmail" value={settings.contactEmail} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">연락처</label>
                    <input name="contactPhone" value={settings.contactPhone} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">주소</label>
                    <input name="address" value={settings.address} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-black tracking-tight mb-8">푸터 설정 및 SNS 링크</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">푸터 회사 소개 (한 줄 설명)</label>
                    <textarea name="footerDescription" value={settings.footerDescription} onChange={handleSettingChange} rows={3} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold resize-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Instagram URL</label>
                      <input name="snsInstagram" value={settings.snsInstagram} onChange={handleSettingChange} placeholder="https://instagram.com/..." className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Youtube URL</label>
                      <input name="snsYoutube" value={settings.snsYoutube} onChange={handleSettingChange} placeholder="https://youtube.com/..." className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Facebook URL</label>
                      <input name="snsFacebook" value={settings.snsFacebook} onChange={handleSettingChange} placeholder="https://facebook.com/..." className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-black tracking-tight mb-8">서비스 항목 관리 (푸터 표시)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">서비스 1</label>
                    <input name="service1" value={settings.service1} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">서비스 2</label>
                    <input name="service2" value={settings.service2} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">서비스 3</label>
                    <input name="service3" value={settings.service3} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">서비스 4</label>
                    <input name="service4" value={settings.service4} onChange={handleSettingChange} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                  </div>
                </div>
              </section>
              
              <div className="pt-10 border-t border-gray-100 flex justify-end sticky bottom-0 bg-white/80 backdrop-blur-md py-4">
                <button onClick={() => alert('모든 설정이 성공적으로 저장되었습니다.')} className="px-10 py-5 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 transform active:scale-95">
                  설정 저장하기
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              {!editingProject ? (
                <>
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black tracking-tight">프로젝트 목록</h2>
                    <button onClick={addProject} className="px-6 py-3 bg-purple-50 text-purple-600 font-black rounded-xl hover:bg-purple-100 transition-all">+ 새 프로젝트 추가</button>
                  </div>
                  <div className="space-y-4">
                    {projects.length === 0 ? (
                      <div className="text-center py-24 text-gray-400 font-bold border-2 border-dashed border-gray-100 rounded-3xl">등록된 프로젝트가 없습니다.</div>
                    ) : (
                      projects.map(p => (
                        <div key={p.id} className="flex items-center gap-6 p-5 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all group relative">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <img src={p.image || DEFAULT_PLACEHOLDER_IMAGE} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-black text-lg text-gray-900 leading-tight mb-1">{p.title}</h4>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{p.category} | {p.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              type="button" 
                              onClick={(e) => editProject(e, p)} 
                              className="p-4 text-gray-400 hover:text-purple-600 transition-all bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200" 
                              title="수정"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              type="button" 
                              onClick={(e) => deleteProject(e, p.id)} 
                              className="p-4 text-gray-400 hover:text-red-600 transition-all bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-red-200" 
                              title="삭제"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-4 mb-10">
                    <button type="button" onClick={() => setEditingProject(null)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                      <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-3xl font-black tracking-tight">프로젝트 정보 수정</h2>
                  </div>
                  <form onSubmit={handleUpdateProject} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">프로젝트 제목</label>
                          <input name="title" value={editingProject.title} onChange={(e) => setEditingProject({...editingProject, title: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" required />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">카테고리</label>
                          <input name="category" value={editingProject.category} onChange={(e) => setEditingProject({...editingProject, category: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" required />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">일자 (예: 2024.10)</label>
                          <input name="date" value={editingProject.date} onChange={(e) => setEditingProject({...editingProject, date: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">메인 이미지</label>
                          <div className="flex gap-3 mb-4">
                            <input name="image" value={editingProject.image} onChange={(e) => setEditingProject({...editingProject, image: e.target.value})} className="flex-grow px-5 py-3 text-sm bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-medium" />
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-purple-600 text-white text-sm font-black rounded-xl hover:bg-purple-700 transition-all shadow-lg whitespace-nowrap">파일 업로드</button>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                          </div>
                          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                            {editingProject.image ? (
                              <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-300 font-bold">미리보기 이미지가 없습니다</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">상세 설명</label>
                      <textarea name="description" rows={5} value={editingProject.description} onChange={(e) => setEditingProject({...editingProject, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold resize-none" placeholder="설명을 입력하세요" />
                    </div>
                    <div className="flex justify-end gap-4 pt-6">
                      <button type="button" onClick={() => setEditingProject(null)} className="px-8 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all">취소하기</button>
                      <button type="submit" className="px-10 py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100">수정 내용 저장</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              {!editingNews ? (
                <>
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black tracking-tight">공지사항 관리</h2>
                    <button onClick={startAddNews} className="px-6 py-3 bg-purple-50 text-purple-600 font-black rounded-xl hover:bg-purple-100 transition-all">+ 새 공지사항 추가</button>
                  </div>
                  <div className="overflow-x-auto rounded-3xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                          <th className="px-6 py-5">구분</th>
                          <th className="px-6 py-5">제목</th>
                          <th className="px-6 py-5">게시일</th>
                          <th className="px-6 py-5 text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {news.map(n => (
                          <tr key={n.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={(e) => handleEditNewsStart(e as any, n)}>
                            <td className="px-6 py-5">
                              <span className={`text-[10px] font-black px-3 py-1 rounded-full ${n.isImportant ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {n.isImportant ? 'IMPORTANT' : 'NORMAL'}
                              </span>
                            </td>
                            <td className="px-6 py-5 font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{n.title}</td>
                            <td className="px-6 py-5 text-sm font-bold text-gray-400">{n.date}</td>
                            <td className="px-6 py-5 text-right">
                              <button 
                                type="button" 
                                onClick={(e) => deleteNews(e as any, n.id)} 
                                className="text-red-500 hover:text-red-700 transition-colors text-sm font-black underline decoration-dotted underline-offset-4"
                              >
                                삭제
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-4 mb-10">
                    <button type="button" onClick={() => setEditingNews(null)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                      <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-3xl font-black tracking-tight">{editingNews.id.startsWith('new-') ? '새 공지사항 작성' : '공지사항 수정'}</h2>
                  </div>

                  <form onSubmit={handleNewsSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">제목</label>
                          <input 
                            name="title" 
                            value={editingNews.title} 
                            onChange={handleNewsFieldChange} 
                            placeholder="공지사항 제목을 입력하세요"
                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">중요도 설정</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="isImportant" 
                                value="false" 
                                checked={!editingNews.isImportant} 
                                onChange={handleNewsFieldChange}
                                className="w-4 h-4 text-purple-600"
                              />
                              <span className="text-sm font-bold text-gray-600">일반 (NORMAL)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="isImportant" 
                                value="true" 
                                checked={editingNews.isImportant} 
                                onChange={handleNewsFieldChange}
                                className="w-4 h-4 text-purple-600"
                              />
                              <span className="text-sm font-bold text-purple-600">중요 (IMPORTANT)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">게시일</label>
                          <input 
                            type="date" 
                            name="date" 
                            value={editingNews.date} 
                            onChange={handleNewsFieldChange} 
                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold" 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">상세 내용</label>
                      <textarea 
                        name="content" 
                        rows={10} 
                        value={editingNews.content} 
                        onChange={handleNewsFieldChange} 
                        placeholder="공지사항의 상세 내용을 입력하세요"
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold resize-none" 
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-4 pt-6">
                      <button 
                        type="button" 
                        onClick={() => setEditingNews(null)} 
                        className="px-8 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all"
                      >
                        취소하기
                      </button>
                      <button 
                        type="submit" 
                        className="px-10 py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-100"
                      >
                        공지사항 저장
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
