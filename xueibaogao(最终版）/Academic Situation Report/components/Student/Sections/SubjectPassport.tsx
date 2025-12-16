/**
 * 主题护照组件
 * 显示当前学习的主题信息：文章标题、单元进度、主题、体裁等
 */
import React from 'react';
import { MapPin } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { BookCoverIllustration } from './BookCoverIllustration';

interface SubjectPassportProps {
  subjectPassport: {
    coverImage?: string;
    articleTitle: string;
    unitProgress: string;
    unitTotal: number;
    theme: string;
    genre: string;
  };
}

export const SubjectPassport: React.FC<SubjectPassportProps> = ({ subjectPassport }) => {
  const currentUnit = parseInt(subjectPassport.unitProgress.split('/')[0]);
  const totalUnits = subjectPassport.unitTotal;

  return (
    <PageContainer>
      <ScrollReveal className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-black font-serif tracking-tight">主题护照</h2>
          <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">学习记录</span>
        </div>
        <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md shadow-blue-100">
          {currentUnit}单元
        </div>
      </ScrollReveal>

      <ScrollReveal className="relative group">
        <div className="relative glass-card glass-card-hover rounded-[2rem] p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden">
          <div className="relative z-10 flex flex-col">
            {/* 封面图片 - 使用绘本风格插画 */}
            <div className="w-full aspect-[16/9] rounded-2xl mb-5 shadow-lg overflow-hidden relative group-hover:shadow-xl transition-shadow">
              {/* 优先使用 SVG 插画，如果有 coverImage 则作为背景 */}
              {subjectPassport.coverImage ? (
                <img 
                  src={subjectPassport.coverImage} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  alt="Cover" 
                  onError={(e) => {
                    // 图片加载失败时显示 SVG 插画
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                  <BookCoverIllustration />
                </div>
              )}
              
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-white drop-shadow" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white drop-shadow">阅读坐标</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-black font-serif text-gray-900 mb-0.5">
                {subjectPassport.articleTitle}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-6">
                {subjectPassport.unitProgress}：{subjectPassport.theme}
              </p>

              {/* 单元进度条 */}
              <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">单元进度</span>
                  <span className="text-sm font-black text-gray-900 font-serif">
                    {currentUnit}
                    <span className="text-gray-300 text-xs font-sans">/{totalUnits}</span>
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalUnits }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 flex-1 rounded-full ${
                        index < currentUnit ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 体裁和主题 */}
              <div className="flex w-full divide-x divide-gray-100 border-t border-gray-100 pt-4">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">体裁</span>
                  <span className="text-sm font-bold text-gray-900">{subjectPassport.genre}</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">主题</span>
                  <span className="text-sm font-bold text-gray-900">{subjectPassport.theme}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </PageContainer>
  );
};

