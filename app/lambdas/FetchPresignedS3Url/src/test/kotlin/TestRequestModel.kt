import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Test
import requestModel.RequestModel
import kotlin.test.assertEquals

class TestRequestModel {
    @Test
    fun `constructor sets fileName correctly`() {
        val model = RequestModel("test.jpg")
        assertEquals("test.jpg", model.fileName)
    }

    @Test
    fun `toString returns expected format`() {
        val model = RequestModel("image.png")
        assertEquals("RequestModel(fileName=image.png)", model.toString())
    }

    @Test
    fun `can serialize and deserialize with kotlinx serialization`() {
        val model = RequestModel("file.txt")
        val json = Json.encodeToString(RequestModel.serializer(), model)
        val deserialized = Json.decodeFromString(RequestModel.serializer(), json)
        assertEquals(model.fileName, deserialized.fileName)
    }
}
