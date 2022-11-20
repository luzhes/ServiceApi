const { tableName, dynamoDB } = require('../config/db.config')
const { v4: uuidv4 } = require('uuid');
const PartitionKey = 'CONCERT';

const getAllConcerts = async () => {
    const params = {
        TableName: tableName,
        FilterExpression: '#PK = :PK',
        ExpressionAttributeNames: {
            '#PK': 'id',
        },
        ExpressionAttributeValues: {
            ':PK': PartitionKey,
        }
    }

    try {
        const { Items = [] } = await dynamoDB.scan(params).promise()
        return { result: true, data: Items }
    } catch (error) {
        return { result: false, data: null }
    }
}

async function getConcertById(id) {
    const params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
            sortid: id
        },
    };
    try {
        const { Item = {} } = await dynamoDB.get(params).promise();
        return { result: true, data: Item };
    } catch (error) {
        return { result: false, data: null };
    }
}

async function registerConcert(bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: PartitionKey + '-' + uuidv4(),
            location: bodyRequest.location,
            date: bodyRequest.date,
            stadium: bodyRequest.stadium,
            tour: bodyRequest.tour,
        }
    }
    try {
        await dynamoDB.put(params).promise()
        return { result: true }
    } catch (error) {
        return { result: false }
    }
}

async function removeConcert(sortId) {
    var params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
            sortid: sortId
        }
    }

    try {
        await dynamoDB.delete(params).promise();
        return { result: true }
    } catch (err) {
        return { result: false }
    }
}

async function _updateConcert(sortId, bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: sortId,
            location: bodyRequest.location,
            date: bodyRequest.date,
            stadium: bodyRequest.stadium,
            tour: bodyRequest.tour
        }
    }
    try {
        await dynamoDB.put(params).promise()
        return { result: true }
    } catch (error) {
        return { result: false }
    }
}

module.exports = {
    getAllConcerts,
    registerConcert,
    getConcertById,
    removeConcert,
    _updateConcert
}