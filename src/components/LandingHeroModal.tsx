import React from 'react';

interface LandingHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterApp: () => void;
  onOpenAuthModal?: (mode?: 'login' | 'signup') => void;
}

export const LandingHeroModal: React.FC<LandingHeroModalProps> = ({
  isOpen,
  onClose,
  onEnterApp,
  onOpenAuthModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#051424] text-[#d4e4fa] animate-in fade-in duration-200">
      {/* Background Kinetic Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="200" r="300" fill="url(#grad1)">
            <animate attributeName="cx" dur="20s" repeatCount="indefinite" values="200;800;200" />
            <animate attributeName="cy" dur="25s" repeatCount="indefinite" values="200;500;200" />
          </circle>
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: '#0066ff', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto min-h-screen flex flex-col p-6 sm:p-12">
        {/* Top Navbar */}
        <header className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-on-primary-container text-[22px]">
                bolt
              </span>
            </div>
            <span className="font-extrabold text-xl text-on-surface tracking-tight">Ascend</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenAuthModal) onOpenAuthModal('login');
                else onEnterApp();
              }}
              className="text-xs font-bold text-on-surface hover:text-primary px-3.5 py-2 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => {
                if (onOpenAuthModal) onOpenAuthModal('signup');
                else onEnterApp();
              }}
              className="bg-primary-container text-on-primary-container text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all"
            >
              Sign Up
            </button>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors ml-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col gap-12 py-8 justify-center">
          <section className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                NOW IN PUBLIC BETA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface leading-tight tracking-tight">
              Focus on the work that <span className="text-primary">matters.</span>
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Ascend is a high-performance workspace designed for professionals who demand precision. Experience Deep Focus Mode, Kinetic Workflow, and real-time Team Velocity insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
              <button
                onClick={() => {
                  if (onOpenAuthModal) onOpenAuthModal('signup');
                  else onEnterApp();
                }}
                className="bg-primary-container text-on-primary-container font-bold py-3.5 px-8 rounded-xl shadow-xl shadow-primary-container/30 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Start for Free with Email or Google</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={onEnterApp}
                className="bg-surface-container-highest text-on-surface font-semibold py-3.5 px-8 rounded-xl border border-white/5 hover:bg-surface-bright transition-colors"
              >
                Enter App directly
              </button>
            </div>
          </section>

          {/* Features Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container/60 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center mb-1 text-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">Frictionless Entry</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Capture tasks at the speed of thought. Zero-latency inputs and intelligent momentum processing keep you in the zone.
              </p>
            </div>

            <div className="bg-surface-container/60 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center mb-1 text-primary">
                <span className="material-symbols-outlined">target</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">Deep Focus Mode</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Silence the noise. Block distractions and enter a dedicated work state designed to maximize your cognitive output.
              </p>
            </div>

            <div className="bg-surface-container/60 backdrop-blur-xl border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center mb-1 text-primary">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface">Team Velocity</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Real-time automated insights. Identify bottlenecks before they happen with predictive velocity charts and health metrics.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
