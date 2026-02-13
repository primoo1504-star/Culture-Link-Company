
import React from 'react';
import { Project, SiteSettings } from '../types';

interface HomeProps {
  settings: SiteSettings;
  projects: Project[];
  setPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ settings, projects, setPage }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-white overflow-hidden">
        {/* Artistic Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Mesh Gradients */}
          <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-purple-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-drift opacity-70"></div>
          <div className="absolute top-1/2 -left-1/4 w-3/4 h-3/4 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-3xl animate-drift delay-1000 opacity-60"></div>
          
          {/* Abstract Connection Lines (SVG) */}
          <svg className="absolute top-0 right-0 w-full h-full text-purple-200/30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,200 Q250,100 500,400 T1000,200" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0,800 Q350,900 600,600 T1000,800" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M200,0 Q100,250 400,500 T200,1000" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Artistic Floating Elements */}
          <div className="absolute top-1/4 right-[15%] w-12 h-12 border-2 border-purple-400 rounded-full animate-float opacity-30"></div>
          <div className="absolute bottom-1/4 left-[10%] w-8 h-8 bg-purple-500 rounded-sm rotate-45 animate-float delay-700 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-4xl">
            <div className="reveal-up">
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                Art & Culture Planning Agency
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] mb-8 whitespace-pre-line reveal-up delay-1">
              {settings.heroTitle.split('예술').map((part, i) => 
                i === 1 ? <React.Fragment key={i}><span className="text-purple-600">예술</span>{part}</React.Fragment> : part
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl reveal-up delay-2 font-light">
              {settings.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 reveal-up delay-3">
              <button 
                onClick={() => setPage('portfolio')}
                className="group relative px-10 py-5 bg-purple-600 text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-purple-200"
              >
                <span className="relative z-10">포트폴리오 보기</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button 
                onClick={() => setPage('contact')}
                className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-full hover:border-purple-600 hover:text-purple-600 transition-all active:scale-95"
              >
                문의하기
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 reveal-up delay-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-purple-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-6">
            <div className="reveal-up">
              <h2 className="text-xs font-black text-purple-600 uppercase tracking-[0.3em] mb-4">Masterpieces</h2>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">최근 프로젝트</h3>
            </div>
            <button 
              onClick={() => setPage('portfolio')}
              className="text-gray-900 font-black hover:text-purple-600 transition-colors flex items-center gap-3 group text-sm uppercase tracking-widest"
            >
              See All Projects
              <span className="w-10 h-[2px] bg-gray-900 group-hover:bg-purple-600 group-hover:w-16 transition-all"></span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.slice(0, 3).map((project, idx) => (
              <div 
                key={project.id} 
                className={`group cursor-pointer reveal-up`} 
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/5] rounded-[2.5rem] mb-8 shadow-2xl shadow-gray-200 transition-all group-hover:-translate-y-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <p className="text-white/80 text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-100">{project.category}</p>
                    <h4 className="text-white text-2xl font-black transform translate-y-4 group-hover:translate-y-0 transition-transform delay-200">{project.title}</h4>
                  </div>
                </div>
                <div className="px-4">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3 block">{project.category}</span>
                  <h4 className="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Message Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 text-[20vw] font-black text-gray-50 select-none -translate-x-1/4 -translate-y-1/4 opacity-40">IDENTITY</div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <p className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.2] tracking-tighter mb-12">
            우리는 단순히 이벤트를 여는 것이 아니라,<br />
            <span className="relative">
              <span className="relative z-10 italic">기억될 만한 가치</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-purple-100 -z-0"></span>
            </span>를 디자인합니다.
          </p>
          <div className="w-16 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Quick Contact Us Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        {/* Dark theme background effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-white">
              <h2 className="text-xs font-black text-purple-400 uppercase tracking-[0.4em] mb-6">Let's Connect</h2>
              <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                함께 새로운 문화를<br />만들어볼까요?
              </h3>
              <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
                창의적인 아이디어를 현실로 바꾸고 싶다면 지금 바로 문의하세요. 
                문화이음컴퍼니가 당신의 비전을 예술로 잇겠습니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 text-purple-400 rounded-2xl flex items-center justify-center transition-all group-hover:bg-purple-600 group-hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Us</p>
                    <p className="text-xl font-bold group-hover:text-purple-400 transition-colors">{settings.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-3xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-bold" 
                      placeholder="성함"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Phone</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-bold" 
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-bold" 
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-bold resize-none" 
                    placeholder="문의하실 내용을 입력해주세요"
                  ></textarea>
                </div>
                <button 
                  className="w-full py-6 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 mt-4 active:scale-95 text-lg"
                >
                  프로젝트 문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
