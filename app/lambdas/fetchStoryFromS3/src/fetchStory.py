import boto3
import json

# Initialize S3 client
s3 = boto3.client('s3')
S3_BUCKET = 'short-stories-bucket'

def lambda_handler(event, context):
    try:
        # Extract the story_id from the path parameters (e.g., /story/{story_id})
        story_id = event['pathParameters']['story_id']

        # You would likely look up the metadata from DynamoDB first to get the s3_key
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('StoriesTable')
        response = table.get_item(Key={'story_id': story_id})
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Story not found'})
            }

        # Fetch S3 key from metadata
        s3_key = response['Item']['s3_key']
        
        # Get the story content from S3
        s3_object = s3.get_object(Bucket=S3_BUCKET, Key=s3_key)
        story_content = s3_object['Body'].read().decode('utf-8')

        # Return the story content
        return {
            'statusCode': 200,
            'body': json.dumps({
                'story_id': story_id,
                'title': response['Item']['title'],
                'author': response['Item']['author'],
                'genre': response['Item']['genre'],
                'content': story_content
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
