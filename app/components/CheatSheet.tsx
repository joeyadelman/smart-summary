import { forwardRef } from 'react';
import { ProcessedContent } from '../types';

interface CheatSheetProps {
  data: ProcessedContent;
}

const CheatSheet = forwardRef<HTMLDivElement, CheatSheetProps>(({ data }, ref) => {
  // Function to highlight matching terms in text
  const highlightMatchingTerms = (text: string, keyTerms: Array<{term: string, explanation: string}>) => {
    let highlightedText = text;
    
    // Ensure keyTerms is an array before spreading
    const sortedTerms = Array.isArray(keyTerms) 
      ? [...keyTerms].sort((a, b) => b.term.length - a.term.length)
      : [];

    sortedTerms.forEach(({ term }) => {
      const termVariations = [
        term,
        term.toLowerCase(),
        term.charAt(0).toUpperCase() + term.slice(1).toLowerCase(),
        term.toUpperCase(),
      ];

      termVariations.forEach(variation => {
        const regex = new RegExp(`\\b${variation}\\b`, 'g');
        highlightedText = highlightedText.replace(
          regex,
          `<span class="font-semibold text-blue-300">$&</span>`
        );
      });
    });

    return (
      <p 
        className="text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    );
  };

  return (
    <div ref={ref} className="space-y-12 max-w-4xl mx-auto">
      {/* Summary Section */}
      <section className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-conic from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-2xl">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Quick Summary
            </h2>
            {highlightMatchingTerms(data.summary, data.keyTerms)}
          </div>
        </div>
      </section>

      {/* Key Terms with Interactive Cards */}
      <section className="glass-card p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 flex items-center gap-4">
          <span>Key Terms</span>
          <span className="text-sm font-normal text-slate-400 bg-slate-400/10 px-3 py-1 rounded-full">
            {data?.keyTerms?.length || 0} terms
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.keyTerms?.map((term, index) => (
            <div 
              key={index} 
              className="group relative bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300" />
              <h3 className="text-xl font-semibold text-blue-300 mb-2 flex items-center justify-between">
                {term.term}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400/50">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </h3>
              <p className="text-slate-300 relative z-10">
                {term.explanation}
              </p>
            </div>
          )) || null}
        </div>
      </section>

      {/* Main Concepts with Centered Numbers */}
      <section className="glass-card p-8 relative overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Main Concepts
            </h2>
            <p className="text-slate-400 mt-2">Key ideas and fundamental concepts</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
            {(data?.mainConcepts?.length || 0)} concepts
          </span>
        </div>

        {/* Concepts Grid */}
        <div className="space-y-6">
          {data?.mainConcepts?.map((concept, index) => (
            <div 
              key={index}
              className="glass-card p-8 hover:bg-white/[0.03] transition-all duration-300 relative group"
            >
              {/* Number Badge */}
              <div className="absolute left-8 top-8 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <span className="text-blue-400 font-semibold text-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="pl-16">
                <h3 className="text-xl font-semibold text-slate-200 group-hover:text-blue-300 transition-colors mb-3">
                  {concept.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {concept.description}
                </p>
                
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/3 group-hover:to-purple-500/3 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* New Numerical Data Section */}
      {data?.numericalData && data.numericalData.length > 0 && (
        <section className="glass-card p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-conic from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Important Numbers
              </h2>
              <p className="text-slate-400 mt-2">Key statistics and numerical findings</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
              {data.numericalData.length} findings
            </span>
          </div>

          {/* Numerical Data Grid */}
          <div className="space-y-6">
            {data.numericalData.map((finding, index) => (
              <div 
                key={index}
                className="glass-card p-8 hover:bg-white/[0.03] transition-all duration-300 relative group"
              >
                {/* Number Badge */}
                <div className="absolute left-8 top-8 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-semibold text-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-16">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">
                    {finding.value}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-2">
                    {finding.context}
                  </p>
                  <p className="text-slate-400 text-sm italic">
                    {finding.significance}
                  </p>
                </div>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/3 group-hover:to-purple-500/3 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Points Section with highlighted terms */}
      <section className="glass-card p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
          Key Points
        </h2>
        <div className="grid gap-4">
          {data?.keyPoints?.map((point, index) => (
            <div 
              key={index}
              className="glass-card p-6 hover:bg-white/[0.03] transition-all duration-300 group"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-semibold text-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  {highlightMatchingTerms(point, data.keyTerms)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Stats */}
      <div className="flex justify-center gap-8 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {data.keyTerms.length} Terms
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {(data?.mainConcepts?.length || 0)} Concepts
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {(data?.keyPoints?.length || 0)} Points
        </div>
        {data?.numericalData && data.numericalData.length > 0 && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            {data.numericalData.length} Numbers
          </div>
        )}
      </div>
    </div>
  );
});

CheatSheet.displayName = 'CheatSheet';
export default CheatSheet; 