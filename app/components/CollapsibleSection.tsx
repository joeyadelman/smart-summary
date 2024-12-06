import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSection({ 
  title, 
  defaultOpen = false, 
  children 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/[0.07] transition-colors"
      >
        <h3 className="text-lg font-semibold text-slate-200">
          {title}
        </h3>
        <ChevronDownIcon 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div 
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 border-t border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
} 