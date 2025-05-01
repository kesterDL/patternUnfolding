package weaveandthewheel.utils

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class ContentType(val value: String) {
    @SerialName("image")
    IMAGE("image"),

    @SerialName("story")
    STORY("story"),

    @SerialName("audio")
    AUDIO("audio"),

    @SerialName("video")
    VIDEO("video");
}