# EditModal 组件模块

## 模块说明
编辑课程数据的弹窗组件，原文件849行已拆分为多个子组件。

## 文件结构
```
EditModal/
├── index.tsx              # 主弹窗容器（~150行）
├── BasicInfoForm.tsx      # 基础信息表单
├── AbilityScoresForm.tsx  # 能力分数表单
├── SubjectPassportForm.tsx# 主题护照表单
├── SkillCardsForm.tsx     # 技能卡管理
├── VocabularyForm.tsx     # 生词管理
├── SentencesForm.tsx      # 难句管理
├── TrainingGoalsForm.tsx  # 训练目标
├── TrendsForm.tsx         # 趋势数据
├── PeriodComparisonForm.tsx # 周期对比
└── README.md              # 本文档
```

## 组件职责

### index.tsx
- 弹窗容器
- 标签页切换逻辑
- 数据保存和取消逻辑
- 通用的数据更新函数（updateField, updateArrayItem等）

### BasicInfoForm.tsx
- 日期、单元、阅读篇数、字数、专注时长等基础字段

### AbilityScoresForm.tsx
- 五维能力分数编辑

### SubjectPassportForm.tsx
- 主题护照信息编辑

### SkillCardsForm.tsx
- 技能卡列表管理（增删改）

### VocabularyForm.tsx
- 生词列表管理（增删改）

### SentencesForm.tsx
- 难句列表管理（增删改）

### TrainingGoalsForm.tsx
- 今日训练目标列表管理

### TrendsForm.tsx
- 趋势数据编辑

### PeriodComparisonForm.tsx
- 周期对比数据编辑

## 使用示例
```tsx
import { EditModal } from '@/components/Teacher/EditModal';

<EditModal
  lesson={lessonData}
  onSave={handleSave}
  onClose={handleClose}
/>
```




