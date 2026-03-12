def process_tasks(tasks):
    """Refactored Task Manager using Idiomatic Python"""
    return [t['name'].upper() for t in tasks if t.get('status') == 'pending']

def find_task_by_id(tasks, task_id):
    """Algorithm Deconstruction: Search optimization"""
    return next((t for t in tasks if t['id'] == task_id), None)
