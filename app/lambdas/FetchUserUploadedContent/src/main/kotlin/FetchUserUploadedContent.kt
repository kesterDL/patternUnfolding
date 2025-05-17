package weaveandthewheel

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import org.slf4j.LoggerFactory
import weaveandthewheel.providers.ServiceProvider
import weaveandthewheel.requestModel.RequestModel
import weaveandthewheel.utils.GeneralUtils

class FetchUserUploadedContent : RequestHandler<APIGatewayProxyRequestEvent?, APIGatewayProxyResponseEvent?> {
    override fun handleRequest(
        input: APIGatewayProxyRequestEvent?,
        context: Context?
    ): APIGatewayProxyResponseEvent? = runBlocking {

        try {
            // Fetch the relevant data from the input
            val inputBody = input!!.body
            println("Input body: $inputBody")
            val requestModel: RequestModel = Json.decodeFromString<RequestModel>(inputBody)
            println("Parsed RequestModel: $requestModel")
            val userId = requestModel.userId
            println("User ID: $userId")

            // Fetch the user uploaded content from DynamoDB
            val dynamoHandler = ServiceProvider.getInstance().getDynamoHandler()
            val queryResponse = dynamoHandler.fetchUserUploadedContent(userId)
            return@runBlocking GeneralUtils.makeResponse(statusCode=200, userContent = queryResponse)
        } catch (e: Exception) {
            // Log the error and return a failure response
            println("Error occurred: ${e.message}")
            return@runBlocking GeneralUtils.makeResponse(
                statusCode = 500,
                userContent = null
            )
        }
    }
}
