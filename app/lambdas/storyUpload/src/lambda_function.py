import json
import boto3
import uuid
import time

# Initialize AWS resources
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

# DynamoDB table and S3 bucket names
DYNAMODB_TABLE = 'StoriesTable'
S3_BUCKET = 'short-stories-bucket'

def lambda_handler(event, context):
    try:
        # Extract the story content and metadata from the event (assuming it's passed as JSON)
        body = json.loads(event['body'])
        story_content = body['story_content']
        title = body['title']
        author = body['author']
        genre = body['genre']
        
        # Validate word count (between 500 and 10,000 words)
        word_count = len(story_content.split())
        if word_count < 500 or word_count > 10000:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Story must be between 500 and 10,000 words.'})
            }

        # Generate a unique ID for the story and upload timestamp
        story_id = str(uuid.uuid4())
        timestamp = int(time.time())
        
        # Upload the story content to S3
        s3_key = f'stories/{story_id}.txt'
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=story_content,
            ContentType='text/plain'
        )

        # Store metadata in DynamoDB
        # Primary Key: story_id (Partition Key)
        # GSI (Global Secondary Index):
        # author: If you want to query stories by a specific author.
        # genre: To query stories based on genre.
        # upload_timestamp: For sorting stories by recent uploads.
        table = dynamodb.Table(DYNAMODB_TABLE)
        table.put_item(
            Item={
                'story_id': story_id,
                'title': title,
                'author': author,
                'genre': genre,
                'word_count': word_count,
                's3_key': s3_key,
                'upload_timestamp': timestamp
            }
        )

        # Return a successful response
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Story uploaded successfully', 'story_id': story_id})
        }
    
    except Exception as e:
        # Handle any errors
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
