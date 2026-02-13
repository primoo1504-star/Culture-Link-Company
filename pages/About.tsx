
import React from 'react';
import { SiteSettings } from '../types';

interface AboutProps {
  settings: SiteSettings;
}

const About: React.FC<AboutProps> = ({ settings }) => {
  return (
    <div className="animate-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-8">우리만의 예술적<br/><span className="text-purple-600">아이덴티티</span></h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {settings.aboutVision}
            </p>
            <div className="p-8 border-l-4 border-purple-600 bg-purple-50 rounded-r-2xl">
              <p className="text-lg text-purple-900 font-medium italic">
                "{settings.aboutHistory}"
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-[16px] border-gray-100 shadow-2xl">
              <img src="https://picsum.photos/800/800?random=10" alt="Identity" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600 rounded-3xl flex items-center justify-center p-8 text-white shadow-xl rotate-12">
              <div className="text-center">
                <span className="text-4xl font-bold block">150+</span>
                <span className="text-xs uppercase font-medium">Projects Done</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-24">
          {[
            { title: 'Connection', desc: '예술가와 대중을 잇는 가장 진실된 방법을 제안합니다.' },
            { title: 'Innovation', desc: '기존의 틀을 깨는 창의적인 기획으로 즐거움을 선사합니다.' },
            { title: 'Sustainability', desc: '일회성 행사를 넘어 지속 가능한 문화를 구축합니다.' }
          ].map((item, i) => (
            <div key={i} className="text-center p-8 hover:bg-white hover:shadow-xl hover:shadow-gray-200 transition-all rounded-3xl group">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors text-2xl font-black">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
