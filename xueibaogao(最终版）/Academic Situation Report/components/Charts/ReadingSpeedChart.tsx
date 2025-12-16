import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ReadingSpeedChartProps {
  data: Array<{ day: string; value: number }>;
  currentSpeed: number;
  change: number;
}

export const ReadingSpeedChart: React.FC<ReadingSpeedChartProps> = ({ data, currentSpeed, change }) => {
  return (
    <div className="w-full h-48">
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">阅读速度趋势</h3>
          <p className="text-[10px] text-gray-400 font-bold mt-0.5">Words Per Minute</p>
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold px-2 py-1 rounded ${change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
          <defs>
            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
            formatter={(value: number) => [`${value} WPM`, '阅读速度']}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            fill="url(#colorSpeed)"
            fillOpacity={1}
            activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 px-2">
        <span className="text-sm font-black text-gray-900">当前速度 {currentSpeed} WPM</span>
        {change > 0 && <span className="text-[10px] text-green-500 font-bold ml-2">↑ 提升</span>}
      </div>
    </div>
  );
};

