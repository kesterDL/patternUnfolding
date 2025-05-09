package weaveandthewheel.adapters

import aws.sdk.kotlin.services.s3.model.PutObjectRequest
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import kotlin.time.Duration

/**
 * This interface is used to decouple the S3Client from the S3Handler, allowing for easier testing and mocking.
 */
interface S3ClientWrapper {
    suspend fun presignPutObject(input: PutObjectRequest, duration: Duration): HttpRequest
}
