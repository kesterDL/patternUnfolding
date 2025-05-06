package utils

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import com.google.gson.Gson
import requestModel.RequestModel

class GeneralUtils {
    companion object {
        val corsHeaderMap: Map<String, String> =
            java.util.Map.of("Access-Control-Allow-Origin", "*")

        fun toJson(src: Any?): String? {
            val gson = Gson()
            return gson.toJson(src)
        }

        fun makeResponseBody(presignedUrl: String?, pathToImage: String?): String {
            return toJson(
                mapOf(
                    "presignedUrl" to presignedUrl,
                    "pathToImage" to pathToImage
                )
            )!!
        }

        fun makeResponse(statusCode: Int, presignedUrl: String?, pathToImage: String? = "Path Failed"): APIGatewayProxyResponseEvent {
            return APIGatewayProxyResponseEvent()
                .withStatusCode(statusCode)
                .withHeaders(corsHeaderMap)
                .withBody(makeResponseBody(presignedUrl, pathToImage))
                .withIsBase64Encoded(false)
        }

        fun createS3Key(requestModel: RequestModel): String {
            try {
                return "${Constants.USER_CREATED_CONTENT}/${requestModel.fileName}"
            } catch (e: Exception) {
                throw Exception("Failed to create S3 key: ${e.message}")
            }
        }

        fun createS3Url(requestModel: RequestModel): String {
            return "https://${Constants.WEAVE_AND_THE_WHEEL_PUBLIC_IMAGES}.s3.amazonaws.com/${createS3Key(requestModel)}"
        }
    }
}