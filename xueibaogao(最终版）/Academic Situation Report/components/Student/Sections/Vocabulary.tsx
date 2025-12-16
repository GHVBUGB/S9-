/**
 * 生词账单组件
 * 显示学生今日学习的生词列表
 */
import React from 'react';
import { PageContainer } from '../../Layout/PageContainer';
import { ScrollReveal } from '../../Animation/ScrollReveal';
import { PokerStack } from '../PokerStack';
import { VocabData } from '../../../types';

interface VocabularyProps {
  vocabList: VocabData[];
}

export const Vocabulary: React.FC<VocabularyProps> = ({ vocabList }) => {
  return (
    <PageContainer>
      <ScrollReveal className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-black font-serif">生词账单</h2>
          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">今日</span>
        </div>
        <div className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
          {vocabList.length} 新词
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <PokerStack words={vocabList} />
      </ScrollReveal>
    </PageContainer>
  );
};

