const fs = require('fs');
const path = require('path');
const { TaskStorage } = require('../storage');
const { Task, TaskStatus, TaskPriority } = require('../models');

const storagePath = path.join(__dirname, 'test-tasks-storage.json');

const cleanupStorageFile = () => {
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
  }
};

describe('TaskStorage', () => {
  beforeEach(() => {
    cleanupStorageFile();
  });

  afterEach(() => {
    cleanupStorageFile();
  });

  test('adds, retrieves, and saves a task', () => {
    const storage = new TaskStorage(storagePath);
    const task = new Task('Persisted task', 'Save and load test');

    storage.addTask(task);
    const loadedTask = storage.getTask(task.id);

    expect(loadedTask).toBeDefined();
    expect(loadedTask.title).toBe('Persisted task');
    expect(fs.existsSync(storagePath)).toBe(true);

    const rawData = fs.readFileSync(storagePath, 'utf8');
    const savedData = JSON.parse(rawData);
    expect(savedData).toHaveLength(1);
    expect(savedData[0].id).toBe(task.id);
  });

  test('updates and deletes a task successfully', () => {
    const storage = new TaskStorage(storagePath);
    const task = new Task('Update me');
    storage.addTask(task);

    const updated = storage.updateTask(task.id, { title: 'Updated title', status: TaskStatus.DONE });
    expect(updated).toBe(true);

    const loadedTask = storage.getTask(task.id);
    expect(loadedTask.title).toBe('Updated title');
    expect(loadedTask.status).toBe(TaskStatus.DONE);

    const deleted = storage.deleteTask(task.id);
    expect(deleted).toBe(true);
    expect(storage.getTask(task.id)).toBeUndefined();
  });

  test('filters tasks by status, priority, and overdue', () => {
    const storage = new TaskStorage(storagePath);
    const overdueDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const todoTask = new Task('Todo task');
    const doneTask = new Task('Done task');
    doneTask.status = TaskStatus.DONE;
    const urgentTask = new Task('Urgent task', '', TaskPriority.URGENT, futureDate);
    const overdueTask = new Task('Overdue task', '', TaskPriority.LOW, overdueDate);

    storage.addTask(todoTask);
    storage.addTask(doneTask);
    storage.addTask(urgentTask);
    storage.addTask(overdueTask);

    expect(storage.getTasksByStatus(TaskStatus.TODO)).toEqual(expect.arrayContaining([todoTask]));
    expect(storage.getTasksByPriority(TaskPriority.URGENT)).toEqual(expect.arrayContaining([urgentTask]));
    expect(storage.getOverdueTasks()).toEqual(expect.arrayContaining([overdueTask]));
  });

  test('loads tasks from an existing storage file', () => {
    const initialStorage = new TaskStorage(storagePath);
    const task = new Task('Load test');
    initialStorage.addTask(task);

    const reloadedStorage = new TaskStorage(storagePath);
    const loadedTask = reloadedStorage.getTask(task.id);

    expect(loadedTask).toBeDefined();
    expect(loadedTask.title).toBe('Load test');
    expect(loadedTask.id).toBe(task.id);
  });
});
