package weaveandthewheel.dataClasses

import weaveandthewheel.utils.ContentType
import kotlinx.serialization.Serializable

@Serializable
data class CatalogData(
    val userId: String,
    val s3Key: String,
    val title: String,
    val description: String? = null,
    val contentType: ContentType
) {
    override fun toString(): String {
        return "CatalogData(userId='$userId', s3Key='$s3Key', title='$title', description='$description', contentType='$contentType')"
    }
}
