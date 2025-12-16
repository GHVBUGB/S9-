import React, { useState } from 'react';
import { BookOpen, Search, User, Edit2, FileText, MessageSquare } from 'lucide-react';
import { StudentSearch } from './components/Teacher/StudentSearch';
import { LessonHistory } from './components/Teacher/LessonHistory';
import { StudentReportView } from './components/Teacher/StudentReportView';
import { EditModal } from './components/Teacher/EditModal';
import { ReportLinkModal } from './components/Teacher/ReportLinkModal';
import { SalesScriptPage } from './components/Teacher/SalesScriptPage';
import { StudentInfo, LessonRecord, StudentReport } from './types';
import { getStudentReport } from './mockData';
import { convertLessonToStudentData, saveDataToStorage, generateReportId, generateReportLink } from './utils/dataConverter';

const TeacherDashboard: React.FC = () => {
  const [currentStudent, setCurrentStudent] = useState<StudentInfo | null>(null);
  const [studentReport, setStudentReport] = useState<StudentReport | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reportLink, setReportLink] = useState<string | null>(null);
  const [showScriptPage, setShowScriptPage] = useState(false);

  const handleSearch = (studentId: string) => {
    if (!studentId) {
      setCurrentStudent(null);
      setStudentReport(null);
      setSelectedLesson(null);
      return;
    }

    const report = getStudentReport(studentId);
    if (report) {
      setCurrentStudent(report.student);
      setStudentReport(report);
      setSelectedLesson(report.latestLesson);
    } else {
      alert('未找到该学生，请检查学生ID是否正确');
      setCurrentStudent(null);
      setStudentReport(null);
      setSelectedLesson(null);
    }
  };

  const handleSelectLesson = (lesson: LessonRecord) => {
    setSelectedLesson(lesson);
  };

  const handleEditLesson = (updatedLesson: LessonRecord) => {
    if (!studentReport) return;
    
    // 更新当前选中的课程
    setSelectedLesson(updatedLesson);
    
    // 更新报告中的课程数据
    const updatedReport = { ...studentReport };
    if (updatedLesson.id === updatedReport.latestLesson.id) {
      updatedReport.latestLesson = updatedLesson;
    }
    
    // 更新历史课程记录
    const lessonIndex = updatedReport.historyLessons.findIndex(l => l.id === updatedLesson.id);
    if (lessonIndex !== -1) {
      updatedReport.historyLessons[lessonIndex] = updatedLesson;
    }
    
    setStudentReport(updatedReport);
  };

  const handleGenerateReport = () => {
    if (!selectedLesson || !currentStudent) {
      alert('请先选择一个学生和课程');
      return;
    }

    // 转换数据格式
    const studentData = convertLessonToStudentData(selectedLesson, currentStudent);
    
    // 生成唯一的报告ID
    const reportId = generateReportId();
    
    // 保存到localStorage，使用报告ID作为key
    const savedId = saveDataToStorage(studentData, reportId);
    if (savedId) {
      // 生成分享链接
      const link = generateReportLink(reportId);
      setReportLink(link);
    } else {
      alert('保存数据失败，请重试');
    }
  };

  // 如果显示话术页面，直接渲染话术页面
  if (showScriptPage && currentStudent && selectedLesson) {
    return (
      <SalesScriptPage
        student={currentStudent}
        lesson={selectedLesson}
        onBack={() => setShowScriptPage(false)}
        onUpdateLesson={(updatedLesson) => {
          // 更新选中的课程
          handleEditLesson(updatedLesson);
        }}
      />
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-card border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-black font-serif text-gray-900">教师看板</h1>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Sidebar + Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Search & History */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black font-serif text-gray-900">查找学生报告</h2>
                    <p className="text-xs text-gray-500">输入学生ID查看学情报告</p>
                  </div>
                </div>

                <StudentSearch
                  onSearch={handleSearch}
                  currentStudent={currentStudent}
                />
              </div>

              {studentReport && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-black text-gray-900 mb-4">历史课程记录</h3>
                  <LessonHistory
                    lessons={studentReport.historyLessons}
                    onSelectLesson={handleSelectLesson}
                    selectedLessonId={selectedLesson?.id}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Main Content - Report View */}
          <div className="col-span-8">
            {studentReport && selectedLesson ? (
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowScriptPage(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    查看销售话术
                  </button>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    编辑数据
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    生成报告
                  </button>
                </div>
                
                <StudentReportView
                  student={studentReport.student}
                  lesson={selectedLesson}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">查找学生报告</h3>
                <p className="text-gray-500">请在左侧输入学生ID开始查看学情报告</p>
                <div className="mt-8 text-left max-w-md mx-auto">
                  <p className="text-sm font-bold text-gray-400 mb-2">测试学生ID：</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSearch('1001')}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                      1001
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedLesson && (
        <EditModal
          lesson={selectedLesson}
          onSave={handleEditLesson}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Report Link Modal */}
      {reportLink && (
        <ReportLinkModal
          reportLink={reportLink}
          onClose={() => setReportLink(null)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;

