package weaveandthewheel.requestModel

import kotlinx.serialization.Serializable

@Serializable
class RequestModel(val userId: String) {
    override fun toString(): String {
        return "RequestModel(userId=$userId)"
    }
}
