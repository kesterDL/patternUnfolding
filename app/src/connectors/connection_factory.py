from src.connectors.connection_strategy import ConnectionStrategy
from src.connectors.person_to_person_strategy import PersonToPersonStrategy
from src.connectors.place_to_persons_strategy import PlaceToPersonsStrategy
from src.connectors.update_person_strategy import UpdatePersonStrategy
from src.connectors.new_person_strategy import NewPersonStrategy
from src.utils.constants import (SUCCESS, CONNECTION, PEOPLE, PERSON, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, PERSON_TO_PERSON,PERSON_TO_PLACE,NEW_PERSON,NEW_PLACE,NEW_THING, UPDATE_PERSON)

class ConnectionStrategyFactory:
    @staticmethod
    def get_strategy(operation: str) -> ConnectionStrategy:
        if operation == PERSON_TO_PERSON:
            return PersonToPersonStrategy()
        elif operation == PERSON_TO_PLACE:
            return PlaceToPersonsStrategy()
        elif operation == UPDATE_PERSON:
            return UpdatePersonStrategy()
        elif operation == NEW_PERSON:
            return NewPersonStrategy()
        else:
            raise ValueError(f"Unsupported operation: {operation}")
