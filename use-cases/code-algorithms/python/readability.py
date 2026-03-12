def get_admin_emails(users):
    """Before: Nested loops and manual checks.
       After: Clean list comprehension for readability."""
    return [
        user['email'] 
        for user in users 
        if user.get('role') == 'admin' and user.get('active')
    ]
