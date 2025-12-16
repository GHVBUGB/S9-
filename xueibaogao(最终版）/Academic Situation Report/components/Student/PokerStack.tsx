/**
 * 生词卡片堆叠组件
 * 以扑克牌堆叠的方式展示生词，支持点击查看详情
 */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { VocabData } from '../../types';

interface PokerStackProps {
  words: VocabData[];
}

export const PokerStack: React.FC<PokerStackProps> = ({ words }) => {
  const [selectedWord, setSelectedWord] = useState<VocabData | null>(null);
  const displayWords = words.slice(0, 3);

  return (
    <div className="relative w-full h-56 flex justify-center items-center mt-6">
      <div className="relative w-full h-full flex justify-center items-center">
        {displayWords.map((word, index) => {
          // 计算每张卡片的旋转和位置偏移
          let rotation = 0;
          let translateX = 0;
          let translateY = 0;
          let zIndex = 10;
          let badgePositionClass = "";

          if (index === 0) {
            rotation = -16;
            translateX = -85; 
            translateY = 12;
            zIndex = 5;
            badgePositionClass = "-top-3 -left-3 -rotate-12";
          } else if (index === 1) {
            rotation = 0;
            zIndex = 20;
            translateY = -15;
            badgePositionClass = "-top-4 -right-3 rotate-6";
          } else if (index === 2) {
            rotation = 16;
            translateX = 85;
            translateY = 12;
            zIndex = 5;
            badgePositionClass = "-top-3 -right-3 rotate-12";
          }

          const isMastered = word.status === 'mastered';
          const statusText = isMastered ? '秒杀' : `回炉 ×${word.reviewCount || 1}`;
          const statusBg = isMastered ? 'bg-[#FFE600]' : 'bg-[#FF2E2E]';
          const statusTextColor = isMastered ? 'text-black' : 'text-white';

          return (
            <div
              key={word.word}
              onClick={() => setSelectedWord(word)}
              style={{ 
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                zIndex: zIndex
              }}
              className="absolute w-28 h-40 cursor-pointer group hover:z-30 hover:scale-105 transition-all duration-300 ease-out"
            >
              <div className={`absolute z-30 transition-transform hover:scale-110 ${badgePositionClass}`}>
                <div className={`
                  text-[10px] font-black px-2 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                  border-2 border-black uppercase tracking-tighter ${statusBg} ${statusTextColor}
                `}>
                  {statusText}
                </div>
              </div>
              <div className="w-full h-full rounded-xl border-2 border-white bg-gradient-to-br from-white/95 to-gray-50/90 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent pointer-events-none z-20"></div>
                <div className="flex-1 flex flex-col items-center justify-center w-full z-10 p-2 pt-6">
                  <h3 className="text-xl font-black font-serif text-gray-900 mb-1 text-center leading-tight break-words w-full drop-shadow-sm">
                    {word.word}
                  </h3>
                </div>
                <div className="w-full bg-gray-50/80 border-t border-gray-100 py-2.5 text-center z-10 relative">
                  <span className="text-xs font-bold text-gray-600 tracking-wide block">
                    {word.meaning}
                  </span>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-0.5 h-0.5 rounded-full bg-gray-300"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-gray-300"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 生词详情模态框 */}
      {selectedWord && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 font-sans">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedWord(null)}
          ></div>
          <div className="glass-card w-full max-w-sm rounded-[2rem] p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-white/50">
            <button 
              onClick={() => setSelectedWord(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <span className="text-2xl font-serif font-black">{selectedWord.word.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl font-serif font-black text-gray-900 mb-1">{selectedWord.word}</h2>
              <div className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full mb-6">
                {selectedWord.partOfSpeech}
              </div>
              <div className="w-full text-left space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">释义</div>
                  <div className="text-lg font-bold text-gray-800">{selectedWord.meaning}</div>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="text-[10px] uppercase font-bold text-blue-400 mb-1">语境</div>
                  <div className="text-sm font-medium text-gray-700 italic">"{selectedWord.context}"</div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

