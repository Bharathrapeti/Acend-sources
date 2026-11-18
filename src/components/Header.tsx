import React from 'react';
import { ActiveTab } from '../types';
import { USER_PROFILE } from '../data/initialData';

interface HeaderProps {
  activeTab: ActiveTab;
  titleOverride?: string;
  onBackClick?: () => void;
  onProfileClick: () => void;
  focusTimerFormatted?: string;
  isFocusActive?: boolean;
  currentUser?: { name: string; avatar: string };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  titleOverride,
  onBackClick,
  onProfileClick,
  focusTimerFormatted,
  isFocusActive,
  currentUser,
}) => {
  const getTabTitle = () => {
    if (titleOverride) return titleOverride;
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'tasks':
        return 'All Tasks';
      case 'calendar':
        return 'Calendar';
      case 'settings':
        return 'Settings';
      default:
        return 'Ascend';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass pt-safe border-b border-white/5">
      <div className="h-16 px-6 flex items-center justify-between">
        {onBackClick ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onBackClick}
              className="p-2 -ml-2 text-on-surface hover:bg-white/5 rounded-full transition-colors flex items-center justify-center active:scale-90"
              aria-label="Go Back"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <span className="font-semibold text-lg text-on-surface">{getTabTitle()}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={USER_PROFILE.logo}
              alt="Ascend Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-lg text-on-surface tracking-tight">
              {getTabTitle()}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {isFocusActive && focusTimerFormatted && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30 text-primary text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Focus: {focusTimerFormatted}</span>
            </div>
          )}

          <button
            onClick={onProfileClick}
            className="group relative flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-primary/50 transition-all active:scale-95"
            title="Account & Authentication"
          >
            <img
              src={currentUser?.avatar || USER_PROFILE.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-white/10"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#051424]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
