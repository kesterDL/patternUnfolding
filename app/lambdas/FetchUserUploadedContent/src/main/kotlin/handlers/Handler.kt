package weaveandthewheel.handlers

import aws.sdk.kotlin.services.dynamodb.model.QueryResponse

interface Handler {
    suspend fun fetchUserUploadedContent(userId: String): QueryResponse?
}