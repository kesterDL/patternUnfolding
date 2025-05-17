package weaveandthewheel.cataloger

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import weaveandthewheel.Cataloger
import weaveandthewheel.DynamoCataloger

/**
 * ServiceLocator is a singleton object that provides access to shared resources.
 * It contains a DynamoDbClient and a Cataloger instance.
 */
object ServiceLocator {
    /**
     * A singleton instance of the DynamoDbClient.
     * This is used to interact with the DynamoDB service.
     */
    var ddbClient: DynamoDbClient = DynamoDbClient { region = "us-east-1" }
    /**
     * A singleton instance of the Cataloger interface.
     * This is used to decouple the cataloging logic from the rest of the application.
     */
    var cataloger: Cataloger = DynamoCataloger(ddbClient = ddbClient)
}