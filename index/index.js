'use strict';

const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";

const dbName = 'Productos';

module.exports = async function (context, req)
{
    context.log('JavaScript HTTP trigger function processed a request.');
    const client = new MongoClient(url);

    if (req.query.name || (req.body && req.body.name)) {
        try {
            await client.connect();
            context.log("Connected correctly to server");
            const db = client.db(dbName);
            let r = await db.collection('inserts').insertOne({ a: 1 });
            assert.equal(1, r.insertedCount);
        } catch (error) {
            context.res = {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};