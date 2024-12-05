import { supabase } from '@/lib/supabase';

export async function processDocument(file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    console.log('Sending file for analysis:', file.name, file.type);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Received response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to analyze document');
    }

    return data;
  } catch (error) {
    console.error('Document processing error:', error);
    throw error;
  }
} 