// src/test/kotlin/testStubs/DynamoHandlerStub.kt
package testStubs

import aws.sdk.kotlin.services.dynamodb.model.QueryResponse
import weaveandthewheel.handlers.DynamoHandler
import weaveandthewheel.handlers.Handler

class DynamoHandlerStub(
    private val response: QueryResponse? = null,
    private val shouldThrow: Boolean = false
) : Handler {
    override suspend fun fetchUserUploadedContent(userId: String): QueryResponse? {
        if (shouldThrow) throw RuntimeException("Stub error")
        return response
    }
}