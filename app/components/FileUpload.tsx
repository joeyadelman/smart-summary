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
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ease-out
        ${dragActive 
          ? 'border-accent bg-accent/10 scale-[1.02]' 
          : 'border-border/50 hover:border-border hover:bg-card-hover'
        }`}
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
      
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <svg
          className={`w-14 h-14 mb-4 transition-all duration-300 ease-out
            ${dragActive ? 'text-accent scale-110' : 'text-muted'}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M24 8v24m0-24l-8 8m8-8l8 8m-8 16a16 16 0 110-32 16 16 0 010 32z"
          />
        </svg>
        <p className="text-xl font-medium text-foreground">
          Click to upload or drag and drop
        </p>
        <p className="mt-2 text-sm text-muted">
          PDF, TXT
        </p>
      </div>
    </div>
  );
}