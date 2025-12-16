/**
 * 常量配置文件
 * 统一管理所有文本字段、枚举值、配置项
 */

// ==================== 文本字段字典 ====================

/**
 * 页面标题和标签
 */
export const PAGE_TITLES = {
  STUDENT_REPORT: 'S9 学情报告系统',
  TEACHER_DASHBOARD: '教师看板',
  STUDENT_REPORT_VIEW: '学生学情报告',
  DAILY_REPORT: '每日战报',
  SUBJECT_PASSPORT: '主题护照',
  SKILL_CARDS: '技能卡收集',
  VOCABULARY: '生词账单',
  SENTENCE_SURGERY: '难句手术',
  ABILITY_RADAR: '五维能力图谱',
  TREND_ANALYSIS: '趋势分析',
  PERIOD_COMPARISON: '周期对比',
  TRAINING_GOALS: '今日训练目标',
  EDIT_REPORT: '编辑报告数据',
  REPORT_LINK: '报告链接已生成',
} as const;

/**
 * 按钮文本
 */
export const BUTTON_TEXTS = {
  SEARCH: '查找学生',
  EDIT: '编辑数据',
  GENERATE_REPORT: '生成报告',
  SAVE: '保存更改',
  CANCEL: '取消',
  CLOSE: '关闭',
  COPY_LINK: '复制链接',
  COPIED: '已复制',
  OPEN_REPORT: '打开报告',
  VIEW_DETAILS: '查看详情 →',
  ADD_ITEM: '添加目标',
  DELETE: '删除',
} as const;

/**
 * 提示信息
 */
export const MESSAGES = {
  SEARCH_PLACEHOLDER: '输入学生ID查看学情报告',
  NO_STUDENT_FOUND: '未找到该学生，请检查学生ID是否正确',
  NO_LESSON_SELECTED: '请先选择一个学生和课程',
  SAVE_FAILED: '保存数据失败，请重试',
  POPUP_BLOCKED: '请允许弹出窗口以查看生成的报告',
  CONGRATULATIONS: '恭喜{name}又完成了一节课程 🎉',
  GOALS_COMPLETED: '今日目标已全部完成!',
  NO_HISTORY: '暂无历史课程记录',
  REPORT_LINK_GENERATED: '报告链接已生成！您可以将此链接分享给销售或学生家长。',
  LINK_USAGE_TIP_1: '点击"复制链接"按钮复制报告链接',
  LINK_USAGE_TIP_2: '将链接发送给销售或学生家长',
  LINK_USAGE_TIP_3: '点击"打开报告"可以在新窗口预览报告',
  LINK_USAGE_TIP_4: '链接包含完整的报告数据，可直接分享',
} as const;

/**
 * 标签文本
 */
export const LABELS = {
  STUDENT_ID: '学生ID',
  DATE: '日期',
  TITLE: '标题',
  UNIT: '单元',
  ARTICLES_COUNT: '阅读篇数',
  WORDS_READ: '阅读字数',
  FOCUS_DURATION: '专注时长',
  ACCURACY: '正确率',
  UNIT_PROGRESS: '单元进度',
  THEME: '主题',
  GENRE: '体裁',
  ARTICLE_TITLE: '文章标题',
  COVER_IMAGE: '封面图片',
  SKILL_CARD: '技能卡',
  VOCABULARY: '生词',
  SENTENCE: '难句',
  WORD: '单词',
  PART_OF_SPEECH: '词性',
  MEANING: '意思',
  STATUS: '状态',
  CONTEXT: '语境例句',
  SOURCE_TITLE: '来源文章',
  DIFFICULTY: '难度',
  TRANSLATION: '翻译',
  ANALYSIS: '解析',
  KEY_POINTS: '关键知识点',
  TRAINING_GOAL: '目标',
  QUESTION_TYPE: '题型名称',
  GOAL_COUNT: '目标数量',
  COLOR_THEME: '颜色主题',
  CURRENT_VALUE: '当前值',
  UNIT: '单位',
  CHANGE_RATE: '变化率',
  PREVIOUS_VALUE: '上期值',
  CURRENT_GUESS_RATE: '当前盲猜率',
  CHANGE_PERCENTAGE: '变化率',
  TREND_DATA: '趋势数据',
} as const;

