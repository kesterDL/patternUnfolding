from src.connectors.connection_strategy import ConnectionStrategy
from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
from src.node_creators.person_json_node_creator import PersonJsonNodeCreator
from src.node_creators.node_creator_strategy import PlaceNodeCreatorStrategy
from src.node_creators.place_json_node_creator import PlaceJsonNodeCreator
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class NewPersonStrategy(ConnectionStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.place_node_creator: PlaceNodeCreatorStrategy = PlaceJsonNodeCreator()
        self.person_node_creator: PersonNodeCreatorStrategy = PersonJsonNodeCreator()

    def add_connection(self, event: dict, stored_data: dict) -> dict:
        return self.create_new_person(stored_data=stored_data, event=event)

    @log_exceptions
    def create_new_person(self, event:dict, stored_data:dict) -> dict:
        try:
            stored_people: dict = stored_data.get(PEOPLE, {})
            name: Final[str] = event.get(NAME, "").lower()
            if name in stored_people:
                self.logger.info(f"PERSON: {name} ALREADY EXISTS")
                person = stored_people.get(name)
                return {SUCCESS: False, "message": f"Name: {name} already exists. Call update person if needed: {person}"}
            else:
                people: Final[list[str]] = self.people_names_lower(event=event)
                places: Final[list[str]] = self.place_names_lower(event=event)
                new_person = {
                    "name": name,
                    "type": "Person",
                    "role": event.get(ROLE),
                    "people": people,
                    "places": places,
                    "things": event.get(THINGS),
                    "description": event.get(DESCRIPTION)
                }
                stored_people[name] = new_person
                self.person_node_creator.create_nodes(names=[name], stored_data=stored_data)
                self.places_and_people(places=event.get(PLACES, []), people_to_place=people, new_person_name=name, stored_data=stored_data)
                self.logger.info(f"Successfully added new person {new_person}")
                return {SUCCESS: True, "message": f"Added new person: {new_person}"}
        except Exception as e:
            raise e

    def people_names_lower(self, event: dict) -> list[str]:
        people: list[str] = []
        for peep in event.get(PEOPLE, []):
            people.append(peep.lower())
        return people

    def place_names_lower(self, event: dict) -> list[str]:
        places: list[str] = []
        for place in event.get(PLACES, []):
            places.append(place.lower())
        return places
    
    def places_and_people(self, places: list[str], people_to_place: list[str], new_person_name: str, stored_data: dict) -> None:
        people_to_place = people_to_place
        people_to_place.append(new_person_name)
        self.place_node_creator.create_nodes(place_names=places, people_names=people_to_place, stored_data=stored_data)
