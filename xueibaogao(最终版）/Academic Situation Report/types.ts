export interface SkillCardData {
  title: string;
  status: 'unlocked' | 'locked';
  progress?: number;
  total?: number;
  icon: string;
}

export interface VocabData {
  word: string;
  meaning: string;
  partOfSpeech: string;
  status: 'mastered' | 'review';
  context: string;
  sourceTitle: string;
  reviewCount?: number;
}

export interface SentenceData {
  text: string;
  difficulty: 'hard' | 'medium' | 'easy';
  translation: string;
  analysis: string;
  keyPoints: string[];
  sourceTitle?: string;
}

export interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface PeriodMetric {
  label: string;
  value: string | number;
  unit?: string;
  change: number; // percentage
  prevValue: string | number;
  diff: string | number; // absolute difference
  reverseColor?: boolean; // if true, negative change is green (e.g. guess rate)
}

export interface PeriodData {
  week: PeriodMetric[];
  month: PeriodMetric[];
}

// Teacher Dashboard Types
export interface StudentInfo {
  id: string;
  name: string;
  avatar?: string;
  level?: string;
}

export interface LessonRecord {
  id: string;
  date: string;
  title: string;
  unit: string;
  articlesCount: number;
  wordsRead: number;
  focusDuration: number;
  accuracy: number;
  abilityScores: {
    precisePositioning: number;
    logicalDeduction: number;
    macroStructure: number;
    contextualDecoding: number;
    strategyExecution: number;
  };
  // 主题护照数据
  subjectPassport?: {
    coverImage?: string;
    articleTitle: string;
    unitProgress: string; // e.g., "1/4"
    unitTotal: number;
    theme: string; // e.g., "人与自然"
    genre: string; // e.g., "记叙文"
  };
  // 技能卡数据
  skillCards?: Array<{
    title: string;
    level: string;
    progress: number;
    total: number;
    status: 'active' | 'locked';
    desc: string;
    fullDesc?: string;
    questionTypes?: string[];
    tips?: string;
    stats?: {
      level: number;
      exp: number;
      usage: number;
    };
    unlockCondition?: string;
  }>;
  // 生词数据
  vocabulary?: VocabData[];
  // 难句数据
  sentences?: SentenceData[];
  // 趋势数据
  trends?: {
    readingSpeed: {
      current: number; // WPM
      change: number; // percentage
      data: Array<{ day: string; value: number }>;
    };
    guessRate: {
      current: number; // percentage
      change: number; // percentage
      data: Array<{ day: string; value: number }>;
    };
  };
  // 周期对比数据
  periodComparison?: PeriodData;
  // 今日训练目标
  trainingGoals?: Array<{
    type: string; // 题型名称，如"细节理解题"
    count: number; // 目标数量
    color: 'blue' | 'purple' | 'green' | 'orange'; // 颜色主题
  }>;
}

export interface StudentReport {
  student: StudentInfo;
  latestLesson: LessonRecord;
  historyLessons: LessonRecord[];
}