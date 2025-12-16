import React from 'react';
import { createPortal } from 'react-dom';
import { X, Scissors, BookOpen, Lightbulb, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { SentenceData } from '../../../types';

interface SentenceModalProps {
  sentence: SentenceData;
  onClose: () => void;
}

export const SentenceModal: React.FC<SentenceModalProps> = ({ sentence, onClose }) => {
  if (!sentence) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-[2rem] relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 no-scrollbar flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-black font-serif text-gray-900">难句手术台</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* The Sentence */}
          <div>
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                sentence.difficulty === 'hard' ? 'bg-red-50 text-red-500 border-red-100' :
                sentence.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-500 border-yellow-200' :
                'bg-green-50 text-green-600 border-green-100'
              }`}>
                {sentence.difficulty === 'hard' ? 'Hard' : sentence.difficulty === 'medium' ? 'Medium' : 'Easy'}
              </span>
            </div>
            <h2 className="text-xl font-serif font-medium text-gray-900 leading-relaxed">
              {sentence.text}
            </h2>
          </div>

          {/* Translation */}
          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-black text-gray-900">参考译文</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{sentence.translation}</p>
          </div>

          {/* Analysis */}
          <div className="bg-yellow-50/50 p-5 rounded-2xl border border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black text-gray-900">深度解析</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {sentence.analysis}
            </p>
          </div>

          {/* Key Points */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-100 p-1 rounded-md text-green-600">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-black text-gray-900">关键知识点</span>
            </div>
            <div className="space-y-2">
              {sentence.keyPoints.map((point, k) => (
                <div key={k} className="flex items-start gap-3 bg-green-50/30 border border-green-100/50 px-3 py-2.5 rounded-xl">
                  <ChevronRight className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source */}
          {sentence.sourceTitle && (
            <div className="bg-indigo-50/20 border border-indigo-50 p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-indigo-50/40 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">来源文章</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{sentence.sourceTitle}</h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-indigo-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

