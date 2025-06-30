export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface Medicine {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: number; // times per day
  start_date: string;
  end_date?: string;
  instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface MedicineLog {
  id: string;
  user_id: string;
  medicine_id: string;
  scheduled_time: string;
  taken_time?: string;
  status: 'pending' | 'taken' | 'missed' | 'skipped';
  notes?: string;
  created_at: string;
}

export interface SideEffect {
  id: string;
  user_id: string;
  medicine_id?: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  date_reported: string;
  ai_classification?: string;
  caregiver_notified?: boolean;
  created_at: string;
}

export interface Caregiver {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
  is_primary: boolean;
  created_at: string;
}

export interface AdherenceScore {
  user_id: string;
  score: number;
  total_doses: number;
  taken_doses: number;
  missed_doses: number;
  period_start: string;
  period_end: string;
  risk_level: 'low' | 'moderate' | 'high';
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  timestamp: string;
  context?: string;
}