import { Scheme } from '@/types';

export const allSchemes: Scheme[] = [
  {
    id: 'pm-scholarship',
    name: 'Prime Minister Scholarship Scheme',
    shortName: 'PM Scholarship',
    category: 'Education',
    ministry: 'Ministry of Education',
    description: 'Financial assistance to meritorious students from economically weaker sections for pursuing higher education.',
    eligibility: [
      'Indian citizen aged 18-25 years',
      'Annual family income below ₹6 lakh',
      'Minimum 60% marks in previous qualification',
      'Enrolled in a recognized institution',
    ],
    benefits: [
      '₹36,200/year for boys',
      '₹41,000/year for girls',
      'Renewed annually based on performance',
    ],
    documents: ['Aadhaar Card', 'Income Certificate', 'Marksheets', 'Bank Passbook', 'Institution Admission Letter'],
    applyLink: 'https://scholarships.gov.in',
    tags: ['student', 'education', 'scholarship', 'youth'],
  },
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    shortName: 'PM-Kisan',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture',
    description: 'Income support of ₹6,000 per year to small and marginal farmers across India in three equal installments.',
    eligibility: [
      'Farmer family owning cultivable land',
      'Not holding constitutional post',
      'Not a serving/retired government officer',
      'Does not pay income tax',
    ],
    benefits: [
      '₹6,000 per year (₹2,000 per installment)',
      'Direct bank transfer every 4 months',
      'No repayment required',
    ],
    documents: ['Aadhaar Card', 'Land Ownership Records', 'Bank Account Details', 'Khasra/Khatauni'],
    applyLink: 'https://pmkisan.gov.in',
    tags: ['farmer', 'agriculture', 'income support', 'rural'],
  },
  {
    id: 'pmegp',
    name: 'Prime Minister Employment Generation Programme',
    shortName: 'PMEGP',
    category: 'Entrepreneurship',
    ministry: 'Ministry of MSME',
    description: 'Credit-linked subsidy programme to generate employment by establishing micro-enterprises.',
    eligibility: [
      'Age above 18 years',
      'At least 8th standard pass for projects above ₹10 lakh',
      'New enterprises only',
      'Self-help groups also eligible',
    ],
    benefits: [
      '15-35% subsidy on project cost',
      'Maximum project cost ₹50 lakh (manufacturing)',
      'Margin money subsidy directly to bank',
    ],
    documents: ['Aadhaar Card', 'Project Report', 'Educational Certificate', 'Caste Certificate (if applicable)', 'Bank Loan Sanction Letter'],
    applyLink: 'https://kviconline.gov.in/pmegpeportal',
    tags: ['entrepreneur', 'business', 'employment', 'msme', 'startup'],
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri Mudra Yojana',
    shortName: 'Mudra Loan',
    category: 'Finance',
    ministry: 'Ministry of Finance',
    description: 'Collateral-free loans to small and micro enterprises to help them grow their businesses.',
    eligibility: [
      'Non-corporate, non-farm small/micro enterprise',
      'Indian citizen',
      'Business plan or existing enterprise',
      'Credit history (preferred)',
    ],
    benefits: [
      'Shishu: up to ₹50,000',
      'Kishore: ₹50,001 to ₹5 lakh',
      'Tarun: ₹5,00,001 to ₹10 lakh',
      'No collateral required',
    ],
    documents: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Bank Statements', 'Address Proof'],
    applyLink: 'https://www.mudra.org.in',
    tags: ['entrepreneur', 'loan', 'business', 'finance', 'msme'],
  },
  {
    id: 'pm-fasal-bima',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    shortName: 'Crop Insurance',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture',
    description: 'Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities.',
    eligibility: [
      'All farmers growing notified crops',
      'Loanee and non-loanee farmers',
      'Sharecroppers and tenant farmers',
    ],
    benefits: [
      'Kharif crops: 2% premium',
      'Rabi crops: 1.5% premium',
      'Commercial crops: 5% premium',
      'Full sum insured for losses',
    ],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Sowing Certificate', 'Crop Details'],
    applyLink: 'https://pmfby.gov.in',
    tags: ['farmer', 'agriculture', 'insurance', 'rural'],
  },
  {
    id: 'nsp-obc',
    name: 'National Scholarship Portal - OBC Scholarship',
    shortName: 'OBC Scholarship',
    category: 'Education',
    ministry: 'Ministry of Social Justice',
    description: 'Pre-matric and post-matric scholarships for OBC students to support their education.',
    eligibility: [
      'OBC category student',
      'Annual family income below ₹2.5 lakh',
      'Studying in Class 1 to Post-Graduation',
      'Attendance above 60%',
    ],
    benefits: [
      'Maintenance allowance',
      'Course fees reimbursement',
      'Book grant and other allowances',
    ],
    documents: ['Aadhaar Card', 'Caste Certificate', 'Income Certificate', 'Marksheets', 'Institution ID'],
    applyLink: 'https://scholarships.gov.in',
    tags: ['student', 'obc', 'scholarship', 'education'],
  },
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana',
    shortName: 'PM Awas Yojana',
    category: 'Housing',
    ministry: 'Ministry of Housing & Urban Affairs',
    description: 'Housing scheme providing financial assistance to make affordable housing available to all citizens.',
    eligibility: [
      'Annual income below ₹18 lakh (EWS/LIG/MIG)',
      'First time home buyer',
      'No pucca house in family',
      'Indian citizen',
    ],
    benefits: [
      'Interest subsidy up to 6.5%',
      'EWS: up to ₹1.5 lakh subsidy',
      'LIG: up to ₹1.5 lakh subsidy',
      'MIG I & II: ₹2.3 lakh to ₹2.67 lakh subsidy',
    ],
    documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents', 'Bank Account', 'Affidavit of no house ownership'],
    applyLink: 'https://pmaymis.gov.in',
    tags: ['housing', 'urban', 'rural', 'home', 'women'],
  },
  {
    id: 'beti-bachao',
    name: 'Beti Bachao Beti Padhao',
    shortName: 'Beti Bachao',
    category: 'Women Welfare',
    ministry: 'Ministry of Women & Child Development',
    description: 'Scheme to address declining child sex ratio and promote welfare and education of girl child.',
    eligibility: [
      'Girl child at birth',
      'Indian citizen',
      'Account opened at birth',
      'Parents/guardians as account holder',
    ],
    benefits: [
      'Sukanya Samriddhi Account with 7.6% interest',
      'Tax deduction under Section 80C',
      'Maturity amount on girl turning 21',
      'Withdrawal for education at 18',
    ],
    documents: ['Birth Certificate of Girl', 'Parents Aadhaar & PAN', 'Address Proof', 'Photograph'],
    applyLink: 'https://wcd.nic.in/bbbp-schemes',
    tags: ['women', 'girl', 'education', 'welfare', 'savings'],
  },
  {
    id: 'pmsby',
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    shortName: 'PMSBY',
    category: 'Insurance',
    ministry: 'Ministry of Finance',
    description: 'Accidental death and disability insurance scheme at a nominal premium for bank account holders.',
    eligibility: [
      'Age 18-70 years',
      'Bank account holder',
      'Auto-debit consent given',
      'Aadhaar linked bank account preferred',
    ],
    benefits: [
      '₹2 lakh for accidental death',
      '₹2 lakh for permanent total disability',
      '₹1 lakh for permanent partial disability',
      'Premium only ₹20/year',
    ],
    documents: ['Aadhaar Card', 'Bank Account Details', 'Nomination Form'],
    applyLink: 'https://financialservices.gov.in',
    tags: ['insurance', 'accident', 'low income', 'senior', 'worker'],
  },
  {
    id: 'nrega',
    name: 'Mahatma Gandhi NREGA',
    shortName: 'MGNREGS',
    category: 'Employment',
    ministry: 'Ministry of Rural Development',
    description: 'Guarantees 100 days of wage employment per year to rural households whose adult members volunteer to do unskilled manual work.',
    eligibility: [
      'Rural household',
      'Adult member willing to do unskilled work',
      'Registered with Gram Panchayat',
      'Job card holder',
    ],
    benefits: [
      '100 days guaranteed employment/year',
      'Minimum wage as per state',
      'Work within 5km of residence',
      'Unemployment allowance if work not provided',
    ],
    documents: ['Aadhaar Card', 'Job Card Application', 'Residence Proof', 'Bank Account'],
    applyLink: 'https://nrega.nic.in',
    tags: ['rural', 'employment', 'labor', 'farmer', 'unskilled'],
  },
  {
    id: 'skill-india',
    name: 'Pradhan Mantri Kaushal Vikas Yojana',
    shortName: 'Skill India / PMKVY',
    category: 'Skill Development',
    ministry: 'Ministry of Skill Development',
    description: 'Skill certification scheme to enable youth to take up industry-relevant skill training and secure better livelihoods.',
    eligibility: [
      'Indian national aged 15-45',
      'Unemployed or school/college dropout',
      'Aadhaar card mandatory',
    ],
    benefits: [
      'Free skill training',
      'Certification recognized by industry',
      'Post-placement support',
      'Monetary reward on certification',
    ],
    documents: ['Aadhaar Card', 'Educational Certificates', 'Bank Account', 'Passport Photo'],
    applyLink: 'https://pmkvyofficial.org',
    tags: ['youth', 'skill', 'employment', 'student', 'training'],
  },
  {
    id: 'ignoaps',
    name: 'Indira Gandhi National Old Age Pension Scheme',
    shortName: 'Old Age Pension',
    category: 'Senior Citizen',
    ministry: 'Ministry of Rural Development',
    description: 'Monthly pension to senior citizens belonging to BPL households to provide social security.',
    eligibility: [
      'Age 60 years and above',
      'BPL household (Below Poverty Line)',
      'Indian citizen',
      'No other pension from government',
    ],
    benefits: [
      '₹200/month for age 60-79',
      '₹500/month for age 80 and above',
      'State governments may top up',
      'Direct bank transfer',
    ],
    documents: ['Aadhaar Card', 'Age Proof', 'BPL Certificate', 'Bank Account', 'Income Certificate'],
    applyLink: 'https://nsap.nic.in',
    tags: ['senior', 'pension', 'elderly', 'bpl', 'rural'],
  },
  {
    id: 'msme-credit',
    name: 'Credit Guarantee Fund Scheme for MSMEs',
    shortName: 'MSME Credit Guarantee',
    category: 'Business',
    ministry: 'Ministry of MSME',
    description: 'Collateral-free credit facility for micro and small enterprises to support their growth.',
    eligibility: [
      'Existing or new micro/small enterprise',
      'Manufacturing or service sector',
      'Registered under MSME',
      'Loan up to ₹2 crore',
    ],
    benefits: [
      'Collateral-free loans up to ₹2 crore',
      '75-85% credit guarantee cover',
      'Reduced interest rates',
      'No third-party guarantee required',
    ],
    documents: ['MSME Registration', 'Business Plan', 'Financial Statements', 'KYC Documents', 'Project Report'],
    applyLink: 'https://cgtmse.in',
    tags: ['entrepreneur', 'msme', 'business', 'credit', 'startup'],
  },
  {
    id: 'pm-ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana',
    shortName: 'PM Ujjwala',
    category: 'Women Welfare',
    ministry: 'Ministry of Petroleum',
    description: 'Free LPG connections to women from BPL households to provide clean cooking fuel.',
    eligibility: [
      'Women from BPL household',
      'Age 18 or above',
      'No existing LPG connection in household',
      'Deprivation criteria as per SECC 2011',
    ],
    benefits: [
      'Free LPG connection with cylinder',
      'First refill and stove at subsidized rate',
      'Subsidy on subsequent refills',
      'Clean cooking environment',
    ],
    documents: ['Aadhaar Card', 'BPL Card / Ration Card', 'Bank Account', 'Address Proof'],
    applyLink: 'https://pmuy.gov.in',
    tags: ['women', 'bpl', 'rural', 'welfare', 'cooking'],
  },
];

