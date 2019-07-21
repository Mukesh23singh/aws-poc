/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */


// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-enable-long-polling.html

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('/Users/mukesh/.aws/config.json');
// Create the SQS service object
var sqs = new AWS.SQS();
var s3 = new AWS.S3();
var sns = new AWS.SNS();
var queueURL = "https://sqs.us-west-2.amazonaws.com/075877375100/testing";
var s3URL = "https://testing-poc-aws.s3.amazonaws.com/";

var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    WaitTimeSeconds: 20
};

sqs.receiveMessage(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});

const uploadFile = () => {
    fs.readFile('./sample.json', (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'testing-poc-aws', // pass your bucket name
            Key: 'sample.json', // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    });
};

uploadFile();

var params = {
    TargetArn: 'arn:aws:sns:us-west-2:075877375100:testing',
    Message: 'Success!!! ',
    Subject: 'TestSNS'
};

sns.publish(params, function (err, data) {
    if (err) {
        console.log('Error sending a message', err);
    } else {
        console.log('Sent message:', data.MessageId);
    }
});