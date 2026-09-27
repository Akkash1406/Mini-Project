import { useState, useEffect } from 'react';
import { UserProfile, Scheme, Screen } from '@/types';
import { getRecommendations } from '@/lib/api';
import { AuthProvider, useAuth } from '@/lib/auth';
import AdminPage from '@/pages/AdminPage';
import { getProfile, StoredProfile } from '@/lib/profile';
import { LanguageProvider } from '@/i18n/LanguageContext';
import WelcomePage from '@/pages/WelcomePage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import ProcessingPage from '@/pages/ProcessingPage';
import RecommendationsPage from '@/pages/RecommendationsPage';
import SettingsPage from '@/pages/SettingsPage';



type SchemeWithScore = Scheme & { matchScore: number };

function AppContent() {
  const { session, loading: authLoading } = useAuth();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [storedProfile, setStoredProfile] = useState<StoredProfile | null>(null);
  const [recommendations, setRecommendations] = useState<SchemeWithScore[]>([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [prevScreen, setPrevScreen] = useState<Screen>('welcome');

  useEffect(() => {
    if (session?.user) {
      setProfileLoading(true);
      getProfile(session.user.id).then((p) => {
        setStoredProfile(p);
        setProfileLoading(false);
      });
    } else {
      setStoredProfile(null);
    }
  }, [session]);

  const computeRecommendations = async (p: UserProfile) => {
    const results = await getRecommendations({
      occupation: p.occupation,
      annualIncome: p.annualIncome,
      education: p.education,
      category: p.category,
      age: p.age,
      gender: p.gender,
      requirement: p.requirement,
    });
    setRecommendations(results);
  };

  const handleGetStarted = async () => {
    if (session?.user) {
      if (storedProfile) {
        const p: UserProfile = {
          name: storedProfile.full_name,
          age: storedProfile.age ? String(storedProfile.age) : '',
          state: storedProfile.state || '',
          district: storedProfile.district || '',
          occupation: storedProfile.occupation || '',
          annualIncome: storedProfile.annual_income || '',
          education: storedProfile.education || '',
          category: storedProfile.category || '',
          requirement: storedProfile.requirement || '',
          gender: storedProfile.gender || '',
        };
        setProfile(p);
        await computeRecommendations(p);
        setScreen('recommendations');
      } else {
        setScreen('profile');
      }
    } else {
      setScreen('auth');
    }
  };

  const handleAuthSuccess = () => {
    if (session?.user) {
      setProfileLoading(true);
      getProfile(session.user.id).then(async (p) => {
        setStoredProfile(p);
        setProfileLoading(false);
        if (p) {
          const userProfile: UserProfile = {
            name: p.full_name,
            age: p.age ? String(p.age) : '',
            state: p.state || '',
            district: p.district || '',
            occupation: p.occupation || '',
            annualIncome: p.annual_income || '',
            education: p.education || '',
            category: p.category || '',
            requirement: p.requirement || '',
            gender: p.gender || '',
          };
          setProfile(userProfile);
          await computeRecommendations(userProfile);
          setScreen('recommendations');
        } else {
          setScreen('profile');
        }
      });
    } else {
      setScreen('profile');
    }
  };

  useEffect(() => {
    if (screen === 'auth' && session?.user) {
      handleAuthSuccess();
    }
  }, [screen, session]);

  const handleProfileComplete = () => {
    if (session?.user) {
      getProfile(session.user.id).then(async (p) => {
        setStoredProfile(p);
        if (p) {
          const userProfile: UserProfile = {
            name: p.full_name,
            age: p.age ? String(p.age) : '',
            state: p.state || '',
            district: p.district || '',
            occupation: p.occupation || '',
            annualIncome: p.annual_income || '',
            education: p.education || '',
            category: p.category || '',
            requirement: p.requirement || '',
            gender: p.gender || '',
          };
          setProfile(userProfile);
          await computeRecommendations(userProfile);
        }
        setScreen('processing');
      });
    } else {
      setScreen('processing');
    }
  };

  const handleProcessingComplete = () => setScreen('recommendations');

  const handleRestart = () => {
    setProfile(null);
    setRecommendations([]);
    setScreen('welcome');
  };

  const openSettings = () => {
    setPrevScreen(screen);
    setScreen('settings');
  };

  const closeSettings = () => setScreen(prevScreen);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-govgreen-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  switch (screen) {
    case 'welcome':
      return <WelcomePage onGetStarted={handleGetStarted} onOpenSettings={openSettings} onOpenAdmin={() => setScreen('adminLogin')} />;
    case 'auth':
      return <AuthPage onOpenSettings={openSettings} />;
    case 'profile':
      return (
        <ProfilePage
          onComplete={handleProfileComplete}
          onBack={handleRestart}
          existingProfile={storedProfile}
          onOpenSettings={openSettings}
        />
      );
    case 'processing':
      return <ProcessingPage onComplete={handleProcessingComplete} />;
        case 'recommendations':
      return profile ? (
        <RecommendationsPage
          profile={profile}
          recommendations={recommendations}
          onRestart={handleRestart}
          onEditProfile={() => setScreen('profile')}
          onOpenSettings={openSettings}
        />
      ) : (
         <WelcomePage onGetStarted={handleGetStarted} onOpenSettings={openSettings} onOpenAdmin={() => setScreen('adminLogin')} />
      );
    case 'adminLogin':
      return <AdminPage onBack={() => setScreen('welcome')} />;
    case 'settings':
      return <SettingsPage onBack={closeSettings} />;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
