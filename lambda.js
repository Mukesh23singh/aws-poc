var AWS = require('aws-sdk');
exports.handler = async (event) => {
    // TODO implement
    AWS.config.update({region:'us-west-2'});
    var dynamodb = new AWS.DynamoDB();
    const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-west-2'});
    const crypto = require("crypto");
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
        console.log('readFile')
        var params = { Bucket: "testing-poc-aws", Key: 'sample.json' };
        const data =  s3.getObject(params).promise();
        data.then(function(data){
            console.log(data)
        }).catch(function(err){
            console.log(err)
        })

        console.log('putData')
        const id = crypto.randomBytes(16).toString("hex");
        var params = {
            TableName: "testing",
            Item: {
                uuid: { S: id.toString() },
                name: { S: "Mukesh" }
            }
        }
    
        await dynamodb.putItem(params).promise();

};
