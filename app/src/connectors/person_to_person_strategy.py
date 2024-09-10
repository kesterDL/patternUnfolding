from src.connectors.connection_strategy import ConnectionStrategy
from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
from src.node_creators.person_json_node_creator import PersonJsonNodeCreator
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class PersonToPersonStrategy(ConnectionStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.person_node_creator: PersonNodeCreatorStrategy = PersonJsonNodeCreator()

    def add_connection(self, event: dict, stored_data: dict) -> dict:
        return self.add_person_connection(stored_data=stored_data, event=event)

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
            targets: list[dict] = self.person_node_creator.create_nodes(names=target_persons, stored_data=stored_data)
            connections: list[dict] = self.person_node_creator.create_nodes(names=new_connections, stored_data=stored_data)

            # Look at each person's connections and add the connection if missing.
            for person in targets:
                for new_person_connection in connections:
                    self.connect_people(
                        target_name=person.get(NAME), # type: ignore should always exist or throw an error if missing
                        targets_connections=person.get(PEOPLE), # type: ignore
                        connections_people=new_person_connection.get(PEOPLE), # type: ignore
                        connection_name=new_person_connection.get(NAME) # type: ignore
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
            if connection_name not in targets_connections:
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

