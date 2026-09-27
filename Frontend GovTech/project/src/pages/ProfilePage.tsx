import { useState, FormEvent, useEffect } from 'react';
import {
  Landmark, Bot, ChevronLeft, Save, Loader2, AlertCircle, User,
  MapPin, Briefcase, GraduationCap, FileText, CheckCircle2, Settings, X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { upsertProfile, getProfile, StoredProfile } from '@/lib/profile';
import { UserProfile } from '@/types';
import { stateDistricts } from '@/data/locations';
import { useLanguage } from '@/i18n/LanguageContext';
import { TranslationKey } from '@/i18n/translations';

interface ProfilePageProps {
  onComplete: () => void;
  onBack: () => void;
  existingProfile?: StoredProfile | null;
  onOpenSettings: () => void;
}

const emptyProfile: UserProfile = {
  name: '',
  age: '',
  state: '',
  district: '',
  occupation: '',
  annualIncome: '',
  education: '',
  category: '',
  requirement: '',
  gender: '',
};

const states = Object.keys(stateDistricts);

const educationLevels = ['Below 10th','10th Pass','12th Pass','Graduate','Post Graduate','Diploma','Other'];
const categories = [
  'General / Open Category', 'OBC - Other Backward Class', 'SC - Scheduled Caste',
  'ST - Scheduled Tribe', 'EWS - Economically Weaker Section', 'SBC - Special Backward Class',
  'VJ - Vimukta Jati', 'NT-A - Nomadic Tribe A', 'NT-B - Nomadic Tribe B',
  'NT-C - Nomadic Tribe C', 'NT-D - Nomadic Tribe D', 'BC - Backward Class',
  'MBC - Most Backward Class', 'OC - Other Category', 'Other',
];

export default function ProfilePage({ onComplete, onBack, existingProfile, onOpenSettings }: ProfilePageProps) {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fetching, setFetching] = useState(!existingProfile);
  const [noIncome, setNoIncome] = useState(false);

  const occupations: { key: TranslationKey; label: string }[] = [
    { key: 'student', label: t('student') },
    { key: 'farmer', label: t('farmer') },
    { key: 'businessOwner', label: t('businessOwner') },
    { key: 'privateJob', label: t('privateJob') },
    { key: 'govtJob', label: t('govtJob') },
    { key: 'dailyWage', label: t('dailyWage') },
    { key: 'unemployed', label: t('unemployed') },
    { key: 'retired', label: t('retired') },
    { key: 'selfEmployed', label: t('selfEmployed') },
  ];

  const genders = [t('male'), t('female'), t('other')];

  useEffect(() => {
    if (existingProfile) {
      setProfile({
        name: existingProfile.full_name || '',
        age: existingProfile.age ? String(existingProfile.age) : '',
        state: existingProfile.state || '',
        district: existingProfile.district || '',
        occupation: existingProfile.occupation || '',
        annualIncome: existingProfile.annual_income || '',
        education: existingProfile.education || '',
        category: existingProfile.category || '',
        requirement: existingProfile.requirement || '',
        gender: existingProfile.gender || '',
      });
      setNoIncome(existingProfile.annual_income === '0' && isNoIncomeOccupation(existingProfile.occupation || ''));
      setFetching(false);
    } else if (user) {
      getProfile(user.id).then((p) => {
        if (p) {
          setProfile({
            name: p.full_name || '',
            age: p.age ? String(p.age) : '',
            state: p.state || '',
            district: p.district || '',
            occupation: p.occupation || '',
            annualIncome: p.annual_income || '',
            education: p.education || '',
            category: p.category || '',
            requirement: p.requirement || '',
            gender: p.gender || '',
          });
          setNoIncome(p.annual_income === '0' && isNoIncomeOccupation(p.occupation || ''));
        }
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, [user, existingProfile]);

  const update = (key: keyof UserProfile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const isNoIncomeOccupation = (occupation: string) => {
    const occ = occupation.toLowerCase();
    return occ === t('student').toLowerCase() || occ === t('unemployed').toLowerCase() || occ === 'student' || occ === 'unemployed';
  };

  const validateProfile = (): { errors: Record<string, string>; generalError: string | null } => {
    const errors: Record<string, string> = {};
    const missingFields: string[] = [];

    const requiredFields: Array<[keyof UserProfile, string]> = [
      ['name', t('fullName')], ['age', t('age')], ['gender', t('gender')],
      ['state', t('state')], ['district', t('district')], ['occupation', t('occupation')],
      ['annualIncome', t('annualIncome')], ['education', t('educationLevel')],
      ['category', t('category')], ['requirement', t('describeSupport')],
    ];

    for (const [key, label] of requiredFields) {
      if (!profile[key].trim()) {
        errors[key] = `${label} — ${lang === 'hi' ? 'यह फ़ील्ड आवश्यक है' : lang === 'ta' ? 'இந்த புலம் தேவை' : lang === 'kn' ? 'ಈ ಸ್ಥಳ ಅಗತ್ಯವಿದೆ' : lang === 'ml' ? 'ഈ സ്ഥലം ആവശ്യമാണ്' : 'This field is required'}`;
        missingFields.push(label);
      }
    }

    if (profile.name.trim() && !/^[A-Za-zÀ-ÿ .'-]{2,100}$/.test(profile.name.trim())) {
      if (/\d/.test(profile.name)) {
        errors.name = lang === 'hi'
          ? `आपने "${profile.name}" दर्ज किया — नाम में संख्या नहीं हो सकती। कृपया केवल अक्षरों का उपयोग करें।`
          : lang === 'ta'
          ? `நீங்கள் "${profile.name}" உள்ளிட்டீர்கள் — பெயரில் எண்கள் இருக்கக்கூடாது. எழுத்துக்களை மட்டும் பயன்படுத்தவும்.`
          : lang === 'kn'
          ? `ನೀವು "${profile.name}" ನಮೂದಿಸಿದ್ದೀರಿ — ಹೆಸರಿನಲ್ಲಿ ಸಂಖ್ಯೆಗಳಿರಬಾರದು. ಅಕ್ಷರಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ.`
          : lang === 'ml'
          ? `നിങ്ങൾ "${profile.name}" നൽകി — പേരിൽ സംഖ്യകൾ അടങ്ങിയിരിക്കരുത്. അക്ഷരങ്ങൾ മാത്രം ഉപയോഗിക്കുക.`
          : `You entered "${profile.name}" — names cannot contain numbers. Please use letters only.`;
      } else if (profile.name.trim().length < 2) {
        errors.name = lang === 'hi'
          ? `आपने "${profile.name}" दर्ज किया — नाम कम से कम 2 अक्षर का होना चाहिए।`
          : lang === 'ta'
          ? `நீங்கள் "${profile.name}" உள்ளிட்டீர்கள் — பெயர் குறைந்தது 2 எழுத்துக்கள் இருக்க வேண்டும்.`
          : lang === 'kn'
          ? `ನೀವು "${profile.name}" ನಮೂದಿಸಿದ್ದೀರಿ — ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳಿರಬೇಕು.`
          : lang === 'ml'
          ? `നിങ്ങൾ "${profile.name}" നൽകി — പേര് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം.`
          : `You entered "${profile.name}" — name must be at least 2 letters.`;
      } else {
        errors.name = lang === 'hi'
          ? `आपने "${profile.name}" दर्ज किया — नाम में केवल अक्षर, स्थान, और बिंदु हो सकते हैं।`
          : lang === 'ta'
          ? `நீங்கள் "${profile.name}" உள்ளிட்டீர்கள் — பெயரில் எழுத்துக்கள், இடைவெளி மற்றும் புள்ளி மட்டுமே இருக்க முடியும்.`
          : lang === 'kn'
          ? `ನೀವು "${profile.name}" ನಮೂದಿಸಿದ್ದೀರಿ — ಹೆಸರಿನಲ್ಲಿ ಅಕ್ಷರಗಳು, ಸ್ಥಳ ಮತ್ತು ಬಿಂದು ಮಾತ್ರ ಇರಬಹುದು.`
          : lang === 'ml'
          ? `നിങ്ങൾ "${profile.name}" നൽകി — പേരിൽ അക്ഷരങ്ങൾ, സ്പേസ്, പോയിന്റ് മാത്രം ആയിരിക്കണം.`
          : `You entered "${profile.name}" — names can only contain letters, spaces, and periods.`;
      }
    }

    if (profile.age.trim()) {
      if (!/^\d+$/.test(profile.age)) {
        errors.age = lang === 'hi'
          ? `आपने "${profile.age}" दर्ज किया — आयु केवल संख्या में होनी चाहिए (जैसे 25)।`
          : lang === 'ta'
          ? `நீங்கள் "${profile.age}" உள்ளிட்டீர்கள் — வயது எண்களில் மட்டுமே இருக்க வேண்டும் (உதாரணம் 25).`
          : lang === 'kn'
          ? `ನೀವು "${profile.age}" ನಮೂದಿಸಿದ್ದೀರಿ — ವಯಸ್ಸು ಸಂಖ್ಯೆಗಳಲ್ಲಿ ಮಾತ್ರ ಇರಬೇಕು (ಉದಾ 25).`
          : lang === 'ml'
          ? `നിങ്ങൾ "${profile.age}" നൽകി — പ്രായം സംഖ്യകളിൽ മാത്രം ആയിരിക്കണം (ഉദാ 25).`
          : `You entered "${profile.age}" — age must be numbers only (e.g. 25).`;
      } else {
        const ageNum = Number(profile.age);
        if (ageNum < 1 || ageNum > 120) {
          errors.age = lang === 'hi'
            ? `आपने "${profile.age}" दर्ज किया — आयु 1 से 120 के बीच होनी चाहिए।`
            : lang === 'ta'
            ? `நீங்கள் "${profile.age}" உள்ளிட்டீர்கள் — வயது 1 முதல் 120 வரை இருக்க வேண்டும்.`
            : lang === 'kn'
            ? `ನೀವು "${profile.age}" ನಮೂದಿಸಿದ್ದೀರಿ — ವಯಸ್ಸು 1 ರಿಂದ 120 ರ ನಡುವೆ ಇರಬೇಕು.`
            : lang === 'ml'
            ? `നിങ്ങൾ "${profile.age}" നൽകി — പ്രായം 1 മുതൽ 120 വരെ ആയിരിക്കണം.`
            : `You entered "${profile.age}" — age must be between 1 and 120.`;
        }
      }
    }

    const isStudentOrUnemployed = isNoIncomeOccupation(profile.occupation);

    if (isStudentOrUnemployed && noIncome) {
      // Student/Unemployed with no income — valid, skip numeric check
    } else if (profile.annualIncome.trim()) {
      if (!/^\d+$/.test(profile.annualIncome)) {
        const letters = profile.annualIncome.replace(/[0-9]/g, '');
        const hint = isStudentOrUnemployed
          ? (lang === 'hi' ? ' यदि आपकी कोई आय नहीं है, तो "मेरी कोई आय नहीं है" चुनें।' : lang === 'ta' ? ' உங்களுக்கு வருவாய் இல்லை என்றால், "எனக்கு வருவாய் இல்லை" தேர்ந்தெடுக்கவும்.' : lang === 'kn' ? ' ನಿಮಗೆ ಆದಾಯವಿಲ್ಲದಿದ್ದರೆ, "ನನಗೆ ಆದಾಯವಿಲ್ಲ" ಆಯ್ಕೆಮಾಡಿ.' : lang === 'ml' ? ' നിങ്ങൾക്ക് വരുമാനമില്ലെങ്കിൽ, "എനിക്ക് വരുമാനമില്ല" തിരഞ്ഞെടുക്കുക.' : ' If you have no income, select "I have no income".')
          : '';
        errors.annualIncome = lang === 'hi'
          ? `आपने "${profile.annualIncome}" दर्ज किया — वार्षिक आय केवल संख्या में होनी चाहिए। "${letters}" अक्षर नहीं मान्य हैं। उदाहरण: 180000${hint}`
          : lang === 'ta'
          ? `நீங்கள் "${profile.annualIncome}" உள்ளிட்டீர்கள் — ஆண்டு வருவாய் எண்களில் மட்டுமே இருக்க வேண்டும். "${letters}" எழுத்துக்கள் செல்லுபடியாகாது. உதாரணம்: 180000${hint}`
          : lang === 'kn'
          ? `ನೀವು "${profile.annualIncome}" ನಮೂದಿಸಿದ್ದೀರಿ — ವಾರ್ಷಿಕ ಆದಾಯ ಸಂಖ್ಯೆಗಳಲ್ಲಿ ಮಾತ್ರ ಇರಬೇಕು. "${letters}" ಅಕ್ಷರಗಳು ಮಾನ್ಯವಲ್ಲ. ಉದಾ: 180000${hint}`
          : lang === 'ml'
          ? `നിങ്ങൾ "${profile.annualIncome}" നൽകി — വാർഷിക വരുമാനം സംഖ്യകളിൽ മാത്രം ആയിരിക്കണം. "${letters}" അക്ഷരങ്ങൾ സ്വീകാര്യമല്ല. ഉദാഹരണം: 180000${hint}`
          : `You entered "${profile.annualIncome}" — annual income must be numbers only. The letters "${letters}" are not valid. Example: 180000${hint}`;
      } else {
        const incomeNum = Number(profile.annualIncome);
        if (incomeNum < 0) {
          errors.annualIncome = lang === 'hi'
            ? `आपने "${profile.annualIncome}" दर्ज किया — आय ऋणात्मक नहीं हो सकती।`
            : lang === 'ta'
            ? `நீங்கள் "${profile.annualIncome}" உள்ளிட்டீர்கள் — வருவாய் எதிர்மறையாக இருக்கக்கூடாது.`
            : lang === 'kn'
            ? `ನೀವು "${profile.annualIncome}" ನಮೂದಿಸಿದ್ದೀರಿ — ಆದಾಯ ಋಣಾತ್ಮಕವಾಗಿರಬಾರದು.`
            : lang === 'ml'
            ? `നിങ്ങൾ "${profile.annualIncome}" നൽകി — വരുമാനം നെഗറ്റീവ് ആയിരിക്കരുത്.`
            : `You entered "${profile.annualIncome}" — income cannot be negative.`;
        }
      }
    }

    if (profile.requirement.trim() && profile.requirement.trim().length < 5) {
      errors.requirement = lang === 'hi'
        ? `आपने "${profile.requirement}" दर्ज किया — कृपया कम से कम 5 अक्षरों में विस्तार से बताएं।`
        : lang === 'ta'
        ? `நீங்கள் "${profile.requirement}" உள்ளிட்டீர்கள் — குறைந்தது 5 எழுத்துக்களில் விரிவாக விவரிக்கவும்.`
        : lang === 'kn'
        ? `ನೀವು "${profile.requirement}" ನಮೂದಿಸಿದ್ದೀರಿ — ಕನಿಷ್ಠ 5 ಅಕ್ಷರಗಳಲ್ಲಿ ವಿವರವಾಗಿ ತಿಳಿಸಿ.`
        : lang === 'ml'
        ? `നിങ്ങൾ "${profile.requirement}" നൽകി — കുറഞ്ഞത് 5 അക്ഷരങ്ങളിൽ വിശദമായി വിവരിക്കുക.`
        : `You entered "${profile.requirement}" — please describe in at least 5 characters.`;
    }

    if (profile.state && profile.district && !stateDistricts[profile.state]?.includes(profile.district)) {
      errors.district = lang === 'hi'
        ? `"${profile.district}" "${profile.state}" राज्य का मान्य ज़िला नहीं है। कृपया सूची से चुनें।`
        : lang === 'ta'
        ? `"${profile.district}" "${profile.state}" மாநிலத்தின் சரியான மாவட்டம் அல்ல. பட்டியலிலிருந்து தேர்ந்தெடுக்கவும்.`
        : lang === 'kn'
        ? `"${profile.district}" "${profile.state}" ರಾಜ್ಯದ ಸರಿಯಾದ ಜಿಲ್ಲೆ ಅಲ್ಲ. ಪಟ್ಟಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ.`
        : lang === 'ml'
        ? `"${profile.district}" "${profile.state}" സംസ്ഥാനത്തിന്റെ സാധുവായ ജില്ല അല്ല. പട്ടികയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.`
        : `"${profile.district}" is not a valid district for ${profile.state}. Please select from the list.`;
    }

    let generalError: string | null = null;
    if (missingFields.length > 0) {
      generalError = `${t('validationComplete')}: ${missingFields.join(', ')}.`;
    }

    return { errors, generalError };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!user) {
      setError(t('mustSignIn'));
      return;
    }

    const { errors, generalError } = validateProfile();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError(generalError);
      return;
    }

    setLoading(true);
    const result = await upsertProfile(user.id, user.email || '', profile);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      onComplete();
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-govgreen-400 animate-spin" />
      </div>
    );
  }

  const inputClass = 'w-full bg-navy-700/60 border border-navy-600 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-govgreen-500 transition-colors';
  const labelClass = 'text-navy-200 text-sm font-medium mb-1.5 flex items-center gap-2';
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const errorInputClass = 'w-full bg-red-900/20 border border-red-600 rounded-xl px-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-red-500 transition-colors';
  const fieldErrorClass = 'flex items-start gap-1.5 text-red-400 text-xs mt-1.5';

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-navy-700/50 sticky top-0 z-20 bg-navy-900/80 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-navy-200 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-widest uppercase hidden sm:block">{t('appName')}</span>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition-colors"
          title={t('settings')}
        >
          <Settings className="w-4 h-4 text-navy-200" />
        </button>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-govgreen-600 flex items-center justify-center shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('yourProfile')}</h1>
            <p className="text-navy-300 text-sm">{t('fillDetails')}</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-900/30 border border-red-700/40 rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 space-y-4">
              <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('personalInfo')}
              </h2>

              <div>
                <label className={labelClass}>{t('fullName')} <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder={lang === 'hi' ? 'अपना पूरा नाम दर्ज करें' : lang === 'ta' ? 'உங்கள் முழுப் பெயரை உள்ளிடவும்' : lang === 'kn' ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ' : lang === 'ml' ? 'നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക' : 'Enter your full name'}
                  className={fieldErrors.name ? errorInputClass : inputClass}
                />
                {fieldErrors.name && (
                  <div className={fieldErrorClass}>
                    <X className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{fieldErrors.name}</span>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('age')} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={profile.age}
                    onChange={(e) => update('age', e.target.value)}
                    placeholder="e.g. 25"
                    className={fieldErrors.age ? errorInputClass : inputClass}
                  />
                  {fieldErrors.age && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.age}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t('gender')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.gender}
                    onChange={(e) => update('gender', e.target.value)}
                    className={fieldErrors.gender ? errorInputClass : selectClass}
                  >
                    <option value="" disabled>{t('selectGender')}</option>
                    {genders.map((g) => <option key={g} value={g} className="bg-navy-800">{g}</option>)}
                  </select>
                  {fieldErrors.gender && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.gender}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 space-y-4">
              <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('location')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('state')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value, district: '' }))}
                    className={fieldErrors.state ? errorInputClass : selectClass}
                  >
                    <option value="" disabled>{t('selectState')}</option>
                    {states.map((s) => <option key={s} value={s} className="bg-navy-800">{s}</option>)}
                  </select>
                  {fieldErrors.state && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.state}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t('district')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.district}
                    onChange={(e) => update('district', e.target.value)}
                    disabled={!profile.state}
                    className={`${fieldErrors.district ? errorInputClass : selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="" disabled>{profile.state ? t('selectDistrict') : t('selectStateFirst')}</option>
                    {(stateDistricts[profile.state] || []).map((district) => (
                      <option key={district} value={district} className="bg-navy-800">{district}</option>
                    ))}
                  </select>
                  {fieldErrors.district && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.district}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 space-y-4">
              <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {t('occupation')} & {t('annualIncome')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('occupation')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.occupation}
                    onChange={(e) => {
                      update('occupation', e.target.value);
                      if (!isNoIncomeOccupation(e.target.value)) {
                        setNoIncome(false);
                        if (profile.annualIncome === '0') update('annualIncome', '');
                      }
                    }}
                    className={fieldErrors.occupation ? errorInputClass : selectClass}
                  >
                    <option value="" disabled>{t('selectOccupation')}</option>
                    {occupations.map((o) => <option key={o.key} value={o.label} className="bg-navy-800">{o.label}</option>)}
                  </select>
                  {fieldErrors.occupation && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.occupation}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t('annualIncome')} <span className="text-red-400">*</span></label>
                  {isNoIncomeOccupation(profile.occupation) && (
                    <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={noIncome}
                        onChange={(e) => {
                          setNoIncome(e.target.checked);
                          if (e.target.checked) {
                            update('annualIncome', '0');
                            setFieldErrors((prev) => { const n = { ...prev }; delete n.annualIncome; return n; });
                          } else {
                            update('annualIncome', '');
                          }
                        }}
                        className="w-4 h-4 rounded border-navy-600 bg-navy-700 text-govgreen-600 focus:ring-govgreen-500 accent-govgreen-600"
                      />
                      <span className="text-navy-200 text-sm">
                        {lang === 'hi' ? 'मेरी कोई आय नहीं है' : lang === 'ta' ? 'எனக்கு வருவாய் இல்லை' : lang === 'kn' ? 'ನನಗೆ ಆದಾಯವಿಲ್ಲ' : lang === 'ml' ? 'എനിക്ക് വരുമാനമില്ല' : 'I have no income'}
                      </span>
                    </label>
                  )}
                  <input
                    type="text"
                    inputMode="numeric"
                    value={profile.annualIncome}
                    onChange={(e) => update('annualIncome', e.target.value)}
                    placeholder="e.g. 180000"
                    disabled={noIncome}
                    className={`${fieldErrors.annualIncome ? errorInputClass : inputClass} ${noIncome ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {fieldErrors.annualIncome && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.annualIncome}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 space-y-4">
              <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {t('educationLevel')} & {t('category')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('educationLevel')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.education}
                    onChange={(e) => update('education', e.target.value)}
                    className={fieldErrors.education ? errorInputClass : selectClass}
                  >
                    <option value="" disabled>{t('selectEducation')}</option>
                    {educationLevels.map((ed) => <option key={ed} value={ed} className="bg-navy-800">{ed}</option>)}
                  </select>
                  {fieldErrors.education && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.education}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t('category')} <span className="text-red-400">*</span></label>
                  <select
                    value={profile.category}
                    onChange={(e) => update('category', e.target.value)}
                    className={fieldErrors.category ? errorInputClass : selectClass}
                  >
                    <option value="" disabled>{t('selectCategory')}</option>
                    {categories.map((c) => <option key={c} value={c} className="bg-navy-800">{c}</option>)}
                  </select>
                  {fieldErrors.category && (
                    <div className={fieldErrorClass}>
                      <X className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{fieldErrors.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 space-y-4">
              <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('whatHelp')}
              </h2>

              <div>
                <label className={labelClass}>{t('describeSupport')} <span className="text-red-400">*</span></label>
                <textarea
                  value={profile.requirement}
                  onChange={(e) => update('requirement', e.target.value)}
                  placeholder={lang === 'hi' ? 'जैसे: उच्च शिक्षा के लिए छात्रवृत्ति, व्यवसाय ऋण, फसल बीमा...' : lang === 'ta' ? 'உதாரணம்: உயர் கல்விக்கு உதவித்தொகை, வணிக கடன், பயிர் காப்பீடு...' : lang === 'kn' ? 'ಉದಾ: ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ವಿದ್ಯಾರ್ಥಿವೇತನ, ವ್ಯವಹಾರ ಸಾಲ, ಬೆಳೆ ವಿಮೆ...' : lang === 'ml' ? 'ഉദാ: ഉന്നത വിദ്യാഭ്യാസത്തിന് സ്കോളർഷിപ്പ്, ബിസിനസ് വായ്പ, വിള ഇൻഷുറൻസ്...' : 'e.g. scholarship for higher studies, business loan, crop insurance...'}
                  rows={3}
                  className={`${fieldErrors.requirement ? errorInputClass : inputClass} resize-none`}
                />
                {fieldErrors.requirement && (
                  <div className={fieldErrorClass}>
                    <X className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{fieldErrors.requirement}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-govgreen-600 hover:bg-govgreen-500 disabled:bg-navy-700 disabled:text-navy-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('savingProfile')}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {t('saveGetRecommendations')}
                </>
              )}
            </button>

            <p className="text-center text-navy-400 text-xs flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('secureInfo')}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
