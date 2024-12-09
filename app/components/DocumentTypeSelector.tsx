import { DocumentIcon, ScaleIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { DocumentType, DocumentTypeConfig } from '../types';

const documentTypes: DocumentTypeConfig[] = [
  {
    id: 'general',
    label: 'General Document',
    description: 'Standard analysis for any type of document',
    icon: DocumentIcon,
  },
  {
    id: 'academic',
    label: 'Academic Paper',
    description: 'Specialized analysis for research papers and academic works',
    icon: BookOpenIcon,
  },
  {
    id: 'legal',
    label: 'Legal Contract',
    description: 'Analysis focused on legal terms and obligations',
    icon: ScaleIcon,
  },
  {
    id: 'marketing',
    label: 'Marketing Report',
    description: 'Focus on market insights and performance metrics',
    icon: ChartBarIcon,
  },
];

interface DocumentTypeSelectorProps {
  selectedType: DocumentType;
  onTypeSelect: (type: DocumentType) => void;
}

export default function DocumentTypeSelector({ selectedType, onTypeSelect }: DocumentTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {documentTypes.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`p-4 rounded-xl border transition-all ${
              selectedType === type.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-6 h-6 ${
                selectedType === type.id ? 'text-blue-400' : 'text-slate-400'
              }`} />
              <div className="text-left">
                <h3 className="font-medium text-slate-200">{type.label}</h3>
                <p className="text-sm text-slate-400">{type.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  );
} 