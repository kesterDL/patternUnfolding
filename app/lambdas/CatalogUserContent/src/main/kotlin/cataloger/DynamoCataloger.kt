package weaveandthewheel

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.*
import org.jetbrains.annotations.VisibleForTesting
import weaveandthewheel.dataClasses.CatalogData
import weaveandthewheel.utils.Constants
import java.util.UUID
import kotlin.collections.HashMap
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

private const val update_new_content = "SET #sc = list_append(if_not_exists(#sc, :empty_list), :new_content)"

public class DynamoCataloger(private val ddbClient: DynamoDbClient): Cataloger {

    override suspend fun catalogContent(catalogData: CatalogData): Boolean {
        try {
            val contentId: String = generateUuid()
            val timestamp: String = generateDate()

            val newItem: PutItemResponse = addContentToCatalog(catalogData = catalogData, contentId = contentId, uploadTime = timestamp)
            val addedToUser: UpdateItemResponse = addContentToUser(catalogData = catalogData, contentId = contentId)
//            println("Content added to user $addedToUser, and DynamoDB: $newItem.")
            return true
        } catch (e: Exception) {
            throw Exception("Failed to catalog content: ${e.message}")
        }
    }

    private fun generateUuid(): String {
        return UUID.randomUUID().toString()
    }

    private fun generateDate(): String {
        val current = LocalDateTime.now()
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        return current.format(formatter)
    }

    @Throws(Exception::class)
    @VisibleForTesting
    internal suspend fun addContentToCatalog(catalogData: CatalogData, contentId: String, uploadTime: String): PutItemResponse {
        // Build the item to be added to the DynamoDB table
        val request = buildPutItemRequest(catalogData = catalogData, contentId = contentId, uploadTime = uploadTime)
        return addNewItem(putItemRequest = request)
    }

    @VisibleForTesting
    internal fun buildPutItemRequest(catalogData: CatalogData, contentId: String, uploadTime: String): PutItemRequest {
        // Build the item to be added to the DynamoDB table
        val contentInfo = mapOf(
            "PartitionKey" to AttributeValue.S(contentId),
            "SortKey" to AttributeValue.S(catalogData.userId),
            "uploadDate" to AttributeValue.S(uploadTime),
            "title" to AttributeValue.S(catalogData.title),
            "description" to AttributeValue.S(catalogData.description ?: ""),
            "type" to AttributeValue.S(catalogData.contentType.value),
            "location" to AttributeValue.S(catalogData.s3Key)
        )

        return PutItemRequest {
            tableName = Constants.WEAVE_AND_THE_WHEEL_USER_CONTENT
            item = contentInfo
        }

    }

    @VisibleForTesting
    internal suspend fun buildUpdateItemRequest(catalogData: CatalogData, contentId: String): UpdateItemRequest {
        // Specify the item key.
        val keyMap: MutableMap<String, AttributeValue> = HashMap()
        keyMap[Constants.PARTITION_KEY] = AttributeValue.S(catalogData.userId)

        val attributeNames: MutableMap<String, String> = HashMap()
        attributeNames["#sc"] = "shared_content"

        // Create a map to hold the update expression attributes.
        val expressionAttributeValuesMap: MutableMap<String, AttributeValue> = HashMap()
        expressionAttributeValuesMap[":new_content"] = AttributeValue.L(listOf(AttributeValue.S(contentId)))
        expressionAttributeValuesMap[":empty_list"] = AttributeValue.L(emptyList())

        // Specify the update item request with an expression.
        return UpdateItemRequest {
            tableName = Constants.WEAVE_AND_THE_WHEEL_PROFILES
            key = keyMap
            updateExpression = update_new_content
            expressionAttributeNames = attributeNames
            expressionAttributeValues = expressionAttributeValuesMap
        }
    }

    private suspend fun addContentToUser(catalogData: CatalogData, contentId: String): UpdateItemResponse {
        val request = buildUpdateItemRequest(catalogData = catalogData, contentId = contentId)
        return updateItem(updateRequest = request)
    }

    @VisibleForTesting
    internal suspend fun updateItem(updateRequest: UpdateItemRequest): UpdateItemResponse {
        try {
            // Update the item in the table.
            return ddbClient.updateItem(updateRequest)
        } catch (e: DynamoDbException) {
            println("❌ Failed to update item: ${e.message}")
            throw e // Re-throw or handle gracefully based on use case
        } catch (e: Exception) {
            println("❌ Unexpected error during update: ${e.message}")
            throw e
        }
    }

    private suspend fun addNewItem(putItemRequest: PutItemRequest): PutItemResponse {
        try {
            val result: PutItemResponse = ddbClient.putItem(putItemRequest)
            println(" A new item was placed into a table.")
            return result
        } catch (e: DynamoDbException) {
            println("❌ Failed to update item: ${e.message}")
            throw e // Re-throw or handle gracefully based on use case
        } catch (e: Exception) {
            println("❌ Unexpected error during update: ${e.message}")
            throw e
        }
    }
}