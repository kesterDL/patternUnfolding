package testStubs

import aws.sdk.kotlin.runtime.AwsServiceException
import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.QueryRequest
import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import weaveandthewheel.adapters.DynamoClientWrapper

/**
 * Stub implementation of the DynamoClientWrapper interface for testing purposes.
 * This class simulates the behavior of the DynamoDB client without making actual AWS calls.
 *
 * @param ddbClient The DynamoDbClient instance to be used for querying.
 */
class DynamoClientStub(private val ddbClient: DynamoDbClient) : DynamoClientWrapper {

        /**
         * Mocks the query of a DynamoDB table for user content for testing purposes.
         *
         * @param query The query request containing the parameters for the query.
         * @return MOCK response from the DynamoDB query.
         * @throws AwsServiceException If there is an error with the AWS service.
         * @throws Exception If there is an unexpected error.
         */
        override suspend fun queryUserContent(query: QueryRequest): QueryResponse {
            return QueryResponse {
                items = listOf(
                    mapOf(
                        "SortKey" to AttributeValue.S("4177ac7c-438c-40c2-ab02-22fb02d37168"),
                        "type" to AttributeValue.S("image"),
                        "uploadDate" to AttributeValue.S("2023-10-01T12:00:00Z")
                    )
                )
                count =  1
                scannedCount = 1
                lastEvaluatedKey = null
                consumedCapacity = null
            }
        }
}
