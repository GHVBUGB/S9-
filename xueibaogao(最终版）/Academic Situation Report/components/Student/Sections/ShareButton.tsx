/**
 * 分享按钮组件
 * 显示分享海报按钮和系统标识
 */
import React from 'react';
import { Share2 } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';

interface ShareButtonProps {
  onShare?: () => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ onShare }) => {
  return (
    <PageContainer>
      <ScrollReveal className="w-full pb-8">
        <button 
          onClick={onShare}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-full shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Share2 className="w-4 h-4 relative z-10" />
          <span className="relative z-10 tracking-wide text-sm">分享海报</span>
        </button>
        <div className="text-center mt-6 text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">
          S9 智能学习系统
        </div>
      </ScrollReveal>
    </PageContainer>
  );
};

