'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out
        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50/50'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".pdf,.txt"
        onChange={handleChange}
      />
      
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="mb-4">
          <svg
            className={`w-12 h-12 transition-colors duration-200 ease-in-out
              ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M24 8v24m0-24l-8 8m8-8l8 8m-8 16a16 16 0 110-32 16 16 0 010 32z"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-sm text-gray-500">
          PDF, TXT
        </p>
      </div>
    </div>
  );
} 