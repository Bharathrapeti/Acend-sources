import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';

interface AllTasksViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onToggleTaskComplete: (taskId: string, e: React.MouseEvent) => void;
}

export const AllTasksView: React.FC<AllTasksViewProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTask,
  onToggleTaskComplete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | TaskStatus>('All');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && task.status === activeFilter;
  });

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const totalCount = tasks.length;
  const momentumPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 68;

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-28 gap-6 relative">
      {/* Daily Drive Momentum Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-high p-5 shadow-xl border border-white/5">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-[40px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary-container/10 blur-[30px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Daily Drive
            </span>
            <h2 className="text-2xl font-bold text-on-surface">Momentum</h2>
            <p className="text-xs text-on-surface-variant/90 mt-1 max-w-[240px]">
              You&apos;re in the zone. {totalCount - completedCount} more high-impact tasks to clear the board.
            </p>
          </div>

          <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-surface-variant"
                cx="32"
                cy="32"
                fill="transparent"
                r="26"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-primary drop-shadow-[0_0_8px_rgba(179,197,255,0.6)] transition-all duration-700"
                cx="32"
                cy="32"
                fill="transparent"
                r="26"
                stroke="currentColor"
                strokeDasharray="163.3"
                strokeDashoffset={163.3 - (163.3 * momentumPercent) / 100}
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-sm font-bold text-on-surface">
              {momentumPercent}%
            </span>
          </div>
        </div>
      </section>

      {/* Header Search & Filter Chips */}
      <section className="flex flex-col gap-3">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a task or project..."
            className="w-full h-12 bg-surface-container-high rounded-xl pl-12 pr-4 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(['All', 'To Do', 'In Progress', 'Completed'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-md scale-105'
                    : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Task List */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-on-surface">Active Tasks</h3>
          <span className="text-xs font-semibold text-primary">
            {filteredTasks.length} Tasks Shown
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-container-low rounded-2xl border border-white/5 p-6">
            <div className="w-20 h-20 mb-4 opacity-30 text-primary">
              <span className="material-symbols-outlined text-[72px]">task</span>
            </div>
            <h4 className="text-lg font-bold text-on-surface">Clear Horizon!</h4>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
              No matching tasks found. Time to plot your next big move or ignite a new task.
            </p>
            <button
              onClick={onOpenNewTask}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Create New Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
            const totalSubtasks = task.subtasks.length;
            const subtaskPercent =
              totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

            const isUrgent = task.priority === 'CRITICAL' || task.isUrgent;

            return (
              <React.Fragment key={task.id}>
                {/* Visual Interlude Quote Card after 2nd item */}
                {index === 2 && (
                  <div className="my-2 rounded-2xl overflow-hidden h-36 relative border border-white/10 shadow-xl group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7kff5RthPooUMjUw2CdfWvspFVCF0hv31usVsKS1iC8mSMapNwhHEMSHceGW0dykAMHXsSowNC3mE0f_wKaSr4qOSyyLwUb56q9RLYX1aNn4aL7-bJ2NlHLj9NkiMBHtsXEUl04iDxw05yv7H1tL6oa1by_e8XWaaB5lcylZ2z2vaUIfEa5l_lUvYQfyF4ZJIZ7-5ViHIgRr3KatKFoRSUbECVfNorKuKF0WPwD-QBcld9mEn2irb9jgCU_07S_FaTE9RvM9RpQQV"
                      alt="Quote of the day background"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051424] via-[#051424]/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        Quote of the Day
                      </span>
                      <p className="text-sm font-medium text-on-surface italic mt-0.5 leading-snug">
                        &quot;Focus is a matter of deciding what things you&apos;re not going to do.&quot;
                      </p>
                    </div>
                  </div>
                )}

                <div
                  onClick={() => onSelectTask(task)}
                  className={`group relative flex flex-col bg-surface-container-low rounded-xl p-4 transition-all duration-200 hover:bg-surface-container-high border-l-4 shadow-sm cursor-pointer border border-white/5 active:scale-[0.99] ${
                    isUrgent
                      ? 'border-l-error'
                      : task.priority === 'HIGH'
                      ? 'border-l-amber-400'
                      : task.priority === 'MEDIUM'
                      ? 'border-l-tertiary'
                      : 'border-l-outline'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isUrgent
                              ? 'bg-error text-on-error'
                              : task.priority === 'HIGH'
                              ? 'text-amber-400 uppercase tracking-tighter'
                              : task.priority === 'MEDIUM'
                              ? 'text-on-tertiary-container uppercase tracking-tighter'
                              : 'text-outline uppercase tracking-tighter'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                        {isUrgent && (
                          <span className="flex items-center gap-0.5 text-error text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[14px]">
                              error
                            </span>
                            Overdue
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {task.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => onToggleTaskComplete(task.id, e)}
                      className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-white/5"
                      title="Quick Complete"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {task.status === 'Completed' ? 'check_circle' : 'more_vert'}
                      </span>
                    </button>
                  </div>

                  {/* Subtask Progress Bar */}
                  {totalSubtasks > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1 text-xs">
                        <span className="text-on-surface-variant">
                          {completedSubtasks} / {totalSubtasks} subtasks
                        </span>
                        <span className="text-on-surface font-semibold">
                          {Math.round(subtaskPercent)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(179,197,255,0.4)] transition-all duration-500"
                          style={{ width: `${subtaskPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata Icons: Attachments & Comments */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-on-surface-variant">
                    {task.attachments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          attachment
                        </span>
                        <span>{task.attachments.length} files</span>
                      </div>
                    )}
                    {task.comments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          chat_bubble
                        </span>
                        <span>{task.comments.length}</span>
                      </div>
                    )}
                    <div className="ml-auto text-[11px] text-outline font-medium">
                      Due {task.dueDate}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={onOpenNewTask}
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
