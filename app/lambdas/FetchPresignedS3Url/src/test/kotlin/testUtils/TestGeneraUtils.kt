package testUtils

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import requestModel.RequestModel
import utils.GeneralUtils
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse


class TestGeneraUtils {
    @Test
    fun `test createS3Key`() {
        // Arrange
        val requestModel = RequestModel(fileName = "testFile.jpg")
        val expectedS3Key = "user-created-content/testFile.jpg"
        // Act
        val actualS3Key = GeneralUtils.createS3Key(requestModel)
        // Assert
        assertEquals(expectedS3Key, actualS3Key)
    }

    @Test
    fun `given a map of values, toJson returns a valid JSON string`() {
        // Arrange
        val map = mapOf("key1" to "value1", "key2" to "value2")
        val expectedJson = """{"key1":"value1","key2":"value2"}"""
        // Act
        val actualJson = GeneralUtils.toJson(map)
        // Assert
        assertEquals(expectedJson, actualJson)
    }

    @Test
    fun `given a RequestModel, createS3Url returns a valid S3 URL`() {
        // Arrange
        val requestModel = RequestModel(fileName = "testFile.jpg")
        val expectedS3Url = "https://weave-and-the-wheel-public-images.s3.amazonaws.com/user-created-content/testFile.jpg"
        // Act
        val actualS3Url = GeneralUtils.createS3Url(requestModel)
        // Assert
        assertEquals(expectedS3Url, actualS3Url)
    }

    @Test
    fun `given a RequestModel and a presigned URL, makeResponseBody returns a valid JSON string`() {
        // Arrange
        val requestModel = RequestModel(fileName = "testFile.jpg")
        val presignedUrl = "https://example.com/presigned-url"
        val expectedJson = """{"presignedUrl":"$presignedUrl","pathToImage":"${GeneralUtils.createS3Url(requestModel)}"}"""
        // Act
        val actualJson = GeneralUtils.makeResponseBody(presignedUrl, GeneralUtils.createS3Url(requestModel))
        // Assert
        assertEquals(expectedJson, actualJson)
    }

    @Test
    fun `makeResponse returns correct APIGatewayProxyResponseEvent`() {
        // Arrange
        val presignedUrl = "https://example.com/presigned-url"
        val requestModel = RequestModel(fileName = "testFile.jpg")
        val pathToImage = GeneralUtils.createS3Url(requestModel)
        val statusCode = 200

        // Act
        val response: APIGatewayProxyResponseEvent = GeneralUtils.makeResponse(statusCode, presignedUrl, pathToImage)

        // Assert
        assertEquals(statusCode, response.statusCode)
        assertEquals(mapOf("Access-Control-Allow-Origin" to "*"), response.headers)
        val expectedBody = GeneralUtils.makeResponseBody(presignedUrl, pathToImage)
        assertEquals(expectedBody, response.body)
        assertFalse(response.isBase64Encoded)
    }

    @Test
    fun `makeResponse returns Path Failed for url`() {
        // Arrange
        val presignedUrl = "Path Failed"
        val requestModel = RequestModel(fileName = "testFile.jpg")
        val pathToImage = "Path Failed"
        val statusCode = 200

        // Act
        val response: APIGatewayProxyResponseEvent = GeneralUtils.makeResponse(statusCode, presignedUrl)

        // Assert
        assertEquals(statusCode, response.statusCode)
        assertEquals(mapOf("Access-Control-Allow-Origin" to "*"), response.headers)
        val expectedBody = GeneralUtils.makeResponseBody(presignedUrl, pathToImage)
        assertEquals(expectedBody, response.body)
        assertFalse(response.isBase64Encoded)
    }

}