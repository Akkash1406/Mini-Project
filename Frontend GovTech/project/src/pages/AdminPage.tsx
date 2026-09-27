import { useState, FormEvent } from 'react';
import { Search, Lock, ChevronLeft, User, Calendar } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

interface SearchHistoryEntry {
  id: string;
  occupation: string;
  annual_income: string;
  education: string;
  category: string;
  age: string;
  gender: string;
  requirement: string;
  recommended_schemes: { id: string; name: string; matchScore: number }[];
  created_at: string;
}

interface LookupResult {
  user_id: string;
  email: string | null;
  profile: Record<string, any>;
  search_history: SearchHistoryEntry[];
}

interface AdminPageProps {
  onBack: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [adminPassword, setAdminPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LookupResult[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim()) {
      setUnlocked(true);
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/lookup?query=${encodeURIComponent(query)}`,
        {
          headers: { 'X-Admin-Password': adminPassword },
        }
      );
      if (response.status === 401) {
        setError('Incorrect admin password.');
        setUnlocked(false);
        setResults([]);
        return;
      }
      if (response.status === 404) {
        setError('No matching user found.');
        setResults([]);
        return;
      }
      if (!response.ok) {
        setError('Something went wrong. Try again.');
        return;
      }
      const data = await response.json();
      setResults(data.results);
    } catch {
      setError('Could not reach the backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
        <form onSubmit={handleUnlock} className="w-full max-w-sm bg-navy-800/60 border border-navy-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-govgreen-400" />
            <h1 className="text-white text-lg font-bold">Admin Access</h1>
          </div>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-navy-700/50 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm mb-4 focus:outline-none focus:border-govgreen-500"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-govgreen-600 hover:bg-govgreen-500 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full text-navy-400 text-sm mt-3 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-navy-300 hover:text-white mb-6 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-white text-xl font-bold mb-4">Admin: Look up a user</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-govgreen-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-govgreen-600 hover:bg-govgreen-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {results.map((r) => (
          <div key={r.user_id} className="bg-navy-800/60 border border-navy-700/50 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-govgreen-400" />
              <h2 className="text-white font-semibold">{r.profile.full_name || 'Unnamed'}</h2>
              <span className="text-navy-400 text-xs">{r.email}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 text-sm">
              {Object.entries(r.profile)
                .filter(([key]) => !['id', 'full_name'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="bg-navy-900/50 rounded-lg px-3 py-2">
                    <p className="text-navy-500 text-xs uppercase">{key}</p>
                    <p className="text-navy-100">{String(value ?? '-')}</p>
                  </div>
                ))}
            </div>

            <h3 className="text-navy-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Search History ({r.search_history.length})
            </h3>
            <div className="space-y-2">
              {r.search_history.map((h) => (
                <div key={h.id} className="bg-navy-900/40 rounded-lg p-3 text-xs">
                  <p className="text-navy-400 mb-1">{new Date(h.created_at).toLocaleString()}</p>
                  <p className="text-navy-200">
                    Requirement: <span className="text-white">{h.requirement}</span> ·
                    Occupation: <span className="text-white">{h.occupation}</span>
                  </p>
                  <p className="text-navy-300 mt-1">
                    Matched: {h.recommended_schemes.map((s) => `${s.name} (${s.matchScore}%)`).join(', ')}
                  </p>
                </div>
              ))}
              {r.search_history.length === 0 && (
                <p className="text-navy-500 text-xs">No searches logged yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}