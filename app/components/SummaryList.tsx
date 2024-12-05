import { useSummaries } from '@/app/hooks/useSummaries'

export default function SummaryList() {
  const { summaries, loading } = useSummaries();

  if (loading) {
    return (
      <div className="glass-card p-8 mt-8">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="ml-2 text-slate-400">Loading summaries...</span>
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Previous Summaries
      </h2>
      <div className="grid gap-6">
        {summaries.map((summary) => (
          <div key={summary.id} className="glass-card p-6 hover:bg-white/[0.03] transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-300">
                {summary.document_name}
              </h3>
              <span className="text-sm text-slate-400">
                {new Date(summary.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300">{summary.content.summary}</p>
              <button 
                onClick={() => {/* Add logic to view full summary */}}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Full Summary →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 