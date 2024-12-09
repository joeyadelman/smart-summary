import { supabase } from '@/lib/supabase';

export async function processDocument(formData: FormData): Promise<any> {
  try {
    console.log('Sending file for analysis:', formData.get('file'));

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