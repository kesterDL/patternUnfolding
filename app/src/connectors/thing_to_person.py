from src.connectors.connection_strategy import ConnectionStrategy
from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
from src.node_creators.node_creator_strategy import ThingNodeCreatorStrategy
from src.node_creators.person_json_node_creator import PersonJsonNodeCreator
from src.node_creators.thing_json_node_creator import ThingJsonNodeCreator
from src.commons.fetch_names import fetch_names
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class ThingToPersonStrategy(ConnectionStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        self.person_node_creator: PersonNodeCreatorStrategy = PersonJsonNodeCreator()
        self.thing_node_creator: ThingNodeCreatorStrategy = ThingJsonNodeCreator()

    def add_connection(self, event: dict, stored_data: dict) -> dict:
        return self.add_thing_connection(stored_data=stored_data, event=event)

    @log_exceptions
    def add_thing_connection(self, event: dict, stored_data: dict) -> dict:
        try:
            if PERSONS not in event:
                raise KeyError(f"Missing key '{PERSONS}' in event.")
            if THINGS not in event:
                raise KeyError(f"Missing key '{THINGS}' in event.")
            people_names = fetch_names(names=event.get(PERSONS, []))
            things = fetch_names(names=event.get(THINGS, []))
            people_objs: list[dict]  = self.person_node_creator.create_nodes(names=people_names, stored_data=stored_data)
            thing_objs: list[dict] = self.thing_node_creator.create_nodes(thing_names=things, stored_data=stored_data, people_names=people_names)
            for person in people_objs:
                for thing in thing_objs:
                    people_conn_thing: list[str] = thing.get(PEOPLE, [])
                    if person.get(NAME) not in people_conn_thing:
                        people_conn_thing.append(person.get(NAME)) # type: ignore
                    person_conn_thing: dict[str, str] = person.get(THINGS, [])
                    if thing.get(NAME) not in person_conn_thing:
                        person_conn_thing[thing.get(NAME)] = "" # type: ignore
            return {SUCCESS: True, 'operation': 'thing_to_person'}
        except KeyError as ke:
            raise ke
        except ValueError as ve:
            raise ve
        except Exception as e:
            self.logger.error(f"FAILURE: Could not add {things} to target: {people_names}")
            self.logger.error(f"ERROR: {e}")
            raise e

    def connect_things(self, people_objs: list[dict], thing_objs: list[dict]):
        try:
            for person in people_objs:
                for thing in thing_objs:
                    people_conn_thing: list[str] = thing.get(PEOPLE, [])
                    if person.get(NAME) not in people_conn_thing:
                        people_conn_thing.append(thing.get(NAME)) # type: ignore
                    person_conn_thing: list[str] = person.get(THINGS, [])
                    if thing.get(NAME) not in person_conn_thing:
                        person_conn_thing.append(thing.get(NAME)) # type: ignore
        except KeyError as e:
            self.logger.error(f"Could not find people or person in list: {people_objs}, or things list {thing_objs}")
        except Exception as e:
            self.logger.error(f"ERROR: {e}")
            raise e