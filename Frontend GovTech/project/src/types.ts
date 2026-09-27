export type Screen = 'welcome' | 'auth' | 'profile' | 'processing' | 'recommendations' | 'settings' | 'adminLogin';

export interface UserProfile {
  name: string;
  age: string;
  state: string;
  district: string;
  occupation: string;
  annualIncome: string;
  education: string;
  category: string;
  requirement: string;
  gender: string;
}

export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  category: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  applyLink: string;
  tags: string[];
  matchScore?: number;
}
