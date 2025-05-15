package testUtils

import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import weaveandthewheel.utils.GeneralUtils
import kotlin.test.Test
import kotlin.test.assertEquals

class TestGeneralUtils {
    @Test
    fun `given a valid map, expect toJson to return a valid Json string`() {
        // Arrange
        val testObject = mapOf("key" to "value")
        // Act
        val json = GeneralUtils.toJson(testObject)
        // Assert
        assert(json == """{"key":"value"}""")
    }

    @Test
    fun `given a valid QueryResponse, expect makeResponseBody to return a valid Json string`() {
        // Arrange
        val testQueryResponse = QueryResponse {
            items = listOf(
                mapOf(
                    "SortKey" to AttributeValue.S("4177ac7c-438c-40c2-ab02-22fb02d37168"),
                    "type" to AttributeValue.S("image"),
                    "uploadDate" to AttributeValue.S("2023-10-01T12:00:00Z")
                )
            )
            count =  1
            scannedCount = 1
        }
        // Act
        val json = GeneralUtils.makeResponseBody(testQueryResponse)
        // Assert
        assertEquals("""{"count":1,"items":[{"SortKey":{"value":"4177ac7c-438c-40c2-ab02-22fb02d37168"},"type":{"value":"image"},"uploadDate":{"value":"2023-10-01T12:00:00Z"}}],"scannedCount":1}""",
            json)
    }

    @Test
    fun `given a valid QueryResponse, expect makeResponse to return a valid APIGatewayProxyResponseEvent`() {
        // Arrange
        val testQueryResponse = QueryResponse {
            items = listOf(
                mapOf(
                    "SortKey" to AttributeValue.S("4177ac7c-438c-40c2-ab02-22fb02d37168"),
                    "type" to AttributeValue.S("image"),
                    "uploadDate" to AttributeValue.S("2023-10-01T12:00:00Z")
                )
            )
            count =  1
            scannedCount = 1
        }
        // Act
        val response = GeneralUtils.makeResponse(200, testQueryResponse)
        // Assert
        assert(response.statusCode == 200)
        assertEquals("""{"count":1,"items":[{"SortKey":{"value":"4177ac7c-438c-40c2-ab02-22fb02d37168"},"type":{"value":"image"},"uploadDate":{"value":"2023-10-01T12:00:00Z"}}],"scannedCount":1}""",
            response.body.toString())
    }
}