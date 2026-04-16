import unittest
from datetime import datetime, timedelta
from unittest.mock import patch

from models import Task, TaskStatus, TaskPriority
from task_priority import calculate_task_score, sort_tasks_by_importance, get_top_priority_tasks


class TestTaskPriority(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2025, 1, 1, 12, 0, 0)

        self.medium_task = Task("Medium", priority=TaskPriority.MEDIUM)
        self.medium_task.updated_at = self.now

        self.high_task = Task("High", priority=TaskPriority.HIGH)
        self.high_task.updated_at = self.now

    @patch('task_priority.datetime')
    def test_calculate_task_score_priority_weights(self, mock_datetime):
        mock_datetime.now.return_value = self.now

        medium_score = calculate_task_score(self.medium_task)
        high_score = calculate_task_score(self.high_task)

        self.assertLess(medium_score, high_score)

    @patch('task_priority.datetime')
    def test_calculate_task_score_due_date_bonus(self, mock_datetime):
        mock_datetime.now.return_value = self.now

        due_today = Task("Due Today", priority=TaskPriority.MEDIUM)
        due_today.updated_at = self.now
        due_today.due_date = self.now

        due_soon = Task("Due Soon", priority=TaskPriority.MEDIUM)
        due_soon.updated_at = self.now
        due_soon.due_date = self.now + timedelta(days=2)

        score_today = calculate_task_score(due_today)
        score_soon = calculate_task_score(due_soon)

        self.assertGreater(score_today, score_soon)

    @patch('task_priority.datetime')
    def test_calculate_task_score_status_penalty(self, mock_datetime):
        mock_datetime.now.return_value = self.now

        review_task = Task("Review", priority=TaskPriority.MEDIUM)
        review_task.updated_at = self.now
        review_task.status = TaskStatus.REVIEW

        done_task = Task("Done", priority=TaskPriority.MEDIUM)
        done_task.updated_at = self.now
        done_task.status = TaskStatus.DONE

        review_score = calculate_task_score(review_task)
        done_score = calculate_task_score(done_task)

        self.assertGreater(review_score, done_score)

    @patch('task_priority.datetime')
    def test_sort_tasks_by_importance(self, mock_datetime):
        mock_datetime.now.return_value = self.now

        urgent_task = Task("Urgent", priority=TaskPriority.URGENT)
        urgent_task.updated_at = self.now

        tasks = [self.medium_task, urgent_task, self.high_task]
        sorted_tasks = sort_tasks_by_importance(tasks)

        self.assertEqual(sorted_tasks[0].title, "Urgent")
        self.assertEqual(sorted_tasks[-1].title, "Medium")

    @patch('task_priority.datetime')
    def test_get_top_priority_tasks_limit(self, mock_datetime):
        mock_datetime.now.return_value = self.now

        tasks = [self.medium_task, self.high_task]
        top_tasks = get_top_priority_tasks(tasks, limit=1)

        self.assertEqual(len(top_tasks), 1)
        self.assertEqual(top_tasks[0].priority, TaskPriority.HIGH)


if __name__ == '__main__':
    unittest.main()
