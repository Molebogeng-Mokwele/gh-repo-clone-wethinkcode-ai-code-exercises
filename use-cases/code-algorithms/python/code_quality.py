def format_user_data(name, age, city):
    """
    Demonstrates clean string formatting and 
    proper PEP 8 naming conventions.
    """
    formatted_name = name.strip().title()
    return f"User: {formatted_name} ({age}) - Location: {city.upper()}"

cat <<EOF > ai_optimized.py
def find_duplicates_optimized(items):
    """
    Before: O(n^2) using nested loops.
    After AI Suggestion: O(n) using a set for constant time lookups.
    """
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return list(duplicates)
