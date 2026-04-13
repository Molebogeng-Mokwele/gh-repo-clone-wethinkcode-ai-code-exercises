import unittest
from datetime import datetime, timedelta

from python.models import Task, TaskStatus, TaskPriority


class TaskModelTest(unittest.TestCase):
    def setUp(self):
        self.now = datetime.now()
        self.task = Task("Test Task", "A task for testing", priority=TaskPriority.HIGH)
        self.task.created_at = self.now
        self.task.updated_at = self.now

    def test_task_defaults(self):
        self.assertEqual(self.task.status, TaskStatus.TODO)
        self.assertEqual(self.task.priority, TaskPriority.HIGH)
        self.assertEqual(self.task.tags, [])
        self.assertIsNone(self.task.completed_at)

    def test_update_changes_fields_and_timestamp(self):
        new_due_date = self.now + timedelta(days=3)
        self.task.update(description="Updated description", due_date=new_due_date)

        self.assertEqual(self.task.description, "Updated description")
        self.assertEqual(self.task.due_date, new_due_date)
        self.assertGreaterEqual(self.task.updated_at, self.now)

    def test_mark_as_done_sets_status_and_completed_at(self):
        self.task.mark_as_done()

        self.assertEqual(self.task.status, TaskStatus.DONE)
        self.assertIsNotNone(self.task.completed_at)
        self.assertEqual(self.task.updated_at, self.task.completed_at)

    def test_is_overdue_returns_false_without_due_date(self):
        self.task.due_date = None
        self.assertFalse(self.task.is_overdue())

    def test_is_overdue_returns_true_for_past_due_date(self):
        self.task.due_date = self.now - timedelta(days=1)
        self.assertTrue(self.task.is_overdue())

    def test_is_overdue_returns_false_when_done(self):
        self.task.due_date = self.now - timedelta(days=1)
        self.task.mark_as_done()
        self.assertFalse(self.task.is_overdue())


if __name__ == '__main__':
    unittest.main()
