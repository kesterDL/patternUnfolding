package testCloudStorageHandler

import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.presigners.presignPutObject
import aws.smithy.kotlin.runtime.http.HttpMethod
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import aws.smithy.kotlin.runtime.net.url.Url
import cloudStorageHandler.S3Handler
import io.mockk.coEvery
import io.mockk.mockk
import io.mockk.mockkStatic
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import requestModel.RequestModel
import utils.Constants
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds


class TestS3Handler {
    @Test
    fun `given expected values, createS3PutObjectRequest returns valid PutObjectRequest`() = runTest {
        // Arrange
        val s3Client = mockk<S3Client>()
        val s3Handler = S3Handler(s3Client = s3Client)
        // Act
        val request = s3Handler.createS3PutObjectRequest(
            s3bucket = Constants.WEAVE_AND_THE_WHEEL_PUBLIC_IMAGES,
            s3Key = "testKey/test",
            type = Constants.IMAGE_JPEG
        )
        // Assert
        assertEquals(request.key, "testKey/test")
        assertEquals(request.bucket, Constants.WEAVE_AND_THE_WHEEL_PUBLIC_IMAGES)
        assertEquals(request.contentType, Constants.IMAGE_JPEG)
    }

    @Test
    fun `given a valid expected call, getPresignedUrl returns valid PutObjectRequest`() = runTest {
        // Arrange
        mockkStatic("aws.sdk.kotlin.services.s3.presigners.PresignersKt")
        val s3Client: S3Client = mockk()
        val mockResponse = HttpRequest(method= HttpMethod.PUT, url = Url.parse("https://example.com"))
        coEvery { s3Client.presignPutObject(any(), any()) } returns mockResponse

        val s3Handler = S3Handler(s3Client)

        // Act
        val request = s3Handler.getPresignedUrl(requestModel = RequestModel(fileName="testFileName"), duration = 30.seconds)
        // Assert
        assertEquals(request, "https://example.com")
    }

}
