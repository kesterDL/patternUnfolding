import json

class DataAccessService:
    def __init__(self, file_path: str):
        self.file_path = file_path

    def load_data(self) -> dict:
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def save_data(self, data: dict):
        with open(self.file_path, 'w') as f:
            json.dump(data, f)
