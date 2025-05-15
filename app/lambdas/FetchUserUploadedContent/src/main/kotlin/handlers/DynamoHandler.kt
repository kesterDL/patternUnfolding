package weaveandthewheel.handlers

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.QueryRequest
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import org.slf4j.LoggerFactory
import weaveandthewheel.adapters.DynamoClientWrapper
import weaveandthewheel.providers.ServiceProvider
import weaveandthewheel.utils.Constants

class DynamoHandler(private val dynamoClientAdapter: DynamoClientWrapper = ServiceProvider.getInstance().getDynamoClientAdapter()) {
    private val logger = LoggerFactory.getLogger(DynamoHandler::class.java)

    /**
     * Creates a query request to fetch all content for a given userId from the Content Table.
     *
     * @param userId The ID of the user whose content is to be fetched.
     * @return A QueryRequest object configured for the query.
     */
    fun createUserContentQuery(userId: String): QueryRequest {
        return QueryRequest {
            tableName = Constants.WEAVE_AND_THE_WHEEL_USER_CONTENT
            keyConditionExpression = Constants.SORT_KEY_TO_USER_ID
            expressionAttributeNames = mapOf("#${Constants.SORT_KEY}" to Constants.SORT_KEY)
            expressionAttributeValues = mapOf(":${Constants.USER_ID}" to AttributeValue.S(userId))
        }
    }

    fun createRecentContentByCategoryQuery(type: String): QueryRequest {
        return QueryRequest {
            tableName = Constants.WEAVE_AND_THE_WHEEL_USER_CONTENT
            indexName = Constants.TYPE_UPLOAD_DATE_INDEX // GSI name
            keyConditionExpression = "#${Constants.TYPE} = :${Constants.TYPE}"
            expressionAttributeNames = mapOf("#${Constants.TYPE}" to Constants.TYPE)
            expressionAttributeValues = mapOf(":${Constants.TYPE}" to AttributeValue.S(type))
            scanIndexForward = false // Descending order
            limit = 10 // Fetch only the 10 most recent items
        }
    }

    /**
     * Fetches user uploaded content from DynamoDB.
     *
     * @param userId The ID of the user whose content is to be fetched.
     * @return The content uploaded by the user.
     * @throws Exception If an error occurs during the query.
     */
    suspend fun fetchUserUploadedContent(userId: String): QueryResponse {
        return try {
            val response: QueryResponse = dynamoClientAdapter.queryUserContent(query = createUserContentQuery(userId = userId))
            response
        } catch (e: AwsServiceException) {
            logger.error("AWS service error while fetching user content for userId=$userId: ${e.message}", e)
            throw e
        } catch (e: Exception) {
            logger.error("Unexpected error while fetching user content for userId=$userId: ${e.message}", e)
            throw e
        }
    }

}
