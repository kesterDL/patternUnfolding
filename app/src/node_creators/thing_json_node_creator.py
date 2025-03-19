from src.node_creators.node_creator_strategy import ThingNodeCreatorStrategy
import logging
from src.exceptions.log_exceptions import log_exceptions
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class ThingJsonNodeCreator(ThingNodeCreatorStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def create_nodes(self, thing_names: list[str], stored_data: dict, people_names: list[str]=[], place_names: list[str]=[]) -> list[dict]:
        return self.check_if_thing_exists_create_if_missing(thing_names=thing_names, stored_data=stored_data, people_names=people_names, place_names=place_names)

    @log_exceptions
    def check_if_thing_exists_create_if_missing(self, thing_names: list[str], stored_data: dict, people_names: list[str]=[], place_names: list[str]=[]) -> list[dict]:
        try:
            stored_things: dict = stored_data.get(THINGS, {})
            things: list[dict] = []
            for thing in thing_names:
                if thing in stored_things:
                    things.append(stored_things[thing])
                else:
                    new_thing = {
                        "name": thing,
                        "type": "Thing",
                        "people": people_names,
                        "places": place_names,
                        "events": {},
                        "description": ""
                    }
                    stored_things[thing] = new_thing
                    things.append(new_thing)
            return things
        except Exception as e:
            self.logger.error(f"FAILURE: failed to create new place.")
            raise e
