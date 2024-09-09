import json
import logging
from src.connectors.connection_factory import ConnectionStrategyFactory
from src.orchestrators.conductor import Conductor
from src.validations.input_validator import InputValidator
from src.utils.constants import (TYPE, NEW_PERSON, NEW_THING, NEW_PLACE, PERSON_TO_PERSON, PERSON_TO_PLACE, UPDATE_PERSON)
from src.utils.file_handler import load_json_from_local
from typing import Final

def lambda_handler(event, contest):
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    input_type: Final[str] = event.get(TYPE)
    if input_type not in [NEW_PERSON, NEW_PLACE, NEW_THING, PERSON_TO_PERSON, PERSON_TO_PLACE, UPDATE_PERSON]:
        logger.error(f"Input Type was Invalid: {input_type}")
        return {
            'statusCode': 400,
            'body': json.dumps({
                'message': 'Invalid input, input_type was invalid'
            })
        }

    # Define the path to the local JSON document
    json_file_path = 'data/pattern.json'
    updated_json_file_path = 'data/pattern.json'
    try:
        strategy = ConnectionStrategyFactory.get_strategy(operation=input_type)
        # Update JSON document with new data
        conductor = Conductor(data_source=json_file_path, data_target=updated_json_file_path, strategy=strategy)
        conductor.add_new_connection(event=event)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Data added successfully',
            })
        }
    except Exception as e:
        logger.error(f"ERROR in lambda_handler: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'An error occurred while adding data',
                'error': str(e)
            })
        }
