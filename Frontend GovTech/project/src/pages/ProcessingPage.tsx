import { useEffect, useState } from 'react';
import { Landmark, Bot, Loader2, CheckCircle2, Brain, Database, Sparkles } from 'lucide-react';

interface ProcessingPageProps {
  onComplete: () => void;
}

const steps = [
  { icon: Database, label: 'Reading your profile', desc: 'Analyzing age, occupation, income & location' },
  { icon: Brain, label: 'Matching schemes', desc: 'Comparing against 50+ government schemes' },
  { icon: Sparkles, label: 'Ranking recommendations', desc: 'Scoring eligibility & benefits for you' },
  { icon: CheckCircle2, label: 'Preparing results', desc: 'Building your personalized report' },
];

export default function ProcessingPage({ onComplete }: ProcessingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }, 900);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-center border-b border-navy-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-widest uppercase">AI + GovTech</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          {/* Animated orb */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-govgreen-600/20 animate-pulse-slow" />
            <div className="absolute inset-2 rounded-full bg-govgreen-600/30 animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-4 rounded-full bg-navy-700 flex items-center justify-center">
              <Brain className="w-12 h-12 text-govgreen-400 animate-pulse-slow" />
            </div>
            <Loader2 className="absolute -bottom-1 -right-1 w-8 h-8 text-govgreen-400 animate-spin" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">AI is analyzing your profile</h2>
          <p className="text-navy-300 text-sm mb-8">Finding the best government schemes for you...</p>

          {/* Progress bar */}
          <div className="h-2 bg-navy-700/50 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-govgreen-600 to-govgreen-400 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-govgreen-400 text-sm font-semibold mb-10">{progress}%</p>

          {/* Steps */}
          <div className="space-y-3 text-left">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    isDone
                      ? 'bg-govgreen-900/30 border-govgreen-700/40'
                      : isActive
                      ? 'bg-navy-700/60 border-govgreen-600/40'
                      : 'bg-navy-800/30 border-navy-700/30 opacity-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-govgreen-600' : isActive ? 'bg-navy-600' : 'bg-navy-700'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 text-govgreen-400 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-navy-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDone || isActive ? 'text-white' : 'text-navy-400'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs ${isDone || isActive ? 'text-navy-300' : 'text-navy-500'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-10 text-navy-400 text-xs">
            <Bot className="w-4 h-4" />
            <span>AI Assistant is working...</span>
          </div>
        </div>
      </main>
    </div>
  );
}
