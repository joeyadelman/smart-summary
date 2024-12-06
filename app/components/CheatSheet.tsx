import { forwardRef } from 'react';
import { ProcessedContent } from '../types';
import CollapsibleSection from './CollapsibleSection';

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
    <div ref={ref} className="space-y-6 max-w-4xl mx-auto">
      {/* Summary Section - Always Open */}
      <CollapsibleSection title="Quick Summary" defaultOpen={true}>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-2xl">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            {highlightMatchingTerms(data.summary, data.keyTerms)}
          </div>
        </div>
      </CollapsibleSection>

      {/* Key Terms Section */}
      <CollapsibleSection title="Key Terms & Definitions" defaultOpen={true}>
        <div className="grid gap-4">
          {data.keyTerms.map((term, index) => (
            <div key={index} className="group p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors">
              <h3 className="font-semibold text-blue-300">{term.term}</h3>
              <p className="mt-1 text-slate-300">{term.explanation}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Main Concepts Section */}
      <CollapsibleSection title="Main Concepts" defaultOpen={true}>
        <div className="grid gap-6">
          {data.mainConcepts.map((concept, index) => (
            <div key={index} className="relative group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">{concept.title}</h3>
                  <div className="text-slate-300">
                    {highlightMatchingTerms(concept.description, data.keyTerms)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Key Points Section */}
      {data.keyPoints && data.keyPoints.length > 0 && (
        <CollapsibleSection title="Key Points" defaultOpen={true}>
          <ul className="space-y-3">
            {data.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-400" />
                <p className="text-slate-300">{point}</p>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Numerical Data Section */}
      {data.numericalData && data.numericalData.length > 0 && (
        <CollapsibleSection title="Numerical Insights" defaultOpen={true}>
          <div className="grid gap-4">
            {data.numericalData.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5">
                <div className="font-semibold text-blue-300">{item.value}</div>
                <p className="text-sm text-slate-300 mt-1">{item.context}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
});

CheatSheet.displayName = 'CheatSheet';
export default CheatSheet; 