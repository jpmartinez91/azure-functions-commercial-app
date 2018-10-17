'use strict';

const MongoClient = require("mongodb")

const url = "mongodb://productstesis:cCQgl1FCF0Phuud89Gf7hS8kqdzERaShnWjonjEGyxL1Ln24HnoRAMQFCGr7ePhQfytpqODy3OicMQEE7HgXGA%3D%3D@productstesis.documents.azure.com:10255/?ssl=true";
// const url = "mongodb://localhost:27017/"

const dbName = 'Productos';

let client = null;

module.exports = function (context, req)
{
    let hasClient = client != null;
    if (client === null) {
        MongoClient.MongoClient.connect(url, function (error, connector)
        {
            if (error) {
                context.log('Failed to connect with mongodb');
                context.res = { status: 500, body: res.stack }
                return context.done();
            }
            client = connector;
            query()
        });
    } else {
        query()
    }

    function query()
    {
        client.db(dbName).collection('product').find().toArray(function (error, docs)
        {
            if (error) {
                context.log('Error type ' + error.message);
                context.res = { 
                    status: 500, 
                    body: res.stack 
                }
                return context.done();
            }
            context.log('Success!');
            context.res = {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: docs
            };
            context.done();
        });
    }
};


