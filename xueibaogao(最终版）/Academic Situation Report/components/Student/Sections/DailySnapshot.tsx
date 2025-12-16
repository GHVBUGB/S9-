/**
 * 每日战报组件
 * 显示学生的每日学习数据：专注时长、阅读篇数、阅读字数
 */
import React from 'react';
import { Share2, ChevronDown } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { MascotAvatar } from '../MascotAvatar';

interface DailySnapshotProps {
  date: string;
  studentName: string;
  focusDuration: number;
  articlesCount: number;
  wordsRead: number;
}

export const DailySnapshot: React.FC<DailySnapshotProps> = ({
  date,
  studentName,
  focusDuration,
  articlesCount,
  wordsRead,
}) => {
  return (
    <PageContainer isCover className="justify-start pt-8 pb-4 relative overflow-hidden">
      {/* 移除装饰性渐变球，使用统一的全局渐变背景 */}
      
      <header className="flex justify-between items-start z-20 relative">
        <ScrollReveal delay={100}>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">每日战报 · 今日数据</span>
            <span className="font-serif font-bold text-lg text-black">{date}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <button className="glass-card p-2.5 rounded-full border border-white/50 shadow-sm active:scale-95 transition-transform">
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
        </ScrollReveal>
      </header>
      
      <div className="flex-1 flex flex-col justify-start relative z-10 mt-20">
        <ScrollReveal className="flex flex-col items-center mb-10">
          <div className="relative mb-6 mt-8">
            <div className="absolute -top-10 -right-20 z-20 animate-in fade-in zoom-in duration-500 delay-300">
              <div className="bg-[#1a1a1a] text-white px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative">
                <span className="text-[11px] font-bold whitespace-nowrap">恭喜{studentName}又完成了一节课程 🎉</span>
                <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-[#1a1a1a] transform rotate-45"></div>
              </div>
            </div>

            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center relative">
              <MascotAvatar className="w-[180%] h-[180%] -mt-2" />
            </div>
          </div>
          
          <div className="text-center mt-2">
            <h1 className="text-4xl font-black text-gray-900 font-serif tracking-tight mb-2">
              {studentName}
            </h1>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.25em] uppercase">
              S9 进阶阅读计划
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-3 mb-2">
          <ScrollReveal delay={300} className="glass-card glass-card-hover p-5 rounded-[1.25rem] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] border border-white/50 relative overflow-hidden flex items-center justify-between h-28">
            <div className="flex flex-col justify-between h-full py-1 relative z-10">
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider relative z-10">高能注意力</div>
              <div className="text-[9px] font-bold text-white bg-black/90 px-2.5 py-1 rounded-full w-fit">有效思考时间长</div>
            </div>
            <div className="relative z-10 text-right">
              <div className="text-5xl font-serif font-black leading-none mb-1 text-gray-900">
                {focusDuration}
                <span className="text-lg font-medium text-gray-400 ml-1 font-sans">分钟</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3">
            <ScrollReveal delay={400} className="glass-card glass-card-hover p-5 rounded-[1.25rem] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] border border-white/50 flex flex-col justify-between h-24">
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">今日攻克篇数</div>
              <div>
                <div className="text-2xl font-serif font-black text-gray-900 leading-none mb-1">{articlesCount}</div>
                <div className="text-[10px] font-bold text-gray-400">积少成多</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} className="glass-card glass-card-hover p-5 rounded-[1.25rem] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] border border-white/50 flex flex-col justify-between h-24">
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">读取字数</div>
              <div>
                <div className="text-2xl font-serif font-black text-gray-900 leading-none mb-1">{wordsRead}</div>
                <div className="text-[10px] font-bold text-blue-600">≈ 1/5 章《哈利波特》</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      <ScrollReveal delay={800} className="absolute bottom-4 left-0 right-0 flex justify-center opacity-30">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </ScrollReveal>
    </PageContainer>
  );
};

