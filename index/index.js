'use strict';

const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const uuid = require('uuid')

// const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
const url = "mongodb://localhost:27017/"

const dbName = 'Productos';

module.exports = async function (context, req)
{
    const client = new MongoClient(url);
    let mongoResponse;
    if (req.body) {
        const data = req.body;
        try {
            await client.connect();
            context.log("Connected correctly to server");
            const db = client.db(dbName);
            const info = {
                id_p: uuid.v1(),
                name_product: data.name_product,
                price_product: data.price_product,
                units_product: data.units_product,
                description_product: data.description_product,
                line_product: data.line_product,
                state_product: data.state_product
            }
            mongoResponse = await db.collection('product').insertOne(info);
            context.log(mongoResponse)
            assert.equal(1, mongoResponse.insertedCount);
        } catch (error) {
            context.res = {
                status: 400,
                body: "Ocurrio un error al ejecutar la acción"
            };
        }
        context.res = {
            status: 200,
            headers: { 'content-type': 'application/json' },
            body: {
                id: mongoResponse.insertedId,
                mesaje: "salida con existo",
                data: "exito"
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