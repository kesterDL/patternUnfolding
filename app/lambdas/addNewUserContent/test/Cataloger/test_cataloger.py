import pytest
from botocore.exceptions import ClientError
from src.Cataloger.cataloger import Cataloger
from src.Util.constants import (UPLOAD_DATE, PARTITION_KEY, SORT_KEY, SHARED_CONTENT)

@pytest.fixture
def event():
    return {
        "sub": "e4283478-8091-70d0-8813-6006f20efbdb",
        "title": "Test Title",
        "description": "Test Description",
        "content_type": "image/jpeg",
        "s3_key": "user-content/test-image.jpg"
    }

@pytest.fixture
def context():
    return {}

@pytest.fixture
def cataloger(event, context):
    return Cataloger(event, context)

def test_add_content_to_user_success(monkeypatch, cataloger):
    """
    Test that add_content_to_user successfully appends a content ID to the shared_content list.
    """
    def mock_update_item(Key, UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues):
        assert Key == {PARTITION_KEY: cataloger.user_id}
        assert UpdateExpression == "SET #sc = list_append(if_not_exists(#sc, :empty_list), :new_content)"
        assert ExpressionAttributeNames == {"#sc": SHARED_CONTENT}
        assert ExpressionAttributeValues == {
            ":new_content": [cataloger.content_id],
            ":empty_list": []
        }

    monkeypatch.setattr(cataloger.profile_table, "update_item", mock_update_item)
    cataloger.add_content_to_user(cataloger.user_id, cataloger.content_id)

def test_add_content_to_user_client_error(monkeypatch, cataloger):
    """
    Test that add_content_to_user raises a ClientError when DynamoDB update fails.
    """
    def mock_update_item(Key, UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues):
        raise ClientError({"Error": {"Code": "500", "Message": "Test error"}}, "UpdateItem")

    monkeypatch.setattr(cataloger.profile_table, "update_item", mock_update_item)
    with pytest.raises(ClientError):
        cataloger.add_content_to_user(cataloger.user_id, cataloger.content_id)

def test_add_content_to_table_success(monkeypatch, cataloger, event):
    def mock_put_item(Item):
        assert Item[PARTITION_KEY] == cataloger.content_id
        assert Item[SORT_KEY] == event["sub"]
        assert Item[UPLOAD_DATE] == cataloger.creation_date
        assert Item["title"] == event["title"]
        assert Item["description"] == event["description"]
        assert Item["type"] == event["content_type"]
        assert Item["location"] == event["s3_key"]
        return {"ResponseMetadata": {"HTTPStatusCode": 200}}

    monkeypatch.setattr(cataloger.user_content_table, "put_item", mock_put_item)
    result = cataloger.add_content_to_table(event, cataloger.creation_date, cataloger.content_id)
    assert result is True

def test_add_content_to_table_failure(monkeypatch, cataloger, event):
    def mock_put_item(Item):
        return {"ResponseMetadata": {"HTTPStatusCode": 500}}

    monkeypatch.setattr(cataloger.user_content_table, "put_item", mock_put_item)
    result = cataloger.add_content_to_table(event, cataloger.creation_date, cataloger.content_id)
    assert result is False

def test_add_content_to_table_client_error(monkeypatch, cataloger, event):
    def mock_put_item(Item):
        raise ClientError({"Error": {"Code": "500", "Message": "Test error"}}, "PutItem")

    monkeypatch.setattr(cataloger.user_content_table, "put_item", mock_put_item)
    with pytest.raises(ClientError):
        cataloger.add_content_to_table(event, cataloger.creation_date, cataloger.content_id)

def test_catalog_content_success(monkeypatch, cataloger, event):
    def mock_add_content_to_user(user_id, content_id):
        assert user_id == cataloger.user_id
        assert content_id == cataloger.content_id

    def mock_add_content_to_table(event, create_date, content_id):
        assert create_date == cataloger.creation_date
        assert content_id == cataloger.content_id
        return True

    monkeypatch.setattr(cataloger, "add_content_to_user", mock_add_content_to_user)
    monkeypatch.setattr(cataloger, "add_content_to_table", mock_add_content_to_table)
    result = cataloger.catalog_content()
    assert result is True

def test_catalog_content_failure(monkeypatch, cataloger):
    def mock_add_content_to_user(user_id, content_id):
        assert user_id == cataloger.user_id
        assert content_id == cataloger.content_id

    def mock_add_content_to_table(event, create_date, content_id):
        return False

    monkeypatch.setattr(cataloger, "add_content_to_user", mock_add_content_to_user)
    monkeypatch.setattr(cataloger, "add_content_to_table", mock_add_content_to_table)
    result = cataloger.catalog_content()
    assert result is False
