import { Check, ChevronLeft, Globe, Landmark, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languages } from '@/i18n/translations';

interface SettingsPageProps {
  onBack: () => void;
}

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const { lang, setLang, t } = useLanguage();

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
        <div className="w-8" />
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-govgreen-600 flex items-center justify-center shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('settingsTitle')}</h1>
            <p className="text-navy-300 text-sm">{t('settingsDesc')}</p>
          </div>

          <div className="bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5">
            <h2 className="text-govgreen-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4" />
              {t('language')}
            </h2>
            <p className="text-navy-300 text-sm mb-4">{t('selectLanguage')}</p>

            <div className="space-y-2.5">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setLang(language.code)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                    lang === language.code
                      ? 'bg-govgreen-600/20 border-govgreen-600/60'
                      : 'bg-navy-700/40 border-navy-600/40 hover:border-navy-500 hover:bg-navy-700/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-semibold ${lang === language.code ? 'text-govgreen-300' : 'text-white'}`}>
                      {language.nativeName}
                    </span>
                    <span className="text-navy-400 text-xs">{language.name}</span>
                  </div>
                  {lang === language.code && (
                    <div className="w-6 h-6 rounded-full bg-govgreen-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-95"
          >
            <X className="w-5 h-5" />
            {t('closeSettings')}
          </button>
        </div>
      </main>
    </div>
  );
}
