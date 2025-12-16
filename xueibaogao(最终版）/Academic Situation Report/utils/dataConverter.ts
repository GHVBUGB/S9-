import { LessonRecord, StudentInfo } from '../types';

/**
 * 将教师端的LessonRecord转换为学生端App组件需要的数据格式
 */
export const convertLessonToStudentData = (lesson: LessonRecord, student: StudentInfo) => {
  // 转换能力分数为App需要的格式
  const abilityMetrics = [
    { label: '精准定位', score: lesson.abilityScores.precisePositioning, color: 'blue' },
    { label: '逻辑推演', score: lesson.abilityScores.logicalDeduction, color: 'gray' },
    { label: '宏观结构', score: lesson.abilityScores.macroStructure, color: 'yellow' },
    { label: '语境解码', score: lesson.abilityScores.contextualDecoding, color: 'green' },
    { label: '策略执行', score: lesson.abilityScores.strategyExecution, color: 'purple' },
  ];

  // 转换技能卡格式（icon将在App中根据标题动态生成）
  const skillCards = lesson.skillCards?.map(card => ({
    ...card,
    // icon不在这里设置，因为React元素无法序列化
    // App组件会根据card.title动态生成icon
  })) || [];

  return {
    vocabList: lesson.vocabulary || [],
    sentenceList: lesson.sentences || [],
    skillCards: skillCards as any,
    periodData: lesson.periodComparison || { week: [], month: [] },
    abilityMetrics,
    date: lesson.date,
    studentName: student.name,
    subjectPassport: lesson.subjectPassport,
    // 基本信息
    articlesCount: lesson.articlesCount,
    wordsRead: lesson.wordsRead,
    focusDuration: lesson.focusDuration,
    // 今日训练目标
    trainingGoals: lesson.trainingGoals || [],
    // 趋势数据（仅盲猜率）
    guessRateTrend: lesson.trends?.guessRate,
  };
};

/**
 * 生成唯一的报告ID
 */
export const generateReportId = (): string => {
  return `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 将数据保存到localStorage，供学生端读取
 */
export const saveDataToStorage = (data: any, reportId?: string) => {
  try {
    const id = reportId || 'studentReportData';
    localStorage.setItem(id, JSON.stringify(data));
    return id;
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
    return null;
  }
};

/**
 * 从localStorage读取数据
 */
export const loadDataFromStorage = (reportId?: string) => {
  try {
    const id = reportId || 'studentReportData';
    const data = localStorage.getItem(id);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
    return null;
  }
};

/**
 * 清除localStorage中的数据
 */
export const clearStorageData = (reportId?: string) => {
  try {
    const id = reportId || 'studentReportData';
    localStorage.removeItem(id);
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
};

/**
 * 生成报告分享链接
 */
export const generateReportLink = (reportId: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?mode=student&reportId=${reportId}`;
};

