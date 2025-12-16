/**
 * 难句手术组件
 * 显示学生今日学习的难句列表，支持点击查看详细解析
 */
import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { SentenceDetailModal } from '../Modals/SentenceDetailModal';
import { SentenceData } from '../../../types';

interface SentenceSurgeryProps {
  sentenceList: SentenceData[];
}

export const SentenceSurgery: React.FC<SentenceSurgeryProps> = ({ sentenceList }) => {
  const [selectedSentence, setSelectedSentence] = useState<SentenceData | null>(null);

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'hard':
        return '困难';
      case 'medium':
        return '中等';
      case 'easy':
        return '简单';
      default:
        return '未知';
    }
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'hard':
        return 'bg-red-50 text-red-500 border-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'easy':
        return 'bg-green-50 text-green-600 border-green-100';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollReveal className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black font-serif">难句手术</h2>
            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">今日</span>
          </div>
          <div className="text-[10px] font-bold text-gray-400">
            完成 {sentenceList.length} 例
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {sentenceList.map((sentence, idx) => (
            <ScrollReveal key={idx} className="bg-white rounded-[1.25rem] border border-gray-100 shadow-sm overflow-hidden group">
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors relative"
                onClick={() => setSelectedSentence(sentence)}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-serif font-medium text-gray-800 leading-relaxed line-clamp-2">
                      {sentence.text}
                    </p>
                  </div>
                  <div className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded border ${getDifficultyClass(sentence.difficulty)}`}>
                    {getDifficultyText(sentence.difficulty)}
                  </div>
                </div>
                
                <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    点击查看详解 <Zap className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>

      {selectedSentence && (
        <SentenceDetailModal 
          sentence={selectedSentence} 
          onClose={() => setSelectedSentence(null)} 
        />
      )}
    </>
  );
};

