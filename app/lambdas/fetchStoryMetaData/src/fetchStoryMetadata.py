import boto3
import json

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('StoriesTable')

def lambda_handler(event, context):
    try:
        # Extract query parameters for filters and pagination
        params = event.get('queryStringParameters', {}) or {}
        author = params.get('author', None)
        genre = params.get('genre', None)
        title = params.get('title', None)
        limit = int(params.get('limit', 20))  # Limit the number of results to 20 per page by default
        last_evaluated_key = json.loads(params.get('last_evaluated_key', 'null'))  # For pagination

        # Build filter expression
        filter_expression = []
        expression_attribute_values = {}
        
        if author:
            filter_expression.append('author = :author')
            expression_attribute_values[':author'] = author
        if genre:
            filter_expression.append('genre = :genre')
            expression_attribute_values[':genre'] = genre
        if title:
            filter_expression.append('contains(title, :title)')
            expression_attribute_values[':title'] = title

        # Combine filter expressions if multiple filters are applied
        filter_expression_str = ' AND '.join(filter_expression)

        # If filters are applied, use Scan with filters, otherwise get most recent stories sorted by upload_timestamp
        if filter_expression_str:
            scan_params = {
                'FilterExpression': filter_expression_str,
                'ExpressionAttributeValues': expression_attribute_values,
                'Limit': limit
            }
            if last_evaluated_key:
                scan_params['ExclusiveStartKey'] = last_evaluated_key

            response = table.scan(**scan_params)

        else:
            # Fetch most recent 20 stories, sorted by upload_timestamp (use Limit and pagination)
            query_params = {
                'IndexName': 'upload_timestamp-index',  # You will need to create a GSI on upload_timestamp
                'Limit': limit,
                'ScanIndexForward': False,  # False to sort in descending order (most recent first)
            }
            if last_evaluated_key:
                query_params['ExclusiveStartKey'] = last_evaluated_key

            response = table.query(**query_params)

        # Return the stories metadata along with pagination information
        return {
            'statusCode': 200,
            'body': json.dumps({
                'items': response['Items'],
                'last_evaluated_key': response.get('LastEvaluatedKey')
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
