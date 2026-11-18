import React, { useState } from 'react';
import { Task } from '../types';

interface CalendarViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTask,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0: Oct 2026, 1: Nov 2026
  const [selectedDay, setSelectedDay] = useState('24');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const months = ['October 2026', 'November 2026'];

  const daysOct = [
    { day: 'Mon', date: '21', badge: '1 Task' },
    { day: 'Tue', date: '22', badge: null },
    { day: 'Wed', date: '23', badge: '2 Tasks' },
    { day: 'Thu', date: '24', badge: '3 Tasks' },
    { day: 'Fri', date: '25', badge: '1 Task' },
    { day: 'Sat', date: '26', badge: null },
    { day: 'Sun', date: '27', badge: null },
  ];

  const daysNov = [
    { day: 'Mon', date: '02', badge: '2 Tasks' },
    { day: 'Tue', date: '03', badge: null },
    { day: 'Wed', date: '04', badge: '1 Task' },
    { day: 'Thu', date: '05', badge: '4 Tasks' },
    { day: 'Fri', date: '06', badge: '2 Tasks' },
    { day: 'Sat', date: '07', badge: null },
    { day: 'Sun', date: '08', badge: null },
  ];

  const currentDays = currentMonthIndex === 0 ? daysOct : daysNov;

  const scheduleSlots = [
    {
      time: '08:30 AM',
      type: 'focus',
      title: 'Tactical Sync & Planning',
      duration: '30 mins',
      category: 'In The Zone',
    },
    {
      time: '09:00 AM',
      type: 'focus',
      title: 'Deep Focus Block #1',
      duration: '90 mins',
      category: 'In The Zone',
    },
    {
      time: '11:00 AM',
      type: 'task',
      task: tasks[0], // Design System Update
    },
    {
      time: '02:00 PM',
      type: 'task',
      task: tasks[1], // Q4 Architectural Audit
    },
    {
      time: '04:30 PM',
      type: 'focus',
      title: 'System Performance Sync',
      duration: '45 mins',
      category: 'Engineering',
    },
    {
      time: '05:30 PM',
      type: 'task',
      task: tasks[2], // Client Feedback Synthesis
    },
  ];

  // Month grid 35 boxes generator
  const monthGridDays = Array.from({ length: 31 }).map((_, i) => ({
    date: (i + 1).toString().padStart(2, '0'),
    taskCount: (i % 3 === 0) ? Math.floor(Math.random() * 3) + 1 : 0,
  }));

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-28 gap-6">
      {/* Calendar Header with Month Controls & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
              Kinetic Calendar
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-on-surface">
                {months[currentMonthIndex]}
              </h1>
              <div className="flex items-center bg-surface-container rounded-lg border border-white/5 p-0.5">
                <button
                  onClick={() => setCurrentMonthIndex(0)}
                  disabled={currentMonthIndex === 0}
                  className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-30"
                  title="Previous Month"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  onClick={() => setCurrentMonthIndex(1)}
                  disabled={currentMonthIndex === 1}
                  className="p-1 text-on-surface-variant hover:text-on-surface disabled:opacity-30"
                  title="Next Month"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Week/Month Mode Toggle */}
          <div className="flex bg-surface-container rounded-xl p-1 border border-white/5">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'week'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'month'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Month Grid
            </button>
          </div>

          <button
            onClick={onOpenNewTask}
            className="px-3.5 py-2 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Add Block</span>
          </button>
        </div>
      </div>

      {/* Week Strip or Month Grid depending on viewMode */}
      {viewMode === 'week' ? (
        <div className="flex justify-between items-center bg-surface-container rounded-2xl p-2 border border-white/5 shadow-lg">
          {currentDays.map((d) => {
            const isSelected = selectedDay === d.date;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className={`flex flex-col items-center py-2.5 px-3 rounded-xl transition-all relative flex-1 ${
                  isSelected
                    ? 'bg-primary text-on-primary font-bold shadow-md scale-105 z-10'
                    : 'text-on-surface-variant hover:bg-white/5'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold opacity-80">{d.day}</span>
                <span className="text-sm font-extrabold mt-0.5">{d.date}</span>
                {d.badge && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shadow-[0_0_6px_rgba(179,197,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-surface-container rounded-2xl p-4 border border-white/5 shadow-lg flex flex-col gap-3">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-outline uppercase tracking-wider">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {monthGridDays.map((dayItem) => {
              const isSelected = selectedDay === dayItem.date;
              return (
                <button
                  key={dayItem.date}
                  onClick={() => {
                    setSelectedDay(dayItem.date);
                    setViewMode('week');
                  }}
                  className={`h-11 rounded-xl flex flex-col items-center justify-center relative border transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary font-bold shadow-md'
                      : 'bg-surface-container-high/50 border-white/5 text-on-surface hover:border-primary/40'
                  }`}
                >
                  <span className="text-xs">{dayItem.date}</span>
                  {dayItem.taskCount > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(dayItem.taskCount, 3) }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-on-primary' : 'bg-primary'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hourly Schedule View */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase text-on-surface-variant tracking-wider">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
            <span>Timeline • Day {selectedDay}</span>
          </div>
          <span className="text-primary text-[10px] bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
            6 Time Blocks
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:left-[60px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
          {scheduleSlots.map((slot, idx) => (
            <div key={idx} className="flex items-start gap-4 relative group">
              <span className="text-xs font-mono font-semibold text-on-surface-variant w-12 shrink-0 pt-3">
                {slot.time}
              </span>

              {slot.type === 'focus' ? (
                <div className="flex-1 bg-primary-container/20 border border-primary/30 p-3.5 rounded-xl flex items-center justify-between shadow-md group-hover:border-primary/60 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {slot.category}
                      </span>
                      <h4 className="text-sm font-semibold text-on-surface">
                        {slot.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {slot.duration}
                  </span>
                </div>
              ) : slot.task ? (
                <div
                  onClick={() => onSelectTask(slot.task!)}
                  className="flex-1 bg-surface-container-low hover:bg-surface-container-high p-3.5 rounded-xl border border-white/5 flex flex-col gap-1 cursor-pointer transition-all active:scale-[0.99] shadow-sm group-hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        slot.task.priority === 'CRITICAL'
                          ? 'bg-error/20 text-error border border-error/30'
                          : 'bg-primary/20 text-primary border border-primary/30'
                      }`}
                    >
                      {slot.task.priority} Task
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Due {slot.task.dueDate} {slot.task.dueTime ? `• ${slot.task.dueTime}` : ''}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {slot.task.title}
                  </h4>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
