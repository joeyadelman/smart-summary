'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-slate-800 p-8 rounded-2xl max-w-md w-full mx-4 animate-fadeIn">
        {children}
      </div>
    </div>,
    document.body
  );
} 