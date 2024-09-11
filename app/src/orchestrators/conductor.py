import json
import logging
from src.data_access.data_access_service import DataAccessService
from src.connectors.connection_strategy import ConnectionStrategy
from src.handlers.people_handler import PeopleHandler
from src.validations.input_validator import InputValidator
from src.utils.file_handler import write_json_to_file
from src.utils.constants import (SUCCESS, CONNECTION, PEOPLE, PERSON, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, PERSON_TO_PERSON,PERSON_TO_PLACE,NEW_PERSON,NEW_PLACE,NEW_THING, UPDATE_PERSON)

class Conductor:
    def __init__(self, data_source: str, data_target : str, strategy: ConnectionStrategy):
        try: 
            self.logger = logging.getLogger(__name__)
            self.logger.setLevel(logging.INFO)
            self.source_pattern_file = open(data_source)
            self.target_file = data_target
            self.strategy = strategy
            # TODO: The DAO object should be passed to the conductor rather than instantiating it here.
            self.dao_source = DataAccessService(file_path=data_source)
            self.dao_target = DataAccessService(file_path=data_target)
            self.people_handler = PeopleHandler()
            self.input_validator = InputValidator()
        except Exception as e:
            self.logger.error(f"ERROR: {e}")
            raise e

    def add_new_connection(self, event: dict):
        # Logic to fetch stored data...
        stored_data: dict = self.dao_source.load_data()
        self.strategy.add_connection(event, stored_data)
        # Logic to save result to file...
        self.dao_target.save_data(data=stored_data)
