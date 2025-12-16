/**
 * 学生报告主应用组件
 * 整合所有报告模块，显示学生的完整学习报告
 */
/**
 * 学生报告主应用组件
 * 整合所有报告模块，显示学生的完整学习报告
 */
import React, { useState, useEffect } from 'react';
import { PageContainer } from './components/Layout/PageContainer';
import { VocabData, SentenceData } from './types';
import { WelcomeScreen } from './components/Student/WelcomeScreen';
import { DailySnapshot } from './components/Student/Sections/DailySnapshot';
import { SubjectPassport } from './components/Student/Sections/SubjectPassport';
import { SkillCards } from './components/Student/Sections/SkillCards';
import { TrainingGoals } from './components/Student/Sections/TrainingGoals';
import { Vocabulary } from './components/Student/Sections/Vocabulary';
import { SentenceSurgery } from './components/Student/Sections/SentenceSurgery';
import { AbilityRadar } from './components/Student/Sections/AbilityRadar';
import { PeriodComparison } from './components/Student/Sections/PeriodComparison';
import { ShareButton } from './components/Student/Sections/ShareButton';
import { SectionDivider } from './components/Student/Sections/SectionDivider';

// --- DATA MOCKS ---
const VOCAB_LIST: VocabData[] = [
  {
    word: 'scarf',
    partOfSpeech: 'n. 围巾',
    meaning: '围巾',
    status: 'mastered',
    context: 'Susan bought a red scarf at the store.',
    sourceTitle: 'The Fashion Story'
  },
  {
    word: 'compliment',
    partOfSpeech: 'v. 赞美',
    meaning: '赞美',
    status: 'review',
    reviewCount: 2,
    context: 'He gave her a nice compliment on her work.',
    sourceTitle: 'Social Skills 101'
  },
  {
    word: 'transition',
    partOfSpeech: 'n. 转变',
    meaning: '转变',
    status: 'review',
    reviewCount: 1,
    context: 'The rapid transition to renewable energy is vital.',
    sourceTitle: 'Green Energy Future'
  }
];

const SENTENCE_LIST: SentenceData[] = [
  {
    text: 'The rapid transition to renewable energy sources is not just an environmental necessity but an economic opportunity that could reshape global markets.',
    difficulty: 'hard',
    translation: '向可再生能源的快速转型不仅是环境必需，也是一个可能重塑全球市场的经济机遇。',
    analysis: '这是一个并列结构的复杂句。主句由"not just...but..."连接两个并列成分。第一部分强调环境必要性，第二部分通过定语从句"that could reshape global markets"进一步说明经济机遇的影响范围。',
    keyPoints: ['not just...but... 并列结构', '定语从句修饰 opportunity', 'transition to 固定搭配'],
    sourceTitle: 'Green Energy Future'
  },
  {
    text: 'Despite facing numerous challenges, she persevered with remarkable determination.',
    difficulty: 'medium',
    translation: '尽管面临诸多挑战，她仍以非凡的决心坚持了下来。',
    analysis: 'Despite引导让步状语，后接动名词短语facing numerous challenges。',
    keyPoints: ['Despite + n./doing', 'persevere with 坚持'],
    sourceTitle: 'The Road to Success'
  },
  {
    text: 'The book that she recommended turned out to be fascinating.',
    difficulty: 'easy',
    translation: '她推荐的那本书结果非常迷人。',
    analysis: 'that引导定语从句修饰The book，turned out to be为固定短语。',
    keyPoints: ['turn out to be 结果是'],
    sourceTitle: 'Weekly Book Review'
  }
];

