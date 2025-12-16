/**
 * 模块分隔组件
 * 用于区分"今日战报"和"累计成长"两大模块
 */
import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  type?: 'today' | 'cumulative';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  title, 
  subtitle,
  type = 'today'
}) => {
  // 根据类型选择图标
  const Icon = type === 'today' ? BookOpen : TrendingUp;

  return (
    <PageContainer>
      <ScrollReveal className="pt-8 pb-4">
        <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-900">
          {/* 左侧图标 */}
          <div className="bg-[#1a1a1a] w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {/* 中间文字内容 */}
          <div className="flex-1 flex flex-col gap-0.5">
            <h2 className="text-xl font-black text-gray-900">{title}</h2>
            {subtitle && (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>
            )}
          </div>
          
          {/* 右侧装饰小三角 */}
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[6px] border-b-transparent"></div>
        </div>
      </ScrollReveal>
    </PageContainer>
  );
};
