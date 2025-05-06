package cloudStorageHandler

import requestModel.RequestModel
import kotlin.time.Duration

interface CloudStorageHandler {
    suspend fun getPresignedUrl(requestModel: RequestModel, duration: Duration): String
}