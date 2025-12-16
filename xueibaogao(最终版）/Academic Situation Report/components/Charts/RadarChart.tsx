import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { RadarData } from '../../types';

interface AbilityRadarProps {
  data?: RadarData[];
  overallScore?: number;
  studentName?: string;
}

const defaultData: RadarData[] = [
  { subject: '精准定位', A: 85, fullMark: 100 },
  { subject: '逻辑推演', A: 70, fullMark: 100 },
  { subject: '宏观结构', A: 60, fullMark: 100 },
  { subject: '语境解码', A: 90, fullMark: 100 },
  { subject: '策略执行', A: 75, fullMark: 100 },
];

export const AbilityRadar: React.FC<AbilityRadarProps> = ({ 
  data = defaultData, 
  overallScore,
  studentName = 'Alex' 
}) => {
  const calculatedScore = overallScore || Math.round(
    data.reduce((sum, item) => sum + item.A, 0) / data.length
  );

  // 确保数据不为空
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 relative flex items-center justify-center">
        <div className="text-gray-400">暂无数据</div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={studentName}
            dataKey="A"
            stroke="#2563eb"
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Center Score Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100">
           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none">综合分</span>
           <span className="text-2xl font-black font-serif text-blue-600 leading-none mt-0.5">{calculatedScore}</span>
        </div>
      </div>

      {/* New Cartoon Data Sticker: Growth Indicator */}
      <div className="absolute top-2 right-2 animate-bounce duration-[2000ms]">
        <div className="relative bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg rounded-bl-none shadow-lg transform rotate-3 flex items-center gap-1.5 border border-white/20">
          <div className="bg-green-500 rounded-full p-0.5">
            <TrendingUp className="w-3 h-3 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[8px] text-gray-400 font-bold uppercase">环比提升</span>
            <span className="text-[10px] font-black text-white">+12%</span>
          </div>
          {/* Little triangle tail (气泡尾巴) */}
          <div className="absolute -bottom-1.5 left-0 w-0 h-0 border-l-[6px] border-l-[#1a1a1a] border-b-[6px] border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
};