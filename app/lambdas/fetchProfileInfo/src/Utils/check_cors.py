import json
from typing import Optional

def check_cors_call(event) -> Optional[dict]:
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
    return None
