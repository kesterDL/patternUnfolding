import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.presigners.presignPutObject
import aws.smithy.kotlin.runtime.http.HttpMethod
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import aws.smithy.kotlin.runtime.net.url.Url
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import io.mockk.coEvery
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.mockkStatic
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import requestModel.RequestModel
import testMocks.S3ClientStub
import utils.GeneralUtils
import utils.ServiceProvider
import weaveandthewheel.PresignedUrlHandler
import weaveandthewheel.adapters.S3ClientWrapper


class TestPresignedUrlHandler {
    @Test
    fun `handleRequest returns 200 and correct body for valid presigned url`() = runTest {
        // Arrange
        val requestModel = RequestModel("test.jpg")
        val requestJson = Json.encodeToString(requestModel)
        val apiRequest = APIGatewayProxyRequestEvent().withBody(requestJson)
        val context = mockk<Context>()

        // Mock S3Client and S3Handler
        mockkStatic("aws.sdk.kotlin.services.s3.presigners.PresignersKt")
        val mockS3Client: S3ClientWrapper = S3ClientStub()
        val mockS3Handler = cloudStorageHandler.S3Handler(mockS3Client)

        // Mock ServiceProvider and inject mockS3Handler
        mockkObject(ServiceProvider)
        ServiceProvider.s3Handler = mockS3Handler

        val handler = PresignedUrlHandler()

        // Act
        val response = handler.handleRequest(apiRequest, context)

        // Assert
        assertEquals(200, response?.statusCode)
        val expectedBody = GeneralUtils.makeResponseBody(
            "https://example.com",
            GeneralUtils.createS3Url(requestModel)
        )
        assertEquals(expectedBody, response?.body)
    }

}