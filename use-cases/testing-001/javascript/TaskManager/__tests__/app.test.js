const fs = require('fs');
const path = require('path');
const { TaskManager } = require('../app');
const { TaskStatus, TaskPriority } = require('../models');

const storagePath = path.join(__dirname, 'test-tasks-app.json');

const cleanupStorageFile = () => {
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
  }
};

describe('TaskManager', () => {
  beforeEach(() => {
    cleanupStorageFile();
  });

  afterEach(() => {
    cleanupStorageFile();
  });

  test('creates a task and returns a valid id', () => {
    const manager = new TaskManager(storagePath);
    const taskId = manager.createTask('New task', 'A sample task', TaskPriority.HIGH, '2099-12-31', ['test']);

    expect(taskId).toBeDefined();
    const task = manager.getTaskDetails(taskId);
    expect(task.title).toBe('New task');
    expect(task.priority).toBe(TaskPriority.HIGH);
    expect(task.tags).toEqual(['test']);
  });

  test('lists tasks by status, priority, and overdue', () => {
    const manager = new TaskManager(storagePath);
    const todoId = manager.createTask('Todo task');
    const doneId = manager.createTask('Done task');
    manager.updateTaskStatus(doneId, TaskStatus.DONE);
    manager.createTask('Urgent task', '', TaskPriority.URGENT);
    manager.createTask('Overdue task', '', TaskPriority.MEDIUM, '2000-01-01');

    expect(manager.listTasks(TaskStatus.DONE)).toHaveLength(1);
    expect(manager.listTasks(null, TaskPriority.URGENT)).toHaveLength(1);
    expect(manager.listTasks(null, null, true)).toHaveLength(1);
  });

  test('updates priority, due date, tags, and deletes tasks', () => {
    const manager = new TaskManager(storagePath);
    const taskId = manager.createTask('Full update task');

    expect(manager.updateTaskPriority(taskId, TaskPriority.URGENT)).toBe(true);
    expect(manager.updateTaskDueDate(taskId, '2099-01-01')).toBe(true);
    expect(manager.addTagToTask(taskId, 'important')).toBe(true);
    expect(manager.removeTagFromTask(taskId, 'important')).toBe(true);

    const task = manager.getTaskDetails(taskId);
    expect(task.priority).toBe(TaskPriority.URGENT);
    expect(task.dueDate).toBeInstanceOf(Date);
    expect(task.tags).not.toContain('important');

    expect(manager.deleteTask(taskId)).toBe(true);
    expect(manager.getTaskDetails(taskId)).toBeUndefined();
  });

  test('returns statistics for total tasks, overdue tasks, and recent completions', () => {
    const manager = new TaskManager(storagePath);
    manager.createTask('First task');
    const doneTaskId = manager.createTask('Complete task');
    manager.updateTaskStatus(doneTaskId, TaskStatus.DONE);
    manager.createTask('Past due task', '', TaskPriority.LOW, '2000-01-01');

    const stats = manager.getStatistics();
    expect(stats.total).toBe(3);
    expect(stats.byStatus[TaskStatus.DONE]).toBe(1);
    expect(stats.overdue).toBe(1);
    expect(stats.completedLastWeek).toBeGreaterThanOrEqual(1);
  });
});
