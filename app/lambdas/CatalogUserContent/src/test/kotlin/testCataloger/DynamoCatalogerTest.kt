package testCataloger

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.PutItemRequest
import aws.sdk.kotlin.services.dynamodb.model.PutItemResponse
import aws.sdk.kotlin.services.dynamodb.model.UpdateItemRequest
import aws.sdk.kotlin.services.dynamodb.model.UpdateItemResponse
import org.junit.jupiter.api.Test
import kotlinx.coroutines.test.runTest
import io.mockk.coEvery
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import weaveandthewheel.DynamoCataloger
import weaveandthewheel.dataClasses.CatalogData
import weaveandthewheel.utils.ContentType

class DynamoCatalogerTest {

    @Test
    fun `given successful update and put, catalogContent returns true`() = runTest { //runTest allows for testing suspend fun
        // Arrange
        val mockClient = mockk<DynamoDbClient>()
        val dynamoCataloger = DynamoCataloger(mockClient)
        val catalogData = CatalogData(
            userId = "user123",
            title = "Cool Image",
            contentType = ContentType.IMAGE,
            s3Key = "testKey/num1",
            description = "what a description!"
        )
        val mockResponse = UpdateItemResponse {}
        val putMockResponse = PutItemResponse {}
        coEvery { mockClient.updateItem(any()) } returns mockResponse
        coEvery { mockClient.putItem(any()) } returns putMockResponse
        // Act
        val result = dynamoCataloger.catalogContent(catalogData)
        // Assert
        assertEquals(true, result)
    }

    @Test
    fun `given expected inputs, return valid PutItemRequest`() = runTest {
        // Arrange
        val userId = "user123"
        val title = "Cool Image"
        val dynamoCataloger = DynamoCataloger(mockk<DynamoDbClient>())
        val catalogData = CatalogData(
            userId = "user123",
            title = "Cool Image",
            contentType = ContentType.IMAGE,
            s3Key = "testKey/num1",
            description = "what a description!"
        )

        // Act
        val request: PutItemRequest = dynamoCataloger.buildPutItemRequest(catalogData = catalogData, contentId = "num1", uploadTime = "2021-01-01")

        // Assert
        assertEquals(userId, request.item!!.getValue("SortKey").asS())
        assertEquals(title, request.item!!.getValue("title").asS())
    }

    @Test
    fun `updateItem should return expected response`() = runTest {
        // Arrange
        val mockClient = mockk<DynamoDbClient>()
        val cataloger = DynamoCataloger(mockClient)
        val mockRequest = UpdateItemRequest { /* fill as needed */ }
        val mockResponse = UpdateItemResponse {}
        coEvery { mockClient.updateItem(mockRequest) } returns mockResponse

        // Act
        val response = cataloger.updateItem(mockRequest)

        // Assert
        assertEquals(mockResponse, response)
    }

    @Test
    fun `given expected inputs, return valid UpdateItemRequest`() = runTest {
        // Arrange
        val dynamoCataloger = DynamoCataloger(mockk<DynamoDbClient>())
        val catalogData = CatalogData(
            userId = "user123",
            title = "Cool Image",
            contentType = ContentType.IMAGE,
            s3Key = "testKey/num1",
            description = "what a description!"
        )
        // Act
        val updateRequest: UpdateItemRequest = dynamoCataloger.buildUpdateItemRequest(catalogData = catalogData, contentId = "num1")
        // Assert
        assertEquals(AttributeValue.L(listOf(AttributeValue.S("num1"))), updateRequest.expressionAttributeValues!![":new_content"])
    }
}
