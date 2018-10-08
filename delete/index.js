'use strict';
const mongo = require("mongodb")
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

// const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
const url = "mongodb://localhost:27017/"

const dbName = 'Productos';

module.exports = async function (context, req)
{
    const client = new MongoClient(url);
    let mongoResponse;
    context.log(req)
    if (req.query.id || (req.body && req.body.id)) {
        try {
            await client.connect();
            context.log("Connected correctly to server for delete item");
            const db = client.db(dbName);
            mongoResponse = await db.collection('product').deleteOne({ 'id_p': req.query.id })
            context.log(mongoResponse)
            // assert.equal(1, mongoResponse.deletedCount);
        } catch (error) {
            context.res = {
                status: 400,
                body: "Ocurrio un error al ejecutar la acción"
            };
        }
        context.res = {
            body: {
                message: "Hello " + (req.query.id || req.body.id),
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};