/**
 * 状态枚举
 */
export const STATUS = {
  SKILL_CARD: {
    ACTIVE: 'active',
    LOCKED: 'locked',
  },
  VOCAB: {
    MASTERED: 'mastered',
    REVIEW: 'review',
  },
  SENTENCE_DIFFICULTY: {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  },
} as const;

/**
 * 颜色主题枚举
 */
export const COLOR_THEMES = {
  BLUE: 'blue',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
  GRAY: 'gray',
  YELLOW: 'yellow',
} as const;

/**
 * 主题选项
 */
export const THEME_OPTIONS = [
  '人与自然',
  '人与社会',
  '人与自我',
  '科技发展',
  '文化传承',
  '环境保护',
  '教育学习',
  '健康生活',
] as const;

/**
 * 体裁选项
 */
export const GENRE_OPTIONS = [
  '记叙文',
  '说明文',
  '议论文',
  '应用文',
  '散文',
  '小说',
  '诗歌',
] as const;

/**
 * 词性选项
 */
export const PART_OF_SPEECH_OPTIONS = [
  { value: 'n', label: 'n. 名词' },
  { value: 'v', label: 'v. 动词' },
  { value: 'adj', label: 'adj. 形容词' },
  { value: 'adv', label: 'adv. 副词' },
  { value: 'prep', label: 'prep. 介词' },
  { value: 'conj', label: 'conj. 连词' },
  { value: 'pron', label: 'pron. 代词' },
  { value: 'num', label: 'num. 数词' },
  { value: 'art', label: 'art. 冠词' },
  { value: 'int', label: 'int. 感叹词' },
] as const;

/**
 * 题型选项
 */
export const QUESTION_TYPE_OPTIONS = [
  '细节理解题',
  '词义猜测题',
  '主旨大意题',
  '推理判断题',
  '态度观点题',
  '信息定位题',
  '事实查找题',
  '因果关系题',
  '段落排序题',
  '结构分析题',
  '过渡句理解题',
  '标题选择题',
  '快速浏览题',
] as const;

/**
 * 能力标签映射
 */
export const ABILITY_LABELS = {
  precisePositioning: '精准定位',
  logicalDeduction: '逻辑推演',
  macroStructure: '宏观结构',
  contextualDecoding: '语境解码',
  strategyExecution: '策略执行',
} as const;

/**
 * 能力颜色映射
 */
export const ABILITY_COLORS = {
  precisePositioning: COLOR_THEMES.BLUE,
  logicalDeduction: COLOR_THEMES.GRAY,
  macroStructure: COLOR_THEMES.YELLOW,
  contextualDecoding: COLOR_THEMES.GREEN,
  strategyExecution: COLOR_THEMES.PURPLE,
} as const;

/**
 * 技能卡图标映射（根据标题）
 */
export const SKILL_CARD_ICON_MAP = {
  GPS: 'Target',
  定位: 'Target',
  逻辑: 'Brain',
  推演: 'Brain',
  速读: 'Zap',
  闪电: 'Zap',
  结构: 'Layout',
  透视: 'Layout',
} as const;

/**
 * 默认值
 */
export const DEFAULTS = {
  DATE: '2023.10.24',
  STUDENT_NAME: 'Alex',
  ARTICLES_COUNT: 2,
  WORDS_READ: 450,
  FOCUS_DURATION: 18,
  DATE_FORMAT: 'YYYY.MM.DD',
} as const;

/**
 * 配置项
 */
export const CONFIG = {
  MAX_FILE_LINES: 500,
  MAX_MODAL_HEIGHT: '90vh',
  SCROLLBAR_WIDTH: 'thin',
  ANIMATION_DURATION: 200,
} as const;