const SKILL_CARDS = [
  { 
    title: "GPS定位卡", 
    level: "LV.3", 
    progress: 65, 
    total: 100, 
    status: 'active' as const, 
    desc: "精准定位",
    fullDesc: "GPS定位卡帮助你快速定位文章中的关键细节信息，精准找到答案所在位置。",
    questionTypes: ["细节理解题", "信息定位题", "事实查找题"],
    tips: "阅读题目后，先在脑海中标记关键词，然后在文章中快速扫描定位。",
    stats: { level: 3, exp: 650, usage: 12 }
  },
  { 
    title: "逻辑推演卡", 
    level: "LV.0", 
    progress: 0, 
    total: 100, 
    status: 'locked' as const, 
    desc: "待解锁",
    fullDesc: "逻辑推演卡帮助你分析文章的逻辑关系，推断作者的隐含意思。",
    questionTypes: ["推理判断题", "态度观点题", "因果关系题"],
    tips: "关注转折词、因果词，理清文章的逻辑脉络。",
    unlockCondition: "完成更多相关题型训练即可解锁此技能卡"
  },
  { 
    title: "速读闪电卡", 
    level: "LV.0", 
    progress: 0, 
    total: 100, 
    status: 'locked' as const, 
    desc: "待解锁",
    fullDesc: "速读闪电卡帮助你提高阅读速度，在有限时间内获取更多信息。",
    questionTypes: ["主旨大意题", "标题选择题", "快速浏览题"],
    tips: "先读首尾段，再读每段首句，快速抓住文章主旨。",
    unlockCondition: "完成更多相关题型训练即可解锁此技能卡"
  },
  { 
    title: "结构透视卡", 
    level: "LV.0", 
    progress: 0, 
    total: 100, 
    status: 'locked' as const, 
    desc: "待解锁",
    fullDesc: "结构透视卡帮助你理解文章的整体结构，把握段落之间的关系。",
    questionTypes: ["段落排序题", "结构分析题", "过渡句理解题"],
    tips: "绘制文章结构图，理清论点与论据的关系。",
    unlockCondition: "完成更多相关题型训练即可解锁此技能卡"
  }
];

const PERIOD_DATA = {
  week: [
    { label: '阅读篇数', value: 14, unit: '篇', change: 40.0, prevValue: 10, diff: 4 },
    { label: '阅读字数', value: '3.2k', unit: '词', change: 14.3, prevValue: '2.8k', diff: 400 },
    { label: '专注时长', value: 126, unit: '分钟', change: 28.6, prevValue: 98, diff: 28 },
    { label: '答题正确率', value: '85%', unit: '', change: 9.0, prevValue: '78%', diff: 7 },
    { label: '盲猜率', value: '5%', unit: '', change: -58.3, prevValue: '12%', diff: -7, reverseColor: true },
    { label: '新掌握词汇', value: 28, unit: '词', change: 40.0, prevValue: 20, diff: 8 },
  ],
  month: [
    { label: '阅读篇数', value: 56, unit: '篇', change: 33.3, prevValue: 42, diff: 14 },
    { label: '阅读字数', value: '12.8k', unit: '词', change: 33.3, prevValue: '9.6k', diff: 3200 },
    { label: '专注时长', value: 480, unit: '分钟', change: 26.3, prevValue: 380, diff: 100 },
    { label: '答题正确率', value: '88%', unit: '', change: 17.3, prevValue: '75%', diff: 13 },
    { label: '盲猜率', value: '5%', unit: '', change: -80.0, prevValue: '25%', diff: -20, reverseColor: true },
    { label: '新掌握词汇', value: 112, unit: '词', change: 43.6, prevValue: 78, diff: 34 },
  ]
};

const ABILITY_METRICS = [
  { label: '精准定位', score: 85, color: 'blue', change: 3 },
  { label: '逻辑推演', score: 70, color: 'gray', change: 4 },
  { label: '宏观结构', score: 60, color: 'yellow', change: 5 },
  { label: '语境解码', score: 90, color: 'green', change: 10 },
  { label: '策略执行', score: 75, color: 'purple', change: 0 },
];

const DEFAULT_TRAINING_GOALS = [
  { type: '细节理解题', count: 2, color: 'blue' as const },
  { type: '词义猜测题', count: 1, color: 'purple' as const },
];

// --- DATA MOCKS (保留作为默认值) ---

