from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final

class PeopleHandler:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
    

    def fetch_people_names(self, names: list[str]) -> list[str]:
        """
        This method converts each name to lowercase, and returns the modified list of names.

        Args:
            names: a list of names (strings).

        Returns:
            list[str]: A list of people's names in lowercase format. If no names are
                found, an empty list is returned.

        Raises:
            TypeError: If the event parameter is not a dictionary.
            ValueError: If the value associated with 'PERSONS' is not a list of strings.
        """
        
        if not isinstance(names, list):
            raise ValueError(f"Expected 'PERSONS' to be a list, but got {type(event_names).__name__} instead.")
        
        peoples_names: list[str] = []
        for name in names:
            if not isinstance(name, str):
                raise ValueError(f"Expected each name to be a string, but got {type(name).__name__} instead.")
            peoples_names.append(name.lower())
        
        return peoples_names

    @log_exceptions
    def add_person_connection(self, stored_data: dict, event: dict) -> dict[str, bool | str]:
        """
        This method takes an event containing two lists of people to connect to eachother.
        It checks if the persons and connections already exist in the stored data,
        creates missing entries if necessary, then adds the connections between the persons.

        Args:
            stored_data (dict): A dictionary containing existing data for persons.
            event (dict): A dictionary with event details. Expected keys are:
                        - 'PERSONS': List of target persons.
                        - 'CONNECTIONS': List of new connections to add for the persons.

        Returns:
            dict[str, bool | str]: A dictionary with the success status and the operation performed.
                                - 'SUCCESS': Boolean value indicating if the operation was successful.
                                - 'operation': A string indicating the type of operation.

        Raises:
            KeyError: If 'PERSONS' or 'CONNECTIONS' key is missing from the event.
            ValueError: If no valid persons or connections are provided in the event.
            Exception: For any other unexpected error during execution.
        """
        try:
            if PERSONS not in event:
                raise KeyError(f"Missing key '{PERSONS}' in event.")
            if CONNECTIONS not in event:
                raise KeyError(f"Missing key '{CONNECTIONS}' in event.")
            
            target_persons: Final[list[str]] = self.fetch_people_names(names=event.get(PERSONS, []))
            new_connections: Final[list[str]] = self.fetch_people_names(names=event.get(CONNECTIONS, []))

            # Check that all people exist. If not, create entries for anyone missing.
            targets: list[dict] = self.check_if_persons_exist_create_if_missing(names=target_persons, stored_data=stored_data)
            connections: list[dict] = self.check_if_persons_exist_create_if_missing(names=new_connections, stored_data=stored_data)

            # Look at each person's connections and add the connection if missing.
            for person in targets:
                for new_person_connection in connections:
                    self.connect_people(
                        target_name=person.get(NAME, "FAILED TO FETCH NAME"),
                        targets_connections=person.get(PEOPLE, []),
                        connections_people=new_person_connection.get(PEOPLE, []),
                        connection_name=new_person_connection.get(NAME, "FAILED TO FETCH NAME")
                    )
            return {SUCCESS: True, 'operation': 'person_to_person'}
        
        except KeyError as ke:
            raise ke
        except ValueError as ve:
            raise ve
        except Exception as e:
            self.logger.error(f"FAILURE: Could not add {new_connections} to target: {target_persons}")
            self.logger.error(f"ERROR: {e}")
            raise e

    def connect_people(self, target_name: str, targets_connections: list[str], connection_name: str, connections_people: list[str]):
        try:
            if connection_name not in targets_connections and connection_name != target_name:
                targets_connections.append(connection_name)
                self.logger.info(f"Successfully added {connection_name} as a connection for target: {target_name}")
            if target_name not in connections_people:
                connections_people.append(target_name)
                self.logger.info(f"Successfully added {target_name} as a connection for target: {connection_name}")
        except KeyError as e:
            self.logger.error(f"Could not find people or person in target's list: {targets_connections}, or connections list {connections_people}")
        except Exception as e:
            self.logger.error(f"ERROR: {e}")
            raise e

    def connect_people_to_place(self, people: list[dict], place_name: str):
        for person in people:
            connections: list[str] = person.get(PLACES, [])
            connections.append(place_name)
            self.logger.info(f"Successfully added {place_name} as a connection for target")

    def connect_place_to_people(self, people: list[dict], place: dict):
        try:
            place_people: list[str] = place.get(PEOPLE) # type: ignore
            for person in people:
                name: str = person.get(NAME) # type: ignore
                place_people.append(name)
        except KeyError as e:
            self.logger.error(f"Could not find people or person in list: {people}")
        except Exception as e:
            self.logger.error(f"ERROR: {e}")
            raise e

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
            new_place_connection_name: Final[str] = event.get(CONNECTION, "")
            persons: list[dict] = self.check_if_persons_exist_create_if_missing(names=event_people, stored_data=stored_data)
        
            place = self.check_if_places_exist_create_if_missing(
                place_names=[new_place_connection_name],
                people_names=event_people,
                stored_data=stored_data
            )
            self.connect_people_to_place(people=persons, place_name=new_place_connection_name)
            self.connect_place_to_people(people=persons, place=place)
            return {SUCCESS: True, 'operation': 'person_to_place'}
        except Exception as e:
            self.logger.error(f"FAILURE: Could not add {new_place_connection_name} to target: {event_people}")
            self.logger.error(f"ERROR: {e}")
            raise e
        
    def update_person_place_sequence(self, stored_data: dict, event: dict):
        try:
            person_name: str|None = event.get(PERSON, "")
            place_name: str|None = event.get(CONNECTION)
            visit_sequence: int|None = event.get(SEQUENCE)
            stored_people: dict = stored_data.get(PEOPLE, {})

            if person_name in stored_people:
                places_map = stored_people.get(person_name,{}).get(PLACES, {})
                if place_name not in places_map:
                    places_map[place_name] = visit_sequence
                    return {SUCCESS: True, 'operation': 'update_person_place_sequence'}

            return {'success': False, 'operation': 'update_person_place_sequence'}
        except Exception as e:
            self.logger.error(f"FAILURE: Could not change {person_name} place sequence. Probably can't find the person or place named.")
            self.logger.error(f"ERROR: {e}")
            raise e

    def create_new_person(self, event:dict, stored_data:dict) -> dict:
        try:
            stored_people: dict = stored_data.get(PEOPLE, {})
            name: str = event.get(NAME, "").lower()
            if name in stored_people:
                self.logger.info(f"PERSON: {name} ALREADY EXISTS")
                person = stored_people.get(name)
                return {SUCCESS: False, "message": f"Name: {name} already exists. Call update person if needed: {person}"}
            else:
                people: list[str] = []
                places: list[str] = []
                for peep in event.get(PEOPLE, []):
                    people.append(peep.lower())
                for place in event.get(PLACES, []):
                    places.append(place.lower())
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
                self.check_if_persons_exist_create_if_missing(names=event.get(PEOPLE, []), stored_data=stored_data)
                people.append(name)
                self.check_if_places_exist_create_if_missing(place_names=event.get(PLACES, []), people_names=people, stored_data=stored_data)
                self.logger.info(f"Successfully added new person {new_person}")
                return {SUCCESS: True, "message": f"Added new person: {new_person}"}
        except Exception as e:
            raise e

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
            name: str = event.get(NAME, "").lower()
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
                    self.check_if_persons_exist_create_if_missing(names=event.get(PEOPLE, []), stored_data=stored_data)
                if PLACES in updated_info:
                    person[PLACES] = event.get(PLACES)
                    self.check_if_places_exist_create_if_missing(place_names=event.get(PLACES, {}), people_names=event.get(PEOPLE, []), stored_data=stored_data)
                if THINGS in updated_info:
                    person[THINGS] = event.get(THINGS)
                if DESCRIPTION in updated_info:
                    person[DESCRIPTION] = event.get(DESCRIPTION)

                stored_people[name] = person
                return {SUCCESS: True, "message": f"Updated person: {person}"}
        except Exception as e:
            raise e

    def check_if_persons_exist_create_if_missing(self, names: list[str], stored_data: dict) -> list[dict]:
        '''
        Args:
            names (dict[str, int]): { "matrim cauthon": 2, "egwene al'vere": 2 }
            stored_data (dict): All the people in the DB
        Returns:
            list[dict]: List of all the people found in the DB or newly created
        '''
        try:
            stored_people: Final[dict] = stored_data.get(PEOPLE, [])
            fetched_people: list[dict] = []
            for name in names:
                name = name.lower()
                if name in stored_people:
                    fetched_people.append(stored_people.get(name, {}))
                else:
                    self.logger.info(f"Target person {name} not found. Creating a new person.")
                    new_person = {
                        NAME: name,
                        TYPE: "Person",
                        ROLE: "",
                        PEOPLE: [],
                        PLACES: [],
                        THINGS: {},
                        DESCRIPTION: ""
                    }
                    stored_people[name] = new_person
                    fetched_people.append(new_person)
            return fetched_people
        except Exception as e:
            self.logger.error(f"FAILURE: Could not create new person {name}")
            raise e

    def check_if_places_exist_create_if_missing(self, place_names: list[str], people_names: list[str], stored_data: dict) -> dict:
        try:
            stored_places: dict = stored_data.get(PLACES, {})
            for place in place_names:
                if place in stored_places:
                    return stored_places[place]
                else:
                    new_place = {
                        "name": place_names,
                        "type": "Place",
                        "people": people_names,
                        "places": {},
                        "things": {},
                        "events": {},
                        "description": ""
                    }
                    stored_places[place] = new_place
            return new_place
        except Exception as e:
            self.logger.error(f"FAILURE: failed to create new place.")
            raise e
