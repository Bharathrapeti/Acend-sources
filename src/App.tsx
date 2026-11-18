import React, { useState, useEffect } from 'react';
import { ActiveTab, Task } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { AllTasksView } from './components/AllTasksView';
import { TaskDetailsView } from './components/TaskDetailsView';
import { CalendarView } from './components/CalendarView';
import { SettingsView } from './components/SettingsView';
import { NewTaskModal } from './components/NewTaskModal';
import { LandingHeroModal } from './components/LandingHeroModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLandingOpen, setIsLandingOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Vance',
    email: 'alex.vance@ascend.io',
    role: 'Commander • Ascend Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Focus Timer State (Default: 02:44:12 = 9852 seconds)
  const [focusSeconds, setFocusSeconds] = useState(9852);
  const [isFocusRunning, setIsFocusRunning] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load tasks');
        return response.json() as Promise<Task[]>;
      })
      .then(setTasks)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isFocusRunning) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusRunning]);

  const formatFocusTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const handleToggleFocusTimer = () => {
    setIsFocusRunning(!isFocusRunning);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string; avatar: string }) => {
    setCurrentUser(user);
    setIsLandingOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser({
      name: 'Guest User',
      email: 'guest@ascend.io',
      role: 'Guest Workspace',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    });
    handleOpenAuth('login');
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleBackFromDetails = () => {
    setSelectedTask(null);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    const response = await fetch(`/api/tasks/${encodeURIComponent(updatedTask.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error('Could not update task');

    const savedTask = await response.json() as Task;
    setTasks((prev) => prev.map((task) => task.id === savedTask.id ? savedTask : task));
    setSelectedTask(savedTask);
  };

  const handleToggleTaskComplete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    const isDone = task.status === 'Completed';
    void handleUpdateTask({
      ...task,
      status: isDone ? 'In Progress' : 'Completed',
      progressPercent: isDone ? 50 : 100,
    }).catch((error) => console.error(error));
  };

  const handleCreateTask = async (newTaskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskData.title || 'New Initiative',
      description: newTaskData.description || '',
      project: newTaskData.project || 'KINETIC WORKFLOW',
      category: newTaskData.category || 'New Initiative',
      priority: newTaskData.priority || 'HIGH',
      status: newTaskData.status || 'To Do',
      dueDate: newTaskData.dueDate || 'Today',
      dueTime: newTaskData.dueTime || '02:00 PM',
      subtasks: newTaskData.subtasks || [],
      attachments: newTaskData.attachments || [],
      comments: newTaskData.comments || [],
      collaborators: newTaskData.collaborators || [],
      progressPercent: 0,
    };

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error('Could not create task');

    const savedTask = await response.json() as Task;
    setTasks((prev) => [savedTask, ...prev]);
  };

  // When changing tabs, clear selected detail task to show the main tab view
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] font-['Inter',sans-serif] selection:bg-primary-container selection:text-on-primary-container flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        titleOverride={selectedTask ? 'Task Details' : undefined}
        onBackClick={selectedTask ? handleBackFromDetails : undefined}
        onProfileClick={() => handleOpenAuth('login')}
        focusTimerFormatted={formatFocusTimer(focusSeconds)}
        isFocusActive={isFocusRunning}
        currentUser={currentUser}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {selectedTask ? (
          <TaskDetailsView
            task={selectedTask}
            onUpdateTask={handleUpdateTask}
            onBack={handleBackFromDetails}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                tasks={tasks}
                onSelectTask={handleSelectTask}
                onOpenNewTask={() => setIsNewTaskOpen(true)}
                onNavigateToTasks={() => handleTabChange('tasks')}
                onToggleTaskComplete={handleToggleTaskComplete}
                focusSeconds={focusSeconds}
                isFocusRunning={isFocusRunning}
                onToggleFocusTimer={handleToggleFocusTimer}
              />
            )}

            {activeTab === 'tasks' && (
              <AllTasksView
                tasks={tasks}
                onSelectTask={handleSelectTask}
                onOpenNewTask={() => setIsNewTaskOpen(true)}
                onToggleTaskComplete={handleToggleTaskComplete}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarView
                tasks={tasks}
                onSelectTask={handleSelectTask}
                onOpenNewTask={() => setIsNewTaskOpen(true)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                onOpenLandingModal={() => setIsLandingOpen(true)}
                currentUser={currentUser}
                onOpenAuthModal={handleOpenAuth}
                onSignOut={handleSignOut}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Glass Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Modals */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <LandingHeroModal
        isOpen={isLandingOpen}
        onClose={() => setIsLandingOpen(false)}
        onEnterApp={() => setIsLandingOpen(false)}
        onOpenAuthModal={(mode) => {
          setIsLandingOpen(false);
          handleOpenAuth(mode);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
