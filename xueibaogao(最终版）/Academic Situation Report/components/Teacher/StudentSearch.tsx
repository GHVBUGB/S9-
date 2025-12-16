import React, { useState } from 'react';
import { Search, User, X } from 'lucide-react';

interface StudentSearchProps {
  onSearch: (studentId: string) => void;
  currentStudent: { id: string; name: string } | null;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({ onSearch, currentStudent }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入学生ID查找..."
            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
        >
          查找学生
        </button>
      </form>

      {currentStudent && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-900">{currentStudent.name}</div>
            <div className="text-xs text-gray-500">ID: {currentStudent.id}</div>
          </div>
        </div>
      )}
    </div>
  );
};

