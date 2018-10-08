const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const url = "mongodb://localhost:27017/"

const dbName = 'Productos';

module.exports = async function (context, req)
{
    const client = new MongoClient(url);
    let mongoExe;

    if (req.body) {
        const data = req.body;
        try {
            await client.connect();
            const db = client.db(dbName);
            mongoExe = await db.collection("product").update({ id_p: data.id_p }, {
                $set: {
                    name_product: data.name_product,
                    price_product: data.price_product,
                    units_product: data.units_product,
                    description_product: data.description_product,
                    line_product: data.line_product,
                    state_product: data.state_product
                }
            })
            context.log(mongoExe);

        } catch (error) {
            context.res = {
                status: 400,
                body: "Ocurrio un error al ejecutar la acción"
            };
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                mensaje: "Hello " + req.body,
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