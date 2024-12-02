import { forwardRef } from 'react';
import { ProcessedContent } from '../types';

interface CheatSheetProps {
  data: ProcessedContent;
}

const CheatSheet = forwardRef<HTMLDivElement, CheatSheetProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="space-y-8">
      {/* Summary Section */}
      <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-300 hover:bg-card-hover/60">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="p-2 rounded-lg bg-accent/10 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </span>
          Summary
        </h2>
        <p className="text-muted leading-relaxed text-lg">{data.summary}</p>
      </section>

      {/* Key Terms Section */}
      <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-300 hover:bg-card-hover/60">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="p-2 rounded-lg bg-accent/10 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
              <path d="M8.5 8.5v.01"/>
              <path d="M16 15.5v.01"/>
              <path d="M12 12v.01"/>
              <path d="M11 17v.01"/>
              <path d="M7 14v.01"/>
            </svg>
          </span>
          Key Terms
        </h2>
        <dl className="space-y-6">
          {data.keyTerms.map((term, index) => (
            <div key={index} className="group relative bg-background/30 p-6 rounded-xl border border-border/40 transition-all duration-300 hover:bg-background/40">
              <dt className="text-xl font-semibold text-foreground mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                  {index + 1}
                </span>
                {term.term}
              </dt>
              <dd className="text-muted pl-11">{term.explanation}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Main Concepts Section */}
      <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-300 hover:bg-card-hover/60">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="p-2 rounded-lg bg-accent/10 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.5 2H12a10 10 0 0 0 0 20h8a2 2 0 0 0 2-2v-4.5"/>
              <path d="M22 14a8 8 0 0 0-16 0"/>
              <path d="M22 9a12 12 0 0 0-24 0"/>
            </svg>
          </span>
          Main Concepts
        </h2>
        <div className="space-y-6">
          {data.mainConcepts.map((concept, index) => (
            <div key={index} className="group relative bg-background/30 p-6 rounded-xl border border-border/40 transition-all duration-300 hover:bg-background/40">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                  {index + 1}
                </span>
                {concept.title}
              </h3>
              <p className="text-muted pl-11">{concept.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Points Section */}
      <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-300 hover:bg-card-hover/60">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="p-2 rounded-lg bg-accent/10 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-2-2-1.5 0-2 .62-2 2 0 1.5.5 2 2 2z"/>
              <path d="M15 12c0-1.38-.5-2-2-2-1.5 0-2 .62-2 2"/>
              <path d="M12 16h.01"/>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
            </svg>
          </span>
          Key Points
        </h2>
        <ul className="space-y-4">
          {data.keyPoints.map((point, index) => (
            <li key={index} className="group flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-background/30">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-medium mt-0.5">
                {index + 1}
              </span>
              <span className="text-muted">{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
});

CheatSheet.displayName = 'CheatSheet';
export default CheatSheet; 