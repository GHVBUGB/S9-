/**
 * 欢迎屏幕组件
 * 显示学生报告的欢迎界面，包含吉祥物和欢迎语
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { MascotAvatar } from './MascotAvatar';
import { t } from '../../config/locales';

interface WelcomeScreenProps {
  studentName?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ studentName = 'Alex' }) => {
  return (
    <section className="h-screen w-full flex flex-col justify-between relative overflow-hidden snap-start shrink-0 pt-12 pb-6">
      {/* 移除了独立的背景色和装饰渐变，使用全局统一的蓝黄渐变背景 */}

      <div className="relative z-20 flex flex-col items-center px-8 text-center shrink-0">
        <div className="mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 relative">
          <div className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-2xl rounded-bl-none shadow-xl transform -rotate-2 origin-bottom-left hover:rotate-0 transition-transform cursor-default">
            <p className="text-sm font-bold tracking-wide">
              Hi {studentName}！👋 <br/><span className="text-gray-300 font-normal text-xs">你的专属报告已送达</span>
            </p>
          </div>
          <div className="absolute -bottom-2 left-0 w-4 h-4 bg-[#1a1a1a] transform skew-x-12"></div>
        </div>

        <h1 className="text-4xl font-black font-serif text-gray-900 mb-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          S9 进阶阅读
        </h1>
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <div className="h-[1px] w-8 bg-gray-300"></div>
          <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-[10px]">
            让进步看得见
          </p>
          <div className="h-[1px] w-8 bg-gray-300"></div>
        </div>
      </div>

      <div className="flex-1 w-full relative z-10 flex items-end justify-center -mb-8 overflow-visible">
        <div className="w-full h-full max-h-[70vh] flex items-end justify-center animate-in zoom-in-95 duration-1000 ease-out">
          <MascotAvatar className="w-[150%] h-[150%] max-w-[700px] transform translate-y-8" />
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 animate-bounce flex flex-col items-center gap-2 opacity-60 mix-blend-multiply pointer-events-none">
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full">下滑查看详情</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
    </section>
  );
};

