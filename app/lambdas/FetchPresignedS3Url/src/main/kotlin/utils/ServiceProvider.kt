package utils

import aws.sdk.kotlin.services.s3.S3Client
import cloudStorageHandler.S3Handler
import weaveandthewheel.adapters.S3ClientAdapter
import weaveandthewheel.adapters.S3ClientWrapper

object ServiceProvider {
    var s3Client =  S3Client { region = "us-east-1" }
    var s3ClientAdapter: S3ClientWrapper = S3ClientAdapter(s3Client = s3Client)
    var s3Handler = S3Handler(s3Client = s3ClientAdapter)
}