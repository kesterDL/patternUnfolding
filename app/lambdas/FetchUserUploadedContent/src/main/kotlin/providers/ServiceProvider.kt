package weaveandthewheel.providers

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import weaveandthewheel.adapters.DynamoClientAdapter
import weaveandthewheel.adapters.DynamoClientWrapper
import weaveandthewheel.handlers.DynamoHandler
import weaveandthewheel.handlers.Handler

class ServiceProvider {
    /**
     * Singleton instance of the ServiceProvider.
     */
    companion object {
        private val instance: ServiceProvider = ServiceProvider()

        fun getInstance(): ServiceProvider {
            return instance
        }
    }
    /**
     * Private constructor to prevent instantiation.
     */
    private var dynamoDbClient: DynamoDbClient? = null
    private var dynamoClientAdapter: DynamoClientWrapper? = null
    private var dynamoHandler: Handler? = null

    /**
     * Returns the singleton instance of the DynamoDB client.
     *
     * @return The singleton instance of the DynamoDB client.
     */
    fun getDynamoDbClient(): DynamoDbClient {
        if (dynamoDbClient == null) {
            dynamoDbClient = DynamoDbClient {region = "us-east-1"}
        }
        return dynamoDbClient!!
    }
    /**
     * Returns the singleton instance of the DynamoHandler.
     *
     * @return The singleton instance of the DynamoHandler.
     */
    fun getDynamoHandler(): Handler {
        if (dynamoHandler == null) {
            dynamoHandler = DynamoHandler(getDynamoClientAdapter())
        }
        return dynamoHandler!!
    }
    /**
     * Returns the singleton instance of the DynamoClientAdapter.
     *
     * @return The singleton instance of the DynamoClientAdapter.
     */
    fun getDynamoClientAdapter(): DynamoClientWrapper {
        if (dynamoClientAdapter == null) {
            dynamoClientAdapter = DynamoClientAdapter(getDynamoDbClient())
        }
        return dynamoClientAdapter!!
    }

    // For test injection
    fun setDynamoDbClient(mock: DynamoDbClient) {
        dynamoDbClient = mock
    }
    fun setDynamoClientAdapter(mock: DynamoClientWrapper) {
        dynamoClientAdapter = mock
    }
    fun setDynamoHandler(mock: Handler) {
        dynamoHandler = mock
    }
}