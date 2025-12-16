import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  bgWhite?: boolean;
  isCover?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '', isCover = false }) => {
  return (
    <section 
      className={`w-full relative flex flex-col shrink-0 text-gray-900 ${
        isCover ? 'h-auto py-0' : 'h-auto py-3' // 减小间距让页面更连贯
      } ${className}`}
    >
      {/* 移除装饰性背景，使用统一的全局渐变 */}

      <div className="w-full max-w-md mx-auto px-5 flex flex-col relative z-10">
        {children}
      </div>
    </section>
  );
};