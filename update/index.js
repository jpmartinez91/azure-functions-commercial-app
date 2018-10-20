const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const url = "mongodb://localhost:27017/"

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
        try {
            await db.collection("product").update({ id_product: req.body.id_product }, {
                $set: {
                    name_product: req.body.name_product,
                    price_product: req.body.price_product,
                    units_product: req.body.units_product,
                    description_product: req.body.description_product,
                    line_product: req.body.line_product,
                    state_product: req.body.state_product,
                    updated: timestamp
                }
            })
        } catch (error) {
            context.log("Error with update task, " + error.message);
            returnContext(400, "Error has occurred with data update");
        }
        returnContext(200,
            {
                mas: "Item was created successfully",
                menos: "oooo"
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