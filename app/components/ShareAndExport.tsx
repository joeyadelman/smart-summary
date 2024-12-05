'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ProcessedContent } from '../types';

interface ShareAndExportProps {
  contentRef: React.RefObject<HTMLDivElement>;
  fileName: string;
  data: ProcessedContent;
}

export default function ShareAndExport({ contentRef, fileName, data }: ShareAndExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const formatContentForClipboard = (content: ProcessedContent): string => {
    const { summary, keyTerms, mainConcepts, keyPoints } = content;
    
    return `
DOCUMENT SUMMARY
===============

${summary}


KEY TERMS
=========
${keyTerms.map(({ term, explanation }) => 
  `${term.toUpperCase()}
  ${explanation}
`).join('\n')}


MAIN CONCEPTS
============
${mainConcepts.map(({ title, description }, index) => 
  `${index + 1}. ${title.toUpperCase()}
   ${description}
`).join('\n\n')}


KEY POINTS
==========
${keyPoints.map((point, index) => 
  `${index + 1}. ${point}`
).join('\n\n')}
`;
  };

  const handleCopyToClipboard = async () => {
    if (!data) return;
    
    setIsCopying(true);
    try {
      const formattedText = formatContentForClipboard(data);
      await navigator.clipboard.writeText(formattedText);
      alert('Content copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy content');
    } finally {
      setIsCopying(false);
    }
  };

  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    
    setIsExporting(true);
    try {
      // Dynamically import html2pdf only when needed (client-side)
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default as any;
      
      const opt = {
        margin: 1,
        filename: `${fileName.replace(/\.[^/.]+$/, '')}_summary.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Document Summary',
          text: 'Check out this document summary!',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-8">
      <button
        onClick={handleCopyToClipboard}
        disabled={isCopying}
        className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors"
      >
        {isCopying ? (
          <>
            <LoadingIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Copying...
          </>
        ) : (
          <>
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Text
          </>
        )}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
      >
        {isExporting ? (
          <>
            <LoadingIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Exporting...
          </>
        ) : (
          <>
            <DownloadIcon className="mr-2 h-5 w-5" />
            Export PDF
          </>
        )}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <ShareIcon className="mr-2 h-5 w-5" />
        Share
      </button>
    </div>
  );
}

function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
      />
    </svg>
  );
}
