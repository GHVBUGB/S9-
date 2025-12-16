import { StudentReport } from './types';

/**
 * 模拟学生数据
 * 在实际应用中，这些数据应该从数据库API获取
 * 
 * 数据结构说明：
 * - student: 学生基本信息
 * - latestLesson: 最近一节课的记录（包含所有模块的完整数据）
 * - historyLessons: 历史课程记录列表（按时间倒序）
 * 
 * 注意：此数据结构作为模板，后续接入数据库时，所有学生都需要包含这些字段
 */
export const MOCK_STUDENTS: Record<string, StudentReport> = {
  // 学生ID: 1001 - 李明（测试学生）
  '1001': {
    student: {
      id: '1001',
      name: '李明',
      level: 'S9 进阶阅读计划'
    },
    latestLesson: {
      id: 'lesson-1001-001',
      date: '2023.10.24',
      title: '苏珊和她的猫',
      unit: 'Unit 1: My Pet',
      articlesCount: 2,
      wordsRead: 450,
      focusDuration: 18,
      accuracy: 85,
      abilityScores: {
        precisePositioning: 85,
        logicalDeduction: 70,
        macroStructure: 60,
        contextualDecoding: 90,
        strategyExecution: 75
      },
      subjectPassport: {
        coverImage: '/susan-and-cat.png',
        articleTitle: 'Susan and Her Cat',
        unitProgress: '1/4',
        unitTotal: 4,
        theme: '人与自然',
        genre: '记叙文'
      },
      trainingGoals: [
        { type: '细节理解题', count: 2, color: 'blue' },
        { type: '词义猜测题', count: 1, color: 'purple' }
      ],
      skillCards: [
        {
          title: 'GPS定位卡',
          level: 'LV.3',
          progress: 65,
          total: 100,
          status: 'active',
          desc: '精准定位',
          fullDesc: 'GPS定位卡帮助你快速定位文章中的关键细节信息，精准找到答案所在位置。',
          questionTypes: ['细节理解题', '信息定位题', '事实查找题'],
          tips: '阅读题目后，先在脑海中标记关键词，然后在文章中快速扫描定位。',
          stats: { level: 3, exp: 650, usage: 12 }
        },
        {
          title: '逻辑推演卡',
          level: 'LV.0',
          progress: 0,
          total: 100,
          status: 'locked',
          desc: '待解锁',
          fullDesc: '逻辑推演卡帮助你分析文章的逻辑关系，推断作者的隐含意思。',
          questionTypes: ['推理判断题', '态度观点题', '因果关系题'],
          tips: '关注转折词、因果词，理清文章的逻辑脉络。',
          unlockCondition: '完成更多相关题型训练即可解锁此技能卡'
        },
        {
          title: '速读闪电卡',
          level: 'LV.0',
          progress: 0,
          total: 100,
          status: 'locked',
          desc: '待解锁',
          fullDesc: '速读闪电卡帮助你提高阅读速度，在有限时间内获取更多信息。',
          questionTypes: ['主旨大意题', '标题选择题', '快速浏览题'],
          tips: '先读首尾段，再读每段首句，快速抓住文章主旨。',
          unlockCondition: '完成更多相关题型训练即可解锁此技能卡'
        },
        {
          title: '结构透视卡',
          level: 'LV.0',
          progress: 0,
          total: 100,
          status: 'locked',
          desc: '待解锁',
          fullDesc: '结构透视卡帮助你理解文章的整体结构，把握段落之间的关系。',
          questionTypes: ['段落排序题', '结构分析题', '过渡句理解题'],
          tips: '绘制文章结构图，理清论点与论据的关系。',
          unlockCondition: '完成更多相关题型训练即可解锁此技能卡'
        }
      ],
      vocabulary: [
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
      ],
      sentences: [
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
      ],
      trends: {
        readingSpeed: {
          current: 156,
          change: 30,
          data: [
            { day: '周二', value: 120 },
            { day: '周三', value: 130 },
            { day: '周四', value: 140 },
            { day: '周五', value: 145 },
            { day: '周六', value: 150 },
            { day: '周日', value: 156 }
          ]
        },
        guessRate: {
          current: 5,
          change: -58.3,
          data: [
            { day: '周二', value: 40 },
            { day: '周三', value: 35 },
            { day: '周四', value: 28 },
            { day: '周五', value: 20 },
            { day: '周六', value: 15 },
            { day: '周日', value: 5 }
          ]
        }
      },
      periodComparison: {
        week: [
          { label: '阅读篇数', value: 14, unit: '篇', change: 40.0, prevValue: 10, diff: 4 },
          { label: '阅读字数', value: '3.2k', unit: '词', change: 14.3, prevValue: '2.8k', diff: 400 },
          { label: '专注时长', value: 126, unit: '分钟', change: 28.6, prevValue: 98, diff: 28 },
          { label: '答题正确率', value: '85%', unit: '', change: 9.0, prevValue: '78%', diff: 7 },
          { label: '盲猜率', value: '5%', unit: '', change: -58.3, prevValue: '12%', diff: -7, reverseColor: true },
          { label: '新掌握词汇', value: 28, unit: '词', change: 40.0, prevValue: 20, diff: 8 }
        ],
        month: [
          { label: '阅读篇数', value: 56, unit: '篇', change: 33.3, prevValue: 42, diff: 14 },
          { label: '阅读字数', value: '12.8k', unit: '词', change: 33.3, prevValue: '9.6k', diff: 3200 },
          { label: '专注时长', value: 480, unit: '分钟', change: 26.3, prevValue: 380, diff: 100 },
          { label: '答题正确率', value: '88%', unit: '', change: 17.3, prevValue: '75%', diff: 13 },
          { label: '盲猜率', value: '5%', unit: '', change: -80.0, prevValue: '25%', diff: -20, reverseColor: true },
          { label: '新掌握词汇', value: 112, unit: '词', change: 43.6, prevValue: 78, diff: 34 }
        ]
      }
    },
    historyLessons: [
      {
        id: 'lesson-1001-001',
        date: '2023.10.25',
        title: 'Green Energy Future',
        unit: 'Unit 2: Environment',
        articlesCount: 3,
        wordsRead: 680,
        focusDuration: 25,
        accuracy: 88,
        abilityScores: {
          precisePositioning: 88,
          logicalDeduction: 75,
          macroStructure: 70,
          contextualDecoding: 92,
          strategyExecution: 80
        },
        subjectPassport: {
          coverImage: '/susan-and-cat.png',
          articleTitle: 'Green Energy Future',
          unitProgress: '2/4',
          unitTotal: 4,
          theme: '人与自然',
          genre: '说明文'
        },
        skillCards: [
          { title: 'GPS定位卡', level: 'LV.4', progress: 88, total: 100, status: 'active', desc: '精准定位' },
          { title: '逻辑推演卡', level: 'LV.2', progress: 75, total: 100, status: 'active', desc: '逻辑推演' },
          { title: '速读闪电卡', level: 'LV.0', progress: 0, total: 100, status: 'locked', desc: '待解锁' },
          { title: '结构透视卡', level: 'LV.1', progress: 70, total: 100, status: 'active', desc: '宏观结构' }
        ],
        vocabulary: [
          { word: 'renewable', partOfSpeech: 'adj. 可再生的', meaning: '可再生的', status: 'mastered', context: 'Renewable energy sources are vital for our future.', sourceTitle: 'Green Energy Future' },
          { word: 'pollution', partOfSpeech: 'n. 污染', meaning: '污染', status: 'review', reviewCount: 1, context: 'Ocean pollution is a serious problem.', sourceTitle: 'Ocean Pollution' },
          { word: 'sustainable', partOfSpeech: 'adj. 可持续的', meaning: '可持续的', status: 'mastered', context: 'We need sustainable development.', sourceTitle: 'Green Energy Future' }
        ],
        sentences: [
          { text: 'The transition to renewable energy is not just an environmental necessity but an economic opportunity that could reshape global markets.', difficulty: 'hard', translation: '向可再生能源的转型不仅是环境必需，也是一个可能重塑全球市场的经济机遇。', analysis: '这是一个并列结构的复杂句。主句由"not just...but..."连接两个并列成分。', keyPoints: ['not just...but... 并列结构', '定语从句修饰 opportunity'], sourceTitle: 'Green Energy Future' },
          { text: 'Climate change poses significant challenges to sustainable development worldwide.', difficulty: 'medium', translation: '气候变化对全球可持续发展构成重大挑战。', analysis: 'poses challenges to 为固定搭配，表示"对...构成挑战"。', keyPoints: ['pose challenges to 对...构成挑战', 'sustainable development 可持续发展'], sourceTitle: 'Climate Change' }
        ],
        trends: {
          readingSpeed: {
            current: 180,
            change: 25,
            data: [
              { day: '周二', value: 150 },
              { day: '周三', value: 160 },
              { day: '周四', value: 165 },
              { day: '周五', value: 170 },
              { day: '周六', value: 175 },
              { day: '周日', value: 180 }
            ]
          },
          guessRate: {
            current: 5,
            change: -62.5,
            data: [
              { day: '周二', value: 15 },
              { day: '周三', value: 12 },
              { day: '周四', value: 10 },
              { day: '周五', value: 8 },
              { day: '周六', value: 6 },
              { day: '周日', value: 5 }
            ]
          }
        },
        periodComparison: {
          week: [
            { label: '阅读篇数', value: 18, unit: '篇', change: 50.0, prevValue: 12, diff: 6 },
            { label: '阅读字数', value: '4.2k', unit: '词', change: 20.0, prevValue: '3.5k', diff: 700 },
            { label: '专注时长', value: 150, unit: '分钟', change: 25.0, prevValue: 120, diff: 30 },
            { label: '答题正确率', value: '88%', unit: '', change: 12.8, prevValue: '78%', diff: 10 },
            { label: '盲猜率', value: '5%', unit: '', change: -62.5, prevValue: '15%', diff: -10, reverseColor: true },
            { label: '新掌握词汇', value: 35, unit: '词', change: 52.2, prevValue: 23, diff: 12 }
          ],
          month: [
            { label: '阅读篇数', value: 72, unit: '篇', change: 44.0, prevValue: 50, diff: 22 },
            { label: '阅读字数', value: '16.8k', unit: '词', change: 40.0, prevValue: '12k', diff: 4800 },
            { label: '专注时长', value: 600, unit: '分钟', change: 33.3, prevValue: 450, diff: 150 },
            { label: '答题正确率', value: '90%', unit: '', change: 20.0, prevValue: '75%', diff: 15 },
            { label: '盲猜率', value: '5%', unit: '', change: -75.0, prevValue: '20%', diff: -15, reverseColor: true },
            { label: '新掌握词汇', value: 140, unit: '词', change: 55.6, prevValue: 90, diff: 50 }
          ]
        }
      },
      {
        id: 'lesson-1001-002',
        date: '2023.10.22',
        title: 'Ocean Pollution',
        unit: 'Unit 2: Environment',
        articlesCount: 2,
        wordsRead: 520,
        focusDuration: 22,
        accuracy: 85,
        abilityScores: {
          precisePositioning: 85,
          logicalDeduction: 72,
          macroStructure: 68,
          contextualDecoding: 90,
          strategyExecution: 78
        },
        subjectPassport: {
          coverImage: '/susan-and-cat.png',
          articleTitle: 'Ocean Pollution',
          unitProgress: '2/4',
          unitTotal: 4,
          theme: '人与自然',
          genre: '说明文'
        },
        skillCards: [
          { title: 'GPS定位卡', level: 'LV.3', progress: 85, total: 100, status: 'active', desc: '精准定位' },
          { title: '逻辑推演卡', level: 'LV.2', progress: 72, total: 100, status: 'active', desc: '逻辑推演' },
          { title: '速读闪电卡', level: 'LV.0', progress: 0, total: 100, status: 'locked', desc: '待解锁' },
          { title: '结构透视卡', level: 'LV.1', progress: 68, total: 100, status: 'active', desc: '宏观结构' }
        ],
        vocabulary: [
          { word: 'pollution', partOfSpeech: 'n. 污染', meaning: '污染', status: 'review', reviewCount: 2, context: 'Ocean pollution is a serious problem.', sourceTitle: 'Ocean Pollution' },
          { word: 'marine', partOfSpeech: 'adj. 海洋的', meaning: '海洋的', status: 'mastered', context: 'Marine life is affected by pollution.', sourceTitle: 'Ocean Pollution' }
        ],
        sentences: [
          { text: 'The ocean pollution has become a global crisis that requires immediate action.', difficulty: 'hard', translation: '海洋污染已成为需要立即采取行动的全球危机。', analysis: 'that引导定语从句修饰crisis。', keyPoints: ['定语从句', 'require action 需要采取行动'], sourceTitle: 'Ocean Pollution' }
        ],
        trends: {
          readingSpeed: {
            current: 175,
            change: 20,
            data: [
              { day: '周二', value: 145 },
              { day: '周三', value: 155 },
              { day: '周四', value: 160 },
              { day: '周五', value: 165 },
              { day: '周六', value: 170 },
              { day: '周日', value: 175 }
            ]
          },
          guessRate: {
            current: 6,
            change: -60,
            data: [
              { day: '周二', value: 16 },
              { day: '周三', value: 13 },
              { day: '周四', value: 11 },
              { day: '周五', value: 9 },
              { day: '周六', value: 7 },
              { day: '周日', value: 6 }
            ]
          }
        },
        periodComparison: {
          week: [
            { label: '阅读篇数', value: 16, unit: '篇', change: 45.5, prevValue: 11, diff: 5 },
            { label: '阅读字数', value: '3.8k', unit: '词', change: 18.8, prevValue: '3.2k', diff: 600 },
            { label: '专注时长', value: 140, unit: '分钟', change: 22.8, prevValue: 114, diff: 26 },
            { label: '答题正确率', value: '85%', unit: '', change: 10.4, prevValue: '77%', diff: 8 },
            { label: '盲猜率', value: '6%', unit: '', change: -60.0, prevValue: '15%', diff: -9, reverseColor: true },
            { label: '新掌握词汇', value: 32, unit: '词', change: 48.1, prevValue: 22, diff: 10 }
          ],
          month: [
            { label: '阅读篇数', value: 68, unit: '篇', change: 41.7, prevValue: 48, diff: 20 },
            { label: '阅读字数', value: '15.2k', unit: '词', change: 38.2, prevValue: '11k', diff: 4200 },
            { label: '专注时长', value: 580, unit: '分钟', change: 31.8, prevValue: 440, diff: 140 },
            { label: '答题正确率', value: '89%', unit: '', change: 18.7, prevValue: '75%', diff: 14 },
            { label: '盲猜率', value: '6%', unit: '', change: -70.0, prevValue: '20%', diff: -14, reverseColor: true },
            { label: '新掌握词汇', value: 135, unit: '词', change: 54.0, prevValue: 88, diff: 47 }
          ]
        }
      },
      {
        id: 'lesson-1001-003',
        date: '2023.10.19',
        title: 'Climate Change',
        unit: 'Unit 2: Environment',
        articlesCount: 2,
        wordsRead: 580,
        focusDuration: 24,
        accuracy: 86,
        abilityScores: {
          precisePositioning: 86,
          logicalDeduction: 74,
          macroStructure: 69,
          contextualDecoding: 91,
          strategyExecution: 79
        },
        subjectPassport: {
          coverImage: '/susan-and-cat.png',
          articleTitle: 'Climate Change',
          unitProgress: '2/4',
          unitTotal: 4,
          theme: '人与自然',
          genre: '说明文'
        },
        skillCards: [
          { title: 'GPS定位卡', level: 'LV.3', progress: 86, total: 100, status: 'active', desc: '精准定位' },
          { title: '逻辑推演卡', level: 'LV.2', progress: 74, total: 100, status: 'active', desc: '逻辑推演' },
          { title: '速读闪电卡', level: 'LV.0', progress: 0, total: 100, status: 'locked', desc: '待解锁' },
          { title: '结构透视卡', level: 'LV.1', progress: 69, total: 100, status: 'active', desc: '宏观结构' }
        ],
        vocabulary: [
          { word: 'climate', partOfSpeech: 'n. 气候', meaning: '气候', status: 'mastered', context: 'Climate change is a global issue.', sourceTitle: 'Climate Change' },
          { word: 'emission', partOfSpeech: 'n. 排放', meaning: '排放', status: 'review', reviewCount: 1, context: 'Carbon emissions contribute to climate change.', sourceTitle: 'Climate Change' }
        ],
        sentences: [
          { text: 'Climate change poses significant challenges to sustainable development worldwide.', difficulty: 'medium', translation: '气候变化对全球可持续发展构成重大挑战。', analysis: 'poses challenges to 为固定搭配，表示"对...构成挑战"。', keyPoints: ['pose challenges to 对...构成挑战', 'sustainable development 可持续发展'], sourceTitle: 'Climate Change' }
        ],
        trends: {
          readingSpeed: {
            current: 170,
            change: 18,
            data: [
              { day: '周二', value: 142 },
              { day: '周三', value: 152 },
              { day: '周四', value: 158 },
              { day: '周五', value: 163 },
              { day: '周六', value: 167 },
              { day: '周日', value: 170 }
            ]
          },
          guessRate: {
            current: 7,
            change: -56.3,
            data: [
              { day: '周二', value: 17 },
              { day: '周三', value: 14 },
              { day: '周四', value: 12 },
              { day: '周五', value: 10 },
              { day: '周六', value: 8 },
              { day: '周日', value: 7 }
            ]
          }
        },
        periodComparison: {
          week: [
            { label: '阅读篇数', value: 14, unit: '篇', change: 40.0, prevValue: 10, diff: 4 },
            { label: '阅读字数', value: '3.5k', unit: '词', change: 16.7, prevValue: '3k', diff: 500 },
            { label: '专注时长', value: 130, unit: '分钟', change: 20.4, prevValue: 108, diff: 22 },
            { label: '答题正确率', value: '86%', unit: '', change: 9.0, prevValue: '79%', diff: 7 },
            { label: '盲猜率', value: '7%', unit: '', change: -56.3, prevValue: '16%', diff: -9, reverseColor: true },
            { label: '新掌握词汇', value: 28, unit: '词', change: 40.0, prevValue: 20, diff: 8 }
          ],
          month: [
            { label: '阅读篇数', value: 64, unit: '篇', change: 39.1, prevValue: 46, diff: 18 },
            { label: '阅读字数', value: '14.5k', unit: '词', change: 36.8, prevValue: '10.6k', diff: 3900 },
            { label: '专注时长', value: 560, unit: '分钟', change: 30.2, prevValue: 430, diff: 130 },
            { label: '答题正确率', value: '88%', unit: '', change: 17.3, prevValue: '75%', diff: 13 },
            { label: '盲猜率', value: '7%', unit: '', change: -65.0, prevValue: '20%', diff: -13, reverseColor: true },
            { label: '新掌握词汇', value: 130, unit: '词', change: 52.9, prevValue: 85, diff: 45 }
          ]
        }
      }
    ]
  }
};

/**
 * 获取所有学生ID列表（用于测试和调试）
 */
export const getAllStudentIds = (): string[] => {
  return Object.keys(MOCK_STUDENTS);
};

/**
 * 根据学生ID获取学生报告
 * @param studentId 学生ID
 * @returns 学生报告或null
 */
export const getStudentReport = (studentId: string): StudentReport | null => {
  return MOCK_STUDENTS[studentId] || null;
};
