import { useState, FormEvent } from 'react';
import { Landmark, Mail, Lock, User, Loader2, AlertCircle, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface AuthPageProps {
  onOpenSettings: () => void;
}

export default function AuthPage({ onOpenSettings }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = mode === 'login' ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-navy-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-widest uppercase">AI + GovTech</span>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4 text-navy-200" />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-navy-700 flex items-center justify-center shadow-2xl">
                <Landmark className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-navy-300 text-sm">
              {mode === 'login'
                ? 'Sign in to access your personalized scheme recommendations'
                : 'Sign up to discover government schemes tailored for you'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-navy-800/60 border border-navy-700/50 rounded-full p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                mode === 'login' ? 'bg-govgreen-600 text-white' : 'text-navy-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                mode === 'signup' ? 'bg-govgreen-600 text-white' : 'text-navy-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-navy-200 text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-navy-700/60 border border-navy-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-govgreen-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-navy-200 text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-navy-700/60 border border-navy-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-navy-400 focus:outline-none focus:border-govgreen-500 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-900/30 border border-red-700/40 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-govgreen-600 hover:bg-govgreen-500 disabled:bg-navy-700 disabled:text-navy-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-navy-400 text-xs mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
              className="text-govgreen-400 hover:text-govgreen-300 font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-2 mt-8 text-navy-500 text-xs">
            <User className="w-3.5 h-3.5" />
            <span>Your data is securely stored and never shared</span>
          </div>
        </div>
      </main>
    </div>
  );
}
