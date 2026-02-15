
import React from 'react';
import { SiteSettings } from '../types.ts';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  // SNS 링크 데이터 구성 및 필터링 (입력된 것만 표시)
  const snsLinks = [
    { 
      id: 'instagram', 
      url: settings.snsInstagram, 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.335-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.725.079-2.898.35-3.93 1.381-1.03 1.031-1.302 2.204-1.381 3.93-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.079 1.726.35 2.899 1.381 3.93 1.031 1.031 2.204 1.302 3.93 1.381 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.726-.079 2.899-.35 3.93-1.381 1.031-1.031 1.302-2.204 1.381-3.93.058-1.28.072-1.688.072-4.947s.014-3.667.072-4.947c-.079-1.725-.35-2.898-1.381-3.93-1.031-1.03-2.204-1.302-3.93-1.381-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      id: 'youtube', 
      url: settings.snsYoutube, 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      id: 'facebook', 
      url: settings.snsFacebook, 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
  ].filter(link => link.url && link.url.trim() !== "");

  // 서비스 리스트 (설정값에서 가져오고 빈 값 제외)
  const servicesList = [
    settings.service1,
    settings.service2,
    settings.service3,
    settings.service4
  ].filter(s => s && s.trim() !== "");

  return (
    <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter">
              문화<span className="text-purple-600">이음</span>컴퍼니
            </h3>
            <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-medium text-base">
              {settings.footerDescription || "문화예술의 가치를 발견하고, 이를 현대적인 감각으로 이어주는 기획 전문가 그룹입니다."}
            </p>
            <div className="flex space-x-3">
              {snsLinks.map(sns => (
                <a 
                  key={sns.id} 
                  href={sns.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-white border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:shadow-xl transition-all rounded-2xl flex items-center justify-center"
                  aria-label={sns.id}
                >
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Connect</h4>
            <ul className="space-y-6 text-sm font-bold text-gray-600">
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-purple-400 uppercase tracking-widest">Email</span>
                <span className="text-gray-900">{settings.contactEmail}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-purple-400 uppercase tracking-widest">Phone</span>
                <span className="text-gray-900">{settings.contactPhone}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-purple-400 uppercase tracking-widest">Office</span>
                <span className="text-gray-900 leading-relaxed">{settings.address}</span>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Services</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-600">
              {servicesList.length > 0 ? (
                servicesList.map((service, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span className="group-hover:text-purple-600 transition-colors">{service}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-3">축제 기획</li>
                  <li className="flex items-center gap-3">전시 및 큐레이션</li>
                  <li className="flex items-center gap-3">공연 제작</li>
                  <li className="flex items-center gap-3">문화 컨설팅</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold text-gray-400">
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="tracking-wide">© {new Date().getFullYear()} {settings.companyName || "문화이음컴퍼니"}. All Rights Reserved.</p>
            <div className="flex items-center gap-3 text-gray-400/60 font-medium">
              <span>대표: {settings.ceoName || "홍길동"}</span>
              <span className="w-px h-2 bg-gray-200"></span>
              <span>사업자등록번호: {settings.businessNumber || "123-45-67890"}</span>
            </div>
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-purple-600 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="hover:text-purple-600 transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
