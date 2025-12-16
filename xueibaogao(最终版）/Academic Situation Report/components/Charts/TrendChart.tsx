import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ErrorTrendProps {
  data?: Array<{ day: string; value: number }>;
  currentRate?: number;
  change?: number;
}

const defaultData = [
  { day: '周一', value: 42 },
  { day: '周二', value: 35 },
  { day: '周三', value: 28 },
  { day: '周四', value: 20 },
  { day: '周五', value: 15 },
  { day: '周六', value: 8 },
  { day: '周日', value: 5 },
];

export const ErrorTrend: React.FC<ErrorTrendProps> = ({ 
  data = defaultData, 
  currentRate = 5,
  change 
}) => {
  const chartData = data.map(item => ({ day: item.day, rate: item.value }));
  
  return (
    <div className="w-full h-48">
       <div className="flex justify-between items-end mb-4 px-2">
            <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">盲猜率趋势</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-0.5">理解真实提升</p>
            </div>
            <div className="text-right">
                <span className="text-2xl font-black font-serif text-gray-900">{currentRate}%</span>
                {change !== undefined && (
                  <span className={`text-[10px] font-bold block leading-none ${change < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                    {change < 0 ? '↓ 下降' : change > 0 ? '↑ 上升' : '持平'}
                  </span>
                )}
            </div>
       </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="4 4" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 9, fontWeight: 600 }}
            dy={10}
          />
          <Tooltip 
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
            itemStyle={{ color: '#111', fontSize: '12px', fontWeight: 'bold' }}
            formatter={(value: number) => [`${value}%`, '盲猜率']}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="rate" 
            stroke="#111827" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorRate)" 
            activeDot={{ r: 4, fill: '#111827', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};