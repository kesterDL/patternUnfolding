package weaveandthewheel.adapters

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.s3.S3Client
import aws.sdk.kotlin.services.s3.model.PutObjectRequest
import aws.sdk.kotlin.services.s3.presigners.presignPutObject
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import kotlin.time.Duration
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger(S3ClientAdapter::class.java)

class S3ClientAdapter(private val s3Client: S3Client =  S3Client { region = "us-east-1" }) : S3ClientWrapper {
    override suspend fun presignPutObject(input: PutObjectRequest, duration: Duration): HttpRequest {
        try {
            return s3Client.presignPutObject(input, duration)
        } catch (e: AwsServiceException) {
            logger.error("AWS service error while presigning S3 PUT object: ${e.message}", e)
            throw e
        } catch (e: Exception) {
            logger.error("Unexpected error while presigning S3 PUT object: ${e.message}", e)
            throw e
        }
    }
}