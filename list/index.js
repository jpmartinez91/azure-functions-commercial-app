'use strict';

const MongoClient = require("mongodb")

const url = "mongodb://commercialdatabase:zjNeX5o3xCkiq3GTVJnACJXyoeVqx6XjQT6xanb7NcdDESvWEFyiGQsNXU7md8f0Dh5JlXUXxVIIRWfMRFRaNw==@commercialdatabase.documents.azure.com:10255/?ssl=true"
const dbName = 'Productos';
let client = null;

module.exports = function (context, req)
{
    if (client === null) {
        MongoClient.MongoClient.connect(url, function (error, connector)
        {
            if (error) {
                context.log('Failed to connect with mongodb ' + error.message);
                context.res = {
                    status: 500,
                    body: "An error hhas ocurred whit db connection " + error.message
                }
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
                context.log('Error whit find data, ' + error.message);
                context.res = {
                    status: 500,
                    body: "Task not performed"
                }
                return context.done();
            }
            context.res = {
                status: 200,
                body: docs
            };
            return context.done();
        });
    }
};
