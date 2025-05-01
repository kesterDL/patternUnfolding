package weaveandthewheel.cataloger

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import weaveandthewheel.Cataloger
import weaveandthewheel.DynamoCataloger

object ServiceLocator {
    var cataloger: Cataloger = DynamoCataloger(ddbClient = DynamoDbClient { region = "us-east-1" })
}