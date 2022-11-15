const AWS = require('aws-sdk');
const { AwsConfig } = require('../config/credentials.config')
const tableName = 'TOUR_CONCERT';
AWS.config.update(AwsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient()
module.exports= {
    dynamoDB,
    tableName
}