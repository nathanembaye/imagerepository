'use strict'

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3();


exports.handler = async (event) => {
    
    var key = event["queryStringParameters"]
    key = key["objectKey"]
    var params = { Bucket: process.env.UploadBucket, 
                   Key: key,
                   Expires: 600 };
                  
                  var url = await s3.getSignedUrl('getObject', params);
                  console.log('The URL is', url); // expires in 60 seconds
                  
                  const response = {
                            statusCode: 200,
                            headers: {
                                "Access-Control-Allow-Origin": "*"
                                    },
                        body: JSON.stringify({  "url": url }),
                                                                                                                                                       
                
                    };
    
    return response;
};

