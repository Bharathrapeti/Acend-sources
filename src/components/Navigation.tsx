import React from 'react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: 'dashboard' },
    { id: 'tasks' as ActiveTab, label: 'Tasks', icon: 'task_alt' },
    { id: 'calendar' as ActiveTab, label: 'Calendar', icon: 'calendar_month' },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass pb-safe border-t border-white/5">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 py-1 px-3 rounded-xl relative ${
                isActive ? 'text-primary font-semibold scale-105' : 'text-on-surface-variant/70 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {tab.icon}
              </span>
              <span className="text-[11px] tracking-wide font-medium">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(179,197,255,0.8)]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
