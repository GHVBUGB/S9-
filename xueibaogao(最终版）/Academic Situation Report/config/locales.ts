/**
 * 国际化文本配置
 * 统一管理所有界面文本，便于后续多语言支持
 */

export const LOCALES = {
  zh: {
    // 页面标题
    titles: {
      studentReport: 'S9 学情报告系统',
      teacherDashboard: '教师看板',
      studentReportView: '学生学情报告',
      dailyReport: '每日战报',
      subjectPassport: '主题护照',
      skillCards: '技能卡收集',
      vocabulary: '生词账单',
      sentenceSurgery: '难句手术',
      abilityRadar: '五维能力图谱',
      trendAnalysis: '趋势分析',
      periodComparison: '周期对比',
      trainingGoals: '今日训练目标',
      editReport: '编辑报告数据',
      reportLink: '报告链接已生成',
    },
    // 按钮
    buttons: {
      search: '查找学生',
      edit: '编辑数据',
      generateReport: '生成报告',
      save: '保存更改',
      cancel: '取消',
      close: '关闭',
      copyLink: '复制链接',
      copied: '已复制',
      openReport: '打开报告',
      viewDetails: '查看详情 →',
      addItem: '添加目标',
      delete: '删除',
    },
    // 标签
    labels: {
      studentId: '学生ID',
      date: '日期',
      title: '标题',
      unit: '单元',
      articlesCount: '阅读篇数',
      wordsRead: '阅读字数',
      focusDuration: '专注时长',
      accuracy: '正确率',
      unitProgress: '单元进度',
      theme: '主题',
      genre: '体裁',
      articleTitle: '文章标题',
      coverImage: '封面图片',
      skillCard: '技能卡',
      vocabulary: '生词',
      sentence: '难句',
      word: '单词',
      partOfSpeech: '词性',
      meaning: '意思',
      status: '状态',
      context: '语境例句',
      sourceTitle: '来源文章',
      difficulty: '难度',
      translation: '翻译',
      analysis: '解析',
      keyPoints: '关键知识点',
      trainingGoal: '目标',
      questionType: '题型名称',
      goalCount: '目标数量',
      colorTheme: '颜色主题',
      currentValue: '当前值',
      unit: '单位',
      changeRate: '变化率',
      previousValue: '上期值',
      currentGuessRate: '当前盲猜率',
      changePercentage: '变化率',
      trendData: '趋势数据',
    },
    // 提示信息
    messages: {
      searchPlaceholder: '输入学生ID查看学情报告',
      noStudentFound: '未找到该学生，请检查学生ID是否正确',
      noLessonSelected: '请先选择一个学生和课程',
      saveFailed: '保存数据失败，请重试',
      popupBlocked: '请允许弹出窗口以查看生成的报告',
      congratulations: '恭喜{name}又完成了一节课程 🎉',
      goalsCompleted: '今日目标已全部完成!',
      noHistory: '暂无历史课程记录',
      reportLinkGenerated: '报告链接已生成！您可以将此链接分享给销售或学生家长。',
      linkUsageTip1: '点击"复制链接"按钮复制报告链接',
      linkUsageTip2: '将链接发送给销售或学生家长',
      linkUsageTip3: '点击"打开报告"可以在新窗口预览报告',
      linkUsageTip4: '链接包含完整的报告数据，可直接分享',
    },
    // 状态文本
    status: {
      active: '已解锁',
      locked: '已锁定',
      mastered: '已掌握',
      review: '需复习',
      easy: '简单',
      medium: '中等',
      hard: '困难',
    },
    // 单位
    units: {
      article: '篇',
      word: '词',
      minute: '分钟',
      percent: '%',
    },
  },
} as const;

/**
 * 获取本地化文本的辅助函数
 */
export const t = (key: string, params?: Record<string, string>): string => {
  const keys = key.split('.');
  let value: any = LOCALES.zh;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] || `{${paramKey}}`);
  }
  
  return typeof value === 'string' ? value : key;
};

