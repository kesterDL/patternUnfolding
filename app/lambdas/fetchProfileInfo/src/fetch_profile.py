import json
import boto3
from botocore.exceptions import ClientError
from Utils.check_cors import check_cors_call


def lambda_handler(event, context):
    '''
    {
        "httpMethod": "POST",
        "account_sub": "uuid",
    }
    '''
    if event.get("httpMethod") == "OPTIONS":
        return check_cors_call(event)

    ddb = boto3.client('dynamodb')
    account_sub = event.get("account_sub")
    if not account_sub:
        print(f"Account Sub was None!")
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "account_sub is required"})
        }
    try:
        response = ddb.get_item(
            TableName="WeaveAndTheWheelProfiles",
            Key={
                "PartitionKey": {
                    "S": account_sub
                }
            }
        )
        item = response.get("Item")
        if not item:
            print(f"No profile found for {account_sub}")
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "No profile found"})
            }

        profile_info = {
            "profilePhoto": item.get("profilePhoto", {}).get("S", ""),
            "userName": item.get("preferred_username", {}).get("S", ""),
            "email": item.get("email", {}).get("S", "")
        }
        return {
            "statusCode": 200,
            "body": json.dumps(profile_info)
        }
    except ClientError as e:
        print(f"ClientError: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    except Exception as e:
        print(f"Exception: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
