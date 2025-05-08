package testMocks

import aws.sdk.kotlin.services.s3.model.PutObjectRequest
import aws.smithy.kotlin.runtime.http.HttpMethod
import aws.smithy.kotlin.runtime.http.request.HttpRequest
import aws.smithy.kotlin.runtime.net.url.Url
import weaveandthewheel.adapters.S3ClientWrapper
import kotlin.time.Duration

class S3ClientStub: S3ClientWrapper {
    override suspend fun presignPutObject(input: PutObjectRequest, duration: Duration): HttpRequest {
        return HttpRequest(method = HttpMethod.PUT, url = Url.parse("https://example.com"))
    }
}
