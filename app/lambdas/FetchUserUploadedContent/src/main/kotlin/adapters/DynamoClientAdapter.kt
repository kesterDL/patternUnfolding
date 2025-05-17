package weaveandthewheel.adapters

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.QueryRequest
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger(DynamoClientAdapter::class.java)

/**
 * Adapter for DynamoDB client to handle user content queries.
 */
class DynamoClientAdapter(private val ddbClient: DynamoDbClient) : DynamoClientWrapper {
    /**
     * Queries the DynamoDB table for user content based on the provided query request.
     *
     * @param query The query request containing the parameters for the query.
     * @return The response from the DynamoDB query.
     * @throws AwsServiceException If there is an error with the AWS service.
     * @throws Exception If there is an unexpected error.
     */
    override suspend fun queryUserContent(query: QueryRequest): QueryResponse {
        try {
            return ddbClient.query(query)
        } catch (e: AwsServiceException) {
            logger.error("AWS service error while querying dynamo table: ${e.message}", e)
            throw e
        } catch (e: Exception) {
            logger.error("Unexpected error while querying dynamo table: ${e.message}", e)
            throw e
        }
    }
}
