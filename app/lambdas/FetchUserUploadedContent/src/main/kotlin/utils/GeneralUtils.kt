package weaveandthewheel.utils

import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import com.google.gson.Gson

class GeneralUtils {
    companion object {
        val corsHeaderMap: Map<String, String> =
            java.util.Map.of("Access-Control-Allow-Origin", "*")

        fun toJson(src: Any?): String {
            val gson = Gson()
            return gson.toJson(src)
        }

        fun makeResponseBody(queryResponse: QueryResponse?): String {
            return toJson(
                queryResponse
            )
        }

        fun makeResponse(
            statusCode: Int,
            userContent: QueryResponse?
        ): APIGatewayProxyResponseEvent {
            return APIGatewayProxyResponseEvent()
                .withStatusCode(statusCode)
                .withHeaders(corsHeaderMap)
                .withBody(makeResponseBody(userContent))
                .withIsBase64Encoded(false)
        }
    }
}