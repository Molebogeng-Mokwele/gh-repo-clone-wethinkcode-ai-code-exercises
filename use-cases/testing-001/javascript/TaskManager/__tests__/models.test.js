const { Task, TaskPriority, TaskStatus } = require('../models');

describe('Task model', () => {
  test('creates a task with default values', () => {
    const task = new Task('Example task');

    expect(task.title).toBe('Example task');
    expect(task.description).toBe('');
    expect(task.priority).toBe(TaskPriority.MEDIUM);
    expect(task.status).toBe(TaskStatus.TODO);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
    expect(task.completedAt).toBeNull();
    expect(task.tags).toEqual([]);
  });

  test('marks a task as done and sets completedAt', () => {
    const task = new Task('Complete me');
    task.markAsDone();

    expect(task.status).toBe(TaskStatus.DONE);
    expect(task.completedAt).toBeInstanceOf(Date);
    expect(task.updatedAt.getTime()).toBe(task.completedAt.getTime());
  });

  test('updates task properties and refreshes updatedAt', () => {
    const task = new Task('Old title');
    const originalUpdatedAt = task.updatedAt;

    task.update({ title: 'New title', description: 'Updated description' });

    expect(task.title).toBe('New title');
    expect(task.description).toBe('Updated description');
    expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
  });

  test('detects overdue tasks only when dueDate is in the past', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const overdueTask = new Task('Overdue', '', TaskPriority.MEDIUM, yesterday);
    const futureTask = new Task('Not overdue', '', TaskPriority.MEDIUM, tomorrow);

    expect(overdueTask.isOverdue()).toBe(true);
    expect(futureTask.isOverdue()).toBe(false);
  });
});
