/**
 * 应用程序入口文件
 * 
 * 功能：
 * 1. 提供模式选择器（学生端/教师端）
 * 2. 根据URL参数或用户选择加载对应模式
 * 3. 处理报告数据的加载（从localStorage或URL参数）
 */
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TeacherDashboard from './TeacherDashboard';
import { BookOpen, User, ArrowRight } from 'lucide-react';
import { UI_TEXT } from './src/constants/ui-text';

/**
 * 模式选择器组件
 * 
 * 功能：让用户选择进入学生端或教师端（销售端）
 * 注意：学生端已被隐藏，只显示销售端入口
 */
const ModeSelector: React.FC<{ onSelectMode: (mode: 'student' | 'teacher') => void }> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* 应用Logo和标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black font-serif text-gray-900 mb-2">{UI_TEXT.COMMON.APP_NAME}</h1>
          <p className="text-gray-500 text-sm">请选择查看模式</p>
        </div>

        <div className="space-y-4">
          {/* 学生端已隐藏 */}
          
          <button
            onClick={() => onSelectMode('teacher')}
            className="w-full glass-card glass-card-hover rounded-2xl p-6 border-2 border-white/40 hover:border-blue-500 transition-all group text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-1">销售端</h3>
                  <p className="text-sm text-gray-500">查找学生报告和历史记录</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>使用 URL 参数快速访问：</p>
          <p className="mt-1 font-mono text-[10px]">?mode=student 或 ?mode=teacher</p>
        </div>
      </div>
    </div>
  );
};

const RootApp: React.FC = () => {
  const [mode, setMode] = useState<'select' | 'student' | 'teacher'>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'student' || urlMode === 'teacher') {
      return urlMode;
    }
    return 'select';
  });

  if (mode === 'select') {
    return <ModeSelector onSelectMode={(m) => setMode(m)} />;
  }

  if (mode === 'teacher') {
    return <TeacherDashboard />;
  }

  // 学生端：尝试从URL参数或localStorage加载数据
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get('reportId');
  
  let lessonData = null;
  if (reportId) {
    // 从报告ID加载数据
    try {
      const storedData = localStorage.getItem(reportId);
      if (storedData) {
        lessonData = JSON.parse(storedData);
      }
    } catch (e) {
      console.error('Failed to parse stored data:', e);
    }
  } else {
    // 兼容旧的方式（没有reportId时使用默认key）
    try {
      const storedData = localStorage.getItem('studentReportData');
      if (storedData) {
        lessonData = JSON.parse(storedData);
      }
    } catch (e) {
      console.error('Failed to parse stored data:', e);
    }
  }

  return <App lessonData={lessonData} />;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);