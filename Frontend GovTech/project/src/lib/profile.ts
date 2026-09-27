import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types';

export interface StoredProfile {
  id: string;
  email: string;
  full_name: string;
  age: number | null;
  gender: string | null;
  state: string | null;
  district: string | null;
  occupation: string | null;
  annual_income: string | null;
  education: string | null;
  category: string | null;
  requirement: string | null;
  created_at: string;
  updated_at: string;
}

export async function getProfile(userId: string): Promise<StoredProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
  return data as StoredProfile | null;
}

export async function upsertProfile(userId: string, email: string, profile: UserProfile): Promise<{ error: string | null }> {
  const payload = {
    id: userId,
    email,
    full_name: profile.name,
    age: profile.age ? parseInt(profile.age) : null,
    gender: profile.gender,
    state: profile.state,
    district: profile.district,
    occupation: profile.occupation,
    annual_income: profile.annualIncome,
    education: profile.education,
    category: profile.category,
    requirement: profile.requirement,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('user_profiles')
    .upsert(payload, { onConflict: 'id' });

  if (error) return { error: error.message };
  return { error: null };
}
