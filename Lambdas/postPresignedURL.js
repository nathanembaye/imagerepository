'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event, context, callback) => {
  const uploadURL = await getUploadURL(event)
  callback(null, uploadURL)
  
}

const getUploadURL = async function(event) {
  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpg`

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg'
  }
  

  console.log('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
  
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" }, 
    body: JSON.stringify({
    uploadURL: uploadURL,
    Key
    ,})
  }
  
}