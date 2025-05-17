package weaveandthewheel.adapters

import aws.sdk.kotlin.services.dynamodb.model.QueryRequest
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse

/**
 * Interface for a wrapper around the DynamoDB client.
 * This interface defines the contract for querying user content from DynamoDB.
 */
interface DynamoClientWrapper {
    suspend fun queryUserContent(
        query: QueryRequest
    ): QueryResponse
}