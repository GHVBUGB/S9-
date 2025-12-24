/**
 * 绘本封面插画组件
 * 用于主题护照的封面图片 - 苏珊和她的猫
 */
import React from 'react';

export const BookCoverIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 600 340" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* 背景 - 温馨的渐变 */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFF8DC', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#90EE90', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3CB371', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* 猫咪渐变 */}
        <linearGradient id="catGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFB366', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF9933', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* 天空背景 */}
      <rect width="600" height="340" fill="url(#skyGradient)" />
      
      {/* 云朵装饰 */}
      <g opacity="0.6">
        <ellipse cx="100" cy="50" rx="40" ry="25" fill="white" />
        <ellipse cx="130" cy="55" rx="35" ry="20" fill="white" />
        <ellipse cx="80" cy="55" rx="30" ry="18" fill="white" />
        
        <ellipse cx="450" cy="70" rx="45" ry="28" fill="white" />
        <ellipse cx="480" cy="75" rx="38" ry="22" fill="white" />
        <ellipse cx="420" cy="75" rx="32" ry="20" fill="white" />
      </g>
      
      {/* 太阳 */}
      <g>
        <circle cx="520" cy="60" r="35" fill="#FFD700" opacity="0.9" />
        <circle cx="520" cy="60" r="28" fill="#FFF8DC" />
      </g>
      
      {/* 草地 */}
      <ellipse cx="300" cy="380" rx="400" ry="120" fill="url(#grassGradient)" />
      
      {/* 小花装饰 */}
      <g>
        {/* 左侧小花 */}
        <circle cx="80" cy="280" r="6" fill="#FF69B4" />
        <circle cx="70" cy="275" r="5" fill="#FF69B4" />
        <circle cx="90" cy="275" r="5" fill="#FF69B4" />
        <circle cx="75" cy="287" r="5" fill="#FF69B4" />
        <circle cx="85" cy="287" r="5" fill="#FF69B4" />
        <circle cx="80" cy="280" r="3" fill="#FFD700" />
        
        {/* 右侧小花 */}
        <circle cx="520" cy="290" r="6" fill="#FF69B4" />
        <circle cx="510" cy="285" r="5" fill="#FF69B4" />
        <circle cx="530" cy="285" r="5" fill="#FF69B4" />
        <circle cx="515" cy="297" r="5" fill="#FF69B4" />
        <circle cx="525" cy="297" r="5" fill="#FF69B4" />
        <circle cx="520" cy="290" r="3" fill="#FFD700" />
      </g>
      
      {/* 可爱的橙色猫咪 */}
      <g transform="translate(280, 150)">
        {/* 猫身体 */}
        <ellipse cx="0" cy="40" rx="50" ry="55" fill="url(#catGradient)" />
        
        {/* 猫头 */}
        <circle cx="0" cy="0" r="45" fill="url(#catGradient)" />
        
        {/* 猫耳朵 */}
        <path d="M -30,-25 L -35,-50 L -15,-30 Z" fill="url(#catGradient)" />
        <path d="M 30,-25 L 35,-50 L 15,-30 Z" fill="url(#catGradient)" />
        <path d="M -28,-28 L -32,-45 L -18,-32 Z" fill="#FFE4B5" />
        <path d="M 28,-28 L 32,-45 L 18,-32 Z" fill="#FFE4B5" />
        
        {/* 猫眼睛 */}
        <ellipse cx="-15" cy="-5" rx="8" ry="12" fill="white" />
        <ellipse cx="15" cy="-5" rx="8" ry="12" fill="white" />
        <ellipse cx="-15" cy="-3" rx="5" ry="8" fill="#2C3E50" />
        <ellipse cx="15" cy="-3" rx="5" ry="8" fill="#2C3E50" />
        <ellipse cx="-13" cy="-6" rx="2" ry="3" fill="white" />
        <ellipse cx="17" cy="-6" rx="2" ry="3" fill="white" />
        
        {/* 猫鼻子 */}
        <path d="M 0,8 L -4,12 L 4,12 Z" fill="#FF69B4" />
        
        {/* 猫嘴巴 */}
        <path d="M 0,12 Q -8,18 -12,16" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 0,12 Q 8,18 12,16" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* 猫胡须 */}
        <line x1="-25" y1="5" x2="-45" y2="3" stroke="#2C3E50" strokeWidth="1.5" />
        <line x1="-25" y1="10" x2="-45" y2="12" stroke="#2C3E50" strokeWidth="1.5" />
        <line x1="25" y1="5" x2="45" y2="3" stroke="#2C3E50" strokeWidth="1.5" />
        <line x1="25" y1="10" x2="45" y2="12" stroke="#2C3E50" strokeWidth="1.5" />
        
        {/* 猫尾巴 */}
        <path d="M 40,60 Q 70,40 85,10" stroke="url(#catGradient)" strokeWidth="15" fill="none" strokeLinecap="round" />
        
        {/* 猫爪子 */}
        <ellipse cx="-25" cy="90" rx="12" ry="15" fill="url(#catGradient)" />
        <ellipse cx="25" cy="90" rx="12" ry="15" fill="url(#catGradient)" />
        <ellipse cx="-25" cy="95" rx="10" ry="8" fill="#FFE4B5" />
        <ellipse cx="25" cy="95" rx="10" ry="8" fill="#FFE4B5" />
      </g>
      
      {/* 小女孩 Susan */}
      <g transform="translate(150, 180)">
        {/* 裙子 */}
        <path d="M 0,30 L -25,80 L 25,80 Z" fill="#FF69B4" />
        <path d="M 0,30 L -25,80 L 25,80 Z" fill="#FFB6C1" opacity="0.5" />
        
        {/* 身体 */}
        <rect x="-15" y="10" width="30" height="25" rx="5" fill="#87CEEB" />
        
        {/* 手臂 */}
        <ellipse cx="-20" cy="20" rx="6" ry="18" fill="#FFE4B5" transform="rotate(-20 -20 20)" />
        <ellipse cx="20" cy="20" rx="6" ry="18" fill="#FFE4B5" transform="rotate(20 20 20)" />
        
        {/* 头 */}
        <circle cx="0" cy="0" r="20" fill="#FFE4B5" />
        
        {/* 头发 */}
        <path d="M -20,-5 Q -25,-20 -15,-22 Q -10,-25 0,-23 Q 10,-25 15,-22 Q 25,-20 20,-5" fill="#8B4513" />
        <circle cx="-15" cy="-15" r="8" fill="#8B4513" />
        <circle cx="15" cy="-15" r="8" fill="#8B4513" />
        
        {/* 眼睛 */}
        <circle cx="-6" cy="0" r="3" fill="#2C3E50" />
        <circle cx="6" cy="0" r="3" fill="#2C3E50" />
        <circle cx="-5" cy="-1" r="1" fill="white" />
        <circle cx="7" cy="-1" r="1" fill="white" />
        
        {/* 微笑 */}
        <path d="M -8,8 Q 0,12 8,8" stroke="#FF6B6B" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* 腮红 */}
        <ellipse cx="-12" cy="5" rx="4" ry="2" fill="#FFB6C1" opacity="0.6" />
        <ellipse cx="12" cy="5" rx="4" ry="2" fill="#FFB6C1" opacity="0.6" />
      </g>
      
      {/* 爱心装饰 */}
      <g opacity="0.8">
        <path d="M 220,120 L 225,110 Q 230,105 235,110 Q 240,105 245,110 L 235,125 Z" fill="#FF69B4" />
        <path d="M 210,90 L 213,85 Q 216,82 219,85 Q 222,82 225,85 L 219,95 Z" fill="#FF69B4" />
      </g>
      
      {/* 文字 */}
      <text x="300" y="30" fontSize="28" fontWeight="bold" fill="#2C3E50" textAnchor="middle" fontFamily="Arial, sans-serif">
        Susan and Her Cat
      </text>
    </svg>
  );
};




