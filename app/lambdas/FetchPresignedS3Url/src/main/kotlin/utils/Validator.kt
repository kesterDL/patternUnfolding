package utils

import java.net.URI

class Validator {
    companion object {
        fun isValidUrl(urlString: String): Boolean {
            try {
                val url = URI.create(urlString).toURL()
                return true
            } catch (e: Exception) {
                return false
            }
        }
    }
}