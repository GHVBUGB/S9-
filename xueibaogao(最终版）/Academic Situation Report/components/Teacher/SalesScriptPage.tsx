import React, { useState, useRef } from 'react';
import { ArrowLeft, Download, MessageSquare, User, Calendar, Loader2, BookOpen, Edit2, Save, X } from 'lucide-react';
import { LessonRecord, StudentInfo } from '../../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface SalesScriptPageProps {
  student: StudentInfo;
  lesson: LessonRecord;
  onBack: () => void;
  onUpdateLesson: (updatedLesson: LessonRecord) => void;
}

export const SalesScriptPage: React.FC<SalesScriptPageProps> = ({ student, lesson, onBack, onUpdateLesson }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState<{[key: string]: string}>({});

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${student.name}_家长会话术_${lesson.date}.pdf`);
    } catch (error) {
      console.error('PDF生成失败:', error);
      alert('PDF生成失败，请重试');
    } finally {
      setIsDownloading(false);
    }
  };

  // 判断各项指标状态（用于生成不同话术）
  const articlesStatus = (lesson.articlesCount ?? 0) >= 2;
  const wordsStatus = (lesson.wordsRead ?? 0) >= 300;
  const focusStatus = (lesson.focusDuration ?? 0) >= 15;

  // 可编辑段落组件
  const EditableParagraph: React.FC<{ id: string; defaultText: string; className?: string }> = ({ id, defaultText, className = '' }) => {
    const text = editableContent[id] ?? defaultText;
    
    if (isEditing) {
      return (
        <textarea
          value={text}
          onChange={(e) => setEditableContent({ ...editableContent, [id]: e.target.value })}
          className={`w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none ${className}`}
          rows={3}
        />
      );
    }
    
    return <p className={className}>{text}</p>;
  };

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 glass-card border-b border-white/40 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回报告
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-black shadow-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-black text-gray-900">{student.name} 的家长会话术</div>
              <div className="text-xs text-gray-500">{lesson.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditableContent({});
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditableContent({});
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-bold hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  取消
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                编辑话术
              </button>
            )}
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isDownloading ? '生成中...' : '下载PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* 主内容 - 话术剧本 */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-8">
        {/* 标题页 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-12 text-white text-center mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-4 shadow-lg">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black mb-3">家长会对话剧本</h1>
            <p className="text-lg opacity-90 mb-6">班主任专业沟通话术</p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <User className="w-4 h-4" />
                <span>学生：{student.name}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Calendar className="w-4 h-4" />
                <span>日期：{lesson.date}</span>
              </div>
            </div>
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-sm border border-white/20">
              <p className="opacity-90">💡 以班主任的身份，像老师家长会一样自然沟通</p>
            </div>
          </div>
        </div>

        {/* 正文 - 完整对话剧本 */}
        <div className="glass-card rounded-2xl shadow-lg p-10 space-y-10 leading-relaxed text-gray-800">
          
          {/* 开场白 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              开场白
            </div>
            <div className="text-base leading-loose space-y-3">
              <EditableParagraph 
                id="opening-1"
                defaultText={`"您好！我是${student.name}的班主任。今天特别想跟您聊聊孩子最近的学习情况。"`}
              />
              <EditableParagraph 
                id="opening-2"
                defaultText={`"我看到了一些特别好的变化，也发现了一些可以进一步提升的空间。咱们大概聊10分钟，我会用最直白的话，把孩子的学习状态、能力发展、以及接下来的规划都讲清楚。"`}
              />
              <div className="text-sm text-blue-800 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600 mt-4">
                <strong>💡 沟通要点：</strong>语气要轻松、专业，像家长会一样亲切。"10分钟"让家长没有压力。
              </div>
            </div>
          </section>

          {/* 第一部分：今日学习成果 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              第一部分 · 今日学习成果
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">先说说今天的课堂表现</p>
              
              <p>
                "先看今天的整体表现。我们用三个核心指标来衡量学习投入度：阅读篇数、阅读字数、专注时长。"
              </p>

              {/* 数据表格 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 font-bold text-gray-700">指标</th>
                      <th className="text-center py-2 font-bold text-gray-700">完成值</th>
                      <th className="text-center py-2 font-bold text-gray-700">达标线</th>
                      <th className="text-center py-2 font-bold text-gray-700">评价</th>
                      <th className="text-center py-2 font-bold text-gray-700">达标率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">阅读篇数</td>
                      <td className="text-center font-bold">{lesson.articlesCount}篇</td>
                      <td className="text-center">2篇</td>
                      <td className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${articlesStatus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          ✅ {articlesStatus ? '达标' : '基础'}
                        </span>
                      </td>
                      <td className="text-center font-bold text-blue-600">{Math.round((lesson.articlesCount / 2) * 100)}%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">阅读字数</td>
                      <td className="text-center font-bold">{lesson.wordsRead}词</td>
                      <td className="text-center">300词</td>
                      <td className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${wordsStatus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          ✅ {wordsStatus ? '超标' : '基础'}
                        </span>
                      </td>
                      <td className="text-center font-bold text-blue-600">{Math.round((lesson.wordsRead / 300) * 100)}%</td>
                    </tr>
                    <tr>
                      <td className="py-3">专注时长</td>
                      <td className="text-center font-bold">{lesson.focusDuration}分钟</td>
                      <td className="text-center">15分钟</td>
                      <td className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${focusStatus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          ✅ {focusStatus ? '超标' : '基础'}
                        </span>
                      </td>
                      <td className="text-center font-bold text-blue-600">{Math.round((lesson.focusDuration / 15) * 100)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-4">
                "您看这个表格，今天{student.name}三项指标{articlesStatus && wordsStatus && focusStatus ? '全部达标' : '基本达标'}，
                {wordsStatus && focusStatus ? '其中阅读字数和专注时长还超标了。' : ''}
                整体来说，今天的学习状态是{articlesStatus && wordsStatus && focusStatus ? '良好' : '正常'}的。"
              </p>

              {/* 阅读篇数话术 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500 mb-4">
                <p className="font-bold text-blue-900 mb-2">📚 阅读篇数：{lesson.articlesCount}篇（{articlesStatus ? '达标' : '基础'}）</p>
                <p className="mb-3">
                  "具体来说，阅读篇数完成了<strong>{lesson.articlesCount}篇</strong>，这{articlesStatus ? '正好是我们的达标线' : '还有提升空间'}。
                  这个节奏{articlesStatus ? '很好' : '需要加强'}，深度学习比刷题有效。
                  {articlesStatus && `您看，很多孩子一节课刷五六篇，结果什么都没记住。${student.name}这个节奏能保证每一篇都吃透、理解、内化。`}
                  坚持这个节奏，两三个月后阅读能力会有质的飞跃。"
                </p>
                <div className="text-xs text-blue-700 bg-blue-50 rounded p-2 border border-blue-200">
                  <strong>评价等级：</strong>🟢 优秀：≥3篇 | 🔵 达标：2篇 | 🟡 基础：1篇 | 🔴 不足：&lt;1篇
                </div>
              </div>

              {/* 阅读字数话术 */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300 mb-4">
                <p className="font-bold text-yellow-800 mb-2">📖 阅读字数：{lesson.wordsRead}词（{wordsStatus ? `超标${lesson.wordsRead - 300}词` : '基础'}）</p>
                <p className="mb-3">
                  "阅读字数方面，今天读了<strong>{lesson.wordsRead}词</strong>，
                  {wordsStatus ? `超出达标线${lesson.wordsRead - 300}词，达标率${Math.round((lesson.wordsRead / 300) * 100)}%` : '还需要增加阅读量'}。
                  {wordsStatus && `这相当于${(lesson.wordsRead / 180).toFixed(1)}篇中考阅读B篇的量。`}
                  输入量{wordsStatus ? '很充足' : '需要增加'}，这个阅读量坚持一个月，词汇量、语感、理解速度都会明显提升。"
                </p>
                <div className="text-xs text-yellow-700 bg-yellow-50 rounded p-2 border border-yellow-200">
                  <strong>评价等级：</strong>🟢 优秀：≥500词 | 🔵 达标：300-499词 | 🟡 基础：200-299词 | 🔴 不足：&lt;200词
                </div>
              </div>

              {/* 专注时长话术 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500 mb-4">
                <p className="font-bold text-blue-900 mb-2">⏱️ 专注时长：{lesson.focusDuration}分钟（{focusStatus ? `超标${lesson.focusDuration - 15}分钟` : '基础'}）</p>
                <p className="mb-3">
                  "最{focusStatus ? '让我满意' : '需要关注'}的是专注时长，<strong>{lesson.focusDuration}分钟</strong>，
                  {focusStatus ? `超出达标线${lesson.focusDuration - 15}分钟，达标率${Math.round((lesson.focusDuration / 15) * 100)}%` : '需要提升专注力'}。
                  {focusStatus ? `能够深度沉浸${lesson.focusDuration}分钟，这种专注力比碎片化学习一小时更有效。说明孩子的学习习惯在往好的方向发展。` : '我们会分析原因，帮助孩子更好地进入学习状态。'}"
                </p>
                <div className="text-xs text-blue-700 bg-blue-50 rounded p-2 border border-blue-200">
                  <strong>评价等级：</strong>🟢 优秀：≥25分钟 | 🔵 达标：15-24分钟 | 🟡 基础：10-14分钟 | 🔴 不足：&lt;10分钟
                </div>
              </div>

              <p className="font-bold text-lg text-gray-900 mt-6">
                "所以今天的整体评价是：<strong className="text-blue-600">
                  {articlesStatus && wordsStatus && focusStatus ? '三项核心指标全部达标，学习投入度良好' : '核心指标基本达标，还有提升空间'}
                </strong>。这是个{articlesStatus && wordsStatus && focusStatus ? '很好的开始' : '正常的状态'}。"
              </p>

              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400 mt-4">
                <strong>💡 话术技巧：</strong>先肯定优点，再委婉指出不足。用比喻让家长容易理解，避免说教。
              </div>
            </div>
          </section>

          {/* 第二部分：学习目标与进度 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-white rounded-full text-sm font-black mb-2">
              第二部分 · 学习目标与进度
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">接下来说说孩子的学习坐标</p>
              
              <p>
                "我们不是乱读书，而是按照科学的课程体系在走。{student.name}现在学的这篇文章，
                属于'{lesson.subjectPassport?.theme || '人与自然'}'这个主题单元，对标新课标的核心素养要求。"
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300">
                <p>
                  "就像拼图一样，我们的课程分成几个大单元，每个单元都有明确的学习目标。
                  今天这节课，孩子通过阅读'{lesson.subjectPassport?.title || 'Susan和她的猫'}'这个故事，
                  不仅在学英语，更重要的是在拓展视野、培养共情能力。"
                </p>
                <p className="mt-3">
                  "这种主题式学习，比单纯背单词、刷题要有效得多。因为孩子是在'用英语思考'，
                  而不是'学英语语法'。这样积累下来，到了初中高中，写作文、做阅读理解都会比别人更有深度。"
                </p>
              </div>

              <div className="text-sm text-yellow-800 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-4">
                <strong>💡 话术技巧：</strong>用"拼图"比喻让家长理解课程体系，强调"用英语思考"而非死记硬背。
              </div>
            </div>
          </section>

          {/* 第三部分：词汇掌握情况 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              第三部分 · 词汇掌握情况
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">"接下来看词汇这块"</p>
              
              <p>
                "今天学了{lesson.vocabulary?.length || 12}个词，我把它们分成两类：一类是一遍就记住的，一类是需要复习的。"
              </p>

              {/* 词汇数据统计 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600">{lesson.vocabulary?.length || 12}</div>
                    <div className="text-sm text-gray-600 mt-1">学习词汇</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-600">
                      {lesson.vocabulary?.filter(v => v.status === 'mastered').length || 8}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">一遍记住</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-orange-600">
                      {lesson.vocabulary?.filter(v => v.status === 'review').length || 4}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">需要复习</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600">
                      {Math.round(((lesson.vocabulary?.filter(v => v.status === 'mastered').length || 8) / (lesson.vocabulary?.length || 12)) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">掌握率</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                <p className="mb-3">
                  "您看，{lesson.vocabulary?.length || 12}个词里面，
                  <strong>{lesson.vocabulary?.filter(v => v.status === 'mastered').length || 8}个一遍就记住了</strong>，
                  占比<strong>{Math.round(((lesson.vocabulary?.filter(v => v.status === 'mastered').length || 8) / (lesson.vocabulary?.length || 12)) * 100)}%</strong>。
                  这个比例处于良好水平，说明孩子的词汇掌握效率不错，记忆方法有效。"
                </p>
                <p className="mb-3">
                  "另外{lesson.vocabulary?.filter(v => v.status === 'review').length || 4}个词需要复习，
                  占比{Math.round(((lesson.vocabulary?.filter(v => v.status === 'review').length || 4) / (lesson.vocabulary?.length || 12)) * 100)}%，
                  这个比例完全正常。这{lesson.vocabulary?.filter(v => v.status === 'review').length || 4}个词我们会在第1天、第3天、第7天自动推送复习，确保不会遗漏。"
                </p>
                <div className="text-xs text-blue-700 bg-blue-50 rounded p-2 border border-blue-200">
                  <strong>评价等级：</strong>🟢 优秀：一遍记住≥80% | 🔵 良好：60-79% | 🟡 达标：40-59% | 🔴 待提升：&lt;40%
              </div>
              </div>
            </div>
          </section>

          {/* 第四部分：长难句分析能力 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-white rounded-full text-sm font-black mb-2">
              第四部分 · 长难句分析能力
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">"词汇这块还不错，再看句子理解能力"</p>
              
              <p>
                "很多孩子到了初中高中，最怕的就是长难句——一个句子三四行，看不懂主谓宾，理解不了句意。所以我们现在就开始培养这个能力。"
              </p>

              {/* 句子数据统计 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600">{lesson.sentences?.length || 3}</div>
                    <div className="text-sm text-gray-600 mt-1">练习句子</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-600">100%</div>
                    <div className="text-sm text-gray-600 mt-1">理解准确率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">难度分布</div>
                    <div className="text-xs">
                      困难{lesson.sentences?.filter(s => s.difficulty === 'hard').length || 1}个、
                      中等{lesson.sentences?.filter(s => s.difficulty === 'medium').length || 1}个、
                      简单{lesson.sentences?.filter(s => s.difficulty === 'easy').length || 1}个
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600">2.5</div>
                    <div className="text-sm text-gray-600 mt-1">分钟/句</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300">
                <p className="mb-3">
                  "今天练了<strong>{lesson.sentences?.length || 3}个句子</strong>，难度从简单到困难都有。
                  您看这个数据，{lesson.sentences?.length || 3}个句子全部理解正确，<strong>准确率100%</strong>。
                  其中包括{lesson.sentences?.filter(s => s.difficulty === 'hard').length || 1}个困难级别的长难句，孩子也分析对了。"
                </p>
                <p className="mb-3">
                  "平均每个句子分析<strong>2.5分钟</strong>，这个速度适中，既保证了准确性，又有一定的速度。
                  按照我们的评价标准，准确率100%、分析时长2.5分钟，属于<strong>良好水平</strong>。"
                </p>
                <p>
                  "这个能力特别关键。中考、高考阅读理解80%的失分都是因为看不懂长难句。我们现在每节课都练，两三个月后，孩子看到长句子就不会慌了。"
                </p>
                <div className="text-xs text-yellow-700 bg-yellow-50 rounded p-2 border border-yellow-200 mt-3">
                  <strong>评价等级：</strong>🟢 优秀：准确率≥90%，时长&lt;2分钟 | 🔵 良好：准确率80-89%，时长2-3分钟 | 🟡 达标：准确率70-79%，时长3-4分钟
              </div>
              </div>
            </div>
          </section>

          {/* 第五部分：综合能力雷达 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              第五部分 · 综合能力画像（五维雷达）
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">"前面说的是今天的学习投入度和具体表现，现在我想跟您聊聊孩子的能力画像"</p>
              
              <p>
                "这个更重要，因为它能告诉我们孩子的能力优势在哪里，短板在哪里。
                我们从五个维度来评估阅读能力：精准定位、逻辑推演、宏观结构、语境解码、策略执行。
                每个维度满分100分，达标线70分。这个分数是根据孩子今天做题的真实表现，系统自动生成的。"
              </p>

              {/* 五维能力数据表格 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 font-bold text-gray-700">能力维度</th>
                      <th className="text-center py-2 font-bold text-gray-700">分数</th>
                      <th className="text-center py-2 font-bold text-gray-700">等级</th>
                      <th className="text-left py-2 font-bold text-gray-700">具体表现</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">精准定位力</td>
                      <td className="text-center font-bold text-blue-600">{lesson.abilityScores?.precisePositioning || 85}分</td>
                      <td className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">🔵 良好</span>
                      </td>
                      <td className="text-xs text-gray-600">45秒内定位70%答案</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">逻辑推演力</td>
                      <td className="text-center font-bold text-yellow-600">{lesson.abilityScores?.logicalDeduction || 70}分</td>
                      <td className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700">🟡 达标</span>
                      </td>
                      <td className="text-xs text-gray-600">推理题正确率70%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">宏观结构力</td>
                      <td className="text-center font-bold text-red-600">{lesson.abilityScores?.macroStructure || 60}分</td>
                      <td className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700">🔴 待提升</span>
                      </td>
                      <td className="text-xs text-gray-600">主旨题正确率60%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">语境解码力</td>
                      <td className="text-center font-bold text-green-600">{lesson.abilityScores?.contextualDecoding || 90}分</td>
                      <td className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">🟢 优秀</span>
                      </td>
                      <td className="text-xs text-gray-600">词义猜测准确率90%</td>
                    </tr>
                    <tr>
                      <td className="py-3">策略执行力</td>
                      <td className="text-center font-bold text-yellow-600">{lesson.abilityScores?.strategyExecution || 75}分</td>
                      <td className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700">🟡 达标</span>
                      </td>
                      <td className="text-xs text-gray-600">解题策略使用率75%</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <div className="text-sm text-gray-600">综合分</div>
                  <div className="text-3xl font-black text-blue-600">
                    {Math.round((
                      (lesson.abilityScores?.precisePositioning || 85) +
                      (lesson.abilityScores?.logicalDeduction || 70) +
                      (lesson.abilityScores?.macroStructure || 60) +
                      (lesson.abilityScores?.contextualDecoding || 90) +
                      (lesson.abilityScores?.strategyExecution || 75)
                    ) / 5)}分
                  </div>
                  <div className="text-xs text-gray-500 mt-1">（达标，70-79分区间）</div>
                </div>
              </div>

              <p className="mt-4">
                "您看这个表格，{student.name}的综合分是{Math.round((
                  (lesson.abilityScores?.precisePositioning || 85) +
                  (lesson.abilityScores?.logicalDeduction || 70) +
                  (lesson.abilityScores?.macroStructure || 60) +
                  (lesson.abilityScores?.contextualDecoding || 90) +
                  (lesson.abilityScores?.strategyExecution || 75)
                ) / 5)}分，处于达标区间。五个维度里面，有2个优势能力，2个刚好达标，1个需要提升。我一个一个跟您说。"
              </p>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 border-l-4 border-green-500 mt-4">
                <p className="font-bold text-green-900 mb-3">🟢 优势能力（≥80分）- 先说优势能力，有2个维度表现突出：</p>
                <p className="mb-3">
                  <strong>1. 语境解码力：{lesson.abilityScores?.contextualDecoding || 90}分（优秀）</strong><br/>
                  "这是什么意思呢？就是孩子能不能根据上下文理解生词。词义猜测题正确率90%，10道题对了9道。
                  更重要的是，孩子100%使用上下文线索来推测，不是瞎猜。这个能力很关键，有了它，即使遇到不认识的单词，
                  也能通过语境猜出大概意思。这是{student.name}最大的优势。"
                </p>
                <p>
                  <strong>2. 精准定位力：{lesson.abilityScores?.precisePositioning || 85}分（良好）</strong><br/>
                  "就是能不能快速在文章中找到答案位置。细节理解题正确率85%，20道题对了17道。
                  平均45秒就能定位到答案位置。这个能力是做阅读题的基本功，也是提高做题速度的关键。
                  {student.name}在这方面表现不错。"
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-5 border-l-4 border-yellow-500 mt-4">
                <p className="font-bold text-yellow-900 mb-3">🟡 达标能力（70-79分）- 这两个是优势，要保持。再看刚好达标的2个维度：</p>
                <p className="mb-3">
                  <strong>3. 策略执行力：{lesson.abilityScores?.strategyExecution || 75}分（达标）</strong><br/>
                  "就是做题的时候会不会用方法、用技巧。75%的题目使用了解题策略，策略正确率80%。
                  基本掌握了，但还不够灵活，有时候还是凭感觉做题。接下来6周，我们会重点训练策略的灵活运用，
                  目标是把这个分数提升到80分。"
                </p>
                <p>
                  <strong>4. 逻辑推演力：{lesson.abilityScores?.logicalDeduction || 70}分（达标）</strong><br/>
                  "就是能不能根据文章信息进行推理判断。推理判断题正确率70%，10道题对了7道。
                  说明逻辑推理能力刚刚达标，有时候推理还不够严密，容易凭主观感觉判断。
                  这个也需要加强，目标是6周内提升到80分。"
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-5 border-l-4 border-red-500 mt-4">
                <p className="font-bold text-red-900 mb-3">🔴 待提升能力（&lt;70分）- 前面4个维度都还不错，但有1个维度需要重点关注：</p>
                <p className="mb-3">
                  <strong>5. 宏观结构力：{lesson.abilityScores?.macroStructure || 60}分（待提升）</strong><br/>
                  "这是目前最需要提升的。主旨大意题正确率只有60%，段落大意题正确率55%。
                  说明孩子对文章整体结构的把握还不够，容易陷入细节，看不到'森林'只看到'树木'。"
                </p>
                <p className="mb-3">
                  <strong>问题根源：</strong>阅读时过于关注细节，忽略整体；缺乏结构化思维训练；不会使用思维导图梳理文章脉络。
                </p>
                <p>
                  <strong>提升计划：</strong>我给{student.name}制定了一个4周的提升计划：每节课增加1道主旨大意题专项训练，
                  每周绘制2篇文章的思维导图，使用'段落大意速记法'训练。目标是4周内把这个分数从60分提升到70分，达到达标线。"
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mt-4">
                <p className="font-bold text-gray-900 mb-3">📈 能力提升优先级</p>
                <p className="mb-2">
                  "所以总结一下，{student.name}的能力画像是：2个优势能力要保持，2个达标能力要巩固提升，1个待提升能力要重点训练。"
                </p>
                <p>
                  "接下来的训练计划，我会按照这个优先级来安排：<br/>
                  <strong>优先级1（重点训练）</strong>：宏观结构力 60分→70分，每节课30%时间，预计4周达标<br/>
                  <strong>优先级2（巩固提升）</strong>：逻辑推演力 70分→80分，每节课20%时间，预计6周提升到良好<br/>
                  <strong>优先级3（保持优势）</strong>：语境解码力90分、精准定位力85分，保持现有优势"
                </p>
                <p className="mt-3">
                  "哪里弱就重点练哪里，让五个维度都均衡发展。这样三个月后，综合分就能从现在的{Math.round((
                    (lesson.abilityScores?.precisePositioning || 85) +
                    (lesson.abilityScores?.logicalDeduction || 70) +
                    (lesson.abilityScores?.macroStructure || 60) +
                    (lesson.abilityScores?.contextualDecoding || 90) +
                    (lesson.abilityScores?.strategyExecution || 75)
                  ) / 5)}分提升到85分，进入良好水平。"
                </p>
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 rounded p-3 border border-gray-200 mt-4">
                <strong>评价等级标准：</strong>🟢 优秀：90-100分 | 🔵 良好：80-89分 | 🟡 达标：70-79分 | 🔴 待提升：&lt;70分
              </div>
            </div>
          </section>

          {/* 第六部分：进步趋势 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-white rounded-full text-sm font-black mb-2">
              第六部分 · 进步趋势（最近7天）
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">"前面说的是今天的表现和当前的能力画像，现在我想让您看看孩子最近一周的进步趋势"</p>
              
              <p>
                "因为学习效果，要看整体趋势，不要过度关注某一次课的表现。"
              </p>

              {/* 阅读速度趋势 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="font-bold text-gray-900 mb-3">📈 阅读速度趋势</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">152 WPM</div>
                    <div className="text-xs text-gray-600 mt-1">平均速度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">+11 WPM</div>
                    <div className="text-xs text-gray-600 mt-1">7日增长</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">+7.6%</div>
                    <div className="text-xs text-gray-600 mt-1">增长率</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                  "您看这个趋势，7天阅读速度从145 WPM提升到156 WPM，增长了11 WPM，增长率7.6%。
                  平均速度152 WPM，超过达标线（150 WPM）2个单位，评价良好。虽然中间有小幅波动，但整体趋势是向上的，这就是好的信号。"
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <strong>评价等级：</strong>🟢 优秀：≥180 WPM | 🔵 良好：150-179 WPM | 🟡 达标：120-149 WPM
                </div>
              </div>

              {/* 理解准确率趋势 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 mt-4">
                <div className="font-bold text-gray-900 mb-3">📊 理解准确率趋势</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">93%</div>
                    <div className="text-xs text-gray-600 mt-1">平均准确率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">+3%</div>
                    <div className="text-xs text-gray-600 mt-1">7日增长</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">优秀</div>
                    <div className="text-xs text-gray-600 mt-1">评价等级</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                  "理解准确率从92%提升到95%，增长了3个百分点。平均准确率93%，超过达标线（80%）13个百分点，评价优秀。
                  您看这个曲线，准确率一直保持在90%以上，非常稳定。说明孩子在提速的同时，理解准确度没有下降，这是最理想的状态。"
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <strong>评价等级：</strong>🟢 优秀：≥90% | 🔵 良好：80-89% | 🟡 达标：70-79%
                </div>
              </div>

              {/* 盲猜率趋势 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 mt-4">
                <div className="font-bold text-gray-900 mb-3">📉 盲猜率趋势（越低越好）</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">8.1%</div>
                    <div className="text-xs text-gray-600 mt-1">平均盲猜率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">-7%</div>
                    <div className="text-xs text-gray-600 mt-1">7日下降</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">-58.3%</div>
                    <div className="text-xs text-gray-600 mt-1">下降率</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                  "最后看一个特别重要的指标——盲猜率。您看这个下降趋势，盲猜率从12%下降到5%，下降了7个百分点，下降率58.3%。
                  这是个非常好的信号！平均盲猜率8.1%，虽然还高出达标线（5%）3.1个百分点，但已经接近达标。
                  最重要的是，趋势持续下降，说明孩子越来越少凭感觉做题，而是基于文本证据。这说明学习方法在起作用。"
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <strong>评价等级：</strong>🟢 优秀：≤3% | 🔵 良好：3-5% | 🟡 接近达标：5-10%
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300 mt-4">
                <p className="font-bold text-yellow-900 mb-3">📊 综合趋势评价</p>
                <p>
                  "您看，7天数据显示，三个核心指标全部呈现良性趋势：阅读速度稳步提升7.6%，理解准确率保持优秀93%，盲猜率大幅下降58.3%。
                  这说明孩子正在进入良性循环——读得多了，自然就读得快了；读得快了，信心也就上来了；有了方法，就不用瞎猜了。"
                </p>
                <p className="mt-3">
                  "所以我刚才说，看学习效果要看整体趋势，不要过度关注某一次课的表现。只要趋势是好的，偶尔的波动都是正常的。"
                </p>
              </div>
            </div>
          </section>

          {/* 收尾：后续规划 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              收尾 · 后续学习规划
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">"好，前面跟您汇报了今天的表现、能力画像、还有最近一周的进步趋势"</p>
              
              <p>
                "总的来说，{student.name}现在的学习状态是好的，能力也在稳步提升。但也要看到，孩子还有很大的成长空间——这不是坏事，恰恰说明潜力很足。"
              </p>

              <p className="font-bold text-gray-900 mt-4">"我给您总结一下今天的关键数据："</p>

              {/* 核心指标达标情况 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="font-bold text-gray-900 mb-3">核心指标达标情况：</div>
                <ul className="space-y-2 text-sm">
                  <li>✅ 阅读篇数：{lesson.articlesCount}篇（达标率{Math.round((lesson.articlesCount / 2) * 100)}%）</li>
                  <li>✅ 阅读字数：{lesson.wordsRead}词（达标率{Math.round((lesson.wordsRead / 300) * 100)}%）</li>
                  <li>✅ 专注时长：{lesson.focusDuration}分钟（达标率{Math.round((lesson.focusDuration / 15) * 100)}%）</li>
                  <li>✅ 综合能力：{Math.round((
                    (lesson.abilityScores?.precisePositioning || 85) +
                    (lesson.abilityScores?.logicalDeduction || 70) +
                    (lesson.abilityScores?.macroStructure || 60) +
                    (lesson.abilityScores?.contextualDecoding || 90) +
                    (lesson.abilityScores?.strategyExecution || 75)
                  ) / 5)}分（达标，70-79分区间）</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="font-bold text-sm">能力优势与短板：</div>
                  <div className="text-xs text-gray-700 mt-2">
                    <div>🟢 优势能力：语境解码力{lesson.abilityScores?.contextualDecoding || 90}分、精准定位力{lesson.abilityScores?.precisePositioning || 85}分</div>
                    <div>🟡 达标能力：策略执行力{lesson.abilityScores?.strategyExecution || 75}分、逻辑推演力{lesson.abilityScores?.logicalDeduction || 70}分</div>
                    <div>🔴 待提升能力：宏观结构力{lesson.abilityScores?.macroStructure || 60}分（需重点训练）</div>
                  </div>
                </div>
              </div>

              <p className="mt-4">
                "基于这些数据，我给{student.name}制定了一个三个月的分阶段规划。这个规划分三个阶段，每个阶段都有明确的量化目标："
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500 space-y-4 mt-4">
                <div>
                  <p className="font-bold text-blue-900 mb-2">第一个月（巩固基础期）- 重点是巩固基础，把宏观结构力这个短板补上来</p>
                  <div className="text-sm">
                    <strong>量化目标：</strong>累计阅读量≥60篇、累计词汇量≥300词、一遍记住占比从67%提升到75%、宏观结构力从60分提升到70分
                  </div>
                </div>

                <div>
                  <p className="font-bold text-blue-900 mb-2">第二个月（提速增效期）- 基础打牢了，就开始提速增效</p>
                  <div className="text-sm">
                    <strong>量化目标：</strong>阅读速度从152 WPM提升到170 WPM、逻辑推演力从70分提升到80分、盲猜率从8.1%降低到5%以下
                  </div>
                </div>

                <div>
                  <p className="font-bold text-blue-900 mb-2">第三个月（拔高冲刺期）- 就开始拔高冲刺，挑战更高难度的文章和题型</p>
                  <div className="text-sm">
                    <strong>量化目标：</strong>综合能力分从76分提升到85分、阅读速度从170 WPM提升到180 WPM、具备中考阅读理解能力
                  </div>
                </div>
              </div>

              {/* 三个月量化目标对比表 */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 mt-4">
                <div className="font-bold text-gray-900 mb-3">📈 三个月量化目标对比</div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2">指标</th>
                      <th className="text-center py-2">当前值</th>
                      <th className="text-center py-2">1个月后</th>
                      <th className="text-center py-2">2个月后</th>
                      <th className="text-center py-2">3个月后</th>
                      <th className="text-center py-2">总提升</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">综合能力分</td>
                      <td className="text-center">{Math.round((
                        (lesson.abilityScores?.precisePositioning || 85) +
                        (lesson.abilityScores?.logicalDeduction || 70) +
                        (lesson.abilityScores?.macroStructure || 60) +
                        (lesson.abilityScores?.contextualDecoding || 90) +
                        (lesson.abilityScores?.strategyExecution || 75)
                      ) / 5)}分</td>
                      <td className="text-center">78分</td>
                      <td className="text-center">82分</td>
                      <td className="text-center font-bold text-green-600">85分</td>
                      <td className="text-center font-bold text-blue-600">+9分</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">阅读速度</td>
                      <td className="text-center">152 WPM</td>
                      <td className="text-center">160 WPM</td>
                      <td className="text-center">170 WPM</td>
                      <td className="text-center font-bold text-green-600">180 WPM</td>
                      <td className="text-center font-bold text-blue-600">+28 WPM</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">宏观结构力</td>
                      <td className="text-center">{lesson.abilityScores?.macroStructure || 60}分</td>
                      <td className="text-center">70分</td>
                      <td className="text-center">75分</td>
                      <td className="text-center font-bold text-green-600">80分</td>
                      <td className="text-center font-bold text-blue-600">+20分</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-3">
                  "您看这个表格，三个月后，综合能力分从{Math.round((
                    (lesson.abilityScores?.precisePositioning || 85) +
                    (lesson.abilityScores?.logicalDeduction || 70) +
                    (lesson.abilityScores?.macroStructure || 60) +
                    (lesson.abilityScores?.contextualDecoding || 90) +
                    (lesson.abilityScores?.strategyExecution || 75)
                  ) / 5)}分提升到85分，提升9分；阅读速度从152 WPM提升到180 WPM，提升28 WPM。这是一个可实现的目标。"
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mt-4">
                <p className="font-bold text-gray-900 mb-2">🎯 家校配合</p>
                <p className="text-sm">
                  "当然，这个规划会根据孩子的实际情况随时调整。我每周都会给您发学习报告，报告中会包含：
                  本周核心指标完成情况、本周能力分数变化、本周进步亮点、下周训练重点、家长配合事项。"
                </p>
                <p className="text-sm mt-2">
                  "您有任何问题都可以随时找我沟通。咱们家校配合，一起帮孩子把英语学好。"
                </p>
              </div>
            </div>
          </section>

          {/* 结束语 */}
          <section className="space-y-4 border-t-2 border-gray-200 pt-6">
            <div className="text-base leading-loose space-y-3 text-center">
              <p className="font-bold text-lg text-gray-900">
                "好的，今天就跟您汇报这么多。"
              </p>
              <p>
                "您看，我们所有的评价都是基于数据的，不是主观判断。{student.name}现在的状态是好的，能力也在稳步提升，
                接下来三个月按照这个规划走，肯定能看到明显的进步。"
              </p>
              <p className="mt-4">
                "有任何问题随时微信联系我。一起努力，让{student.name}的英语越来越好！"
              </p>
              <p className="text-sm text-gray-600 mt-4">
                （保持微笑，等待家长提问，准备好回答任何疑问）
              </p>
            </div>
          </section>

        </div>

        {/* 底部提示 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl border-2 border-blue-200">
          <h3 className="text-lg font-black text-gray-900 mb-3">📌 沟通总原则</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ <strong>用老师的身份，</strong>不是销售，而是学业规划师</li>
            <li>✅ <strong>多用比喻和故事，</strong>让专业术语变得通俗易懂</li>
            <li>✅ <strong>先肯定再建议，</strong>绝不批评孩子，而是强调提升空间</li>
            <li>✅ <strong>关联到中高考，</strong>让家长看到长期价值</li>
            <li>✅ <strong>展示专业性，</strong>用数据、系统、科学方法论</li>
            <li>✅ <strong>建立信任感，</strong>承诺持续跟进，家校配合</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
