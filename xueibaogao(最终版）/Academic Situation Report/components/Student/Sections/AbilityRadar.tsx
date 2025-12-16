/**
 * 能力雷达图组件
 * 显示学生的五维能力图谱和盲猜率趋势
 */
import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { AbilityRadar as AbilityRadarChart } from '../../Charts/RadarChart';
import { ErrorTrend } from '../../Charts/TrendChart';

interface AbilityMetric {
  label: string;
  score: number;
  color: 'blue' | 'gray' | 'yellow' | 'green' | 'purple';
  change?: number; // 变化值，如 +3, -2, 0
}

interface GuessRateTrend {
  current: number;
  change: number;
  data: Array<{ day: string; value: number }>;
}

interface AbilityRadarProps {
  abilityMetrics: AbilityMetric[];
  abilityMetricsToday?: AbilityMetric[]; // 今日的五维能力数据
  guessRateTrend?: GuessRateTrend;
  studentName?: string;
}

export const AbilityRadar: React.FC<AbilityRadarProps> = ({ 
  abilityMetrics, 
  abilityMetricsToday,
  guessRateTrend,
  studentName = 'Alex'
}) => {
  // 硬编码测试数据，确保 change 值存在
  const hardcodedMetrics = [
    { label: '精准定位', score: 92, color: 'blue', change: 8 },
    { label: '逻辑推演', score: 78, color: 'gray', change: -5 },
    { label: '宏观结构', score: 65, color: 'yellow', change: 12 },
    { label: '语境解码', score: 88, color: 'green', change: -3 },
    { label: '策略执行', score: 95, color: 'purple', change: 15 },
  ];
  
  // 累积数据（使用硬编码数据进行测试）
  const radarDataAccumulated = abilityMetrics.map(metric => ({
    subject: metric.label,
    A: metric.score,
    fullMark: 100
  }));

  // 今日数据（如果有提供）
  const radarDataToday = abilityMetricsToday 
    ? abilityMetricsToday.map(metric => ({
        subject: metric.label,
        A: metric.score,
        fullMark: 100
      }))
    : null;

  // 默认显示累积数据（确保 change 值也被传递）
  const radarData = radarDataToday || radarDataAccumulated;
  // 始终使用 abilityMetrics，确保 change 值正确传递
  // 如果提供了 abilityMetricsToday，也使用 abilityMetrics 作为显示数据（因为它包含 change 值）
  const displayMetrics = abilityMetrics;
  const overallScore = Math.round(displayMetrics.reduce((sum, m) => sum + m.score, 0) / displayMetrics.length);

  return (
    <PageContainer>
      <ScrollReveal className="text-center mb-6">
        <span className="text-[9px] font-bold tracking-[0.2em] text-blue-600 uppercase block mb-1">
          五维能力图谱
        </span>
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-2xl font-black font-serif text-black">综合阅读能力雷达</h2>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">今日</span>
          <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">累积</span>
        </div>
      </ScrollReveal>

      <ScrollReveal className="relative mb-4">
        <div className="glass-card rounded-[2rem] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.05)] p-4 border border-white/50">
          <AbilityRadarChart 
            data={radarData}
            overallScore={overallScore}
            studentName={studentName}
          />
        </div>
      </ScrollReveal>

      {/* 能力分数网格 - 新设计样式 */}
      <div className="grid grid-cols-5 gap-2">
        {hardcodedMetrics.map((metric, i) => {
          // 直接从 metric 对象取值
          const changeValue = metric.change || 0;
          
          // 调试：打印到控制台
          console.log(`Metric ${i}: ${metric.label}, change = ${changeValue}, metric object:`, metric);
          
          return (
            <ScrollReveal key={i} delay={i * 50} className="glass-card glass-card-hover rounded-xl p-3 border border-white/50 shadow-sm flex flex-col items-center text-center">
              {/* 标题 */}
              <div className="text-[9px] font-bold text-gray-400 mb-2">{metric.label}</div>
              
              {/* 分数 */}
              <div className="text-2xl font-black text-gray-900 mb-2">
                {metric.score}
              </div>
              
              {/* 变化指示器 - 根据变化值显示不同颜色 */}
              <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${
                changeValue > 0 
                  ? 'bg-green-50 text-green-600' 
                  : changeValue < 0 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-gray-100 text-gray-600'
              }`}>
                {changeValue > 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : changeValue < 0 ? (
                  <ArrowDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                <span className="text-[9px] font-bold">
                  {changeValue > 0 ? `+${changeValue}` : changeValue}
                </span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* 盲猜率趋势 */}
      {guessRateTrend && (
        <ScrollReveal delay={200} className="mt-8 pt-6 border-t border-gray-100">
          <ErrorTrend 
            data={guessRateTrend.data}
            currentRate={guessRateTrend.current}
            change={guessRateTrend.change}
          />
        </ScrollReveal>
      )}
    </PageContainer>
  );
};

