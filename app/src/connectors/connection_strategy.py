from abc import ABC, abstractmethod

class ConnectionStrategy(ABC):
    @abstractmethod
    def add_connection(self, event: dict, stored_data: dict) -> dict:
        pass
