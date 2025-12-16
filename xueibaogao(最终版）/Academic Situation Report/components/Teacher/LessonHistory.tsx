import React from 'react';
import { Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { LessonRecord } from '../../types';

interface LessonHistoryProps {
  lessons: LessonRecord[];
  onSelectLesson: (lesson: LessonRecord) => void;
  selectedLessonId?: string;
}

export const LessonHistory: React.FC<LessonHistoryProps> = ({ lessons, onSelectLesson, selectedLessonId }) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm font-medium">暂无历史课程记录</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-y-auto pr-2" style={{ 
      maxHeight: '500px',
      scrollbarWidth: 'thin', 
      scrollbarColor: '#cbd5e1 #f1f5f9',
      WebkitOverflowScrolling: 'touch'
    }}>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => onSelectLesson(lesson)}
          className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-md active:scale-[0.98] ${
            selectedLessonId === lesson.id
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-gray-100 hover:border-blue-200'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500">{lesson.date}</span>
              </div>
              <h4 className="text-base font-black text-gray-900 mb-1">{lesson.title}</h4>
              <p className="text-xs text-gray-500">{lesson.unit}</p>
            </div>
            <ChevronRight className={`w-5 h-5 shrink-0 ${
              selectedLessonId === lesson.id ? 'text-blue-600' : 'text-gray-300'
            }`} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">{lesson.articlesCount}</div>
              <div className="text-[9px] text-gray-400 font-bold uppercase">篇数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">{lesson.wordsRead}</div>
              <div className="text-[9px] text-gray-400 font-bold uppercase">字数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">{lesson.focusDuration}</div>
              <div className="text-[9px] text-gray-400 font-bold uppercase">分钟</div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
            <div className="text-xs font-bold text-blue-600">查看详情 →</div>
          </div>
        </div>
      ))}
    </div>
  );
};

