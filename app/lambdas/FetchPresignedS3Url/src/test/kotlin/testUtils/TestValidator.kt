package testUtils

import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import utils.Validator
import kotlin.test.Test

class TestValidator {
    @Test
    fun `given valid URL, isValidUrl returns true`() {
        val url = "https://example.com"
        val result = Validator.isValidUrl(url)
        assertTrue(result)
    }

    @Test
    fun `given invalid URL, isValidUrl returns false`() {
        val invalidUrl = "ht!tp://not a url"
        val result = Validator.isValidUrl(invalidUrl)
        assertFalse(result)
    }
}