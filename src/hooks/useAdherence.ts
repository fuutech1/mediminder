import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { AdherenceScore } from '../types';

export const useAdherence = (userId: string) => {
  const [adherenceScore, setAdherenceScore] = useState<AdherenceScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchAdherence = async () => {
      try {
        // Calculate adherence for the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: logs, error } = await supabase
          .from('medicine_logs')
          .select('*')
          .eq('user_id', userId)
          .gte('scheduled_time', thirtyDaysAgo.toISOString());

        if (error) {
          console.error('Error fetching adherence:', error);
          return;
        }

        const totalDoses = logs?.length || 0;
        const takenDoses = logs?.filter(log => log.status === 'taken').length || 0;
        const missedDoses = logs?.filter(log => log.status === 'missed').length || 0;

        const score = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;
        
        let riskLevel: 'low' | 'moderate' | 'high' = 'low';
        if (score < 50) riskLevel = 'high';
        else if (score < 80) riskLevel = 'moderate';

        const adherence: AdherenceScore = {
          user_id: userId,
          score,
          total_doses: totalDoses,
          taken_doses: takenDoses,
          missed_doses: missedDoses,
          period_start: thirtyDaysAgo.toISOString(),
          period_end: new Date().toISOString(),
          risk_level: riskLevel,
          updated_at: new Date().toISOString()
        };

        setAdherenceScore(adherence);
      } catch (error) {
        console.error('Error calculating adherence:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdherence();
  }, [userId]);

  return { adherenceScore, loading };
};