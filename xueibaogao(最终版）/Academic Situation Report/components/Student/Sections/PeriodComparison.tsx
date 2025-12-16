/**
 * 周期对比组件
 * 显示本周与上周、本月与上月的各项指标对比
 */
import React, { useState } from 'react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';

/**
 * Mini Sparkline SVG for Cards - 卡片背景的动态微折线图
 */
const CardSparkline: React.FC<{ color?: string }> = ({ color = "#E5E7EB" }) => (
  <svg className="absolute bottom-0 left-0 w-full h-12 opacity-30 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
    <path d="M0,40 L0,30 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,5 90,10 C95,12 100,0 100,0 L100,40 Z" fill={color} />
  </svg>
);

interface PeriodMetric {
  label: string;
  value: string | number;
  unit?: string;
  change: number;
  prevValue: string | number;
  diff: number;
  reverseColor?: boolean;
}

interface PeriodData {
  week: PeriodMetric[];
  month: PeriodMetric[];
}

interface PeriodComparisonProps {
  periodData: PeriodData;
}

export const PeriodComparison: React.FC<PeriodComparisonProps> = ({ periodData }) => {
  const [periodType, setPeriodType] = useState<'week' | 'month'>('week');
  const currentData = periodData[periodType];

  return (
    <PageContainer className="mt-8">
        <ScrollReveal className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black font-serif">周期对比</h2>
            <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">累积数据</span>
          </div>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-6">期间比较</p>

        {/* 周期切换按钮 */}
        <div className="bg-gray-100 p-1 rounded-full flex mb-6 w-fit mx-auto">
          <button 
            onClick={() => setPeriodType('week')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              periodType === 'week' 
                ? 'glass-card shadow-sm text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            本周与上周
          </button>
          <button 
            onClick={() => setPeriodType('month')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              periodType === 'month' 
                ? 'glass-card shadow-sm text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            本月与上月
          </button>
        </div>

        {/* 指标卡片网格 */}
        <div className="grid grid-cols-2 gap-3">
          {currentData.map((item, idx) => {
            // 判断变化方向（考虑reverseColor）
            const isPositive = item.reverseColor ? item.change < 0 : item.change > 0;
            const diffIsPositive = item.reverseColor ? item.diff < 0 : item.diff > 0;

            return (
              <ScrollReveal 
                key={idx} 
                delay={idx * 50} 
                className="glass-card glass-card-hover p-4 rounded-[1.25rem] border border-white/50 shadow-sm flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Cartoon Sparkline Background - 根据涨跌改变颜色 */}
                <CardSparkline color={isPositive ? "#eff6ff" : "#fef2f2"} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-gray-400">{item.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isPositive 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-500'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-2xl font-black font-serif text-gray-900">{item.value}</span>
                    {item.unit && (
                      <span className="text-[10px] text-gray-400 ml-1 font-bold">{item.unit}</span>
                    )}
                  </div>
                  
                  <div className="pt-2 border-t border-gray-50 flex justify-between items-center text-[9px] font-bold text-gray-400">
                    <span>上期: {item.prevValue}</span>
                    <span className={diffIsPositive ? 'text-green-600' : 'text-gray-400'}>
                      {item.diff > 0 ? '+' : ''}{item.diff}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollReveal>
    </PageContainer>
  );
};

