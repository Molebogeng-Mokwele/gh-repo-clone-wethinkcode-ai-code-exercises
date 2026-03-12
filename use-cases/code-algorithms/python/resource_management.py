def write_report(filename, content):
    """Uses a Context Manager to ensure files are closed properly."""
    with open(filename, 'w') as file:
        file.write(f"REPORT START\n{content}\nREPORT END")
    return "File written successfully"
