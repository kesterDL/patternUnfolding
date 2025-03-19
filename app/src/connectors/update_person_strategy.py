from src.connectors.connection_strategy import ConnectionStrategy
from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
from src.node_creators.person_json_node_creator import PersonJsonNodeCreator
from src.node_creators.node_creator_strategy import PlaceNodeCreatorStrategy
from src.node_creators.place_json_node_creator import PlaceJsonNodeCreator
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class UpdatePersonStrategy(ConnectionStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.place_node_creator: PlaceNodeCreatorStrategy = PlaceJsonNodeCreator()
        self.person_node_creator: PersonNodeCreatorStrategy = PersonJsonNodeCreator()

    def add_connection(self, event: dict, stored_data: dict) -> dict:
        return self.update_person(stored_data=stored_data, event=event)

    @log_exceptions
    def update_person(self, event:dict, stored_data:dict) -> dict:
        """
        {
            "type": "update_person",
            "name": "rand al'thor",
            "role": "dragon reborn",
            "people": [],
            "places": [],
            "things": {},
            "description": ""
        }
        """
        try:
            stored_people: dict = stored_data.get(PEOPLE, {})
            name: Final[str] = event.get(NAME, "").lower()
            if name not in stored_people:
                self.logger.info(f"PERSON: {name} Does Not Exist")
                return {SUCCESS: False, "message": f"Name: {name} doesn't exist. Call create new person."}
            else:
                self.logger.info(f"Found existing person: {name}")
                person: dict = stored_people.get(name, {})
                updated_info = event.keys()
                if NAME in updated_info:
                    person[NAME] = event.get(NAME)
                if ROLE in updated_info:
                    person[ROLE] = event.get(ROLE)
                if PEOPLE in updated_info:
                    person[PEOPLE] = event.get(PEOPLE)
                    self.person_node_creator.create_nodes(names=person[PEOPLE], stored_data=stored_data)
                if PLACES in updated_info:
                    person[PLACES] = event.get(PLACES)
                    self.place_node_creator.create_nodes(place_names=person[PLACES], people_names=person[PEOPLE], stored_data=stored_data)
                if THINGS in updated_info:
                    person[THINGS] = event.get(THINGS)
                if DESCRIPTION in updated_info:
                    person[DESCRIPTION] = event.get(DESCRIPTION)

                stored_people[name] = person
                return {SUCCESS: True, "message": f"Updated person: {person}"}
        except Exception as e:
            raise e