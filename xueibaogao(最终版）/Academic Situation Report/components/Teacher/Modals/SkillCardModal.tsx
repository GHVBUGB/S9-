import React from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Target, Lightbulb, BarChart3, Lock, ArrowLeft } from 'lucide-react';
import { LessonRecord } from '../../../types';

interface SkillCardModalProps {
  card: NonNullable<LessonRecord['skillCards']>[0];
  onClose: () => void;
}

export const SkillCardModal: React.FC<SkillCardModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="bg-[#F8F9FA] w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[2rem] relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 no-scrollbar flex flex-col">
        
        <div className="sticky top-0 bg-[#F8F9FA]/95 backdrop-blur-md z-20 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-black font-serif text-gray-900">{card.title}</h3>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="p-6 space-y-4">
             {/* 1. Skill Description */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50/50">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-xl ${card.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900">技能说明</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {card.fullDesc || card.desc}
                </p>
             </div>

             {/* 2. Question Types */}
             {card.questionTypes && card.questionTypes.length > 0 && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-50/50">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-xl bg-green-100 text-green-600">
                            <Target className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900">适用题型</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {card.questionTypes.map((type, i) => (
                            <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
             )}

             {/* 3. Tips */}
             {card.tips && (
                <div className="bg-[#FFFDF5] p-5 rounded-2xl shadow-sm border border-yellow-100">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                             <div className="p-2 rounded-xl bg-yellow-100 text-yellow-500">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-gray-900">使用技巧</span>
                        </div>
                        <button onClick={onClose} className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-blue-200 active:scale-95 transition-transform">
                            <ArrowLeft className="w-3 h-3" /> 返回
                        </button>
                    </div>
                    <div className="flex gap-3">
                         <span className="text-lg">💡</span>
                         <p className="text-sm text-yellow-700 font-bold leading-relaxed">
                            {card.tips}
                         </p>
                    </div>
                </div>
             )}

             {/* 4. Unlock Condition or Stats */}
             <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-gray-200 text-gray-500">
                        {card.status === 'active' ? <BarChart3 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <span className="font-bold text-gray-900">{card.status === 'active' ? '成长数据' : '解锁条件'}</span>
                </div>
                
                {card.status === 'active' && card.stats ? (
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                            <div className="text-xl font-black text-blue-600">{card.stats.level}</div>
                            <div className="text-[10px] text-gray-400 font-bold">当前等级</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                            <div className="text-xl font-black text-green-600">{card.stats.exp}</div>
                            <div className="text-[10px] text-gray-400 font-bold">累计经验</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                            <div className="text-xl font-black text-orange-500">{card.stats.usage}</div>
                            <div className="text-[10px] text-gray-400 font-bold">使用次数</div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 font-medium">
                        {card.unlockCondition || '完成更多相关题型训练即可解锁此技能卡'}
                    </p>
                )}
             </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

