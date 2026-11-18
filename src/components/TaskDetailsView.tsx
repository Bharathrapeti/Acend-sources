import React, { useState } from 'react';
import { Task, SubTask, Comment } from '../types';
import { USER_PROFILE } from '../data/initialData';

interface TaskDetailsViewProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onBack: () => void;
}

export const TaskDetailsView: React.FC<TaskDetailsViewProps> = ({
  task,
  onUpdateTask,
  onBack,
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progressPercent =
    totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks: SubTask[] = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    const newCompletedCount = updatedSubtasks.filter((st) => st.completed).length;
    const newStatus =
      newCompletedCount === updatedSubtasks.length
        ? 'Completed'
        : newCompletedCount > 0
        ? 'In Progress'
        : 'To Do';

    onUpdateTask({
      ...task,
      subtasks: updatedSubtasks,
      status: newStatus,
      progressPercent:
        updatedSubtasks.length > 0
          ? Math.round((newCompletedCount / updatedSubtasks.length) * 100)
          : task.progressPercent,
    });
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: USER_PROFILE.name,
        avatar: USER_PROFILE.avatar,
        text: newCommentText.trim(),
        timestamp: 'Just now',
      };

      onUpdateTask({
        ...task,
        comments: [...task.comments, newComment],
      });

      setNewCommentText('');
      setIsSending(false);
    }, 250);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedFile = files[0];
    const isImg = uploadedFile.type.startsWith('image/');
    const newAtt = {
      id: `att-${Date.now()}`,
      name: uploadedFile.name,
      size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      type: (isImg ? 'image' : 'pdf') as 'image' | 'pdf',
      url: isImg ? URL.createObjectURL(uploadedFile) : undefined,
    };

    onUpdateTask({
      ...task,
      attachments: [...task.attachments, newAtt],
    });
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-36 gap-6 relative">
      {/* Top Banner: Automated Monitoring Active */}
      <div className="relative overflow-hidden bg-primary-container/20 rounded-xl px-4 py-2.5 flex items-center justify-between border border-primary/20">
        <div className="flex items-center gap-2 z-10">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            Automated Monitoring Active
          </span>
        </div>
        <span className="text-xs text-on-surface-variant font-medium z-10">
          Sync Live
        </span>
      </div>

      {/* Breadcrumb & Task Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          <span>{task.project || 'PROJECT ALPHA'}</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">{task.category || 'TASK DEEP-DIVE'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          {task.title}
        </h1>

        {/* Priority & Due Date Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="relative overflow-hidden bg-surface-container-high p-3.5 rounded-xl border border-white/5">
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                task.priority === 'CRITICAL'
                  ? 'bg-error shadow-[0_0_12px_rgba(255,180,171,0.5)]'
                  : 'bg-amber-400'
              }`}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Priority
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    task.priority === 'CRITICAL' ? 'text-error' : 'text-amber-400'
                  }`}
                >
                  priority_high
                </span>
                <span className="text-base font-bold text-on-surface">
                  {task.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high p-3.5 rounded-xl border border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Due Date
              </span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  calendar_today
                </span>
                <span className="text-base font-bold text-on-surface">
                  {task.dueDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">subject</span>
          <h2>Description</h2>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 flex flex-col gap-3">
          <p className="text-sm text-on-surface leading-relaxed">
            {task.description}
          </p>
          <ul className="space-y-2 pt-2 border-t border-white/5">
            <li className="flex items-start gap-3 text-xs text-on-surface-variant">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_6px_rgba(179,197,255,0.6)]" />
              <span>Audit existing primitive color scales</span>
            </li>
            <li className="flex items-start gap-3 text-xs text-on-surface-variant">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_6px_rgba(179,197,255,0.6)]" />
              <span>Update elevation tiers for glassmorphic cards</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sub-tasks Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            <h2>Sub-tasks</h2>
          </div>
          <span className="text-xs font-bold text-primary">
            {completedSubtasks} / {totalSubtasks} Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(179,197,255,0.4)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-2 mt-2">
          {task.subtasks.map((st) => (
            <div
              key={st.id}
              onClick={() => handleToggleSubtask(st.id)}
              className={`flex items-center gap-3.5 bg-surface-container-low hover:bg-surface-container-high p-3.5 rounded-xl cursor-pointer transition-all border border-white/5 active:scale-[0.99] ${
                st.completed ? 'opacity-70' : ''
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                  st.completed
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'border border-outline hover:border-primary'
                }`}
              >
                {st.completed && (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  st.completed
                    ? 'text-on-surface-variant line-through'
                    : 'text-on-surface'
                }`}
              >
                {st.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Attachments Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">attach_file</span>
            <h2>Attachments</h2>
          </div>
          <span className="text-xs text-on-surface-variant">
            {task.attachments.length} Items
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {task.attachments.map((att) => (
            <div
              key={att.id}
              className="bg-surface-container-high rounded-xl overflow-hidden border border-white/5 group hover:border-primary/40 transition-all flex flex-col"
            >
              <div className="h-28 bg-surface-container-highest relative flex items-center justify-center overflow-hidden">
                {att.url ? (
                  <img
                    src={att.url}
                    alt={att.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-[42px] opacity-40">
                    picture_as_pdf
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/90 to-transparent" />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-on-surface truncate">
                  {att.name}
                </p>
                <p className="text-[10px] text-on-surface-variant">{att.size}</p>
              </div>
            </div>
          ))}

          {/* Add New Attachment Trigger */}
          <label className="h-36 bg-surface-container/40 rounded-xl border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-outline group-hover:text-primary">
              add
            </span>
            <span className="text-xs text-outline font-semibold">Add New</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </section>

      {/* Comments Thread Section */}
      {task.comments.length > 0 && (
        <section className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            <h2>Activity & Comments ({task.comments.length})</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {task.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-surface-container-low p-3.5 rounded-xl border border-white/5 flex gap-3"
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-on-surface">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Comment / Status Update Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#051424]/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-2xl mx-auto flex items-center gap-2 bg-surface-container-highest rounded-full px-4 py-2 ring-1 ring-white/10 focus-within:ring-primary/50 transition-all shadow-xl">
          <img
            src={USER_PROFILE.avatar}
            alt="User avatar"
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="Add a status update or comment..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 h-9"
          />
          <button
            onClick={handleAddComment}
            disabled={!newCommentText.trim() || isSending}
            className={`w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center transition-all shrink-0 active:scale-90 ${
              !newCommentText.trim() ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'
            }`}
            title="Post Comment"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSending ? 'hourglass_top' : 'send'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
