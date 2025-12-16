import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, Link2, ExternalLink } from 'lucide-react';

interface ReportLinkModalProps {
  reportLink: string;
  onClose: () => void;
}

export const ReportLinkModal: React.FC<ReportLinkModalProps> = ({ reportLink, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = reportLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenLink = () => {
    window.open(reportLink, '_blank');
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-2xl rounded-[2rem] relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center rounded-t-[2rem]">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black font-serif text-gray-900">报告链接已生成</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 mb-3">
              <strong>报告链接已生成！</strong> 您可以将此链接分享给销售或学生家长。
            </p>
            <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={reportLink}
                readOnly
                className="flex-1 text-sm font-mono text-gray-700 bg-transparent border-none outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制链接
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 mb-2">使用说明：</h4>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>点击"复制链接"按钮复制报告链接</li>
              <li>将链接发送给销售或学生家长</li>
              <li>点击"打开报告"可以在新窗口预览报告</li>
              <li>链接包含完整的报告数据，可直接分享</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            关闭
          </button>
          <button
            onClick={handleOpenLink}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            打开报告
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

