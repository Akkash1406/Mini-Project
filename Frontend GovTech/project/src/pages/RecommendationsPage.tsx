import { useState } from 'react';
import {
  Landmark, Bot, ChevronLeft, CheckCircle2, FileText, Gift, ExternalLink,
  Sparkles, Search, Filter, Download, RefreshCw, ThumbsUp, Share2, LogOut, Pencil, Settings,
} from 'lucide-react';
import { UserProfile, Scheme } from '@/types';
import { useAuth } from '@/lib/auth';

interface RecommendationsPageProps {
  profile: UserProfile;
  recommendations: (Scheme & { matchScore: number })[];
  onRestart: () => void;
  onEditProfile: () => void;
  onOpenSettings: () => void;
}

export default function RecommendationsPage({ profile, recommendations, onRestart, onEditProfile, onOpenSettings }: RecommendationsPageProps) {
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(recommendations.map((r) => r.category)))];

  const filtered = recommendations.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || r.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-govgreen-400 bg-govgreen-900/40 border-govgreen-700/40';
    if (score >= 40) return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/40';
    return 'text-navy-200 bg-navy-700/40 border-navy-600/40';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Highly Matched';
    if (score >= 40) return 'Good Match';
    return 'Partial Match';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-navy-700/50 sticky top-0 z-20 bg-navy-900/80 backdrop-blur-md">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 text-navy-200 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Start Over
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-widest uppercase hidden sm:block">AI + GovTech</span>
        </div>
        <div className="flex items-center gap-2">
          {user?.email && (
            <span className="text-navy-300 text-xs hidden sm:block">{user.email}</span>
          )}
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 text-navy-200" />
          </button>
          <button
            onClick={onEditProfile}
            className="w-8 h-8 rounded-full bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition-colors"
            title="Edit profile"
          >
            <Pencil className="w-4 h-4 text-navy-200" />
          </button>
          <button
            onClick={signOut}
            className="w-8 h-8 rounded-full bg-govgreen-600 hover:bg-govgreen-500 flex items-center justify-center transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero banner */}
          <div className="bg-gradient-to-r from-govgreen-900/40 to-navy-800/60 border border-govgreen-700/30 rounded-2xl p-6 mb-8 animate-fade-in-up">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-govgreen-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {profile.name ? `${profile.name}, ` : ''}here are your personalized schemes
                </h1>
                <p className="text-navy-200 text-sm">
                  Based on your profile, our AI found <span className="text-govgreen-400 font-semibold">{recommendations.length} schemes</span> you may qualify for.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-navy-700/50 text-navy-200 text-xs px-2.5 py-1 rounded-full">{profile.occupation}</span>
                  <span className="bg-navy-700/50 text-navy-200 text-xs px-2.5 py-1 rounded-full">{profile.state}</span>
                  <span className="bg-navy-700/50 text-navy-200 text-xs px-2.5 py-1 rounded-full">{profile.category} Category</span>
                  {profile.age && <span className="bg-navy-700/50 text-navy-200 text-xs px-2.5 py-1 rounded-full">Age {profile.age}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Search & filter */}
          {recommendations.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search schemes..."
                  className="w-full bg-navy-700/50 border border-navy-600 rounded-full pl-10 pr-4 py-2.5 text-white text-sm placeholder-navy-400 focus:outline-none focus:border-govgreen-500 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter className="w-4 h-4 text-navy-400 shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      activeFilter === cat
                        ? 'bg-govgreen-600 text-white'
                        : 'bg-navy-700/50 text-navy-300 hover:text-white hover:bg-navy-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations list */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-navy-400" />
              </div>
              <p className="text-white text-lg font-semibold mb-1">No schemes found</p>
              <p className="text-navy-300 text-sm mb-6">
                {recommendations.length === 0
                  ? "We couldn't find matching schemes for your profile. Try adjusting your answers."
                  : "No schemes match your search. Try a different keyword."}
              </p>
              <button
                onClick={onRestart}
                className="inline-flex items-center gap-2 bg-govgreen-600 hover:bg-govgreen-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((scheme, idx) => (
                <div
                  key={scheme.id}
                  className="bg-navy-800/60 border border-navy-700/50 rounded-2xl overflow-hidden hover:border-govgreen-700/50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Card header */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-navy-700 text-navy-200 text-xs px-2 py-0.5 rounded-full">{scheme.category}</span>
                          <span className="text-navy-400 text-xs">{scheme.ministry}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{scheme.name}</h3>
                        <p className="text-navy-300 text-sm line-clamp-2">{scheme.description}</p>
                      </div>
                      <div className={`shrink-0 text-center border rounded-xl px-3 py-2 ${getScoreColor(scheme.matchScore)}`}>
                        <p className="text-2xl font-bold leading-none">{scheme.matchScore}%</p>
                        <p className="text-[10px] mt-1 uppercase tracking-wide">{getScoreLabel(scheme.matchScore)}</p>
                      </div>
                    </div>

                    {/* Quick benefits preview */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {scheme.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-govgreen-300">
                          <Gift className="w-3.5 h-3.5" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedId === scheme.id && (
                    <div className="border-t border-navy-700/50 px-5 py-5 bg-navy-900/40">
                      {/* Eligibility */}
                      <div className="mb-5">
                        <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-govgreen-400" />
                          Eligibility Criteria
                        </h4>
                        <ul className="space-y-1.5">
                          {scheme.eligibility.map((e, i) => (
                            <li key={i} className="flex items-start gap-2 text-navy-200 text-sm">
                              <span className="text-govgreen-500 mt-0.5">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-5">
                        <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                          <Gift className="w-4 h-4 text-govgreen-400" />
                          Benefits
                        </h4>
                        <ul className="space-y-1.5">
                          {scheme.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-navy-200 text-sm">
                              <span className="text-govgreen-500 mt-0.5">•</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      <div className="mb-5">
                        <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-govgreen-400" />
                          Required Documents
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documents.map((d, i) => (
                            <span key={i} className="bg-navy-700/50 text-navy-200 text-xs px-2.5 py-1 rounded-lg border border-navy-600/40">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                          href={scheme.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-govgreen-600 hover:bg-govgreen-500 text-white font-semibold px-5 py-3 rounded-full transition-colors"
                        >
                          Apply Now
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button className="inline-flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-navy-200 font-medium px-5 py-3 rounded-full transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          Save
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-navy-200 font-medium px-5 py-3 rounded-full transition-colors text-sm">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Feedback bar */}
          {recommendations.length > 0 && (
            <div className="mt-10 bg-navy-800/40 border border-navy-700/40 rounded-2xl p-5 text-center">
              <p className="text-navy-200 text-sm mb-3">Were these recommendations helpful?</p>
              <div className="flex items-center justify-center gap-3">
                <button className="inline-flex items-center gap-2 bg-navy-700 hover:bg-govgreen-700 text-navy-200 hover:text-white px-5 py-2.5 rounded-full text-sm transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Yes, helpful
                </button>
                <button
                  onClick={onRestart}
                  className="inline-flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-navy-200 px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Search again
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-navy-500 text-xs">
        AI + GovTech &nbsp;·&nbsp; Recommendations are AI-generated. Please verify eligibility before applying.
      </footer>
    </div>
  );
}
