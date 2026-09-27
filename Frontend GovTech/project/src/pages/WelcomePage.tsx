import { Landmark, Bot, ChevronRight, Users, GraduationCap, Sprout, Briefcase, UserCheck, Zap, Settings } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface WelcomePageProps {
  onGetStarted: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
}

export default function WelcomePage({ onGetStarted, onOpenSettings, onOpenAdmin }: WelcomePageProps) {
  const { t, lang } = useLanguage();

  const userTypes = [
    { icon: GraduationCap, label: t('student'), desc: lang === 'hi' ? 'छात्रवृत्ति और ऋण' : lang === 'ta' ? 'உதவித்தொகை & கடன்' : lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ & ಸಾಲ' : lang === 'ml' ? 'സ്കോളർഷിപ്പ് & വായ്പ' : 'Scholarships & loans' },
    { icon: Sprout, label: t('farmer'), desc: lang === 'hi' ? 'सब्सिडी और बीमा' : lang === 'ta' ? 'மானியம் & காப்பீடு' : lang === 'kn' ? 'ಸಬ್ಸಿಡಿ & ವಿಮೆ' : lang === 'ml' ? 'സബ്സിഡി & ഇൻഷുറൻസ്' : 'Subsidies & insurance' },
    { icon: Users, label: lang === 'hi' ? 'महिलाएं' : lang === 'ta' ? 'பெண்கள்' : lang === 'kn' ? 'ಮಹಿಳೆಯರು' : lang === 'ml' ? 'സ്ത്രീകൾ' : 'Women', desc: lang === 'hi' ? 'कल्याण योजनाएं' : lang === 'ta' ? 'நலத்திட்டங்கள்' : lang === 'kn' ? 'ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು' : lang === 'ml' ? 'ക്ഷേമ പദ്ധതികൾ' : 'Welfare schemes' },
    { icon: UserCheck, label: lang === 'hi' ? 'वरिष्ठ नागरिक' : lang === 'ta' ? 'மூத்த குடிமக்கள்' : lang === 'kn' ? 'ಹಿರಿಯ ನಾಗರಿಕರು' : lang === 'ml' ? 'മുതിർന്ന പൗരന്മാർ' : 'Senior Citizens', desc: lang === 'hi' ? 'पेंशन लाभ' : lang === 'ta' ? 'ஓய்வூதிய நலன்கள்' : lang === 'kn' ? 'ಪಿಂಚಣಿ ಪ್ರಯೋಜನಗಳು' : lang === 'ml' ? 'പെൻഷൻ ആനുകൂല്യങ്ങൾ' : 'Pension benefits' },
    { icon: Briefcase, label: t('businessOwner'), desc: 'MSME support' },
    { icon: Zap, label: lang === 'hi' ? 'नौकरी तलाश' : lang === 'ta' ? 'வேலை தேடுபவர்கள்' : lang === 'kn' ? 'ಉದ್ಯೋಗ ಅರಸುವವರು' : lang === 'ml' ? 'തൊഴിൽ അന്വേഷകർ' : 'Job Seekers', desc: lang === 'hi' ? 'रोज़गार योजनाएं' : lang === 'ta' ? 'வேலைவாய்ப்பு திட்டங்கள்' : lang === 'kn' ? 'ಉದ್ಯೋಗ ಯೋಜನೆಗಳು' : lang === 'ml' ? 'തൊഴിൽ പദ്ധതികൾ' : 'Employment schemes' },
  ];

  const features = [
    lang === 'hi' ? 'एआई-संचालित व्यक्तिगत मिलान' : lang === 'ta' ? 'ஏஐ இயக்கப்பட்ட தனிப்பயன் பொருத்தம்' : lang === 'kn' ? 'ಎಐ-ಚಾಲಿತ ವೈಯಕ್ತಿಕ ಹೊಂದಾಣಿಕೆ' : lang === 'ml' ? 'എഐ-പവർഡ് വ്യക്തിഗത പൊരുത്തം' : 'AI-powered personalized matching',
    lang === 'hi' ? 'केंद्र और राज्य सरकारी योजनाएं' : lang === 'ta' ? 'மத்திய & மாநில அரசு திட்டங்கள்' : lang === 'kn' ? 'ಕೇಂದ್ರ & ರಾಜ್ಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : lang === 'ml' ? 'കേന്ദ്ര & സംസ്ഥാന സർക്കാർ പദ്ധതികൾ' : 'Central & State Government schemes',
    lang === 'hi' ? 'सरल भाषा में पात्रता' : lang === 'ta' ? 'எளிய மொழியில் தகுதி' : lang === 'kn' ? 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಹತೆ' : lang === 'ml' ? 'ലളിതമായ ഭാഷയിൽ യോഗ്യത' : 'Eligibility explained in simple language',
    lang === 'hi' ? 'आवश्यक दस्तावेज़ चेकलिस्ट' : lang === 'ta' ? 'தேவையான ஆவணங்கள் பட்டியல்' : lang === 'kn' ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ' : lang === 'ml' ? 'ആവശ്യമായ രേഖകളുടെ പട്ടിക' : 'Required documents checklist',
    lang === 'hi' ? 'सीधे आवेदन लिंक' : lang === 'ta' ? 'நேரடி விண்ணப்ப இணைப்புகள்' : lang === 'kn' ? 'ನೇರ ಅರ್ಜಿ ಲಿಂಕ್‌ಗಳು' : lang === 'ml' ? 'നേരിട്ട അപേക്ഷാ ലിങ്കുകൾ' : 'Direct application links',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-navy-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-widest uppercase">{t('appName')}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-govgreen-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-navy-200 text-sm hidden sm:block">Smart Scheme Finder</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition-colors"
            title={t('settings')}
          >
            <Settings className="w-4 h-4 text-navy-200" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-navy-700 flex items-center justify-center shadow-2xl">
                <Landmark className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-govgreen-600 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {lang === 'hi' ? 'सरकारी योजनाएँ' : lang === 'ta' ? 'அரசு திட்டங்களை' : lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು' : lang === 'ml' ? 'സർക്കാർ പദ്ധതികൾ' : 'Find Government'}
            <span className="block text-govgreen-400">
              {lang === 'hi' ? 'मिनटों में खोजें' : lang === 'ta' ? 'நிமிடங்களில் கண்டறியவும்' : lang === 'kn' ? 'ನಿಮಿಷಗಳಲ್ಲಿ ಕಂಡುಹಿಡಿಯಿರಿ' : lang === 'ml' ? 'മിനിറ്റുകളിൽ കണ്ടെത്തുക' : ' Schemes in Minutes'}
            </span>
          </h1>

          <p className="text-navy-200 text-lg mb-2 italic">
            {lang === 'hi' ? '"हर नागरिक को एआई से सशक्त बनाना"' : lang === 'ta' ? '"ஒவ்வொரு குடிமகனையும் ஏஐ மூலம் வலுப்படுத்துதல்"' : lang === 'kn' ? '"ಪ್ರತಿ ನಾಗರಿಕನನ್ನು ಎಐ ಮೂಲಕ ಸಬಲೀಕರಣ"' : lang === 'ml' ? '"ഓരോ പൗരനെയും എഐ വഴി ശാക്തീകരിക്കുക"' : '"Empowering Every Citizen Through AI"'}
          </p>
          <div className="w-16 h-0.5 bg-govgreen-500 mx-auto mb-8" />

          <p className="text-navy-100 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'लाखों नागरिक उन सरकारी योजनाओं से अनजान हैं जिनके वे पात्र हैं। हमारा एआई आपको सही योजनाएँ खोजने, समझने और आवेदन करने में मदद करता है — तुरंत।'
              : lang === 'ta'
              ? 'லட்சக்கணக்கான குடிமக்கள் தாங்கள் தகுதி பெறும் அரசு திட்டங்களைப் பற்றி அறியவில்லை. எங்கள் ஏஐ சரியான திட்டங்களைக் கண்டறிய உதவுகிறது — உடனே.'
              : lang === 'kn'
              ? 'ಲಕ್ಷಾಂತರ ನಾಗರಿಕರು ತಾವು ಅರ್ಹರಾಗಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿದಿಲ್ಲ. ನಮ್ಮ ಎಐ ಸರಿಯಾದ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ — ತಕ್ಷಣ.'
              : lang === 'ml'
              ? 'ദശലക്ഷക്കണക്കിന് പൗരന്മാർ തങ്ങൾക്ക് യോഗ്യരായ സർക്കാർ പദ്ധതികളെക്കുറിച്ച് അറിയില്ല. നമ്മുടെ എഐ ശരിയായ പദ്ധതികൾ കണ്ടെത്താൻ സഹായിക്കുന്നു — ഉടനെ.'
              : 'Millions of citizens are unaware of the government schemes they qualify for. Our AI helps you discover, understand, and apply for the right schemes — instantly.'}
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-govgreen-600 hover:bg-govgreen-500 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-govgreen-900/40 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {t('getStarted')}
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-navy-400 text-sm mt-4">
            {lang === 'hi' ? 'मुफ़्त · पंजीकरण आवश्यक नहीं · 2 मिनट में' : lang === 'ta' ? 'இலவசம் · பதிவு தேவையில்லை · 2 நிமிடங்கள்' : lang === 'kn' ? 'ಉಚಿತ · ನೋಂದಣಿ ಅಗತ್ಯವಿಲ್ಲ · 2 ನಿಮಿಷಗಳು' : lang === 'ml' ? 'സൗജന്യം · രജിസ്ട്രേഷൻ ആവശ്യമില്ല · 2 മിനിറ്റ്' : 'Free · No registration required · Takes 2 minutes'}
          </p>
        </div>

        <div className="w-full max-w-3xl mt-16">
          <p className="text-navy-300 text-xs font-semibold tracking-widest uppercase mb-6">
            {lang === 'hi' ? 'यह कौन उपयोग कर सकता है?' : lang === 'ta' ? 'இதை யார் பயன்படுத்தலாம்?' : lang === 'kn' ? 'ಇದನ್ನು ಯಾರು ಬಳಸಬಹುದು?' : lang === 'ml' ? 'ആർക്കൊക്കെ ഉപയോഗിക്കാം?' : 'Who can use this?'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {userTypes.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-navy-800/60 border border-navy-700/50 rounded-xl px-4 py-3 hover:bg-navy-700/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-govgreen-400" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-navy-300 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-3xl mt-12 bg-navy-800/40 border border-navy-700/40 rounded-2xl p-6">
          <p className="text-navy-300 text-xs font-semibold tracking-widest uppercase mb-4">
            {lang === 'hi' ? 'हमारा एआई क्या करता है' : lang === 'ta' ? 'எங்கள் ஏஐ என்ன செய்கிறது' : lang === 'kn' ? 'ನಮ್ಮ ಎಐ ಏನು ಮಾಡುತ್ತದೆ' : lang === 'ml' ? 'നമ്മുടെ എഐ എന്ത് ചെയ്യുന്നു' : 'What our AI does'}
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-navy-100 text-sm">
                <div className="w-5 h-5 rounded-full bg-govgreen-700 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-navy-500 text-xs">
        {t('appName')} &nbsp;·&nbsp; team@govtech-ai.project
      </footer>

           <button onClick={onOpenAdmin} className="text-navy-400 text-sm mt-8 mb-4 block mx-auto hover:text-white transition-colors">
        Admin
      </button>
    </div>
  );
}
