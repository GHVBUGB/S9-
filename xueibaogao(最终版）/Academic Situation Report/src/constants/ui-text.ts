/**
 * UI文本常量配置
 * 
 * 用途：统一管理所有界面文本，方便维护和国际化
 * 
 * 使用方式：
 * import { UI_TEXT } from '@/constants/ui-text';
 * <h1>{UI_TEXT.COMMON.APP_NAME}</h1>
 */

export const UI_TEXT = {
  // ========== 通用文本 ==========
  COMMON: {
    APP_NAME: 'S9 学情报告系统',
    LOADING: '加载中...',
    SAVE: '保存',
    CANCEL: '取消',
    CONFIRM: '确认',
    DELETE: '删除',
    EDIT: '编辑',
    BACK: '返回',
    CLOSE: '关闭',
    DOWNLOAD: '下载',
    DOWNLOAD_PDF: '下载PDF',
    GENERATING: '生成中...',
    SUCCESS: '成功',
    ERROR: '错误',
    WARNING: '警告',
  },

  // ========== 教师看板 ==========
  TEACHER_DASHBOARD: {
    TITLE: '教师看板',
    SEARCH_PLACEHOLDER: '搜索学生姓名或ID...',
    NO_STUDENT_SELECTED: '请选择学生查看报告',
    VIEW_SALES_SCRIPT: '查看销售话术',
    EDIT_DATA: '编辑数据',
    GENERATE_REPORT: '生成学生端报告',
    HISTORY_LESSONS: '历史课程记录',
    STUDENT_NOT_FOUND: '未找到学生',
  },

  // ========== 学生报告 ==========
  STUDENT_REPORT: {
    // 报告标题
    TITLE: '学生学情报告',
    
    // 今日战报
    DAILY_SNAPSHOT: {
      TITLE: '今日战报',
      SUBTITLE: "TODAY'S BATTLE REPORT",
      ARTICLES_COUNT: '阅读篇数',
      FOCUS_DURATION: '专注时长',
      WORDS_READ: '阅读字数',
      ARTICLE_UNIT: '篇',
      MIN_UNIT: 'min',
      COMPARISON_TEXT: '≈ 1/5 章《哈利波特》',
      PROGRESS_HINT: '积少成多',
      FOCUS_HINT: '有效思考时长',
    },

    // 训练目标
    TRAINING_GOALS: {
      TITLE: '今日训练目标',
      ARTICLE_UNIT: '篇',
    },

    // 生词账单
    VOCABULARY: {
      TITLE: '生词账单',
      COUNT_SUFFIX: '词',
      STATUS_MASTERED: '秒杀',
      STATUS_REVIEW: '回炉',
      REVIEW_COUNT_PREFIX: '×',
    },

    // 难句手术
    SENTENCE_SURGERY: {
      TITLE: '难句手术',
      COMPLETED_COUNT: '完成',
      COUNT_SUFFIX: '例',
      DIFFICULTY_HARD: '困难',
      DIFFICULTY_MEDIUM: '中等',
      DIFFICULTY_EASY: '简单',
    },

    // 主题护照
    SUBJECT_PASSPORT: {
      TITLE: '主题护照',
      READING_COORDINATES: '阅读坐标',
      UNIT_PROGRESS_PREFIX: '单元进度',
      THEME_LABEL: '核心题材',
      GENRE_LABEL: '文章体裁',
    },

    // 技能卡收集
    SKILL_CARDS: {
      TITLE: '技能卡收集',
      UNLOCKED_STATUS: '已解锁',
      PROGRESS_FORMAT: '{current}/{total} 已解锁',
      CARD_STATUS_ACTIVE: '已获得',
      CARD_STATUS_LOCKED: '待解锁',
    },

    // 累计成长
    ACCUMULATED_GROWTH: {
      TITLE: '累计成长',
      SUBTITLE: 'ACCUMULATED GROWTH',
    },

    // 能力雷达
    ABILITY_RADAR: {
      TITLE: '综合阅读能力雷达',
      SUBTITLE: '五维能力图谱',
      ABILITY_LABELS: {
        SEARCH_POWER: '精准定位力',
        LOGIC_POWER: '逻辑推演力',
        STRUCTURE_POWER: '宏观结构力',
        DECODING_POWER: '语境解码力',
        STRATEGY_POWER: '策略执行力',
      },
    },

    // 趋势分析
    TREND_ANALYSIS: {
      TITLE: '趋势分析',
      READING_SPEED: '阅读速度',
      COMPREHENSION_RATE: '理解准确率',
      SPEED_UNIT: 'WPM',
      RATE_UNIT: '%',
    },

    // 周期对比
    PERIOD_COMPARISON: {
      TITLE: '周期对比',
      SUBTITLE: '期间比较',
      TAB_WEEK: '本周',
      TAB_MONTH: '本月',
      METRICS: {
        ARTICLES: '阅读篇数',
        WORDS: '阅读字数',
        FOCUS: '专注时长',
        ACCURACY: '平均正确率',
        LOOKUP_RATE: '查词率',
        VOCABULARY: '新掌握词汇',
      },
      UNIT: {
        ARTICLES: '篇',
        WORDS: '字',
        FOCUS: '分钟',
        ACCURACY: '%',
        LOOKUP_RATE: '%',
        VOCABULARY: '个',
      },
    },
  },

  // ========== 销售话术 ==========
  SALES_SCRIPT: {
    // 页面标题
    PAGE_TITLE: '家长会对话剧本',
    PAGE_SUBTITLE: '班主任专业沟通话术',
    PAGE_HINT: '💡 以班主任的身份，像老师家长会一样自然沟通',

    // 按钮
    EDIT_SCRIPT: '编辑话术',
    SAVE: '保存',
    CANCEL: '取消',

    // 章节标题
    SECTIONS: {
      OPENING: '开场白',
      SECTION_1: '第一部分 · 今日学习成果',
      SECTION_2: '第二部分 · 学习目标与进度',
      SECTION_3: '第三部分 · 词汇掌握情况',
      SECTION_4: '第四部分 · 长难句分析能力',
      SECTION_5: '第五部分 · 综合能力画像',
      SECTION_6: '第六部分 · 进步趋势',
      CLOSING: '收尾 · 后续学习规划',
    },

    // 数据标题
    DATA_LABELS: {
      ARTICLES: '📚 关于阅读篇数',
      WORDS: '📖 关于阅读字数',
      FOCUS: '⏱️ 关于专注时长',
    },

    // 沟通原则
    COMMUNICATION_PRINCIPLES: {
      TITLE: '📌 沟通总原则',
      PRINCIPLES: [
        '✅ 用老师的身份，不是销售，而是班主任',
        '✅ 多用比喻和故事，让专业术语变得通俗易懂',
        '✅ 先肯定再建议，绝不批评孩子，而是强调提升空间',
        '✅ 关联到中高考，让家长看到长期价值',
        '✅ 展示专业性，用数据、系统、科学方法论',
        '✅ 建立信任感，承诺持续跟进，家校配合',
      ],
    },
  },

  // ========== 编辑弹窗 ==========
  EDIT_MODAL: {
    TITLE: '编辑课程数据',
    SAVE: '保存更改',
    CANCEL: '取消',

    // 表单标签
    LABELS: {
      DATE: '上课日期',
      UNIT: '所属单元',
      ARTICLES_COUNT: '阅读篇数',
      WORDS_READ: '阅读字数',
      FOCUS_DURATION: '专注时长（分钟）',
      VOCABULARY: '生词列表',
      SENTENCES: '难句列表',
      SKILL_CARDS: '技能卡',
      TRAINING_GOALS: '训练目标',
      ABILITY_SCORES: '能力分数',
    },

    // 词汇管理
    VOCABULARY: {
      ADD_WORD: '添加生词',
      WORD: '单词',
      TRANSLATION: '翻译',
      STATUS: '状态',
      STATUS_MASTERED: '已掌握',
      STATUS_REVIEW: '需复习',
      REVIEW_COUNT: '复习次数',
    },

    // 句子管理
    SENTENCES: {
      ADD_SENTENCE: '添加句子',
      TEXT: '句子内容',
      TRANSLATION: '翻译',
      DIFFICULTY: '难度',
      DIFFICULTY_EASY: '简单',
      DIFFICULTY_MEDIUM: '中等',
      DIFFICULTY_HARD: '困难',
    },

    // 技能卡管理
    SKILL_CARDS: {
      ADD_CARD: '添加技能卡',
      NAME: '技能名称',
      DESCRIPTION: '描述',
      STATUS: '状态',
      STATUS_ACTIVE: '已激活',
      STATUS_LOCKED: '未解锁',
      PROGRESS: '进度',
      TOTAL: '总数',
    },

    // 训练目标
    TRAINING_GOALS: {
      ADD_GOAL: '添加目标',
      TYPE: '目标类型',
      COUNT: '数量',
      COLOR: '颜色',
      COLOR_BLUE: '蓝色',
      COLOR_YELLOW: '黄色',
    },

    // 能力分数
    ABILITY_SCORES: {
      PRECISE_POSITIONING: '精准定位力',
      LOGICAL_DEDUCTION: '逻辑推演力',
      STRUCTURE_ANALYSIS: '宏观结构力',
      CONTEXTUAL_DECODING: '语境解码力',
      STRATEGY_EXECUTION: '策略执行力',
    },
  },

  // ========== 提示信息 ==========
  MESSAGES: {
    SUCCESS: {
      SAVE: '保存成功',
      UPDATE: '更新成功',
      DELETE: '删除成功',
      GENERATE_REPORT: '报告生成成功',
      COPY_LINK: '链接已复制到剪贴板',
    },
    ERROR: {
      SAVE: '保存失败',
      UPDATE: '更新失败',
      DELETE: '删除失败',
      LOAD_DATA: '数据加载失败',
      NETWORK: '网络错误，请稍后重试',
      INVALID_DATA: '数据格式不正确',
    },
    WARNING: {
      UNSAVED_CHANGES: '有未保存的更改，确定要离开吗？',
      DELETE_CONFIRM: '确定要删除这条记录吗？',
      EMPTY_FIELD: '请填写必填字段',
    },
  },

  // ========== 时间格式 ==========
  TIME: {
    DATE_FORMAT: 'YYYY.MM.DD',
    TIME_FORMAT: 'HH:mm',
    DATETIME_FORMAT: 'YYYY.MM.DD HH:mm',
  },
} as const;

// 类型导出，方便类型检查
export type UITextType = typeof UI_TEXT;

