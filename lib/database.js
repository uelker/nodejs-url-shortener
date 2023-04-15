'use strict';

const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;

const database = {
    initialize( connectionString, callback) {
        if(!connectionString) {
            throw new Error('connectionString is required');
        }
        if(!callback) {
            throw new Error('callback is required');
        }

        MongoClient.connect(connectionString, (err, client) => {
            if (err) {
                return callback(err);
            }
            const dbName = connectionString.substring(connectionString.lastIndexOf('/') + 1);
            this.mappings = client.db(dbName).collection('aliases');
            callback(null);
        });
    },
    getMapping(alias, callback) {
        if(!alias) {
            throw new Error('alias is required');
        }
        if(!callback) {
            throw new Error('callback is required');
        }

        this.mappings.findOne({ alias }, (err, mapping) => {
            if(err) {
                return callback(err);
            }
            if(!mapping) {
                return callback(new Error('Alias not found'));
            }

            callback(null, mapping);
        });
    },
    createMapping(alias, url, callback) {
        if(!alias) {
            throw new Error('alias is required');
        }
        if(!url) {
            throw new Error('url is required');
        }
        if(!callback) {
            throw new Error('callback is required');
        }

        const mapping = {
            uuid:crypto.randomUUID(),
            alias,
            url,
            statistics: {
                created: Date.now(),
                lastUsed: null,
                invoked: 0
            }
        };

        this.mappings.insertOne(mapping, err => {
            if(err) {
                return callback(err);
            }
            callback(null);
        });
    }
};

module.exports = database;
