import { forwardRef } from 'react';
import { ProcessedContent } from '../types/index';

interface CheatSheetProps {
  data: ProcessedContent;
}

const CheatSheet = forwardRef<HTMLDivElement, CheatSheetProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl p-8 space-y-12">
      {/* Summary Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Summary</h2>
        <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
          {data.summary}
        </p>
      </section>

      {/* Key Terms Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Key Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.keyTerms.map((item, index) => (
            <div 
              key={index} 
              className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:shadow-md transition-shadow duration-200"
            >
              <dt className="font-semibold text-xl text-gray-900">
                {item.term}
              </dt>
              <dd className="mt-2 text-gray-700">
                {item.explanation}
              </dd>
            </div>
          ))}
        </div>
      </section>

      {/* Main Concepts Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Main Concepts</h2>
        <div className="space-y-6">
          {data.mainConcepts.map((concept, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {concept.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Points Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Points</h2>
        <ul className="list-disc pl-5 space-y-2">
          {data.keyPoints.map((point, index) => (
            <li 
              key={index}
              className="text-gray-700 leading-relaxed pl-2"
            >
              {point}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
});

CheatSheet.displayName = 'CheatSheet';

export default CheatSheet; 