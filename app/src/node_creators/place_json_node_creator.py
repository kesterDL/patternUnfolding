from src.node_creators.node_creator_strategy import PlaceNodeCreatorStrategy
import logging
from src.exceptions.log_exceptions import log_exceptions
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class PlaceJsonNodeCreator(PlaceNodeCreatorStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def create_nodes(self, place_names: list[str], people_names: list[str], stored_data: dict) -> list[dict]:
        return self.check_if_places_exist_create_if_missing(place_names=place_names, stored_data=stored_data)

    @log_exceptions
    def check_if_places_exist_create_if_missing(self, place_names: list[str], stored_data: dict) -> list[dict]:
        try:
            stored_places: dict = stored_data.get(PLACES, {})
            places: list[dict] = []
            for place in place_names:
                if place in stored_places:
                    places.append(stored_places[place])
                else:
                    new_place = {
                        "name": place,
                        "type": "Place",
                        "people": [],
                        "places": {},
                        "things": {},
                        "events": {},
                        "description": ""
                    }
                    stored_places[place] = new_place
                    places.append(new_place)
            return places
        except Exception as e:
            self.logger.error(f"FAILURE: failed to create new place.")
            raise e