interface AppProps {
  lessonData?: {
    vocabList?: VocabData[];
    sentenceList?: SentenceData[];
    skillCards?: typeof SKILL_CARDS;
    periodData?: typeof PERIOD_DATA;
    abilityMetrics?: typeof ABILITY_METRICS;
    date?: string;
    studentName?: string;
    subjectPassport?: {
      coverImage?: string;
      articleTitle: string;
      unitProgress: string;
      unitTotal: number;
      theme: string;
      genre: string;
    };
    articlesCount?: number;
    wordsRead?: number;
    focusDuration?: number;
    trainingGoals?: Array<{
      type: string;
      count: number;
      color: 'blue' | 'purple' | 'green' | 'orange';
    }>;
    guessRateTrend?: {
      current: number;
      change: number;
      data: Array<{ day: string; value: number }>;
    };
  };
}

const App: React.FC<AppProps> = ({ lessonData }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use provided data or fallback to defaults
  const vocabList = lessonData?.vocabList || VOCAB_LIST;
  const sentenceList = lessonData?.sentenceList || SENTENCE_LIST;
  const skillCards = lessonData?.skillCards || SKILL_CARDS;
  const periodData = lessonData?.periodData || PERIOD_DATA;
  const abilityMetrics = lessonData?.abilityMetrics || ABILITY_METRICS;
  const reportDate = lessonData?.date || '2023.10.24';
  const studentName = lessonData?.studentName || 'Alex';
  const articlesCount = lessonData?.articlesCount ?? 2;
  const wordsRead = lessonData?.wordsRead ?? 450;
  const focusDuration = lessonData?.focusDuration ?? 18;
  const subjectPassport = lessonData?.subjectPassport || {
    coverImage: '/susan-and-cat.png',
    articleTitle: 'Susan and Her Cat',
    unitProgress: '1/4',
    unitTotal: 4,
    theme: '人与自然',
    genre: '记叙文'
  };
  const trainingGoals = lessonData?.trainingGoals || DEFAULT_TRAINING_GOALS;
  const guessRateTrend = lessonData?.guessRateTrend;

  useEffect(() => {
    // 尝试从localStorage加载数据
    const storedData = localStorage.getItem('studentReportData');
    if (storedData && !lessonData) {
      try {
        const parsed = JSON.parse(storedData);
        // 如果localStorage有数据且没有通过props传入，使用localStorage的数据
        // 这里可以通过setState更新，但由于是函数组件，我们通过props处理
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full text-[#1E293B] relative font-sans selection:bg-blue-600 selection:text-white">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <WelcomeScreen studentName={studentName} />

      <div className="min-h-screen relative pb-20">
        <DailySnapshot
          date={reportDate}
          studentName={studentName}
          focusDuration={focusDuration}
          articlesCount={articlesCount}
          wordsRead={wordsRead}
        />

        {/* ========== 今日战报模块 - 学习结果（优先级最高） ========== */}
        <SectionDivider 
          title="今日战报" 
          subtitle="TODAY'S BATTLE REPORT"
          type="today"
        />

        {/* 优先级1: 今日训练目标 */}
        <TrainingGoals trainingGoals={trainingGoals || DEFAULT_TRAINING_GOALS} />

        {/* 优先级2: 今日学的单词 */}
        <Vocabulary vocabList={vocabList} />

        {/* 优先级3: 今日学的长难句 */}
        <SentenceSurgery sentenceList={sentenceList} />

        {/* 今日学习记录 */}
        <SubjectPassport subjectPassport={subjectPassport} />

        <SkillCards skillCards={skillCards} />

        {/* ========== 累计成长模块 - 累积数据 ========== */}
        <SectionDivider 
          title="累计成长" 
          subtitle="ACCUMULATED GROWTH"
          type="cumulative"
        />

        {/* 能力分析 - 区分今日和累积 */}
        <AbilityRadar
          abilityMetrics={abilityMetrics}
          guessRateTrend={guessRateTrend}
          studentName={studentName}
        />

        {/* 累积数据对比 */}
        <PeriodComparison periodData={periodData} />

        <ShareButton />
      </div>
    </main>
  );
};

export default App;