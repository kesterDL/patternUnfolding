from src.node_creators.node_creator_strategy import PersonNodeCreatorStrategy
import logging
from src.exceptions.log_exceptions import log_exceptions
from typing import Final
from src.utils.constants import (SUCCESS, CONNECTION, CONNECTIONS, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)

class PersonJsonNodeCreator(PersonNodeCreatorStrategy):
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def create_nodes(self, names: list[str], stored_data: dict) -> list[dict]:
        return self.check_if_persons_exist_create_if_missing(names=names, stored_data=stored_data)

    @log_exceptions
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
