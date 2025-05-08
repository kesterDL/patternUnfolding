package cloudStorageHandler

import aws.sdk.kotlin.services.s3.model.PutObjectRequest
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import requestModel.RequestModel
import utils.Constants
import utils.GeneralUtils.Companion.createS3Key
import utils.ServiceProvider
import weaveandthewheel.adapters.S3ClientWrapper
import kotlin.time.Duration

class S3Handler(private val s3Client: S3ClientWrapper = ServiceProvider.s3ClientAdapter): CloudStorageHandler {

    fun createS3PutObjectRequest(s3bucket: String, s3Key: String, type: String): PutObjectRequest {
        return PutObjectRequest {
            bucket = s3bucket
            key = s3Key
            contentType = type
        }
    }

    override suspend fun getPresignedUrl(requestModel: RequestModel, duration: Duration): String {
        val putRequest: PutObjectRequest = createS3PutObjectRequest(
            s3bucket=Constants.WEAVE_AND_THE_WHEEL_PUBLIC_IMAGES,
            s3Key=createS3Key(requestModel),
            type= Constants.IMAGE_JPEG
        )
        val presignedRequest: HttpRequest = s3Client.presignPutObject(input = putRequest, duration= duration)
        return presignedRequest.url.toString()
    }

}
