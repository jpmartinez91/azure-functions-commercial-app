'use strict';

const MongoClient = require("mongodb").MongoClient;
const uuid = require('uuid')

const url = "mongodb://commercialdatabase:zjNeX5o3xCkiq3GTVJnACJXyoeVqx6XjQT6xanb7NcdDESvWEFyiGQsNXU7md8f0Dh5JlXUXxVIIRWfMRFRaNw%3D%3D@commercialdatabase.documents.azure.com:10255/?ssl=true";

const dbName = 'Productos';
const client = new MongoClient(url);
let db = null;

module.exports = async function (context, req)
{
    if (req.body) {
        if (db === null) {
            try {
                await client.connect();
                db = client.db(dbName);
            } catch (error) {
                context.log("Error with connection with mongoDB " + error.message);
                returnContext(400, "Error has occurred trying to connect with mongoDB");
            }
        }
        const timestamp = new Date().getTime();
        const info = {
            id_product: uuid.v1(),
            name_product: req.body.name_product,
            price_product: req.body.price_product,
            units_product: req.body.units_product,
            description_product: req.body.description_product,
            line_product: req.body.line_product,
            state_product: req.body.state_product,
            created: timestamp,
            updated: timestamp
        };
        let monoResponse;
        try {
            monoResponse = db.collection('product').insertOne(info);
            context.log(monoResponse);
        } catch (error) {
            context.log("Error with insertion task, " + error.message);
            returnContext(400, "Error has occurred with data insertion");
        }
        returnContext(200,
            {
                mas: "Item was created successfully",
            });
    }
    else {
        returnContext(400, "Missing parameters");
    }

    function returnContext(code, msg)
    {
        return context.res = {
            status: code,
            body: msg
        };
    }
};
