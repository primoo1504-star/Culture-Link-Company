
import React from 'react';
import { SiteSettings } from '../types.ts';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{settings.companyName}</h3>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              문화예술의 가치를 발견하고, 이를 현대적인 감각으로 이어주는 기획 전문가 그룹입니다.
            </p>
            <div className="flex space-x-4">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {social[0]}
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>{settings.contactEmail}</li>
              <li>{settings.contactPhone}</li>
              <li>{settings.address}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Service</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>축제 기획</li>
              <li>전시 및 큐레이션</li>
              <li>공연 제작</li>
              <li>문화 컨설팅</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2024 {settings.companyName}. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-purple-600">개인정보처리방침</a>
            <a href="#" className="hover:text-purple-600">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
