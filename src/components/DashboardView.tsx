import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { WEEKLY_OUTPUT_DATA } from '../data/initialData';

interface DashboardViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onNavigateToTasks: () => void;
  onToggleTaskComplete: (taskId: string, e: React.MouseEvent) => void;
  focusSeconds: number;
  isFocusRunning: boolean;
  onToggleFocusTimer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTask,
  onNavigateToTasks,
  onToggleTaskComplete,
  focusSeconds,
  isFocusRunning,
  onToggleFocusTimer,
}) => {
  const [showSystemNotification, setShowSystemNotification] = useState(true);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; dx: number; dy: number }[]>([]);

  // Format focus timer
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Priority Directives
  const priorityTasks = tasks.filter((t) => t.status !== 'Completed').slice(0, 3);

  // Velocity calculation
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const totalCount = tasks.length;
  const velocityPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 75;

  const handleFabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 8 }).map((_, i) => {
      const angle = (Math.PI * 2 / 8) * i;
      const velocity = 40 + Math.random() * 40;
      return {
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity,
      };
    });

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
    onOpenNewTask();
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-28 gap-6 relative">
      {/* Particle Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-80 transition-all duration-500 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(${p.dx}px, ${p.dy}px) scale(0)`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Header & Greeting Section */}
      <section className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(179,197,255,0.8)]"></span>
              </span>
              <span className="font-semibold text-xs text-primary uppercase tracking-widest">
                STATUS: IN THE ZONE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">
              Welcome back, Commander
            </h1>
          </div>

          {/* Focus Timer Trigger Pill */}
          <button
            onClick={onToggleFocusTimer}
            className="flex flex-col items-end bg-surface-container hover:bg-surface-container-high border border-white/10 px-3.5 py-2 rounded-xl transition-all active:scale-95 group shadow-md"
            title="Click to pause or resume Focus Session"
          >
            <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-medium uppercase tracking-wider">
              <span className={`material-symbols-outlined text-[16px] ${isFocusRunning ? 'text-primary animate-pulse' : 'text-outline'}`}>
                bolt
              </span>
              <span>{isFocusRunning ? 'Session Active' : 'Session Paused'}</span>
            </div>
            <span className="text-lg font-bold font-mono text-on-surface tracking-tight group-hover:text-primary transition-colors">
              {formatTime(focusSeconds)}
            </span>
          </button>
        </div>
      </section>

      {/* Dismissable System Update Notification */}
      {showSystemNotification && (
        <section className="group relative overflow-hidden rounded-xl bg-primary-container/20 p-[1px] transition-all duration-300">
          <div className="relative flex items-center gap-3.5 rounded-xl bg-surface-container-high/90 p-3.5 border border-primary/20 backdrop-blur-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary-container shadow-md">
              <span className="material-symbols-outlined text-[20px]">auto_mode</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-xs text-primary uppercase tracking-wider">
                System Update
              </span>
              <p className="text-sm text-on-surface-variant truncate">
                4 repetitive tasks automated & archived.
              </p>
            </div>
            <button
              onClick={() => setShowSystemNotification(false)}
              className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Dismiss notification"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </section>
      )}

      {/* Daily Velocity Card */}
      <section className="bg-surface-container rounded-2xl p-5 relative overflow-hidden flex items-center justify-between shadow-xl border border-white/5">
        <div className="relative z-10 flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
            Daily Velocity
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-on-surface tracking-tight">
              {velocityPercentage}%
            </span>
            <div className="flex items-center text-primary gap-0.5 text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+12%</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant">
            Performance is 12% higher than yesterday&apos;s pace.
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-surface-container-highest"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="currentColor"
              strokeWidth="7"
            />
            <circle
              className="text-primary transition-all duration-1000 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              stroke="currentColor"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * velocityPercentage) / 100}
              strokeLinecap="round"
              strokeWidth="7"
              style={{ filter: 'drop-shadow(0 0 6px #b3c5ff)' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-sm font-bold text-on-surface">
              {completedCount}/{totalCount}
            </span>
            <span className="text-[9px] font-semibold text-primary uppercase tracking-wider">
              OPTIMIZED
            </span>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none"></div>
      </section>

      {/* Priority Directives Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-on-surface tracking-tight">
            Priority Directives
          </h2>
          <button
            onClick={onNavigateToTasks}
            className="text-primary text-xs font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {priorityTasks.map((task) => {
            const isUrgent = task.priority === 'CRITICAL' || task.isUrgent;
            return (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="group relative bg-surface-container-low hover:bg-surface-container-high rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer border border-white/5 shadow-sm active:scale-[0.99]"
              >
                {/* Left Priority Border Accent */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                    isUrgent
                      ? 'bg-error shadow-[0_0_10px_rgba(255,180,171,0.6)]'
                      : task.priority === 'HIGH'
                      ? 'bg-amber-400'
                      : 'bg-primary'
                  }`}
                />

                <div className="flex flex-col min-w-0 flex-1 pl-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isUrgent
                          ? 'bg-error/20 text-error border border-error/30'
                          : task.priority === 'HIGH'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-primary/20 text-primary border border-primary/30'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Due {task.dueDate} {task.dueTime ? `• ${task.dueTime}` : ''}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={(e) => onToggleTaskComplete(task.id, e)}
                  className="w-10 h-10 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all shrink-0 active:scale-90"
                  title="Mark Complete"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {task.status === 'Completed' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly Output Visualization */}
      <section className="bg-surface-container rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Weekly Output
            </h2>
            <span className="text-xs text-on-surface-variant">
              Active focus hours per day
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary text-xs font-semibold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-[16px]">query_stats</span>
            <span>+24 Units</span>
          </div>
        </div>

        {/* Custom Interactive Bar Chart */}
        <div className="flex items-end justify-between h-32 px-2 pt-4">
          {WEEKLY_OUTPUT_DATA.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
              <div
                className={`w-3.5 sm:w-5 rounded-t-lg transition-all duration-500 relative group-hover:scale-105 ${
                  item.isPeak
                    ? 'bg-primary shadow-[0_0_12px_rgba(179,197,255,0.6)]'
                    : 'bg-primary-container/40 group-hover:bg-primary/60'
                }`}
                style={{ height: `${(item.hours / 10) * 100}%` }}
              >
                {item.isPeak && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary text-[10px] font-bold bg-[#051424] px-1.5 py-0.5 rounded border border-primary/30 whitespace-nowrap shadow-md">
                    {item.hours}h
                  </div>
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  item.isPeak ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tactical Insights Grid */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-secondary-container/20 rounded-2xl p-4 flex flex-col gap-1 border border-secondary/10 shadow-md">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            timer
          </span>
          <span className="text-2xl font-extrabold text-on-secondary-container">
            42m
          </span>
          <span className="text-xs text-on-secondary-container/70 font-medium">
            Avg. Task Completion
          </span>
        </div>
        <div className="bg-tertiary-container/20 rounded-2xl p-4 flex flex-col gap-1 border border-tertiary/10 shadow-md">
          <span className="material-symbols-outlined text-tertiary text-[22px]">
            psychology
          </span>
          <span className="text-2xl font-extrabold text-on-tertiary-container">
            Deep
          </span>
          <span className="text-xs text-on-tertiary-container/70 font-medium">
            Current Work State
          </span>
        </div>
      </section>

      {/* Ascend Pro Promo Banner */}
      <section className="relative h-44 rounded-2xl overflow-hidden group border border-white/10 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn0fRLW7d3_Q-lXXmOw3NuBCpJm0A0yVRC_eKQaYQso6O9CzyoHb9BorHsnU8_YODifJSwPruFSxZAuxpLdFpXxDXNDJBfG_IqzCS_Uxf2gSn7bLqtRx_2OvHnXLMr25lOPYTRIyHc2fyGNZQlD8yrQ3fAbvtStY2HPwRRioZamtU_CHJHG3oZqSx9uYOsVVH3PrE9I58rzqMTb5JETEcymqZxckn6evqlhcRg0GUHt9OCr2WBErpPkS56sEVbMpA1ZS21NK4lKibD')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051424] via-[#051424]/60 to-transparent" />
        <div className="relative z-10 p-5 flex flex-col h-full justify-end">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-0.5">
            Ascend Pro
          </span>
          <h3 className="text-xl font-bold text-on-surface">
            Unlock Kinetic Potential
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Predictive velocity charts & automated team scheduling active.
          </p>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={handleFabClick}
          className="w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,102,255,0.4)] hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          title="Create New Task"
        >
          <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">
            add
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};
