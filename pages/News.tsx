
import React from 'react';
import { NewsItem } from '../types';

interface NewsProps {
  news: NewsItem[];
}

const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">새소식 & 공지사항</h1>
          <p className="text-gray-500">문황이음컴퍼니의 다양한 소식을 전해드립니다.</p>
        </div>

        <div className="space-y-6">
          {news.sort((a, b) => (a.isImportant ? -1 : 1)).map((item) => (
            <div 
              key={item.id} 
              className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group ${
                item.isImportant ? 'ring-2 ring-purple-100' : ''
              }`}
            >
              {item.isImportant && (
                <div className="absolute top-0 right-0">
                  <div className="bg-purple-600 text-white text-[10px] font-black px-4 py-1 transform translate-x-[15px] translate-y-[5px] rotate-45">
                    IMPORTANT
                  </div>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <span className="text-purple-600 text-sm font-bold">{item.date}</span>
                {item.isImportant && <span className="text-xs font-bold text-purple-500 bg-purple-50 px-3 py-1 rounded-full md:hidden">중요</span>}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
              
              <button className="mt-6 text-sm font-bold text-gray-400 group-hover:text-purple-600 flex items-center gap-2">
                더보기
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
