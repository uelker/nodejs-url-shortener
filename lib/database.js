'use strict';

const MongoClient = require('mongodb').MongoClient;

const database = {
    initialize( connectionString, callback) {
        MongoClient.connect(connectionString, (err, db) => {
            if (err) {
                return callback(err);
            }
            this.connection = db;
            callback(null);
        });
    }
};

module.exports = database;
