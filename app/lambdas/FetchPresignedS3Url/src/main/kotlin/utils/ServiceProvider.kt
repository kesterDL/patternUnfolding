package utils

import aws.sdk.kotlin.services.s3.S3Client
import cloudStorageHandler.S3Handler

object ServiceProvider {
    var s3Client =  S3Client { region = "us-east-1" }
    var s3Handler = S3Handler(s3Client = s3Client)
}