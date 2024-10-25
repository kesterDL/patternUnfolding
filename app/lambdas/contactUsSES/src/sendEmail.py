import json
import boto3
from botocore.exceptions import ClientError

ses_client = boto3.client('ses', region_name='us-east-1')

def lambda_handler(event, context):
        # Check for an OPTIONS preflight request
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "https://weaveandthewheel.com",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            "body": json.dumps("CORS preflight response")
        }
    # Parse form data from the incoming event
    body = event.get('body')
    name = body.get('name')
    email = body.get('email')
    message = body.get('message')

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'body': json.dumps('Name, email, and message are required.')
        }

    # Compose the email
    subject = 'Contact Us Form Submission'
    body_text = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    # Email parameters
    sender_email = 'weaveandthewheel@gmail.com'
    recipient_email = 'weaveandthewheel@gmail.com'
    charset = 'UTF-8'

    try:
        # Send the email using AWS SES
        response = ses_client.send_email(
            Destination={
                'ToAddresses': [recipient_email],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': charset,
                        'Data': body_text,
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender_email,
        )
        return {
            'statusCode': 200,
            'body': json.dumps(f'Email sent successfully!')
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Failed to send email: {e.response['Error']['Message']}")
        }
