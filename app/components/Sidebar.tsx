'use client';

import { useSummaries } from '@/app/hooks/useSummaries';
import { ProcessedContent } from '@/app/types';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  onSummarySelect?: (content: ProcessedContent) => void;
  onToggle?: (isOpen: boolean) => void;
}

export default function Sidebar({ onSummarySelect, onToggle }: SidebarProps) {
  const { summaries, loading } = useSummaries();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle?.(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed right-0 top-8 z-50 p-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-l-lg transition-all duration-300"
      >
        <ChevronRightIcon 
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Sidebar Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen w-64 bg-slate-900/95 border-l border-slate-800 p-4 overflow-y-auto transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="text-lg font-semibold text-slate-200 mb-4 mt-16">Past Summaries</h2>
        
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : summaries.length === 0 ? (
          <p className="text-slate-400 text-sm">No summaries yet</p>
        ) : (
          <div className="space-y-3">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                onClick={() => {
                  onSummarySelect?.(summary.content);
                }}
                className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <h3 className="text-sm font-medium text-slate-200 truncate">
                  {summary.document_name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(summary.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
} 