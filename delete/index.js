'use strict';

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
// const url = "mongodb://localhost:27017/"

const dbName = 'Productos';
const client = new MongoClient(url);

module.exports = async function (context, req)
{
    let mongoResponse;
    if (req.query.id || (req.body && req.body.id)) {
        try {
            await client.connect();
            context.log("Connected correctly to server for delete item");
            const db = client.db(dbName);
            mongoResponse = await db.collection('product').deleteOne({ 'id_product': req.query.id });
        } catch (error) {
            context.res = {
                status: 400,
                body: "Error has occurred"
            };
        };
        context.res = {
            status: 200,
            body: "Item was deleted",
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Missing parameters"
        };
    }
};