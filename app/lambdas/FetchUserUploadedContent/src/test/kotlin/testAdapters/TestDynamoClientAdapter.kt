package testAdapters

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.QueryRequest
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.test.runTest
import weaveandthewheel.adapters.DynamoClientAdapter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull

class TestDynamoClientAdapter {
    @Test
    fun `given a valid query request, expect a valid response from queryUserContent`() = runTest {
        // Arrange
        // Create a mock DynamoDbClient and a valid QueryRequest
         val mockDynamoDbClient = mockk<DynamoDbClient>()
        val dynamoClientAdapter = DynamoClientAdapter(mockDynamoDbClient)
         val queryRequest = QueryRequest {
             tableName = "testTable"
             keyConditionExpression = "id = :id"
             expressionAttributeValues = mapOf(":id" to AttributeValue.S("testId"))
         }
        coEvery { mockDynamoDbClient.query(queryRequest) } returns mockk()

        // Act
         val response = dynamoClientAdapter.queryUserContent(queryRequest)

        // Assert
        assertNotNull(response)
        assertEquals(QueryResponse::class.java, response::class.java)
    }

    @Test
    fun `given an AWS service exception, expect queryUserContent to throw the exception`() = runTest {
        // Arrange
        val mockDynamoDbClient = mockk<DynamoDbClient>()
        val dynamoClientAdapter = DynamoClientAdapter(mockDynamoDbClient)
        val queryRequest = QueryRequest {
            tableName = "testTable"
            keyConditionExpression = "id = :id"
        }

        coEvery { mockDynamoDbClient.query(queryRequest) } throws AwsServiceException("AWS service error")

        // Act & Assert
        assertFailsWith<AwsServiceException> {
            dynamoClientAdapter.queryUserContent(queryRequest)
        }
    }

    @Test
    fun `given an unexpected exception, expect queryUserContent to throw the exception`() = runTest {
        // Arrange
        val mockDynamoDbClient = mockk<DynamoDbClient>()
        val dynamoClientAdapter = DynamoClientAdapter(mockDynamoDbClient)
        val queryRequest = QueryRequest {
            tableName = "testTable"
            keyConditionExpression = "id = :id"
        }

        coEvery { mockDynamoDbClient.query(queryRequest) } throws RuntimeException("Unexpected error")

        // Act & Assert
        assertFailsWith<RuntimeException> {
            dynamoClientAdapter.queryUserContent(queryRequest)
        }
    }

}