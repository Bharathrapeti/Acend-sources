import React, { useState } from 'react';

interface SettingsViewProps {
  onOpenLandingModal: () => void;
  currentUser?: { name: string; email: string; role: string; avatar: string };
  onOpenAuthModal: (mode?: 'login' | 'signup') => void;
  onSignOut?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onOpenLandingModal,
  currentUser = {
    name: 'Alex Vance',
    email: 'alex.vance@ascend.io',
    role: 'Commander • Ascend Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  onOpenAuthModal,
  onSignOut,
}) => {
  const [focusTargetMins, setFocusTargetMins] = useState(45);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoArchiving, setAutoArchiving] = useState(true);
  const [velocityGoalPercent, setVelocityGoalPercent] = useState(80);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-28 gap-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Configuration
          </span>
          <h1 className="text-2xl font-bold text-on-surface">Workspace Settings</h1>
        </div>
        <button
          onClick={onOpenLandingModal}
          className="px-3.5 py-1.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 font-semibold text-xs hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          View Landing Showcase
        </button>
      </div>

      {/* User Profile & Auth Card */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 border border-white/5 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary shrink-0"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-on-surface truncate">
                {currentUser.name}
              </h2>
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                PRO
              </span>
            </div>
            <p className="text-xs text-on-surface-variant truncate">{currentUser.email}</p>
            <p className="text-[11px] font-semibold text-primary/80 mt-0.5 truncate">
              {currentUser.role}
            </p>
          </div>
        </div>

        {/* Auth Actions Row */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <button
            onClick={() => onOpenAuthModal('login')}
            className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-xs font-semibold text-on-surface flex items-center justify-center gap-1.5 border border-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Switch Account / Log In</span>
          </button>
          <button
            onClick={() => onOpenAuthModal('signup')}
            className="py-2 px-3 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 text-xs font-semibold text-primary flex items-center justify-center gap-1.5 border border-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>Sign Up</span>
          </button>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="py-2 px-3 rounded-xl bg-error/15 hover:bg-error/25 text-xs font-semibold text-error flex items-center justify-center gap-1 border border-error/20 transition-all"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          )}
        </div>
      </section>

      {/* Focus & Kinetic Parameters */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 border border-white/5 shadow-xl">
        <h3 className="text-xs font-bold uppercase text-primary tracking-wider">
          Focus Session Parameters
        </h3>

        {/* Focus Target Duration */}
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-on-surface">
              Target Focus Block Duration
            </span>
            <span className="text-xs text-on-surface-variant">
              Minutes of continuous uninterrupted work session
            </span>
          </div>
          <select
            value={focusTargetMins}
            onChange={(e) => setFocusTargetMins(Number(e.target.value))}
            className="bg-surface-container-high text-on-surface border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none"
          >
            <option value={25}>25 mins</option>
            <option value={45}>45 mins</option>
            <option value={60}>60 mins</option>
            <option value={90}>90 mins</option>
          </select>
        </div>

        {/* Daily Velocity Goal Slider */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-on-surface">Daily Velocity Target Goal</span>
            <span className="font-bold text-primary">{velocityGoalPercent}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            value={velocityGoalPercent}
            onChange={(e) => setVelocityGoalPercent(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>
      </section>

      {/* Toggles & Preferences */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 border border-white/5 shadow-xl">
        <h3 className="text-xs font-bold uppercase text-primary tracking-wider">
          Automation & Sound
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-on-surface">
              Kinetic Audio Feedback
            </span>
            <span className="text-xs text-on-surface-variant">
              Micro-chimes on task ignition and goal completion
            </span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              soundEnabled ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-[#051424] transition-all ${
                soundEnabled ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-on-surface">
              Auto-Archive Completed Steps
            </span>
            <span className="text-xs text-on-surface-variant">
              Automatically clean finished tasks after 24 hours
            </span>
          </div>
          <button
            onClick={() => setAutoArchiving(!autoArchiving)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              autoArchiving ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-[#051424] transition-all ${
                autoArchiving ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Source Code & Data Export Section */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 border border-primary/20 shadow-xl bg-gradient-to-b from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">folder_zip</span>
              Project Source Code & Downloads
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Download the complete source codebase or export workspace data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href="/ascend-app-source.zip"
            download="ascend-app-source.zip"
            className="flex items-center justify-between p-3.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <div className="flex flex-col text-left">
                <span>Download Project (.zip)</span>
                <span className="text-[10px] font-normal opacity-90">All components, styles & configs</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
          </a>

          <a
            href="/ascend-app-source.tar.gz"
            download="ascend-app-source.tar.gz"
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-white/10 text-on-surface font-semibold text-xs active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-primary">archive</span>
              <div className="flex flex-col text-left">
                <span>Download Archive (.tar.gz)</span>
                <span className="text-[10px] text-on-surface-variant">Linux / macOS tarball</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">download</span>
          </a>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-3 border border-white/5 shadow-xl">
        <h3 className="text-xs font-bold uppercase text-primary tracking-wider">
          Keyboard Shortcuts
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high">
            <span className="text-on-surface-variant">New Task</span>
            <kbd className="px-2 py-0.5 rounded bg-[#051424] text-primary font-mono text-[10px]">
              N
            </kbd>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high">
            <span className="text-on-surface-variant">Focus Toggle</span>
            <kbd className="px-2 py-0.5 rounded bg-[#051424] text-primary font-mono text-[10px]">
              Space
            </kbd>
          </div>
        </div>
      </section>
    </div>
  );
};
