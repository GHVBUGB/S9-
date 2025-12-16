import React from 'react';
import { createPortal } from 'react-dom';
import { X, Play, BookOpen, ExternalLink } from 'lucide-react';
import { VocabData } from '../../../types';

interface VocabModalProps {
  word: VocabData;
  onClose: () => void;
}

export const VocabModal: React.FC<VocabModalProps> = ({ word, onClose }) => {
  if (!word) return null;

  const isMastered = word.status === 'mastered';

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
            <div className={`p-1.5 rounded-lg ${isMastered ? 'bg-green-100' : 'bg-red-100'}`}>
              <BookOpen className={`w-4 h-4 ${isMastered ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <h3 className="text-lg font-black font-serif text-gray-900">生词详情</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Word */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-black font-serif text-gray-900">{word.word}</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isMastered 
                  ? 'bg-green-50 text-green-600 border-green-200' 
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {isMastered ? '秒杀' : `回炉×${word.reviewCount || 1}`}
              </div>
            </div>
            <div className="text-sm text-gray-500 font-medium mb-2">{word.partOfSpeech}</div>
            <div className="text-lg font-bold text-gray-900">{word.meaning}</div>
          </div>

          {/* Context */}
          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-black text-gray-900">语境例句</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
              "{word.context}"
            </p>
          </div>

          {/* Source */}
          <div className="bg-indigo-50/20 border border-indigo-50 p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-indigo-50/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-3 h-3 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">来源文章</span>
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{word.sourceTitle || 'Unknown Source'}</h4>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-indigo-100 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

