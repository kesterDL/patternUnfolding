import pytest
import json
from src.handlers.people_handler import PeopleHandler
from src.utils.constants import (CONNECTION, PEOPLE, PERSON, PERSONS, NAME, TYPE, ROLE, PLACES, THINGS, DESCRIPTION, SEQUENCE)


class TestPeopleHandler:

    @pytest.fixture
    def load_stored_data(self):
        # Define the path to the local JSON document
        test_pattern_file = open('tests/test_data/test_pattern.json')
        pattern: dict = json.load(test_pattern_file)
        yield pattern

    def test_givenValidPersonConnectionInput_StoredJsonIsUpdated(self, load_stored_data):
        handler = PeopleHandler()
        input = {
        "type": "persons_to_persons",
        "persons": ["easar togita"],
        "connections": ["rand al'thor"]
        }
        handler.add_person_connection(load_stored_data, event=input)
        print(f"EASAR: {load_stored_data.get("people").get("easar togita")}")
        assert(load_stored_data.get("people").get("easar togita").get("people")[1] == "rand al'thor")

    def test_givenValidPersonToPlaceConnectionInput_StoredJsonIsUpdated(self, load_stored_data):
        handler = PeopleHandler()
        input = {
            "type": "person_to_place",
            "persons": ["matrim cauthon", "egwene al'vere"],
            "connection": "emond's field"
        }
        handler.add_place_connection(stored_data=load_stored_data, event=input)
        assert("emond's field" in load_stored_data.get("people").get("matrim cauthon").get("places"))

    def test_givenValidPersons_check_if_person_exists_create_if_missing(self, load_stored_data):
        handler = PeopleHandler()
        input = {
            "type": "person_to_place",
            "persons": ["matrim cauthon", "egwene al'vere"],
            "connection": "emond's field"
        }
        fetched_people: list[dict] = handler.check_if_persons_exist_create_if_missing(stored_data=load_stored_data, names=input.get("persons", []))
        assert(fetched_people[0].get(NAME) == "matrim cauthon")
        assert("matrim cauthon" in load_stored_data.get("people"))
        assert("egwene al'vere" in load_stored_data.get("people"))
        assert(fetched_people[1].get(NAME) == "egwene al'vere")

    def test_updateNewPerson_PeopleOnly_ExpectOnlyPeopleAreUpdated(self, load_stored_data):
        handler = PeopleHandler()
        update_message = {
            "name": "ara",
            "type": "update_person",
            "people": ["rand al'thor"]
        }
        handler.update_person(event=update_message, stored_data=load_stored_data)
        assert(load_stored_data.get(PEOPLE).get("ara").get(PEOPLE) == ["rand al'thor"])
