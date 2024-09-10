from src.utils.constants import (TYPE, NAME, ROLE, PEOPLE, PLACES, THINGS, DESCRIPTION, NEW_PERSON, NEW_THING, NEW_PLACE, PERSON_TO_PERSON, PERSON_TO_PLACE)
from typing import Final

class InputValidator:
    def __init__(self):
        pass

    def validate_new_person(self, event: dict):
        try:
            type: Final[str] = event.get(TYPE)
            name: Final[str] = event.get(NAME)
            role: Final[str] = event.get(ROLE)
            people: Final[list[str]] = event.get(PEOPLE)
            places: Final[dict] = event.get(PLACES)
            things: Final[dict] = event.get(THINGS)
            description: Final[str] = event.get(DESCRIPTION)

        except KeyError as e:
            raise e