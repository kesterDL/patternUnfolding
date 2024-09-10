import json
from src.orchestrators.conductor import Conductor
from src.connectors.person_to_person_strategy import PersonToPersonStrategy
from src.connectors.place_to_persons_strategy import PlaceToPersonsStrategy

class TestConductor:

    def test_person_to_person(self):
        path_to_src = 'tests/test_data/test_pattern.json'
        path_to_target = 'tests/test_data/NEW.json'
        conductor = Conductor(data_source=path_to_src, data_target=path_to_target, strategy=PersonToPersonStrategy())
        input_event = {
        "type": "persons_to_persons",
        "persons": ["rand al'thor"],
        "connections": ["matrim cauthon"]
        }
        conductor.add_new_connection(event=input_event)
        new_data_file = open(path_to_target)
        new_data = json.load(new_data_file)

        assert(new_data.get("people").get("matrim cauthon").get("people")[0] == "rand al'thor")

    def test_person_to_place(self):
        path_to_src = 'tests/test_data/test_pattern.json'
        path_to_target = 'tests/test_data/NEW.json'
        conductor = Conductor(data_source=path_to_src, data_target=path_to_target, strategy=PlaceToPersonsStrategy())
        input_event = {
            "type": "person_to_place",
            "persons": ["matrim cauthon","egwene al'vere"],
            "connection": ["emond's field"]
        }
        conductor.add_new_connection(event=input_event)

        new_data_file = open(path_to_target)
        new_data = json.load(new_data_file)
        assert("emond's field" in new_data.get("people").get("matrim cauthon").get("places"))
        assert("egwene al'vere" in new_data.get("people"))