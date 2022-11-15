const {tableName, dynamoDB} = require('../config/db.config')
const { v4: uuidv4 } = require('uuid');
const PartitionKey = 'TOUR';

const getAllTours = async () => {
    const params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
        },
    }

    try {
        const { Items = [] } = await dynamoDB.scan(params).promise()
        return {
            success: true,
            data: Items
        }

    } catch (error) {
        return {
            success: false,
            data: null
        }
    }
}

module.exports = {
    getAllTours
}