export function getRecommendations(profile: {
  occupation: string;
  annualIncome: string;
  education: string;
  category: string;
  age: string;
  gender: string;
  requirement: string;
}): (typeof allSchemes[0] & { matchScore: number })[] {
  const occ = profile.occupation.toLowerCase();
  const req = profile.requirement.toLowerCase();
  const income = parseInt(profile.annualIncome) || 0;
  const age = parseInt(profile.age) || 0;
  const cat = profile.category.toLowerCase();
  const gender = profile.gender.toLowerCase();
  const edu = profile.education.toLowerCase();

  const scored = allSchemes.map((scheme) => {
    let score = 0;
    const tags = scheme.tags;

    // Occupation match
    if (occ.includes('student') || occ.includes('study')) {
      if (tags.includes('student') || tags.includes('education')) score += 40;
    }
    if (occ.includes('farmer') || occ.includes('agriculture') || occ.includes('farming')) {
      if (tags.includes('farmer') || tags.includes('agriculture')) score += 40;
    }
    if (occ.includes('business') || occ.includes('entrepreneur') || occ.includes('self')) {
      if (tags.includes('entrepreneur') || tags.includes('business') || tags.includes('msme')) score += 40;
    }
    if (occ.includes('job') || occ.includes('unemployed') || occ.includes('labor') || occ.includes('labour')) {
      if (tags.includes('employment') || tags.includes('skill')) score += 35;
    }
    if (occ.includes('retired') || occ.includes('senior') || age >= 60) {
      if (tags.includes('senior') || tags.includes('pension')) score += 40;
    }

    // Requirement keyword match
    if (req.includes('scholar') || req.includes('education') || req.includes('study')) {
      if (tags.includes('student') || tags.includes('scholarship') || tags.includes('education')) score += 25;
    }
    if (req.includes('loan') || req.includes('business') || req.includes('startup')) {
      if (tags.includes('loan') || tags.includes('business') || tags.includes('credit')) score += 25;
    }
    if (req.includes('skill') || req.includes('training') || req.includes('job')) {
      if (tags.includes('skill') || tags.includes('employment') || tags.includes('training')) score += 25;
    }
    if (req.includes('house') || req.includes('home') || req.includes('shelter')) {
      if (tags.includes('housing')) score += 30;
    }
    if (req.includes('insurance') || req.includes('accident') || req.includes('health')) {
      if (tags.includes('insurance')) score += 25;
    }
    if (req.includes('pension') || req.includes('old age') || req.includes('retire')) {
      if (tags.includes('pension') || tags.includes('senior')) score += 30;
    }
    if (req.includes('crop') || req.includes('farm') || req.includes('agriculture') || req.includes('subsid')) {
      if (tags.includes('agriculture') || tags.includes('farmer')) score += 30;
    }

    // Income-based boosting
    if (income < 180000 || income === 0) {
      if (tags.includes('bpl') || tags.includes('low income') || scheme.category === 'Insurance') score += 15;
    }

    // Category match
    if (cat.includes('obc') && tags.includes('obc')) score += 20;
    if (cat.includes('sc') || cat.includes('st')) {
      if (tags.includes('scholarship') || tags.includes('welfare')) score += 15;
    }

    // Gender
    if (gender === 'female' || gender === 'woman') {
      if (tags.includes('women') || tags.includes('girl')) score += 20;
    }

    // Age range
    if (age >= 18 && age <= 30) {
      if (tags.includes('youth') || tags.includes('student')) score += 10;
    }
    if (age >= 60) {
      if (tags.includes('senior') || tags.includes('elderly')) score += 20;
    }

    // Education
    if (edu.includes('below') || edu.includes('10th') || edu.includes('8th')) {
      if (tags.includes('skill') || tags.includes('unskilled')) score += 10;
    }

    // Fallback: add some universal schemes with low score
    if (scheme.id === 'pmsby') score += 5;

    return { ...scheme, matchScore: Math.min(score, 98) };
  });

  return scored
    .filter((s) => s.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}
