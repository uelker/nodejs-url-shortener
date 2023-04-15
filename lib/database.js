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
            this.aliases = client.db(dbName).collection('aliases');
            callback(null);
        });
    },
    getAlias(alias, callback) {
        if(!alias) {
            throw new Error('alias is required');
        }
        if(!callback) {
            throw new Error('callback is required');
        }

        this.aliases.findOne({ alias }, (err, mapping) => {
            if(err) {
                return callback(err);
            }
            if(!mapping) {
                return callback(new Error('Alias not found'));
            }

            callback(null, mapping);
        });
    },
    createAlias(alias, url, callback) {
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

        this.aliases.insertOne(mapping, err => {
            if(err) {
                return callback(err);
            }
            callback(null);
        });
    },
    getAllAliases(callback) {
        this.aliases.find({}).toArray((err, aliases) => {
            if(err) {
                return callback(err);
            }
            callback(null, aliases);
        });
    }
};

module.exports = database;
