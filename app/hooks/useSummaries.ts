'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProcessedContent } from '@/app/types';
import Cookies from 'js-cookie';

export function useSummaries() {
  const [summaries, setSummaries] = useState<Array<{
    id: string;
    document_name: string;
    content: ProcessedContent;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  const addSummary = (newSummary: {
    id: string;
    document_name: string;
    content: ProcessedContent;
    created_at: string;
  }) => {
    setSummaries(prev => [newSummary, ...prev]);
  };

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const anonymousId = Cookies.get('anonymous_id');
      
      let query = supabase.from('summaries').select('*');

      if (user) {
        query = query.eq('user_id', user.id);
      } else if (anonymousId) {
        query = query.eq('anonymous_id', anonymousId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setSummaries(data || []);
    } catch (error) {
      console.error('Error fetching summaries:', error);
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();

    // Subscribe to changes
    const channel = supabase
      .channel('summaries_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'summaries'
        },
        () => {
          fetchSummaries();
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { summaries, loading, fetchSummaries, addSummary };
} 