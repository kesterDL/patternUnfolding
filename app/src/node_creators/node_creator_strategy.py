from abc import ABC, abstractmethod

class PersonNodeCreatorStrategy(ABC):
    @abstractmethod
    def create_nodes(self, names: list[str], stored_data: dict) -> list[dict]:
        pass

class PlaceNodeCreatorStrategy(ABC):
    @abstractmethod
    def create_nodes(self, place_names: list[str], people_names: list[str], stored_data: dict) -> list[dict]:
        pass

class ThingNodeCreatorStrategy(ABC):
    @abstractmethod
    def create_nodes(self, thing_names: list[str], stored_data: dict, people_names: list[str]=[], place_names: list[str]=[]) -> list[dict]:
        pass