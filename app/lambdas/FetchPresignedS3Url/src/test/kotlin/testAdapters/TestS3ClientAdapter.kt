package testAdapters

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.model.PutObjectRequest
import aws.sdk.kotlin.services.s3.presigners.presignPutObject
import aws.smithy.kotlin.runtime.http.HttpMethod
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import aws.smithy.kotlin.runtime.net.url.Url
import cloudStorageHandler.S3Handler
import io.mockk.coEvery
import io.mockk.mockk
import io.mockk.mockkStatic
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import weaveandthewheel.adapters.S3ClientAdapter
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds

class TestS3ClientAdapter {

    @Test
    fun `given a valid expected call, getPresignedUrl returns valid PutObjectRequest`() = runTest {
        // Arrange
        mockkStatic("aws.sdk.kotlin.services.s3.presigners.PresignersKt")
        val s3Client: S3Client = mockk()
        val mockResponse = HttpRequest(method= HttpMethod.PUT, url = Url.parse("https://example.com"))
        coEvery { s3Client.presignPutObject(any(), any()) } returns mockResponse
        val s3Adapter = S3ClientAdapter(s3Client)
        val putObjectRequest: PutObjectRequest = PutObjectRequest {
            bucket = "test-bucket"
            key = "test-key"
            contentType = "image/jpeg"
        }

        // Act
        val request: HttpRequest = s3Adapter.presignPutObject(putObjectRequest, duration = 30L.seconds)
        // Assert
        assertEquals(request.url.toString(), "https://example.com")
    }


    @Test
    fun `presignPutObject throws AwsServiceException and logs error`() = runTest {
        mockkStatic("aws.sdk.kotlin.services.s3.presigners.PresignersKt")
        val s3Client: S3Client = mockk()
        val exception = AwsServiceException("AWS error")
        coEvery { s3Client.presignPutObject(any(), any()) } throws exception
        val s3Adapter = S3ClientAdapter(s3Client)
        val putObjectRequest: PutObjectRequest = PutObjectRequest {
            bucket = "test-bucket"
            key = "test-key"
            contentType = "image/jpeg"
        }
        assertThrows<AwsServiceException> {
            s3Adapter.presignPutObject(putObjectRequest, 30L.seconds)
        }
    }

    @Test
    fun `presignPutObject throws generic Exception and logs error`() = runTest {
        mockkStatic("aws.sdk.kotlin.services.s3.presigners.PresignersKt")
        val s3Client: S3Client = mockk()
        val exception = RuntimeException("Generic error")
        coEvery { s3Client.presignPutObject(any(), any()) } throws exception
        val s3Adapter = S3ClientAdapter(s3Client)
        val putObjectRequest: PutObjectRequest = PutObjectRequest {
            bucket = "test-bucket"
            key = "test-key"
            contentType = "image/jpeg"
        }
        assertThrows<RuntimeException> {
            runTest {
                s3Adapter.presignPutObject(putObjectRequest, 30L.seconds)
            }
        }
    }
}