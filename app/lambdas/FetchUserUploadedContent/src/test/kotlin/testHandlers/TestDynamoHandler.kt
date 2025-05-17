package testHandlers

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.test.runTest
import testStubs.DynamoClientStub
import weaveandthewheel.adapters.DynamoClientAdapter
import weaveandthewheel.adapters.DynamoClientWrapper
import weaveandthewheel.handlers.DynamoHandler
import weaveandthewheel.handlers.Handler
import weaveandthewheel.providers.ServiceProvider
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class TestDynamoHandler {
    @Test
    fun `given a valid userId, expect a valid query request`() {
        // Arrange
        val userId = "4177ac7c-438c-40c2-ab02-22fb02d37168"
        val ddbClient = mockk<DynamoDbClient>()
        val mockDynamoAdapter: DynamoClientWrapper = DynamoClientStub(ddbClient)
        val dynamoHandler = DynamoHandler(dynamoClientAdapter = mockDynamoAdapter)

        // Act
        val actualQueryRequest = dynamoHandler.createUserContentQuery(userId)

        // Assert
        assert(actualQueryRequest.tableName == "WeaveAndTheWheelUserContent")
        assert(actualQueryRequest.keyConditionExpression == "#PartitionKey = :userId")
        assert(actualQueryRequest.expressionAttributeNames.toString() == "{#PartitionKey=PartitionKey}")
        assert(actualQueryRequest.expressionAttributeValues.toString() == "{:userId=S(value=4177ac7c-438c-40c2-ab02-22fb02d37168)}")
    }

    @Test
    fun `given a valid type, expect a valid query request`() {
        // Arrange
        val type = "image"
        val ddbClient = mockk<DynamoDbClient>()
        val mockDynamoAdapter: DynamoClientWrapper = DynamoClientStub(ddbClient)
        val dynamoHandler = DynamoHandler(dynamoClientAdapter = mockDynamoAdapter)

        // Act
        val actualQueryRequest = dynamoHandler.createRecentContentByCategoryQuery(type)

        // Assert
        assert(actualQueryRequest.tableName == "WeaveAndTheWheelUserContent")
        assert(actualQueryRequest.indexName == "type-uploadDate-index")
        assert(actualQueryRequest.keyConditionExpression == "#type = :type")
        assert(actualQueryRequest.expressionAttributeNames.toString() == "{#type=type}")
        assert(actualQueryRequest.expressionAttributeValues.toString() == "{:type=S(value=image)}")
    }

    @Test
    fun `given a valid userId, expect a valid query response`() = runTest {
        // Arrange
        val userId = "4177ac7c-438c-40c2-ab02-22fb02d37168"
        val ddbClient = mockk<DynamoDbClient>()
        val mockDynamoAdapter: DynamoClientWrapper = DynamoClientStub(ddbClient)
        val dynamoHandler = DynamoHandler(dynamoClientAdapter = mockDynamoAdapter)

        // Act
        val actualQueryResponse: QueryResponse? = dynamoHandler.fetchUserUploadedContent(userId = userId)

        // Assert
        assertEquals(1, actualQueryResponse?.count)
        assertEquals(1, actualQueryResponse?.scannedCount)
        assertEquals("4177ac7c-438c-40c2-ab02-22fb02d37168", actualQueryResponse?.items?.get(0)?.get("SortKey")?.asS())
    }

    @Test
    fun `given an unexpected exception, expect fetchUserUploadedContent to throw the exception`() = runTest {
        // Arrange
        val userId = "4177ac7c-438c-40c2-ab02-22fb02d37168"
        val mockDynamoDbClient = mockk<DynamoDbClient>()
        val mockDynamoAdapter: DynamoClientWrapper = DynamoClientAdapter(mockDynamoDbClient)
        val dynamoHandler = DynamoHandler(dynamoClientAdapter = mockDynamoAdapter)

        coEvery { mockDynamoDbClient.query(any()) } throws RuntimeException("Unexpected error")

        // Act & Assert
        assertFailsWith<RuntimeException> {
            dynamoHandler.fetchUserUploadedContent(userId)
        }
    }

    @Test
    fun `given an AWS Service exception, expect fetchUserUploadedContent to throw the exception`() = runTest {
        // Arrange
        val userId = "4177ac7c-438c-40c2-ab02-22fb02d37168"
        val mockDynamoDbClient = mockk<DynamoDbClient>()
        val mockDynamoAdapter: DynamoClientWrapper = DynamoClientAdapter(mockDynamoDbClient)
        val dynamoHandler = DynamoHandler(dynamoClientAdapter = mockDynamoAdapter)

        coEvery { mockDynamoDbClient.query(any()) } throws AwsServiceException("AWS service error")

        // Act & Assert
        assertFailsWith<RuntimeException> {
            dynamoHandler.fetchUserUploadedContent(userId)
        }
    }

    @Test
    fun `create a DynamoHandler using default DynamoClientAdapter,  expect a DynamoClient is instantiated`() {
        // Arrange
        val dynamoHandler = DynamoHandler()
        // Act
        val dynamoClientAdapterField = DynamoHandler::class.java.getDeclaredField("dynamoClientAdapter")
        dynamoClientAdapterField.isAccessible = true
        val dynamoClientAdapter = dynamoClientAdapterField.get(dynamoHandler)

        // Assert
        assertTrue(dynamoClientAdapter is DynamoClientAdapter)
    }

    @Test
    fun `fetch an instance of DynamoHandler, expect a DynamoHandler instance is returned`() {
        // Arrange
        val serviceProvider = ServiceProvider.getInstance()
        // Act
        val dynamoHandler = serviceProvider.getDynamoHandler()

        // Assert
        assertTrue(dynamoHandler is Handler)
    }
}