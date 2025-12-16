/**
 * 技能卡收集组件
 * 显示学生已解锁和未解锁的技能卡，支持点击查看详情
 */
import React, { useState } from 'react';
import { Target, Brain, Zap, Layout, Lock } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { SkillCardModal } from '../Modals/SkillCardModal';

interface SkillCard {
  title: string;
  level: string;
  progress: number;
  total: number;
  status: 'active' | 'locked';
  desc: string;
  fullDesc?: string;
  questionTypes?: string[];
  tips?: string;
  stats?: {
    level: number;
    exp: number;
    usage: number;
  };
  unlockCondition?: string;
  icon?: React.ReactNode;
}

interface SkillCardsProps {
  skillCards: SkillCard[];
}

/**
 * 根据卡片标题匹配可爱背景图
 */
const getCardBackgroundImage = (title: string, status: string) => {
  if (status !== 'active') return '';
  
  // GPS定位卡 - 机器人+卫星主题
  if (title?.includes('GPS') || title?.includes('定位')) {
    return '/GPS定位卡可爱卡通背景.png';
  }
  // 逻辑推理卡 - 猫头鹰+拼图主题
  if (title?.includes('逻辑') || title?.includes('推演')) {
    return '/逻辑推演卡可爱卡通背景.png';
  }
  // 速读闪电卡 - 超级英雄主题
  if (title?.includes('闪电') || title?.includes('速读')) {
    return '/速读闪电卡可爱卡通背景.png';
  }
  // 结构透视卡 - 工程师主题
  if (title?.includes('结构') || title?.includes('透视')) {
    return '/结构透视卡可爱卡通背景.png';
  }
  // 默认使用GPS背景
  return '/GPS定位卡可爱卡通背景.png';
};

/**
 * 根据技能卡标题动态生成图标
 */
const getSkillCardIcon = (title: string) => {
  if (title?.includes('GPS') || title?.includes('定位')) {
    return <Target className="w-5 h-5" />;
  }
  if (title?.includes('逻辑') || title?.includes('推演')) {
    return <Brain className="w-5 h-5" />;
  }
  if (title?.includes('速读') || title?.includes('闪电')) {
    return <Zap className="w-5 h-5" />;
  }
  if (title?.includes('结构') || title?.includes('透视')) {
    return <Layout className="w-5 h-5" />;
  }
  return <Target className="w-5 h-5" />;
};

export const SkillCards: React.FC<SkillCardsProps> = ({ skillCards }) => {
  const [selectedSkillCard, setSelectedSkillCard] = useState<SkillCard | null>(null);
  const activeCount = skillCards.filter(card => card.status === 'active').length;
  const totalCount = skillCards.length;

  return (
    <>
      <PageContainer>
        <ScrollReveal className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black font-serif">技能卡收集</h2>
            <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">学习记录</span>
          </div>
          <div className="text-[10px] font-bold text-gray-400">
            {activeCount}/{totalCount} 已解锁
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3">
          {skillCards.map((card, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 100} 
              className={`
                rounded-[1.25rem] p-4 flex flex-col justify-between aspect-square relative overflow-hidden border transition-all cursor-pointer active:scale-95
                ${card.status === 'active' 
                  ? 'bg-white border-blue-100 shadow-md shadow-blue-50' 
                  : 'bg-gray-50/50 border-gray-100 text-gray-400'
                }
              `}
            >
              {/* 可爱背景图 - 根据卡片类型显示不同主题装饰 */}
              {card.status === 'active' && (
                <div 
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${getCardBackgroundImage(card.title, card.status)})` }}
                ></div>
              )}
              
              <div className="absolute inset-0 z-10" onClick={() => setSelectedSkillCard(card)}></div>
              
              <div className="flex justify-between items-start mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  card.status === 'active' 
                    ? 'bg-blue-50 border-blue-100 text-blue-600' 
                    : 'bg-gray-100 border-gray-200 text-gray-300'
                }`}>
                  {card.icon || getSkillCardIcon(card.title)}
                </div>
                {card.status === 'active' ? (
                  <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded tracking-wider">
                    {card.level}
                  </span>
                ) : (
                  <Lock className="w-3 h-3 text-gray-300" />
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className={`text-sm font-black font-serif leading-tight mb-1 ${
                  card.status === 'active' ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {card.title}
                </h3>
                <p className="text-[9px] font-bold text-gray-400">{card.desc}</p>
              </div>

              {card.status === 'active' && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(card.progress / card.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-[8px] font-bold text-gray-400 mt-1 text-right">
                    {card.progress}/{card.total}
                  </div>
                </div>
              )}
              
              {card.status === 'locked' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-[9px] font-bold bg-white px-2 py-1 rounded shadow-sm text-gray-500">点击查看</span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>

      {selectedSkillCard && (
        <SkillCardModal 
          card={selectedSkillCard} 
          onClose={() => setSelectedSkillCard(null)} 
        />
      )}
    </>
  );
};

