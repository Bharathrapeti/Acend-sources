import express from 'express';
import fs from 'fs';
import path from 'path';
import { INITIAL_TASKS } from './src/data/initialData';
import type { Task } from './src/types';

const app = express();
const port = Number(process.env.API_PORT || 3001);
const dataDirectory = path.resolve(process.cwd(), 'data');
const dataFile = path.join(dataDirectory, 'tasks.json');

app.use(express.json({ limit: '10mb' }));

function readTasks(): Task[] {
  if (!fs.existsSync(dataFile)) return INITIAL_TASKS;

  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8')) as Task[];
  } catch {
    return INITIAL_TASKS;
  }
}

function writeTasks(tasks: Task[]) {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2), 'utf-8');
}

if (!fs.existsSync(dataFile)) writeTasks(INITIAL_TASKS);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', (_req, res) => {
  res.json(readTasks());
});

app.post('/api/tasks', (req, res) => {
  const task = req.body as Task;
  if (!task?.id || !task.title) {
    res.status(400).json({ error: 'Task id and title are required' });
    return;
  }

  const tasks = readTasks();
  if (tasks.some((existing) => existing.id === task.id)) {
    res.status(409).json({ error: 'A task with this id already exists' });
    return;
  }

  const updatedTasks = [task, ...tasks];
  writeTasks(updatedTasks);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = req.body as Task;
  if (!task?.id || task.id !== req.params.id) {
    res.status(400).json({ error: 'Task id must match the route parameter' });
    return;
  }

  const tasks = readTasks();
  if (!tasks.some((existing) => existing.id === task.id)) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  const updatedTasks = tasks.map((existing) => existing.id === task.id ? task : existing);
  writeTasks(updatedTasks);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const updatedTasks = tasks.filter((task) => task.id !== req.params.id);
  if (updatedTasks.length === tasks.length) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  writeTasks(updatedTasks);
  res.status(204).send();
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Ascend API listening on http://localhost:${port}`);
});
