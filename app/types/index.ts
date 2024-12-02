export interface ProcessedContent {
  keyTerms: KeyTerm[];
  mainConcepts: MainConcept[];
  keyPoints: string[];
  summary: string;
}

export interface KeyTerm {
  term: string;
  explanation: string;
}

export interface MainConcept {
  title: string;
  description: string;
} 