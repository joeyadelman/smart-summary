'use client';

import { useState, useRef } from 'react';
import FileUpload from './components/FileUpload';
import { processDocument } from './services/documentProcessor';
import { ProcessedContent } from './types/index';
import CheatSheet from './components/CheatSheet';
import dynamic from 'next/dynamic';
import LoadingSpinner from './components/LoadingSpinner';

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
      <main className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-foreground tracking-tight sm:text-6xl">
            smartdocsummaries
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Upload your documents and get organized summaries
          </p>
        </div>
  
        <div className="max-w-2xl mx-auto backdrop-blur-sm bg-card/20 p-8 rounded-2xl border border-border/40">
          <FileUpload onFileSelect={handleFileSelect} />
  
          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
              {error}
            </div>
          )}
  
          {isProcessing && (
            <div className="mt-8 flex flex-col items-center justify-center space-y-4">
              <LoadingSpinner />
            </div>
          )}
        </div>
  
        {cheatSheet && !isProcessing && (
          <div className="mt-16 space-y-6">
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
