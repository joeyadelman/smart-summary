'use client';

import { useState, useRef } from 'react';
import FileUpload from './components/FileUpload';
import { processDocument, ProcessedContent } from './services/documentProcessor';
import CheatSheet from './components/CheatSheet';
import dynamic from 'next/dynamic';

// Fix the import path to use relative path instead of alias
const ShareAndExport = dynamic(
  () => import('./components/ShareAndExport'),
  { ssr: false }
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [cheatSheet, setCheatSheet] = useState<ProcessedContent | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cheatSheetRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setIsProcessing(true);
    setCheatSheet(null);

    try {
      const result = await processDocument(selectedFile);
      setCheatSheet(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
      console.error('Error processing file:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Cheat Sheet Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your documents and get organized summaries
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect} />

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}

          {isProcessing && (
            <div className="mt-12 flex flex-col items-center justify-center space-y-4">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800"></div>
              <p className="text-lg text-gray-600">Processing your document...</p>
            </div>
          )}
        </div>

        {cheatSheet && !isProcessing && (
          <div className="mt-16">
            <CheatSheet ref={cheatSheetRef} data={cheatSheet} />
            <ShareAndExport 
              contentRef={cheatSheetRef}
              fileName={file?.name || 'document'}
            />
          </div>
        )}
      </main>
    </div>
  );
} 