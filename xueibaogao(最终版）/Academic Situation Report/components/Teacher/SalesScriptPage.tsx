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
                "我们用三个核心指标来看孩子的学习投入度：阅读量、输入量、专注度。"
              </p>

              {/* 阅读篇数话术 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">📚 关于阅读篇数</p>
                {articlesStatus ? (
                  <p>
                    "今天孩子完成的阅读篇数，正好是我们建议的黄金节奏。您知道吗？很多孩子贪多嚼不烂，一节课刷五六篇，
                    结果什么都没记住。我们的策略是'深度学习'——每一篇都要吃透、理解、内化。{student.name}这个节奏非常好，
                    说明能静下心来认真对待每篇文章。这种学习方式，两三个月后，阅读能力会有质的飞跃。"
                  </p>
                ) : (
                  <p>
                    "今天完成的阅读量稍微少了一点。我理解初期可能会觉得有点吃力，就像运动员训练，刚开始跑1公里都喘，
                    但坚持下来后5公里都不在话下。咱们下节课的目标是多挑战一篇，循序渐进，不着急。"
                  </p>
                )}
              </div>

              {/* 阅读字数话术 */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300">
                <p className="font-bold text-yellow-800 mb-2">📖 关于阅读字数</p>
                {wordsStatus ? (
                  <p>
                    "从输入量来看，今天的阅读字数非常充足。这相当于读了两篇中考阅读理解的B篇，信息量很扎实。
                    我们常说'量变引起质变'，这个阅读量坚持一个月，孩子的词汇量、语感、理解速度都会明显提升。"
                  </p>
                ) : (
                  <p>
                    "今天的阅读字数稍微单薄了一点，就像小树苗缺水一样。不过没关系，初期都是这样的，
                    咱们下次记得多'浇灌'一点，逐步增加阅读量。"
                  </p>
                )}
              </div>

              {/* 专注时长话术 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">⏱️ 关于专注时长</p>
                {focusStatus ? (
                  <p>
                    "这是我最想夸的！孩子今天的专注时长非常棒，能够深度沉浸在学习中。您知道吗？这种专注力比碎片化学一小时更有效。
                    现在很多孩子学习时总是分心，5分钟刷一次手机，根本进入不了'心流状态'。{student.name}能做到这样，
                    说明学习习惯正在往好的方向发展。"
                  </p>
                ) : (
                  <p>
                    "今天的专注时长有待加强，可能课上状态不太在线。我建议咱们分析一下原因——是课程难度不合适，
                    还是孩子注意力容易分散？找到根源后，下次上课前我们可以做一些调整，帮助孩子更好地进入学习状态。"
                  </p>
                )}
              </div>

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
              <p className="font-bold text-lg text-gray-900">词汇这块我要重点说一下</p>
              
              <p>
                "我们不是传统的'背单词'模式，而是'语境记忆'。什么意思呢？
                就是让孩子在阅读中遇到生词，然后通过上下文、配图、例句去理解，最后通过跟读、复述来巩固。"
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500">
                <p>
                  "今天孩子学的这些词，我分成两类：一类是'秒杀词'，就是一遍就记住了，说明这个词的使用场景孩子特别有感觉。
                  另一类是'回炉词'，就是需要多次复习才能掌握的，这很正常，就像炼钢一样，回炉几次才能成精钢。"
                </p>
                <p className="mt-3">
                  "家长不用焦虑孩子有'回炉词'，反而要关注孩子的'秒杀词'越来越多，这说明词汇敏感度在提高。
                  我们的系统会自动把'回炉词'放进明天的复习清单，确保每个词都不会遗漏。"
                </p>
              </div>

              <div className="text-sm text-blue-800 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600 mt-4">
                <strong>💡 话术技巧：</strong>用"秒杀词"和"回炉词"的比喻让家长理解记忆规律，避免焦虑。
              </div>
            </div>
          </section>

          {/* 第四部分：长难句分析能力 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-white rounded-full text-sm font-black mb-2">
              第四部分 · 长难句分析能力
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">再说说句子理解能力</p>
              
              <p>
                "很多孩子到了初中高中，最怕的就是'长难句'——一个句子三四行，看不懂主谓宾，理解不了句意。
                我们现在就开始培养这个能力，叫'句子手术刀'。"
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300">
                <p>
                  "今天课上，我带着{student.name}做了几个句子的'解剖'——找主语、找动词、找修饰成分。
                  就像医生做手术一样，把复杂的句子一层一层剖开，看清楚结构。"
                </p>
                <p className="mt-3">
                  "这个训练特别关键。因为中考、高考的阅读理解，80%的失分都是因为看不懂长难句。
                  咱们现在每节课都练，两三个月后，孩子看到长句子就不会慌了，反而会觉得'这不就是几个简单句拼起来的嘛'。"
                </p>
              </div>

              <div className="text-sm text-yellow-800 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-4">
                <strong>💡 话术技巧：</strong>用"手术刀"比喻让家长理解句子分析的重要性，并关联到中高考。
              </div>
            </div>
          </section>

          {/* 第五部分：综合能力雷达 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              第五部分 · 综合能力画像
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">现在给您看孩子的能力雷达图</p>
              
              <p>
                "我们从五个维度来评估孩子的阅读能力：精准定位力、逻辑推演力、宏观结构力、语境解码力、策略执行力。
                这不是我拍脑袋想的，而是基于孩子今天做题的真实表现，系统自动生成的。"
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500 space-y-3">
                <p className="font-bold text-blue-900">先说说孩子的优势能力：</p>
                <p>
                  "我看到{student.name}在某些维度上已经表现得很不错了。比如说，孩子做题的时候能够很快定位到答案位置，
                  说明'定位能力'很强，这是做阅读题的基本功。还有，孩子能够从文章中找到证据支撑自己的答案，
                  说明'逻辑推理'也在线。"
                </p>

                <p className="font-bold text-blue-900 mt-4">再说说可以提升的地方：</p>
                <p>
                  "我也注意到，孩子在某些维度上还有成长空间。比如做题速度可以再快一点，或者对文章的整体结构把握可以再清晰一些。
                  但这都不是问题，因为这些能力是可以通过针对性训练提升的。"
                </p>

                <p className="mt-4">
                  "接下来的课程，我会根据这个雷达图，给孩子定制专属的训练计划——哪里弱就重点练哪里，
                  让五个维度都均衡发展。就像练武功，不能只会一招，要全面发展才能成为高手。"
                </p>
              </div>

              <div className="text-sm text-blue-800 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600 mt-4">
                <strong>💡 话术技巧：</strong>先肯定优势，再指出提升空间，最后强调定制化训练方案。
              </div>
            </div>
          </section>

          {/* 第六部分：进步趋势 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-white rounded-full text-sm font-black mb-2">
              第六部分 · 进步趋势
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">最后说说孩子的成长趋势</p>
              
              <p>
                "我们每节课都会记录孩子的阅读速度和理解准确率，然后绘制成趋势曲线。
                这个曲线能告诉我们，孩子是在进步、退步，还是遇到了瓶颈期。"
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-xl p-5 border-l-4 border-yellow-300">
                <p>
                  "从最近几节课的数据来看，{student.name}的阅读速度在稳步提升，理解准确率也保持在一个不错的水平。
                  这说明孩子正在进入'良性循环'——读得多了，自然就读得快了；读得快了，信心也就上来了。"
                </p>
                <p className="mt-3">
                  "我特别想提醒家长的是：不要过度关注某一次课的表现，而要看整体趋势。
                  就像股票一样，不能因为今天跌了就panic，要看长期走势是不是向上的。
                  只要趋势是好的，偶尔的波动都是正常的。"
                </p>
              </div>

              <div className="text-sm text-yellow-800 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-4">
                <strong>💡 话术技巧：</strong>用"股票曲线"比喻让家长理解学习的波动性，避免因一次表现不佳而焦虑。
              </div>
            </div>
          </section>

          {/* 收尾：后续规划 */}
          <section className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-black mb-2">
              收尾 · 后续学习规划
            </div>
            <div className="text-base leading-loose space-y-4">
              <p className="font-bold text-lg text-gray-900">给您总结一下，也说说接下来的计划</p>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border-l-4 border-blue-500 space-y-3">
                <p>
                  "总的来说，{student.name}现在的学习状态是好的，能力也在稳步提升。
                  但也要看到，孩子还有很大的成长空间——这不是坏事，恰恰说明潜力很足。"
                </p>

                <p className="font-bold text-blue-900 mt-4">接下来三个月，我的规划是：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>第一个月：巩固基础，确保词汇量和句子理解能力扎实</li>
                  <li>第二个月：提速增效，提高阅读速度和做题准确率</li>
                  <li>第三个月：拔高冲刺，挑战更高难度的文章和题型</li>
                </ul>

                <p className="mt-4">
                  "当然，这个规划会根据孩子的实际情况随时调整。我每周都会给您发学习报告，
                  您有任何疑问都可以随时找我沟通。咱们家校配合，一起帮孩子把英语学好。"
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
                "如果您有任何问题，随时微信联系我。我们一起努力，让{student.name}的英语越来越好！"
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
