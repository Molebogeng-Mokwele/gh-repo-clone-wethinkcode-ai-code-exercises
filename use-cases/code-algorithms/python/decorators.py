import functools
import time

def timer_decorator(func):
    """Decorator to measure execution time of a function"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Execution time for {func.__name__}: {end_time - start_time:.4f}s")
        return result
    return wrapper

@timer_decorator
def complex_data_process():
    time.sleep(1)  # Simulating a heavy task
    return "Process Complete"
