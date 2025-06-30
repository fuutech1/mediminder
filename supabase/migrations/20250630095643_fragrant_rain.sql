/*
  # MediMinder Database Schema

  1. New Tables
    - `medicines`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `dosage` (text)
      - `frequency` (integer - times per day)
      - `start_date` (date)
      - `end_date` (date, optional)
      - `instructions` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `medicine_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `medicine_id` (uuid, references medicines)
      - `scheduled_time` (timestamp)
      - `taken_time` (timestamp, optional)
      - `status` (text - pending, taken, missed, skipped)
      - `notes` (text, optional)
      - `created_at` (timestamp)
    
    - `side_effects`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `medicine_id` (uuid, references medicines, optional)
      - `description` (text)
      - `severity` (text - mild, moderate, severe)
      - `date_reported` (timestamp)
      - `ai_classification` (text, optional)
      - `caregiver_notified` (boolean, default false)
      - `created_at` (timestamp)
    
    - `caregivers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `phone` (text)
      - `email` (text, optional)
      - `relationship` (text)
      - `is_primary` (boolean, default false)
      - `created_at` (timestamp)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `message` (text)
      - `response` (text)
      - `timestamp` (timestamp)
      - `context` (text, optional)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access only their own data
*/

-- Create medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  dosage text NOT NULL,
  frequency integer NOT NULL DEFAULT 1,
  start_date date NOT NULL,
  end_date date,
  instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medicine_logs table
CREATE TABLE IF NOT EXISTS medicine_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medicine_id uuid REFERENCES medicines(id) ON DELETE CASCADE NOT NULL,
  scheduled_time timestamptz NOT NULL,
  taken_time timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'missed', 'skipped')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create side_effects table
CREATE TABLE IF NOT EXISTS side_effects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medicine_id uuid REFERENCES medicines(id) ON DELETE SET NULL,
  description text NOT NULL,
  severity text NOT NULL DEFAULT 'mild' CHECK (severity IN ('mild', 'moderate', 'severe')),
  date_reported timestamptz DEFAULT now(),
  ai_classification text,
  caregiver_notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create caregivers table
CREATE TABLE IF NOT EXISTS caregivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  relationship text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  context text
);

-- Enable Row Level Security
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE side_effects ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for medicines
CREATE POLICY "Users can manage their own medicines"
  ON medicines
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for medicine_logs
CREATE POLICY "Users can manage their own medicine logs"
  ON medicine_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for side_effects
CREATE POLICY "Users can manage their own side effects"
  ON side_effects
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for caregivers
CREATE POLICY "Users can manage their own caregivers"
  ON caregivers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can manage their own chat messages"
  ON chat_messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medicines_user_id ON medicines(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_logs_user_id ON medicine_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_logs_medicine_id ON medicine_logs(medicine_id);
CREATE INDEX IF NOT EXISTS idx_medicine_logs_scheduled_time ON medicine_logs(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_side_effects_user_id ON side_effects(user_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_user_id ON caregivers(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for medicines table
CREATE TRIGGER update_medicines_updated_at
  BEFORE UPDATE ON medicines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();