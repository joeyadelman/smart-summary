export interface ProcessedContent {
  keyTerms: KeyTerm[];
  mainConcepts: MainConcept[];
  keyPoints: string[];
  summary: string;
  numericalData: NumericalFinding[];
}

export interface KeyTerm {
  term: string;
  explanation: string;
}

export interface MainConcept {
  title: string;
  description: string;
}

export interface NumericalFinding {
  value: string;
  context: string;
  significance: string;
}

export type DocumentType = 'general' | 'academic' | 'legal' | 'marketing';

export interface DocumentTypeConfig {
  id: DocumentType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
} 