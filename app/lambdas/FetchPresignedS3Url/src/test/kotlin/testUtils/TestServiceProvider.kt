package testUtils

import cloudStorageHandler.S3Handler
import utils.ServiceProvider
import kotlin.test.Test

class TestServiceProvider {
    @Test
    fun testServiceProvider() {
        // Test the ServiceProvider class
        assert(ServiceProvider.s3Client != null) { "S3Handler should not be null" }
        assert(ServiceProvider.s3Handler != null) { "S3Handler should not be null" }
        assert(ServiceProvider.s3Handler is S3Handler )
    }
}