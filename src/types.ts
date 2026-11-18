export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type ActiveTab = 'dashboard' | 'tasks' | 'calendar' | 'settings';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'file';
  url?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  category: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  dueTime?: string;
  subtasks: SubTask[];
  attachments: Attachment[];
  comments: Comment[];
  collaborators: string[];
  progressPercent?: number;
  isUrgent?: boolean;
}

export interface WeeklyData {
  day: string;
  hours: number;
  isPeak?: boolean;
}

export interface FocusSession {
  isActive: boolean;
  secondsRemaining: number;
  totalDurationSeconds: number;
  sessionTitle: string;
}
