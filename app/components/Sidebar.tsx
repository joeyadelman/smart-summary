'use client';

import { useSummaries } from '@/app/hooks/useSummaries';
import { ProcessedContent } from '@/app/types';

interface SidebarProps {
  onSummarySelect?: (content: ProcessedContent) => void;
}

export default function Sidebar({ onSummarySelect }: SidebarProps) {
  const { summaries, loading } = useSummaries();

  return (
    <div className="fixed right-0 top-16 h-screen w-64 bg-slate-900/95 border-l border-slate-800 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Past Summaries</h2>
      
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
              onClick={() => onSummarySelect?.(summary.content)}
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
  );
} 