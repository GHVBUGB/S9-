import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Edit2, Plus, Trash2 } from 'lucide-react';
import { LessonRecord, VocabData, SentenceData } from '../../types';

interface EditModalProps {
  lesson: LessonRecord;
  onSave: (updatedLesson: LessonRecord) => void;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ lesson, onSave, onClose }) => {
  const [editedLesson, setEditedLesson] = useState<LessonRecord>(lesson);
  const [activeTab, setActiveTab] = useState<string>('basic');

  useEffect(() => {
    setEditedLesson(lesson);
  }, [lesson]);

  const handleSave = () => {
    onSave(editedLesson);
    onClose();
  };

  const updateField = (path: string[], value: any) => {
    setEditedLesson(prev => {
      const newLesson = { ...prev };
      let current: any = newLesson;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] = { ...current[path[i]] };
      }
      current[path[path.length - 1]] = value;
      return newLesson;
    });
  };

  const updateArrayItem = (path: string[], index: number, value: any) => {
    setEditedLesson(prev => {
      const newLesson = { ...prev };
      let current: any = newLesson;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]] = [...(current[path[i]] || [])];
      }
      current[index] = { ...current[index], ...value };
      return newLesson;
    });
  };

  const addArrayItem = (path: string[], newItem: any) => {
    setEditedLesson(prev => {
      const newLesson = { ...prev };
      let current: any = newLesson;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] = { ...current[path[i]] };
      }
      const array = current[path[path.length - 1]] = [...(current[path[path.length - 1]] || [])];
      array.push(newItem);
      return newLesson;
    });
  };

  const removeArrayItem = (path: string[], index: number) => {
    setEditedLesson(prev => {
      const newLesson = { ...prev };
      let current: any = newLesson;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] = { ...current[path[i]] };
      }
      const array = current[path[path.length - 1]] = [...(current[path[path.length - 1]] || [])];
      array.splice(index, 1);
      return newLesson;
    });
  };

  const tabs = [
    { id: 'basic', label: '基本信息' },
    { id: 'ability', label: '能力分数' },
    { id: 'passport', label: '主题护照' },
    { id: 'skills', label: '技能卡' },
    { id: 'vocab', label: '生词' },
    { id: 'sentences', label: '难句' },
    { id: 'goals', label: '今日目标' },
    { id: 'trends', label: '趋势数据' },
    { id: 'period', label: '周期对比' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2rem] relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black font-serif text-gray-900">编辑报告数据</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 border-b border-gray-200 px-6 overflow-x-auto bg-white">
          <div className="flex gap-2 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-bold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          {/* Basic Info */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">日期</label>
                  <input
                    type="text"
                    placeholder="例如: 2023.10.24"
                    value={editedLesson.date}
                    onChange={(e) => updateField(['date'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">标题</label>
                  <input
                    type="text"
                    value={editedLesson.title}
                    onChange={(e) => updateField(['title'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">单元</label>
                  <input
                    type="text"
                    value={editedLesson.unit}
                    onChange={(e) => updateField(['unit'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">阅读篇数</label>
                  <input
                    type="number"
                    value={editedLesson.articlesCount}
                    onChange={(e) => updateField(['articlesCount'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">阅读字数</label>
                  <input
                    type="number"
                    value={editedLesson.wordsRead}
                    onChange={(e) => updateField(['wordsRead'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">专注时长（分钟）</label>
                  <input
                    type="number"
                    value={editedLesson.focusDuration}
                    onChange={(e) => updateField(['focusDuration'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Ability Scores */}
          {activeTab === 'ability' && (
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(editedLesson.abilityScores).map((key) => {
                const labelMap: Record<string, string> = {
                  precisePositioning: '精准定位',
                  logicalDeduction: '逻辑推演',
                  macroStructure: '宏观结构',
                  contextualDecoding: '语境解码',
                  strategyExecution: '策略执行'
                };
                return (
                  <div key={key}>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">{labelMap[key] || key}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedLesson.abilityScores[key as keyof typeof editedLesson.abilityScores]}
                      onChange={(e) => {
                        const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                        updateField(['abilityScores', key], val);
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Subject Passport */}
          {activeTab === 'passport' && editedLesson.subjectPassport && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">文章标题</label>
                <input
                  type="text"
                  value={editedLesson.subjectPassport.articleTitle}
                  onChange={(e) => updateField(['subjectPassport', 'articleTitle'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">单元进度</label>
                <input
                  type="text"
                  value={editedLesson.subjectPassport.unitProgress}
                  onChange={(e) => updateField(['subjectPassport', 'unitProgress'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">主题</label>
                  <select
                    value={editedLesson.subjectPassport.theme}
                    onChange={(e) => updateField(['subjectPassport', 'theme'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="人与自然">人与自然</option>
                    <option value="人与社会">人与社会</option>
                    <option value="人与自我">人与自我</option>
                    <option value="科技发展">科技发展</option>
                    <option value="文化传承">文化传承</option>
                    <option value="环境保护">环境保护</option>
                    <option value="教育学习">教育学习</option>
                    <option value="健康生活">健康生活</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">体裁</label>
                  <select
                    value={editedLesson.subjectPassport.genre}
                    onChange={(e) => updateField(['subjectPassport', 'genre'], e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="记叙文">记叙文</option>
                    <option value="说明文">说明文</option>
                    <option value="议论文">议论文</option>
                    <option value="应用文">应用文</option>
                    <option value="散文">散文</option>
                    <option value="小说">小说</option>
                    <option value="诗歌">诗歌</option>
                  </select>
                </div>
            </div>
          )}

          {/* Skill Cards */}
          {activeTab === 'skills' && editedLesson.skillCards && (
            <div className="space-y-4">
              {editedLesson.skillCards.map((card, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-gray-900">技能卡 {idx + 1}</h5>
                    <button
                      onClick={() => removeArrayItem(['skillCards'], idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">标题</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">等级</label>
                      <input
                        type="text"
                        value={card.level}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">进度</label>
                      <input
                        type="number"
                        value={card.progress}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { progress: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">状态</label>
                      <select
                        value={card.status}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { status: e.target.value as 'active' | 'locked' })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="active">已解锁</option>
                        <option value="locked">已锁定</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-gray-500 mb-1 block">描述</label>
                      <input
                        type="text"
                        value={card.desc}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { desc: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-gray-500 mb-1 block">完整描述</label>
                      <textarea
                        value={card.fullDesc || ''}
                        onChange={(e) => updateArrayItem(['skillCards'], idx, { fullDesc: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vocabulary */}
          {activeTab === 'vocab' && editedLesson.vocabulary && (
            <div className="space-y-4">
              {editedLesson.vocabulary.map((word, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-gray-900">生词 {idx + 1}</h5>
                    <button
                      onClick={() => removeArrayItem(['vocabulary'], idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">单词</label>
                      <input
                        type="text"
                        value={word.word}
                        onChange={(e) => updateArrayItem(['vocabulary'], idx, { word: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">词性</label>
                      <select
                        value={word.partOfSpeech.split('.')[0] || 'n'}
                        onChange={(e) => {
                          const currentMeaning = word.partOfSpeech.includes('.') ? word.partOfSpeech.split('.')[1]?.trim() || word.meaning : word.meaning;
                          updateArrayItem(['vocabulary'], idx, { partOfSpeech: `${e.target.value}. ${currentMeaning}` });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="n">n. 名词</option>
                        <option value="v">v. 动词</option>
                        <option value="adj">adj. 形容词</option>
                        <option value="adv">adv. 副词</option>
                        <option value="prep">prep. 介词</option>
                        <option value="conj">conj. 连词</option>
                        <option value="pron">pron. 代词</option>
                        <option value="num">num. 数词</option>
                        <option value="art">art. 冠词</option>
                        <option value="int">int. 感叹词</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">意思</label>
                      <input
                        type="text"
                        value={word.meaning}
                        onChange={(e) => updateArrayItem(['vocabulary'], idx, { meaning: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">状态</label>
                      <select
                        value={word.status}
                        onChange={(e) => updateArrayItem(['vocabulary'], idx, { status: e.target.value as 'mastered' | 'review' })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="mastered">已掌握</option>
                        <option value="review">需复习</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-gray-500 mb-1 block">语境例句</label>
                      <textarea
                        value={word.context}
                        onChange={(e) => updateArrayItem(['vocabulary'], idx, { context: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">来源文章</label>
                      <input
                        type="text"
                        value={word.sourceTitle}
                        onChange={(e) => updateArrayItem(['vocabulary'], idx, { sourceTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    {word.status === 'review' && (
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">复习次数</label>
                        <input
                          type="number"
                          value={word.reviewCount || 1}
                          onChange={(e) => updateArrayItem(['vocabulary'], idx, { reviewCount: parseInt(e.target.value) || 1 })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sentences */}
          {activeTab === 'sentences' && editedLesson.sentences && (
            <div className="space-y-4">
              {editedLesson.sentences.map((sentence, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-gray-900">难句 {idx + 1}</h5>
                    <button
                      onClick={() => removeArrayItem(['sentences'], idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">句子</label>
                      <textarea
                        value={sentence.text}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { text: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">难度</label>
                      <select
                        value={sentence.difficulty}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { difficulty: e.target.value as 'hard' | 'medium' | 'easy' })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="easy">简单</option>
                        <option value="medium">中等</option>
                        <option value="hard">困难</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">翻译</label>
                      <textarea
                        value={sentence.translation}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { translation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">解析</label>
                      <textarea
                        value={sentence.analysis}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { analysis: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">关键知识点（用逗号分隔）</label>
                      <input
                        type="text"
                        value={sentence.keyPoints?.join(', ') || ''}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { keyPoints: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">来源文章</label>
                      <input
                        type="text"
                        value={sentence.sourceTitle || ''}
                        onChange={(e) => updateArrayItem(['sentences'], idx, { sourceTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Training Goals */}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              {(editedLesson.trainingGoals || [
                { type: '细节理解题', count: 2, color: 'blue' },
                { type: '词义猜测题', count: 1, color: 'purple' }
              ]).map((goal, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-gray-900">目标 {idx + 1}</h5>
                    <button
                      onClick={() => {
                        const newGoals = [...(editedLesson.trainingGoals || [])];
                        newGoals.splice(idx, 1);
                        updateField(['trainingGoals'], newGoals);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">题型名称</label>
                      <input
                        type="text"
                        value={goal.type}
                        onChange={(e) => {
                          const newGoals = [...(editedLesson.trainingGoals || [])];
                          newGoals[idx] = { ...newGoals[idx], type: e.target.value };
                          updateField(['trainingGoals'], newGoals);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">目标数量</label>
                      <input
                        type="number"
                        value={goal.count}
                        onChange={(e) => {
                          const newGoals = [...(editedLesson.trainingGoals || [])];
                          newGoals[idx] = { ...newGoals[idx], count: parseInt(e.target.value) || 0 };
                          updateField(['trainingGoals'], newGoals);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">颜色主题</label>
                      <select
                        value={goal.color}
                        onChange={(e) => {
                          const newGoals = [...(editedLesson.trainingGoals || [])];
                          newGoals[idx] = { ...newGoals[idx], color: e.target.value as 'blue' | 'purple' | 'green' | 'orange' };
                          updateField(['trainingGoals'], newGoals);
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="blue">蓝色</option>
                        <option value="purple">紫色</option>
                        <option value="green">绿色</option>
                        <option value="orange">橙色</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newGoals = [...(editedLesson.trainingGoals || []), { type: '新题型', count: 1, color: 'blue' as const }];
                  updateField(['trainingGoals'], newGoals);
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加目标
              </button>
            </div>
          )}

          {/* Trends */}
          {activeTab === 'trends' && editedLesson.trends && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4">盲猜率趋势</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">当前盲猜率（%）</label>
                    <input
                      type="number"
                      value={editedLesson.trends.guessRate.current}
                      onChange={(e) => updateField(['trends', 'guessRate', 'current'], parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">变化率（%）</label>
                    <input
                      type="number"
                      value={editedLesson.trends.guessRate.change}
                      onChange={(e) => updateField(['trends', 'guessRate', 'change'], parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-500 mb-2 block">趋势数据（每天的值）</label>
                  <div className="space-y-2">
                    {editedLesson.trends.guessRate.data.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item.day}
                          onChange={(e) => {
                            const newData = [...editedLesson.trends!.guessRate.data];
                            newData[idx] = { ...newData[idx], day: e.target.value };
                            updateField(['trends', 'guessRate', 'data'], newData);
                          }}
                          className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="日期"
                        />
                        <input
                          type="number"
                          value={item.value}
                          onChange={(e) => {
                            const newData = [...editedLesson.trends!.guessRate.data];
                            newData[idx] = { ...newData[idx], value: parseInt(e.target.value) || 0 };
                            updateField(['trends', 'guessRate', 'data'], newData);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="值"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Period Comparison */}
          {activeTab === 'period' && editedLesson.periodComparison && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4">本周与上周对比</h5>
                <div className="space-y-3">
                  {editedLesson.periodComparison.week.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-5 gap-2 items-end">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">标签</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const newWeek = [...editedLesson.periodComparison!.week];
                            newWeek[idx] = { ...newWeek[idx], label: e.target.value };
                            updateField(['periodComparison', 'week'], newWeek);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">当前值</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => {
                            const newWeek = [...editedLesson.periodComparison!.week];
                            newWeek[idx] = { ...newWeek[idx], value: e.target.value };
                            updateField(['periodComparison', 'week'], newWeek);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">单位</label>
                        <input
                          type="text"
                          value={item.unit || ''}
                          onChange={(e) => {
                            const newWeek = [...editedLesson.periodComparison!.week];
                            newWeek[idx] = { ...newWeek[idx], unit: e.target.value };
                            updateField(['periodComparison', 'week'], newWeek);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">变化率（%）</label>
                        <input
                          type="number"
                          value={item.change}
                          onChange={(e) => {
                            const newWeek = [...editedLesson.periodComparison!.week];
                            newWeek[idx] = { ...newWeek[idx], change: parseFloat(e.target.value) || 0 };
                            updateField(['periodComparison', 'week'], newWeek);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">上期值</label>
                        <input
                          type="text"
                          value={item.prevValue}
                          onChange={(e) => {
                            const newWeek = [...editedLesson.periodComparison!.week];
                            newWeek[idx] = { ...newWeek[idx], prevValue: e.target.value };
                            updateField(['periodComparison', 'week'], newWeek);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4">本月与上月对比</h5>
                <div className="space-y-3">
                  {editedLesson.periodComparison.month.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-5 gap-2 items-end">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">标签</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const newMonth = [...editedLesson.periodComparison!.month];
                            newMonth[idx] = { ...newMonth[idx], label: e.target.value };
                            updateField(['periodComparison', 'month'], newMonth);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">当前值</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => {
                            const newMonth = [...editedLesson.periodComparison!.month];
                            newMonth[idx] = { ...newMonth[idx], value: e.target.value };
                            updateField(['periodComparison', 'month'], newMonth);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">单位</label>
                        <input
                          type="text"
                          value={item.unit || ''}
                          onChange={(e) => {
                            const newMonth = [...editedLesson.periodComparison!.month];
                            newMonth[idx] = { ...newMonth[idx], unit: e.target.value };
                            updateField(['periodComparison', 'month'], newMonth);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">变化率（%）</label>
                        <input
                          type="number"
                          value={item.change}
                          onChange={(e) => {
                            const newMonth = [...editedLesson.periodComparison!.month];
                            newMonth[idx] = { ...newMonth[idx], change: parseFloat(e.target.value) || 0 };
                            updateField(['periodComparison', 'month'], newMonth);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">上期值</label>
                        <input
                          type="text"
                          value={item.prevValue}
                          onChange={(e) => {
                            const newMonth = [...editedLesson.periodComparison!.month];
                            newMonth[idx] = { ...newMonth[idx], prevValue: e.target.value };
                            updateField(['periodComparison', 'month'], newMonth);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 shadow-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            保存更改
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
