import React, { useState } from 'react';
import { Priority, Task } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (newTask: Partial<Task>) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onCreateTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('Oct 28');
  const [dueTime, setDueTime] = useState('02:00 PM');
  const [priority, setPriority] = useState<Priority>('HIGH');
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [isIgniting, setIsIgniting] = useState(false);

  if (!isOpen) return null;

  const handleAddSubtaskItem = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleIgniteTask = () => {
    if (!title.trim()) return;

    setIsIgniting(true);

    setTimeout(() => {
      onCreateTask({
        title: title.trim(),
        description: description.trim() || 'New high-impact initiative.',
        project: 'KINETIC WORKFLOW',
        category: 'New Initiative',
        priority,
        status: 'To Do',
        dueDate: dueDate || 'Today',
        dueTime: dueTime || '02:00 PM',
        subtasks: subtasks
          .filter((st) => st.trim().length > 0)
          .map((st, idx) => ({
            id: `st-new-${idx}`,
            title: st.trim(),
            completed: false,
          })),
        attachments: [],
        comments: [],
        collaborators: [],
      });

      setIsIgniting(false);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setSubtasks([]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#051424]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#051424] sm:bg-surface-container rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header Modal Bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            New Task
          </span>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Brand Moment: Kinetic Flow Header */}
        <div className="relative overflow-hidden rounded-2xl bg-primary-container p-4 sm:p-5 flex items-center justify-between shadow-xl">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-primary-container/80 uppercase tracking-widest">
              Momentum Entry
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-on-primary-container">
              New Initiative
            </h2>
          </div>
          <div className="absolute -right-4 -top-4 w-28 h-28 opacity-20 pointer-events-none">
            <svg className="animate-pulse" viewBox="0 0 200 200">
              <path
                d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.1,89.2,-15.1,88.4,-0.5C87.5,14.1,81.8,28.2,73.1,40.4C64.4,52.6,52.8,62.9,39.7,70.1C26.5,77.3,11.8,81.4,-2.4,85.6C-16.7,89.8,-30.4,94,-43.3,89.9C-56.2,85.8,-68.2,73.4,-76.7,59.5C-85.2,45.6,-90.1,30.3,-91.1,14.9C-92.1,-0.5,-89.2,-15.9,-82.7,-29.6C-76.3,-43.4,-66.2,-55.4,-53.8,-63.1C-41.4,-70.8,-26.6,-74.1,-11.5,-77.3C3.6,-80.5,18.7,-83.6,33.3,-83.4C47.9,-83.2,58.1,-79.8,44.7,-76.4Z"
                fill="currentColor"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>

        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-surface-container-high border border-white/5 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none focus:ring-2 focus:ring-primary-container transition-all"
            autoFocus
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more context or specific goals..."
            rows={3}
            className="w-full bg-surface-container-high border border-white/5 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none"
          />
        </div>

        {/* Date & Time & Priority Selector */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center justify-between">
                <span>Due Date</span>
                <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. Oct 28"
                className="w-full bg-surface-container-high border border-white/5 rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center justify-between">
                <span>Time Slot</span>
                <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
              </label>
              <select
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full bg-surface-container-high border border-white/5 rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant">
              Priority
            </label>
            <div className="flex bg-surface-container-high rounded-xl p-1 gap-1 border border-white/5">
              {(['LOW', 'MEDIUM', 'HIGH'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md scale-105'
                        : 'text-on-surface-variant hover:bg-white/5'
                    }`}
                  >
                    {p === 'MEDIUM' ? 'MED' : p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-tasks Builder */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface-variant">
              Sub-tasks
            </label>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
              {subtasks.length} items
            </span>
          </div>

          {subtasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-4 bg-surface-container-high/30 border-2 border-dashed border-outline-variant/30 rounded-xl">
              <span className="material-symbols-outlined text-outline/40 text-[28px] mb-1">
                account_tree
              </span>
              <p className="text-xs text-on-surface-variant/70">Break it down into steps</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-surface-container-high p-2.5 rounded-xl border border-white/5"
                >
                  <span className="material-symbols-outlined text-outline text-[16px]">
                    drag_indicator
                  </span>
                  <input
                    type="text"
                    value={st}
                    onChange={(e) => handleSubtaskChange(idx, e.target.value)}
                    placeholder={`Step ${idx + 1}...`}
                    className="flex-1 bg-transparent border-none text-xs text-on-surface outline-none"
                  />
                  <button
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-error/70 hover:text-error p-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleAddSubtaskItem}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add Sub-task</span>
          </button>
        </div>

        {/* Primary Ignite Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleIgniteTask}
            disabled={!title.trim() || isIgniting}
            className={`relative w-full py-4 rounded-2xl bg-primary-container text-on-primary-container font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
              !title.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] animate-bounce">
              rocket_launch
            </span>
            <span>{isIgniting ? 'Igniting Task...' : 'Ignite Task'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
