export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
    .replace(/\s{2,}/g, " "); // Remove extra spaces
};

export const findTermInText = (term: string, text: string): boolean => {
  const normalizedTerm = normalizeText(term);
  const normalizedText = normalizeText(text);
  
  // Check for exact word match
  return new RegExp(`\\b${normalizedTerm}\\b`).test(normalizedText);
}; 