'use strict';

const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const uuid = require('uuid')

const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
// const url = "mongodb://localhost:27017/"

const dbName = 'Productos';
const client = new MongoClient(url);
module.exports = async function (context, req)
{
    if (req.body) {
        const data = req.body;
        const timestamp = new Date().getTime();
        try {
            await client.connect();
            context.log("Connected correctly to server");
            const db = client.db(dbName);
            const info = {
                id_product: uuid.v1(),
                name_product: data.name_product,
                price_product: data.price_product,
                units_product: data.units_product,
                description_product: data.description_product,
                line_product: data.line_product,
                state_product: data.state_product,
                created: timestamp,
                updated: timestamp
            }
            let mongoResponse = await db.collection('product').insertOne(info);
            assert.equal(1, mongoResponse.insertedCount);
        } catch (error) {
            context.res = {
                status: 400,
                body: "Error has occurred"
            };
        }
        context.res = {
            status: 200,
            body: "Item was created"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Missing parameters"
        };
    }
};