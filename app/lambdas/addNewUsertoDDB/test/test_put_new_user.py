import pytest
from botocore.exceptions import ClientError
from app.lambdas.addNewUsertoDDB.src.put_new_user import lambda_handler, add_user_to_dynamodb

@pytest.fixture
def event():
    return {
        'userName': 'e4283478-8091-70d0-8813-6006f20efbdb',
        'triggerSource': 'PostConfirmation_ConfirmSignUp',
        'request': {
            'userAttributes': {
                'sub': 'e4283478-8091-70d0-8813-6006f20efbdb',
                'email_verified': 'true',
                'cognito:user_status': 'CONFIRMED',
                'preferred_username': 'AvElaMin',
                'email': 'glimpsesOfThePattern@gmail.com'
            }
        },
        'response': {}
    }

@pytest.fixture
def context():
    return {}

def test_lambda_handler_success(monkeypatch, event, context):
    def mock_add_user_to_dynamodb(user_attributes):
        assert user_attributes['sub'] == 'e4283478-8091-70d0-8813-6006f20efbdb'
        assert user_attributes['email'] == 'glimpsesOfThePattern@gmail.com'
        assert user_attributes['preferred_username'] == 'AvElaMin'

    monkeypatch.setattr('app.lambdas.addNewUsertoDDB.src.put_new_user.add_user_to_dynamodb', mock_add_user_to_dynamodb)
    result = lambda_handler(event, context)
    assert result == event

def test_lambda_handler_exception(monkeypatch, event, context):
    def mock_add_user_to_dynamodb(user_attributes):
        raise Exception("Test exception")

    monkeypatch.setattr('app.lambdas.addNewUsertoDDB.src.put_new_user.add_user_to_dynamodb', mock_add_user_to_dynamodb)
    result = lambda_handler(event, context)
    assert result == event

def test_add_user_to_dynamodb_success(monkeypatch):
    def mock_boto3_resource(service_name):
        class MockTable:
            def put_item(self, Item):
                assert Item['PARTION_KEY'] == 'e4283478-8091-70d0-8813-6006f20efbdb'
                assert Item['EMAIL'] == 'glimpsesOfThePattern@gmail.com'
                assert Item['PREFERRED_USERNAME'] == 'AvElaMin'
        return MockTable()

    monkeypatch.setattr('boto3.resource', mock_boto3_resource)
    user_attributes = {
        'sub': 'e4283478-8091-70d0-8813-6006f20efbdb',
        'email': 'glimpsesOfThePattern@gmail.com',
        'preferred_username': 'AvElaMin'
    }
    add_user_to_dynamodb(user_attributes)

def test_add_user_to_dynamodb_client_error(monkeypatch):
    def mock_boto3_resource(service_name):
        class MockTable:
            def put_item(self, Item):
                raise ClientError({"Error": {"Code": "500", "Message": "Test error"}}, "PutItem")
        return MockTable()

    monkeypatch.setattr('boto3.resource', mock_boto3_resource)
    user_attributes = {
        'sub': 'e4283478-8091-70d0-8813-6006f20efbdb',
        'email': 'glimpsesOfThePattern@gmail.com',
        'preferred_username': 'AvElaMin'
    }
    with pytest.raises(ClientError):
        add_user_to_dynamodb(user_attributes)

def test_add_user_to_dynamodb_key_error(monkeypatch):
    def mock_boto3_resource(service_name):
        class MockTable:
            def put_item(self, Item):
                pass
        return MockTable()

    monkeypatch.setattr('boto3.resource', mock_boto3_resource)
    user_attributes = {
        'sub': 'e4283478-8091-70d0-8813-6006f20efbdb',
        'email': 'glimpsesOfThePattern@gmail.com'
        # Missing 'preferred_username'
    }
    with pytest.raises(KeyError):
        add_user_to_dynamodb(user_attributes)