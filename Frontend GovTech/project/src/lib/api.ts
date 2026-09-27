import { Scheme, UserProfile } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function getRecommendations(
  profile: Pick<UserProfile, 'occupation' | 'annualIncome' | 'education' | 'category' | 'age' | 'gender' | 'requirement'>
): Promise<(Scheme & { matchScore: number })[]> {
  const response = await fetch(`${API_BASE_URL}/schemes/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
}