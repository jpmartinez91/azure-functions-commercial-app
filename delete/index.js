'use strict';

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/"

const dbName = 'Productos';
const client = new MongoClient(url);
let db = null;

module.exports = async function (context, req)
{
    if (req.query.id || (req.body && req.body.id)) {
        if (db === null) {
            try {
                await client.connect();
                db = client.db(dbName);
            } catch (error) {
                context.log("Error with connection with mongoDB " + error.message);
                returnContext(400, "Error has occurred trying to connect with mongoDB");
            }
        }
        try {
            db.collection('product').deleteOne({ 'id_product': req.query.id });
        } catch (error) {
            context.log("Error trying connect with mongodb " + error.message);
            returnContext(400, "Error has occurred")
        };
        returnContext(200, {
            msg: "Item was deleted",
            msg2: "algo"
        })
    }
    else {
        returnContext(400, "Missing parameters")
    }

    function returnContext(code, msg)
    {
        return context.res = {
            status: code,
            body: msg
        };
    }
};