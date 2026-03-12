def safe_access(data, key, default=None):
    """Refactored to handle KeyErrors and TypeErrors safely"""
    try:
        return data.get(key, default)
    except AttributeError:
        return "Error: Input is not a dictionary"

def divide_numbers(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
