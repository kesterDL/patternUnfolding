import json
import logging

def load_json_from_local(file_path) -> dict | None:
    try:
        with open(file_path, 'r') as file:
            data: dict = json.load(file)
        return data
    except Exception as e:
        logging.error(f"Failed to load JSON from {file_path}: {e}")
        return None
    
def write_json_to_file(file_path, data) -> None:
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        logging.info(f"Successfully wrote updated JSON to {file_path}")
    except Exception as e:
        logging.error(f"Failed to write JSON to {file_path}: {e}")
        raise e
