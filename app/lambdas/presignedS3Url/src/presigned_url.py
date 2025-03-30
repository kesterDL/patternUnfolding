import json
import boto3
import logging
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    '''
    {
        "httpMethod": "POST",
        "file_name": "file_name"
    }
    '''
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    logger.info(f"Event: {event}")
    s3_client = boto3.client('s3')
    bucket_name = "weave-and-the-wheel-public-images"
    object_key = "user-created-content/"

    try:
        # Handle CORS preflight request
        if event.get("httpMethod") == "OPTIONS":
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                "body": json.dumps("CORS preflight response"),
            }

        # Handle POST request (file upload)
        if event.get("httpMethod") == "POST":
            # Generate a presigned URL for S3
            file_name = event.get("file_name")
            object_key += file_name
            if not file_name:
                return {
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": "file_name is required"}),
                }
            presigned_url = s3_client.generate_presigned_url(
                'put_object',
                Params={'Bucket': bucket_name, 'Key': object_key, 'ContentType': 'image/jpeg' },
                ExpiresIn=30  # URL expiration time in seconds
            )
            path_to_image = f"https://{bucket_name}.s3.amazonaws.com/{object_key}"
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                "body": json.dumps({"presignedUrl": presigned_url, "pathToImage": path_to_image}),
            }

        # Handle unsupported methods
        return {
            "statusCode": 405,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "Method not allowed"}),
        }

    except ClientError as e:
        logger.error(f"ClientError: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)}),
        }
    except Exception as e:
        logger.error(f"Exception: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)}),
        }
