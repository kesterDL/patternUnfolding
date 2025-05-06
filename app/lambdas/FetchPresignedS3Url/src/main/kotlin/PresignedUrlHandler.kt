package weaveandthewheel

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import requestModel.RequestModel
import utils.GeneralUtils
import utils.ServiceProvider
import utils.Validator
import kotlin.time.Duration.Companion.seconds

class PresignedUrlHandler : RequestHandler<APIGatewayProxyRequestEvent?, APIGatewayProxyResponseEvent?>  {

    /**
     * Handles the incoming API Gateway request, processes the input data, and generates a response.
     *
     * @param input The API Gateway request event containing the input data. Must not be null and is
     * expected to have a valid JSON body.
     * @param context The AWS Lambda context object containing runtime information.
     * @return An API Gateway response event containing the processed response data, with HTTP
     * status code and headers included.
     */
    override fun handleRequest(
        input: APIGatewayProxyRequestEvent?,
        context: Context?
    ): APIGatewayProxyResponseEvent?  = runBlocking {
        // Fetch the relevant data from the input
        val inputBody = input!!.body
        val requestModel: RequestModel = Json.decodeFromString<RequestModel>(inputBody)
        val s3Handler= ServiceProvider.s3Handler

        val presignedUrl: String = s3Handler.getPresignedUrl(
            requestModel = requestModel,
            duration = 30L.seconds
        )

        val result = Validator.isValidUrl(urlString = presignedUrl)
        if (result) {
            val pathToImage = GeneralUtils.createS3Url(requestModel = requestModel)
            return@runBlocking GeneralUtils.makeResponse(statusCode = 200, presignedUrl, pathToImage)
        } else {
            return@runBlocking GeneralUtils.makeResponse(statusCode = 500, "Failed to generate upload url: $input")
        }
    }

}
