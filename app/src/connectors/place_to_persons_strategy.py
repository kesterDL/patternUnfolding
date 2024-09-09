from src.connectors.connection_strategy import ConnectionStrategy
from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
from src.node_creators.person_json_node_creator import PersonJsonNodeCreator
from src.node_creators.node_creator_strategy import PlaceNodeCreatorStrategy
from src.node_creators.place_json_node_creator import PlaceJsonNodeCreator
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class PlaceToPersonsStrategy(ConnectionStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.place_node_creator: PlaceNodeCreatorStrategy = PlaceJsonNodeCreator()
        self.person_node_creator: PersonNodeCreatorStrategy = PersonJsonNodeCreator()

    def add_connection(self, event: dict, stored_data: dict) -> dict:
        return self.add_place_connection(stored_data=stored_data, event=event)

    @log_exceptions
    def add_place_connection(self, stored_data: dict, event: dict) -> dict[str, bool | str]:
        '''
        {
        "type": "person_to_place",
        "persons": ["matrim cauthon", "egwene al'vere"],
        "places": ["emond's field"]
        }
        '''
        try:
            event_people: Final[list[str]] = event.get(PERSONS, [])
            new_place_connection_names: Final[list[str]] = event.get(CONNECTION, "")
            persons: list[dict] = self.person_node_creator.create_nodes(names=event_people, stored_data=stored_data)

            places: list[dict] = self.place_node_creator.create_nodes(place_names=new_place_connection_names, people_names=event_people, stored_data=stored_data)
            self.connect_people_to_place(people=persons, place_names=new_place_connection_names)
            self.connect_place_to_people(people=persons, places=places)
            return {SUCCESS: True, 'operation': 'person_to_place'}
        except Exception as e:
            self.logger.error(f"FAILURE: Could not add {new_place_connection_names} to target: {event_people}")
            self.logger.error(f"ERROR: {e}")
            raise e

    def connect_people_to_place(self, people: list[dict], place_names: list[str]):
        for place in place_names:
            for person in people:
                connections: list[str] = person.get(PLACES, [])
                # NOT checking for duplicates. A person can visit a place more than once.
                connections.append(place)
                self.logger.info(f"Successfully added {place_names} as a connection for target")

    def connect_place_to_people(self, people: list[dict], places: list[dict]):
        try:
            for place in places:
                place_people: list[str] = place.get(PEOPLE) # type: ignore This should always exist.
                for person in people:
                    if person in place_people:
                        logging.info(f"person already connected to {place.get(NAME)}")
                    else:
                        name: str = person.get(NAME) # type: ignore This should always exist.
                        place_people.append(name)
        except KeyError as e:
            self.logger.error(f"Could not find people or person in list: {people}")
        except Exception as e:
            self.logger.error(f"ERROR: {e}")
            raise e
