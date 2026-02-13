
import React, { useState } from 'react';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const [filter, setFilter] = useState('전체');
  const categories = ['전체', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === '전체' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">포트폴리오</h1>
          <p className="text-gray-500 text-lg">문황이음컴퍼니가 걸어온 창의적인 여정들을 확인해보세요.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group animate-in zoom-in-95 duration-500">
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl mb-6 aspect-square">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full text-xs font-black shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="px-4">
                <p className="text-gray-400 text-xs font-bold mb-2">{project.date}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
