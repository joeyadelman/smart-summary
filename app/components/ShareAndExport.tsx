'use client';

import { useState } from 'react';
import html2pdf from 'html2pdf.js';

interface ShareAndExportProps {
  contentRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

export default function ShareAndExport({ contentRef, fileName }: ShareAndExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    
    setIsExporting(true);
    try {
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
