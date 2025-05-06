package requestModel

import kotlinx.serialization.Serializable

@Serializable
class RequestModel(val fileName: String) {
    override fun toString(): String {
        return "RequestModel(fileName=$fileName)"
    }
}