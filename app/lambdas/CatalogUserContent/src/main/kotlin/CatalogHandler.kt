package weaveandthewheel

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import com.google.gson.Gson
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.*
import weaveandthewheel.cataloger.ServiceLocator
import weaveandthewheel.dataClasses.CatalogData

class CatalogHandler : RequestHandler<APIGatewayProxyRequestEvent?, APIGatewayProxyResponseEvent?> {
    private val corsHeaderMap: Map<String, String> =
            java.util.Map.of("Access-Control-Allow-Origin", "*")

    private fun toJson(src: Any?): String? {
        val gson = Gson()
        return gson.toJson(src)
    }

    private fun makeResponse(statusCode: Int, src: Any?): APIGatewayProxyResponseEvent =
            APIGatewayProxyResponseEvent()
                    .withStatusCode(statusCode)
                    .withHeaders(corsHeaderMap)
                    .withBody(toJson(src))
                    .withIsBase64Encoded(false)

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
            context: Context
    ): APIGatewayProxyResponseEvent = runBlocking {
        // Fetch the relevant data from the input into CatalogData
        val inputBody = input!!.body
        val catalogData: CatalogData = Json.decodeFromString<CatalogData>(inputBody)
        // Create Catalog Object
        val cataloger: Cataloger = ServiceLocator.cataloger
        // Call DynamoDB with all data to catalog the content to the user
        val result: Boolean = cataloger.catalogContent(catalogData)
        // Return the result of cataloging
        if (result) {
            return@runBlocking makeResponse(statusCode = 200, "Content successfully cataloged")
        } else {
            return@runBlocking makeResponse(statusCode = 500, "Failed to catalog: $input")
        }
    }
}
