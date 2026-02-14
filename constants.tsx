
import React from 'react';
import { Project, NewsItem, SiteSettings } from './types.ts';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "문화이음컴퍼니",
  heroTitle: "예술로 사람을 잇고,\n문화로 세상을 채우다",
  heroSubtitle: "문화이음컴퍼니는 감각적인 기획과 진정성 있는 접근으로 새로운 문화예술 경험을 창조합니다.",
  aboutVision: "우리는 예술의 가치가 일상에 스며들 때 사회가 더욱 풍요로워진다고 믿습니다. 전통과 현대를 잇고, 아티스트와 대중을 잇는 가교 역할을 충실히 수행합니다.",
  aboutHistory: "2018년 설립 이후, 매년 50회 이상의 문화 예술 프로그램을 기획 및 운영하며 지역 문화 활성화에 기여하고 있습니다.",
  contactEmail: "contact@munhwaieum.com",
  contactPhone: "02-123-4567",
  address: "서울특별시 강남구 테헤란로 123, 아트타워 8층",
  footerDescription: "문화예술의 가치를 발견하고, 이를 현대적인 감각으로 이어주는 기획 전문가 그룹입니다.",
  footerServices: "축제 기획, 전시 및 큐레이션, 공연 제작, 문화 컨설팅"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "2024 전통문화 페스티벌 '이음'",
    category: "축제 기획",
    date: "2024.10",
    image: "https://picsum.photos/800/600?random=1",
    description: "전통 예술의 현대적 재해석을 주제로 한 대규모 야외 축제"
  },
  {
    id: "2",
    title: "현대미술 작가 10인 초대전",
    category: "전시 기획",
    date: "2024.08",
    image: "https://picsum.photos/800/600?random=2",
    description: "차세대 미디어 아티스트들의 협업 전시회"
  },
  {
    id: "3",
    title: "찾아가는 문화나눔 '예술배달'",
    category: "공공 예술",
    date: "2024.06",
    image: "https://picsum.photos/800/600?random=3",
    description: "문화 소외 계층을 위한 릴레이 음악 공연 프로젝트"
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "2025 상반기 문화예술 프로그램 기획안 공모",
    date: "2024.12.01",
    content: "창의적인 예술 기획자들의 많은 참여를 기다립니다.",
    isImportant: true
  },
  {
    id: "2",
    title: "문화이음컴퍼니 공식 홈페이지 리뉴얼 안내",
    date: "2024.11.20",
    content: "더욱 편리해진 인터페이스로 소통하겠습니다.",
    isImportant: false
  }
];
