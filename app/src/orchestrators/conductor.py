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

# TODO Delete code below
# COMMENTED OUT TO TEST STRATEGY & FACTORY PATTERN

    # def add_new_person_to_person_connection(self, event: dict):
    #     try:
    #         # Load existing data
    #         pattern: dict = json.load(self.source_pattern_file)
    #         add_new_connection: dict[str, bool | str] = self.people_handler.add_person_connection(stored_data=pattern, event=event)
    #         # Write new data to target file
    #         if add_new_connection.get(SUCCESS):
    #             self.logger.info("Saving to New File")
    #             write_json_to_file(file_path=self.target_file, data=pattern)
    #     except Exception as e:
    #         self.logger.error(f"FAILURE: Could not add a new person_to_person connection {event}")
    #         self.logger.error(f"ERROR: {e}")
    #         raise e

    # def add_new_connection(self, event: dict):
    #     try:
    #         # Load existing data
    #         pattern: dict = json.load(self.source_pattern_file)
    #         operation = event.get(TYPE)

    #         # Modify record based on operation type
    #         new_connection: dict[str, bool | str]

    #         if operation == PERSON_TO_PERSON:
    #             self.logger.info("Adding a new people connections")
    #             new_connection = self.people_handler.add_person_connection(stored_data=pattern, event=event)
    #         elif operation == PERSON_TO_PLACE:
    #             self.logger.info("Adding a new place to people")
    #             new_connection = self.people_handler.add_place_connection(stored_data=pattern, event=event)
    #         elif operation == NEW_PERSON:
    #             self.logger.info("Adding New Person")
    #             self.input_validator.validate_new_person(event=event)
    #             new_connection = self.people_handler.create_new_person(stored_data=pattern, event=event)
    #             self.logger.info("Finished adding new person")
    #         elif operation == UPDATE_PERSON:
    #             self.logger.info("Updating Person")
    #             new_connection = self.people_handler.update_person(stored_data=pattern, event=event)
    #         else:
    #             self.logger.info("No Changes made")

    #         # Write new data to target file
    #         if new_connection.get(SUCCESS):
    #             self.logger.info(f"Writing new file: {self.target_file}")
    #             write_json_to_file(file_path=self.target_file, data=pattern)
    #     except Exception as e:
    #         self.logger.error(f"FAILURE: Could not add a new person_to_place connection: {event}")
    #         self.logger.error(f"ERROR: {e}")
    #         raise e
