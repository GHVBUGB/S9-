/**
 * 今日训练目标组件
 * 显示学生今日的训练目标：题型、完成数量、进度等
 */
import React from 'react';
import { Check } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';

interface TrainingGoal {
  type: string;
  count: number;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

interface TrainingGoalsProps {
  trainingGoals: TrainingGoal[];
}

/**
 * 获取题型的英文翻译
 */
const getTypeTranslation = (type: string) => {
  if (type?.includes('细节') || type?.includes('理解')) {
    return 'Deep Reading';
  }
  if (type?.includes('词义') || type?.includes('猜测')) {
    return 'Context Clues';
  }
  if (type?.includes('主旨') || type?.includes('大意')) {
    return 'Main Idea';
  }
  return 'Training Goal';
};

/**
 * 根据颜色获取卡片样式
 */
const getColorStyle = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        text: 'text-blue-600',
        textLight: 'text-blue-400',
        hover: 'hover:border-blue-200'
      };
    case 'purple':
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        text: 'text-purple-600',
        textLight: 'text-purple-400',
        hover: 'hover:border-purple-200'
      };
    case 'green':
      return {
        bg: 'bg-green-50',
        border: 'border-green-100',
        text: 'text-green-600',
        textLight: 'text-green-400',
        hover: 'hover:border-green-200'
      };
    case 'orange':
      return {
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        text: 'text-orange-600',
        textLight: 'text-orange-400',
        hover: 'hover:border-orange-200'
      };
    default:
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        text: 'text-blue-600',
        textLight: 'text-blue-400',
        hover: 'hover:border-blue-200'
      };
  }
};

export const TrainingGoals: React.FC<TrainingGoalsProps> = ({ trainingGoals }) => {
  if (!trainingGoals || trainingGoals.length === 0) {
    return null;
  }

  const allCompleted = true; // 假设所有目标都已完成

  return (
    <PageContainer>
      <ScrollReveal className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-black font-serif">今日训练目标</h2>
        {allCompleted && (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Check className="w-3 h-3" strokeWidth={3} /> 全部完成
          </div>
        )}
      </ScrollReveal>

      <div className="space-y-3">
        {trainingGoals.map((goal, idx) => {
          const colorStyle = getColorStyle(goal.color);
          const translation = getTypeTranslation(goal.type);
          return (
            <ScrollReveal 
              key={idx} 
              delay={(idx + 1) * 100}
              className={`glass-card glass-card-hover p-3 rounded-2xl border border-white/50 shadow-sm flex items-center gap-4 group`}
            >
              {/* 左侧彩色数字方块 */}
              <div className={`w-12 h-12 rounded-xl ${colorStyle.bg} flex flex-col items-center justify-center shrink-0 border ${colorStyle.border}`}>
                <span className={`text-xl font-black ${colorStyle.text} leading-none mb-0.5`}>{goal.count}</span>
                <span className={`text-[9px] font-bold ${colorStyle.textLight} uppercase`}>篇</span>
              </div>
              
              {/* 中间文字内容 */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm mb-0.5">{goal.type}</div>
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{translation}</div>
              </div>
              
              {/* 右侧完成图标 */}
              {allCompleted && (
                <div className="shrink-0 text-green-500 bg-green-50 rounded-full p-1">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
              )}
            </ScrollReveal>
          );
        })}
      </div>
      
      {allCompleted && (
        <div className="mt-2 text-center">
          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">All Goals Completed</span>
        </div>
      )}
    </PageContainer>
  );
};

