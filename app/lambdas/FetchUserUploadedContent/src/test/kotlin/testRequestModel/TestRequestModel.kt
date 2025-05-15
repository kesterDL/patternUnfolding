package testRequestModel

import kotlinx.serialization.json.Json
import weaveandthewheel.requestModel.RequestModel
import kotlin.test.Test
import kotlin.test.assertEquals

class TestRequestModel {

    @Test
    fun `serialize RequestModel to JSON`() {
        // Arrange
        val requestModel = RequestModel(userId = "12345")

        // Act
        val json = Json.encodeToString(RequestModel.serializer(), requestModel)

        // Assert
        assertEquals("""{"userId":"12345"}""", json)
    }

    @Test
    fun `deserialize JSON to RequestModel`() {
        // Arrange
        val json = """{"userId":"12345"}"""

        // Act
        val requestModel = Json.decodeFromString(RequestModel.serializer(), json)

        // Assert
        assertEquals("12345", requestModel.userId)
    }

    @Test
    fun `test RequestModel toString`() {
        // Arrange
        val requestModel = RequestModel(userId = "12345")

        // Act
        val result = requestModel.toString()

        // Assert
        assertEquals("RequestModel(userId=12345)", result)
    }
}