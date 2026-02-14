
import React from 'react';
import { SiteSettings } from '../types.ts';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  // SNS 링크가 있는 것들만 필터링
  const snsLinks = [
    { id: 'instagram', url: settings.snsInstagram, label: 'I' },
    { id: 'youtube', url: settings.snsYoutube, label: 'Y' },
    { id: 'facebook', url: settings.snsFacebook, label: 'F' },
  ].filter(link => link.url && link.url.trim() !== "");

  // 서비스 리스트 (설정값에서 가져옴)
  const servicesList = [
    settings.service1,
    settings.service2,
    settings.service3,
    settings.service4
  ].filter(s => s && s.trim() !== "");

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter">
              문화<span className="text-purple-600">이음</span>컴퍼니
            </h3>
            <p className="text-gray-500 max-w-md mb-8 leading-relaxed font-medium">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4">
              {snsLinks.map(sns => (
                <a 
                  key={sns.id} 
                  href={sns.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white border border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:shadow-lg transition-all rounded-xl flex items-center justify-center font-black text-sm"
                >
                  {sns.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Contact Information</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                {settings.contactEmail}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                {settings.contactPhone}
              </li>
              <li className="flex items-center gap-2 leading-relaxed">
                <span className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0"></span>
                {settings.address}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Our Expertise</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              {servicesList.length > 0 ? (
                servicesList.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))
              ) : (
                <>
                  <li>축제 기획</li>
                  <li>전시 및 큐레이션</li>
                  <li>공연 제작</li>
                  <li>문화 컨설팅</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-400">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.</p>
            <p className="text-gray-400/70 font-medium">
              대표: {settings.ceoName} | 사업자등록번호: {settings.businessNumber}
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-purple-600 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-purple-600 transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
