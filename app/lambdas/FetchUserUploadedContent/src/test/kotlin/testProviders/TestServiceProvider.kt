package testProviders

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import weaveandthewheel.adapters.DynamoClientAdapter
import weaveandthewheel.handlers.Handler
import weaveandthewheel.providers.ServiceProvider
import kotlin.test.Test
import kotlin.test.assertTrue

class TestServiceProvider {

    @Test
    fun `fetch an instance of DynamoHandler, expect a DynamoHandler instance is returned`() {
        // Arrange
        val serviceProvider = ServiceProvider.getInstance()
        // Act
        val dynamoHandler = serviceProvider.getDynamoHandler()
        // Assert
        assertTrue(dynamoHandler is Handler)
    }

    @Test
    fun `fetch an instance of DynamoDbClient, expect a DynamoDbClient instance is returned`() {
        // Arrange
        val serviceProvider = ServiceProvider.getInstance()
        // Act
        val dynamoClient = serviceProvider.getDynamoDbClient()
        // Assert
        assertTrue(dynamoClient is DynamoDbClient)
    }

    @Test
    fun `fetch an instance of DynamoDbAdapter, expect a DynamoDbAdapter instance is returned`() {
        // Arrange
        val serviceProvider = ServiceProvider.getInstance()
        // Act
        val dynamoAdapter = serviceProvider.getDynamoClientAdapter()
        // Assert
        assertTrue(dynamoAdapter is DynamoClientAdapter)
    }
}