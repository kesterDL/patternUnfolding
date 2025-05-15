import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import kotlinx.coroutines.test.runTest
import io.mockk.coEvery
import io.mockk.mockk
import testStubs.DynamoClientStub
import weaveandthewheel.FetchUserUploadedContent
import weaveandthewheel.adapters.DynamoClientAdapter
import weaveandthewheel.providers.ServiceProvider
import kotlin.test.Test
import kotlin.test.assertEquals

class TestFetchUserUploadedContent {
    @Test
    fun `handleRequest should return 500 when Response is Null`() = runTest {
        // Arrange
        val mockContext = mockk<Context>()
        val mockDynamoDbClient = mockk<DynamoDbClient>()
        val request = """{"userId":"12345"}"""

        val fetchUserUploadedContent = FetchUserUploadedContent()

        val apiRequest: APIGatewayProxyRequestEvent = APIGatewayProxyRequestEvent()
            .withBody(request)
            .withHttpMethod("POST")
            .withPath("/fetchUserUploadedContent")
            .withHeaders(mapOf("Content-Type" to "application/json"))

        val mockQueryResponse = QueryResponse {
            items = listOf(
                mapOf(
                    "SortKey" to AttributeValue.S("4177ac7c-438c-40c2-ab02-22fb02d37168"),
                    "type" to AttributeValue.S("image"),
                    "uploadDate" to AttributeValue.S("2023-10-01T12:00:00Z")
                )
            )
            count = 1
            scannedCount = 1
        }
        coEvery { mockDynamoDbClient.query(any()) } returns mockQueryResponse

        // Act
        val response = fetchUserUploadedContent.handleRequest(apiRequest, mockContext)

        // Assert
        assertEquals(500, response?.statusCode)
    }
}