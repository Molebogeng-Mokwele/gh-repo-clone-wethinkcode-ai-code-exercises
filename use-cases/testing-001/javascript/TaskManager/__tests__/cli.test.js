const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, '..');
const cliPath = path.join(projectPath, 'cli.js');
const storagePath = path.join(projectPath, 'tasks.json');

const cleanupStorageFile = () => {
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
  }
};

const runCLI = (args) => {
  try {
    const output = execSync(`node "${cliPath}" ${args.map(arg => JSON.stringify(arg)).join(' ')}`, {
      cwd: projectPath,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10,
      stdio: 'pipe'
    });
    return {
      code: 0,
      stdout: output,
      stderr: ''
    };
  } catch (error) {
    // Include stdout from error object if available
    const stdout = (error.stdout || error.message || '').toString();
    const stderr = (error.stderr || '').toString();
    return {
      code: error.status || 1,
      stdout: stdout,
      stderr: stderr
    };
  }
};

describe('TaskManager CLI', () => {
  beforeEach(() => {
    cleanupStorageFile();
  });

  afterEach(() => {
    cleanupStorageFile();
  });

  test('displays help menu when no arguments provided', () => {
    const result = runCLI([]);

    expect(result.stdout).toContain('Task Manager CLI');
    expect(result.stdout).toContain('Usage:');
    expect(result.stdout).toContain('Commands:');
  });

  test('creates a task with create command', () => {
    const result = runCLI(['create', 'Test CLI task', '-d', 'Test description', '-p', '3']);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('Created task with ID:');
  });

  test('lists all tasks with list command', () => {
    const createResult = runCLI(['create', 'Task for listing']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const listResult = runCLI(['list']);

    expect(listResult.code).toBe(0);
    expect(listResult.stdout).toContain('Task for listing');
    expect(listResult.stdout).toContain(taskId.substring(0, 8));
  });

  test('updates task status with status command', () => {
    const createResult = runCLI(['create', 'Status test']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const statusResult = runCLI(['status', taskId, 'in_progress']);

    expect(statusResult.code).toBe(0);
    expect(statusResult.stdout).toContain('Updated task status');
  });

  test('updates task priority with priority command', () => {
    const createResult = runCLI(['create', 'Priority test']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const priorityResult = runCLI(['priority', taskId, '4']);

    expect(priorityResult.code).toBe(0);
    expect(priorityResult.stdout).toContain('Updated task priority');
  });

  test('updates task due date with due command', () => {
    const createResult = runCLI(['create', 'Due date test']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const dueResult = runCLI(['due', taskId, '2099-12-31']);

    expect(dueResult.code).toBe(0);
    expect(dueResult.stdout).toContain('Updated task due date');
  });

  test('manages tags with tag and untag commands', () => {
    const createResult = runCLI(['create', 'Tag test']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const tagResult = runCLI(['tag', taskId, 'important']);
    expect(tagResult.code).toBe(0);
    expect(tagResult.stdout).toContain("Added tag 'important'");

    const untagResult = runCLI(['untag', taskId, 'important']);
    expect(untagResult.code).toBe(0);
    expect(untagResult.stdout).toContain("Removed tag 'important'");
  });

  test('shows task details with show command', () => {
    const createResult = runCLI(['create', 'Show test', '-d', 'Show description']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const showResult = runCLI(['show', taskId]);

    expect(showResult.code).toBe(0);
    expect(showResult.stdout).toContain('Show test');
    expect(showResult.stdout).toContain('Show description');
  });

  test('deletes a task with delete command', () => {
    const createResult = runCLI(['create', 'Delete test']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];

    const deleteResult = runCLI(['delete', taskId]);
    expect(deleteResult.code).toBe(0);
    expect(deleteResult.stdout).toContain(`Deleted task ${taskId}`);

    const listResult = runCLI(['list']);
    expect(listResult.stdout).not.toContain('Delete test');
  });

  test('displays statistics with stats command', () => {
    runCLI(['create', 'Stat task 1']);
    const createResult = runCLI(['create', 'Stat task 2']);
    const taskId = createResult.stdout.match(/Created task with ID: ([\w-]+)/)[1];
    runCLI(['status', taskId, 'done']);

    const statsResult = runCLI(['stats']);

    expect(statsResult.code).toBe(0);
    expect(statsResult.stdout).toContain('Total tasks:');
    expect(statsResult.stdout).toContain('By status:');
    expect(statsResult.stdout).toContain('By priority:');
    expect(statsResult.stdout).toContain('Overdue tasks:');
  });

  test('handles nonexistent task with appropriate error message', () => {
    const showResult = runCLI(['show', 'nonexistent-id']);
    expect(showResult.stdout).toContain('Task not found');
  });
});
