import React, { useState } from 'react';
import { BookOpen, Clock, Target, MapPin, Lock, Zap, Brain, Layout, Scissors, Play, Eye, TrendingUp } from 'lucide-react';
import { LessonRecord, StudentInfo, VocabData, SentenceData } from '../../types';
import { AbilityRadar } from '../Charts/RadarChart';
import { ErrorTrend } from '../Charts/TrendChart';
import { SkillCardModal } from './Modals/SkillCardModal';
import { VocabModal } from './Modals/VocabModal';
import { SentenceModal } from './Modals/SentenceModal';

interface StudentReportViewProps {
  student: StudentInfo;
  lesson: LessonRecord;
}

export const StudentReportView: React.FC<StudentReportViewProps> = ({ student, lesson }) => {
  const [periodType, setPeriodType] = useState<'week' | 'month'>('week');
  const [selectedSkillCard, setSelectedSkillCard] = useState<NonNullable<LessonRecord['skillCards']>[0] | null>(null);
  const [selectedWord, setSelectedWord] = useState<VocabData | null>(null);
  const [selectedSentence, setSelectedSentence] = useState<SentenceData | null>(null);
  const periodData = lesson.periodComparison?.[periodType] || [];

  return (
    <div className="w-full space-y-6">
        {/* ========== 1. Header Section - 每日快照 ========== */}
        <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-white/40 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black font-serif bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-1">学生学情报告</h1>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {lesson.date}
              </p>
            </div>
          </div>

          {/* Student Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
              {student.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 mb-1">{student.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">ID: {student.id}</span>
              </p>
            </div>
          </div>

          {/* Lesson Summary Cards - 优化配色 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold text-white/90 uppercase">阅读篇数</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">{lesson.articlesCount}</div>
                <div className="text-xs text-white/80">积少成多</div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold text-white/90 uppercase">专注时长</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">{lesson.focusDuration}<span className="text-2xl">min</span></div>
                <div className="text-xs text-white/80">有效思考时长</div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold text-white/90 uppercase">阅读字数</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">{lesson.wordsRead}</div>
                <div className="text-xs text-white/80">≈ 1/5 章《哈利波特》</div>
              </div>
            </div>
          </div>
        </div>

      {/* ========== 【今日战报】分隔符 ========== */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="text-center">
          <div className="text-sm font-black text-gray-900 tracking-wide">今日战报</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">TODAY'S BATTLE REPORT</div>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

        {/* ========== 2. Today's Training Goals - 今日训练目标 ========== */}
        {lesson.trainingGoals && lesson.trainingGoals.length > 0 && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-blue-200/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-black font-serif bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">今日训练目标</h2>
              </div>
            </div>
          <div className="space-y-4">
            {lesson.trainingGoals.map((goal, idx) => {
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-yellow-100 text-yellow-500',
                green: 'bg-blue-100 text-blue-600',
                orange: 'bg-yellow-100 text-yellow-500',
              };
              const bgColorClasses = {
                blue: 'bg-blue-600',
                purple: 'bg-yellow-400',
                green: 'bg-blue-600',
                orange: 'bg-yellow-400',
              };
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${colorClasses[goal.color]} rounded-xl flex flex-col items-center justify-center shrink-0`}>
                    <span className={`text-xl font-black ${colorClasses[goal.color].split(' ')[1]} leading-none`}>{goal.count}</span>
                    <span className={`text-[9px] font-bold ${colorClasses[goal.color].split(' ')[1]} uppercase mt-0.5`}>篇</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900 mb-2">{goal.type}</div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${bgColorClasses[goal.color]} rounded-full`} style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-600">今日目标已全部完成!</span>
            </div>
          </div>
        </div>
      )}

        {/* ========== 3. Vocabulary List - 生词账单 ========== */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-blue-200/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-black font-serif bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">生词账单</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full border border-blue-200">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">{lesson.vocabulary.length}词</span>
              </div>
            </div>
          <div className="space-y-3">
            {lesson.vocabulary.map((word, idx) => {
              const isMastered = word.status === 'mastered';
              const statusText = isMastered ? '秒杀' : `回炉×${word.reviewCount || 1}`;
              const statusBg = isMastered ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200';
              
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedWord(word)}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
                    <div>
                      <div className="text-base font-black text-gray-900">{word.word}</div>
                      <div className="text-sm text-gray-600">{word.meaning}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBg}`}>
                    {statusText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

        {/* ========== 4. Sentence Surgery - 难句手术 ========== */}
        {lesson.sentences && lesson.sentences.length > 0 && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-orange-200/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-black font-serif bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">难句手术</h2>
              </div>
              <div className="px-3 py-1.5 bg-orange-100 rounded-full border border-orange-200">
                <span className="text-xs font-bold text-orange-700">完成 {lesson.sentences.length} 例</span>
              </div>
            </div>
          <div className="space-y-3">
            {lesson.sentences.map((sentence, idx) => (
              <div key={idx} onClick={() => setSelectedSentence(sentence)} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-serif font-medium text-gray-800 leading-relaxed line-clamp-2">
                      {sentence.text}
                    </p>
                  </div>
                  <div className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded border ${
                    sentence.difficulty === 'hard' ? 'bg-red-50 text-red-500 border-red-100' :
                    sentence.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-500 border-yellow-200' :
                    'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    {sentence.difficulty === 'hard' ? '困难' : sentence.difficulty === 'medium' ? '中等' : '简单'}
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{sentence.translation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* ========== 5. Subject Passport - 主题护照 ========== */}
        {lesson.subjectPassport && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-green-200/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-black font-serif bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">主题护照</h2>
              </div>
              <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-bold uppercase shadow-lg">
                {lesson.unit}
              </div>
            </div>
          
          <div className="relative group">
            {/* Cover Image with Reading Coordinates */}
            <div className="w-full aspect-[16/9] rounded-xl mb-4 shadow-lg overflow-hidden bg-gray-100">
              {lesson.subjectPassport.coverImage && (
                <img 
                  src={lesson.subjectPassport.coverImage} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  alt="Cover" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white">阅读坐标</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-black font-serif text-gray-900 mb-1">{lesson.subjectPassport.articleTitle}</h3>
              <p className="text-xs text-gray-500 uppercase mb-4">{lesson.unit}</p>

              {/* Unlock Stamps */}
              <div className="flex justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-200">
                  {lesson.unit.split(':')[0]}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-200">
                  {lesson.subjectPassport.theme}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold border border-purple-200">
                  {lesson.subjectPassport.genre}
                </span>
              </div>

              {/* Unit Progress */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">单元拼图进度</span>
                  <span className="text-sm font-black text-gray-900 font-serif">
                    {lesson.subjectPassport.unitProgress.split('/')[0]}
                    <span className="text-gray-300 text-xs font-sans">/{lesson.subjectPassport.unitTotal}</span>
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: lesson.subjectPassport.unitTotal }).map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < parseInt(lesson.subjectPassport.unitProgress.split('/')[0]) 
                          ? 'bg-blue-600' 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* ========== 6. Skill Cards - 技能卡收集 ========== */}
        {lesson.skillCards && lesson.skillCards.length > 0 && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-indigo-200/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-black font-serif bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">技能卡收集</h2>
              </div>
              <div className="px-3 py-1.5 bg-indigo-100 rounded-full border border-indigo-200">
                <span className="text-xs font-bold text-indigo-700">
                  {lesson.skillCards.filter(c => c.status === 'active').length}/{lesson.skillCards.length} 已解锁
                </span>
              </div>
            </div>
          <div className="grid grid-cols-4 gap-3">
            {lesson.skillCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSkillCard(card)}
                className={`rounded-xl p-4 flex flex-col justify-between aspect-square relative overflow-hidden border transition-all cursor-pointer hover:scale-105 ${
                  card.status === 'active' 
                    ? 'bg-white border-blue-100 shadow-md' 
                    : 'bg-gray-50/50 border-gray-100 text-gray-400'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    card.status === 'active' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-gray-100 border-gray-200 text-gray-300'
                  }`}>
                    {card.status === 'active' ? <Target className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  {card.status === 'active' ? (
                    <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded tracking-wider">{card.level}</span>
                  ) : (
                    <Lock className="w-3 h-3 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className={`text-sm font-black font-serif leading-tight mb-1 ${card.status === 'active' ? 'text-gray-900' : 'text-gray-400'}`}>
                    {card.title}
                  </h3>
                  <p className="text-[9px] font-bold text-gray-400">{card.desc}</p>
                </div>
                {card.status === 'active' && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(card.progress / card.total) * 100}%` }}></div>
                    </div>
                    <div className="text-[8px] font-bold text-gray-400 mt-1 text-right">{card.progress}/{card.total}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== 【累计成长】分隔符 ========== */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="text-center">
          <div className="text-sm font-black text-gray-900 tracking-wide">累计成长</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ACCUMULATED GROWTH</div>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

        {/* ========== 7. Ability Radar - 能力雷达 ========== */}
        <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-cyan-200/40 p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl mb-3 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent uppercase block mb-1">五维能力图谱</span>
            <h2 className="text-xl font-black font-serif bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">综合阅读能力雷达</h2>
          </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <AbilityRadar 
              data={[
                { subject: '精准定位', A: lesson.abilityScores.precisePositioning, fullMark: 100 },
                { subject: '逻辑推演', A: lesson.abilityScores.logicalDeduction, fullMark: 100 },
                { subject: '宏观结构', A: lesson.abilityScores.macroStructure, fullMark: 100 },
                { subject: '语境解码', A: lesson.abilityScores.contextualDecoding, fullMark: 100 },
                { subject: '策略执行', A: lesson.abilityScores.strategyExecution, fullMark: 100 },
              ]}
              overallScore={Math.round(
                (lesson.abilityScores.precisePositioning +
                 lesson.abilityScores.logicalDeduction +
                 lesson.abilityScores.macroStructure +
                 lesson.abilityScores.contextualDecoding +
                 lesson.abilityScores.strategyExecution) / 5
              )}
              studentName={student.name}
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '精准定位', score: lesson.abilityScores.precisePositioning, color: 'blue' },
                { label: '逻辑推演', score: lesson.abilityScores.logicalDeduction, color: 'purple' },
                { label: '宏观结构', score: lesson.abilityScores.macroStructure, color: 'yellow' },
                { label: '语境解码', score: lesson.abilityScores.contextualDecoding, color: 'green' },
                { label: '策略执行', score: lesson.abilityScores.strategyExecution, color: 'pink' },
              ].map((metric, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-bold text-gray-400 mb-1">{metric.label}</div>
                  <div className={`text-xl font-black ${
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    metric.color === 'yellow' ? 'text-yellow-500' :
                    metric.color === 'green' ? 'text-green-600' :
                    'text-pink-600'
                  }`}>
                    {metric.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* ========== 8. Trend Charts - 趋势分析 ========== */}
        {lesson.trends && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-pink-200/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-black font-serif bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">趋势分析</h2>
            </div>
            <ErrorTrend
              data={lesson.trends.guessRate.data}
              currentRate={lesson.trends.guessRate.current}
              change={lesson.trends.guessRate.change}
            />
          </div>
        )}

        {/* ========== 9. Period Comparison - 周期对比 ========== */}
        {periodData.length > 0 && (
          <div className="glass-card glass-card-hover rounded-xl shadow-lg border-2 border-yellow-200/40 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black font-serif bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-1">周期对比</h2>
                  <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">期间比较</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-1 rounded-full flex border-2 border-yellow-200 shadow-sm">
                <button
                  onClick={() => setPeriodType('week')}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${periodType === 'week' ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-white shadow-md' : 'text-yellow-600 hover:text-yellow-700'}`}
                >
                  本周与上周
                </button>
                <button
                  onClick={() => setPeriodType('month')}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${periodType === 'month' ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-white shadow-md' : 'text-yellow-600 hover:text-yellow-700'}`}
                >
                  本月与上月
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {periodData.map((item, idx) => {
                const isPositive = item.reverseColor ? item.change < 0 : item.change > 0;
                return (
                <div key={idx} className={`rounded-xl p-4 border-2 flex flex-col justify-between group hover:shadow-lg transition-all ${
                  isPositive 
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300' 
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-700">{item.label}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      isPositive
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-400 text-white'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="text-3xl font-black font-serif text-gray-900">{item.value}</span>
                    <span className="text-sm text-gray-500 ml-1 font-bold">{item.unit}</span>
                  </div>

                  <div className="pt-3 border-t-2 border-white/50 flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-600">上期: {item.prevValue}{item.unit}</span>
                    <span className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                      {isPositive && <TrendingUp className="w-3 h-3" />}
                      {typeof item.diff === 'number' && item.diff > 0 ? '+' : ''}{item.diff}
                    </span>
                  </div>
                </div>
              );
              })}
            </div>
        </div>
      )}

      {/* Modals */}
      {selectedSkillCard && (
        <SkillCardModal 
          card={selectedSkillCard} 
          onClose={() => setSelectedSkillCard(null)} 
        />
      )}
      {selectedWord && (
        <VocabModal 
          word={selectedWord} 
          onClose={() => setSelectedWord(null)} 
        />
      )}
      {selectedSentence && (
        <SentenceModal 
          sentence={selectedSentence} 
          onClose={() => setSelectedSentence(null)} 
        />
      )}
    </div>
  );
};

