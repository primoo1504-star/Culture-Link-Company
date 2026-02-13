
import React from 'react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-8">당신의 가치 있는<br/><span className="text-purple-600">아이디어</span>를 들려주세요</h1>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              프로젝트 의뢰, 제휴 제안 등 어떤 문의든 환영합니다.<br/>
              문황이음컴퍼니의 전문가들이 최적의 솔루션을 찾아드립니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-1">Email</h4>
                  <p className="text-lg font-bold text-gray-900">{settings.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-1">Office</h4>
                  <p className="text-lg font-bold text-gray-900">{settings.address}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-16 rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 text-sm font-bold mb-2">Google Map Placeholder</p>
                <button className="text-purple-600 text-xs font-black uppercase tracking-widest border-b-2 border-purple-600 pb-1">지도 확대보기</button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 md:p-16 rounded-[3rem]">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">성함 / 단체명</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500 bg-white transition-all outline-none" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500 bg-white transition-all outline-none" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">문의 유형</label>
                <select className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500 bg-white transition-all outline-none appearance-none">
                  <option>프로젝트 기획 의뢰</option>
                  <option>협업 제안</option>
                  <option>기타 문의</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
                <textarea rows={5} className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500 bg-white transition-all outline-none resize-none" placeholder="문의하실 내용을 입력해주세요."></textarea>
              </div>
              <button className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 mt-8">
                문의 제출하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
