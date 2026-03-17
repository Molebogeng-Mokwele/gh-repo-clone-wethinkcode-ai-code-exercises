# Task Manager Codebase Exercise Findings

## Part 1: Project Structure
- *Entry point:* cli.js (confirmed by package.json "main": "cli.js")
- *Architecture:* 3-layer pattern
  - CLI layer (cli.js) → calls Business logic (app.js) → calls Storage (storage.js)
- *Technologies:* Node.js, Commander.js, UUID, Jest
- *Key components:*
  - cli.js — user commands
  - app.js — TaskManager business logic
  - models.js — Task, TaskPriority, TaskStatus entities
  - storage.js — reads/writes tasks.json
  - task_priority.js — scoring and sorting tasks
  - task_parser.js — parses natural language into tasks
  - task_list_merge.js — merges local and remote task lists

## Part 2: CSV Export Feature Plan
- *New file needed:* task_export.js
- *Files to modify:* app.js (add exportTasks method), cli.js (add export command)
- *Reusable functions:* storage.getAllTasks() already exists

## Part 3: Domain Model

### Entity Diagram

TaskPriority        TaskStatus
LOW = 1             TODO
MEDIUM = 2          IN_PROGRESS
HIGH = 3            REVIEW
URGENT = 4          DONE

Task
─────────────────
id (uuid)
title
description
priority → TaskPriority
status → TaskStatus
createdAt / updatedAt
dueDate / completedAt
tags[]

Methods:
- update()
- markAsDone()
- isOverdue()


### Glossary
- *Task:* core unit of work
- *Priority:* urgency level (1-4)
- *Status:* lifecycle stage of a task
- *Tags:* labels for categorization
- *Overdue:* dueDate < today AND status != DONE
- *Score:* calculated weight used to sort tasks by importance

### Quiz Answers
- Q: Can a DONE task be overdue?
  A: No — isOverdue() returns false if status === DONE
- Q: What happens to completedAt when markAsDone() is called?
  A: It gets set to new Date() (current timestamp)
- Q: Highest possible priority score?
  A: URGENT(40) + overdue(30) + blocker tag(8) + recent update(5) = 83

## Part 4: Abandoned Tasks Rule

### Files to Modify
1. models.js — add ABANDONED to TaskStatus
2. app.js — add markAbandonedTasks() method
3. cli.js — add cleanup command

### Team Questions Before Implementing
1. Should ABANDONED tasks be hidden from the default list view?
2. Should we notify the user which tasks were abandoned?
3. Should HIGH priority tasks ever be auto-abandoned?
4. Should this run automatically on app start or manually?
