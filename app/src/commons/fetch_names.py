
def fetch_names(names: list[str]) -> list[str]:
    """
    This method converts each name to lowercase, and returns the modified list of names.

    Args:
        names: a list of names (strings).

    Returns:
        list[str]: A list of names in lowercase format. If no names are
            found, an empty list is returned.
    """
    
    if not isinstance(names, list):
        raise ValueError(f"Expected 'PERSONS' to be a list, but got {type(event_names).__name__} instead.")
    
    names_lowercase: list[str] = []
    for name in names:
        if not isinstance(name, str):
            raise ValueError(f"Expected each name to be a string, but got {type(name).__name__} instead.")
        names_lowercase.append(name.lower())
    
    return names_lowercase
