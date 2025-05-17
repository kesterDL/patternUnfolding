import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import io.mockk.*
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import weaveandthewheel.CatalogHandler
import weaveandthewheel.Cataloger
import weaveandthewheel.cataloger.ServiceLocator

class CatalogHandlerTest {
    private val originalCataloger = ServiceLocator.cataloger

    @BeforeEach
    fun setUp() {
        // Reset to the original cataloger before each test
        ServiceLocator.cataloger = originalCataloger
    }

    @AfterEach
    fun tearDown() {
        // Reset to the original cataloger after each test
        ServiceLocator.cataloger = originalCataloger
    }

    @Test
    fun `handler returns 200 when cataloging is successful`() = runTest {
        // Arrange
        val fakeInput =
                APIGatewayProxyRequestEvent()
                        .withBody(
                                """
        {
            "userId": "user5",
            "s3Key": "some/key",
            "title": "Test Title",
            "description": "test descripton",
            "contentType": "image"
        }
        """.trimIndent()
                        )

        val mockContext = mockk<Context>()
        val mockCataloger = mockk<Cataloger>()
        coEvery { mockCataloger.catalogContent(any()) } returns true

        // Inject the mock into the ServiceLocator
        ServiceLocator.cataloger = mockCataloger
        val handler = CatalogHandler()

        // Act
        val result = handler.handleRequest(fakeInput, mockContext)

        // Assert
        assert(result.statusCode == 200)
        assert(
                result.toString() ==
                        "{statusCode: 200,headers: {Access-Control-Allow-Origin=*},body: \"Content successfully cataloged\"}"
        )
    }

    @Test
    fun `handler returns 500 when cataloging fails`() = runTest {
        // Arrange
        val fakeInput =
                APIGatewayProxyRequestEvent()
                        .withBody(
                                """
    {
        "userId": "user4",
        "s3Key": "some/key",
        "title": "Test Title",
        "description": "test description",
        "contentType": "image"
    }
    """.trimIndent()
                        )

        val mockContext = mockk<Context>()
        val mockCataloger = mockk<Cataloger>()
        coEvery { mockCataloger.catalogContent(any()) } returns false

        // Override the ServiceLocator
        ServiceLocator.cataloger = mockCataloger

        val handler = CatalogHandler()

        // Act
        val result = handler.handleRequest(fakeInput, mockContext)
        // Assert
        assert(result.statusCode == 500)
        assert(result.body.contains("Failed to catalog:"))
    }
}
