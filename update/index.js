const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
// const url = "mongodb://localhost:27017/"
const dbName = 'Productos';
const client = new MongoClient(url);

module.exports = async function (context, req)
{
    let mongoExe;
    if (req.body) {
        const data = req.body;
        try {
            await client.connect();
            const db = client.db(dbName);
            mongoExe = await db.collection("product").update({ id_product: data.id_product }, {
                $set: {
                    name_product: data.name_product,
                    price_product: data.price_product,
                    units_product: data.units_product,
                    description_product: data.description_product,
                    line_product: data.line_product,
                    state_product: data.state_product
                }
            })
        } catch (error) {
            context.res = {
                status: 400,
                body: "Error has occurred"
            };
        }
        context.res = {
            status: 200, 
            body: "Item was updated",
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Missing parameters"
        };
    }
};