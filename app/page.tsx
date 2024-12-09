'use client';

import { useState, useRef } from 'react';
import FileUpload from './components/FileUpload';
import { processDocument } from './services/documentProcessor';
import { ProcessedContent } from './types/index';
import CheatSheet from './components/CheatSheet';
import dynamic from 'next/dynamic';
import LoadingSpinner from './components/LoadingSpinner';
import SummaryList from './components/SummaryList';
import { useSummaries } from '@/app/hooks/useSummaries';
import Sidebar from './components/Sidebar';
import DocumentTypeSelector from './components/DocumentTypeSelector';
import { DocumentType } from './types';

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
  const { fetchSummaries, addSummary } = useSummaries();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>('general');

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setIsProcessing(true);
    setCheatSheet(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentType', documentType);
      
      const result = await processDocument(formData);
      setCheatSheet(result);
      
      // Add the new summary directly to the sidebar
      const newSummary = {
        id: crypto.randomUUID(),
        document_name: selectedFile.name,
        content: result,
        created_at: new Date().toISOString()
      };
      addSummary(newSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
      console.error('Error processing file:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSummarySelect = (content: ProcessedContent) => {
    setCheatSheet(content);
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-500/10 to-transparent blur-2xl transform rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-500/10 to-transparent blur-2xl transform -rotate-12 animate-pulse delay-1000" />
      </div>

      <div 
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'mr-64' : 'mr-0'
        }`}
      >
        <main className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 tracking-tight">
              Smart Document Summaries
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transform your documents into intelligent, organized summaries in seconds
            </p>
          </div>

          {/* Upload Card */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <DocumentTypeSelector 
                selectedType={documentType}
                onTypeSelect={setDocumentType}
              />
              <FileUpload onFileSelect={handleFileSelect} />
              
              {error && (
                <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl backdrop-blur-sm animate-fadeIn">
                  {error}
                </div>
              )}

              {isProcessing && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing your document...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          {cheatSheet && !isProcessing && (
            <div className="mt-20 animate-fadeInUp">
              <CheatSheet ref={cheatSheetRef} data={cheatSheet} />
              <div className="mt-8">
                <ShareAndExport 
                  contentRef={cheatSheetRef}
                  fileName={file?.name || 'document'}
                  data={cheatSheet}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      <Sidebar 
        onSummarySelect={handleSummarySelect} 
        onToggle={handleSidebarToggle}
      />
    </div>
  );
}