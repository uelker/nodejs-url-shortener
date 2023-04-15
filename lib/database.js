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

        this.aliases.findOne({ alias }, (err, alias) => {
            if(err) {
                return callback(err);
            }
            if(!alias) {
                return callback(new Error('Alias not found'));
            }

            callback(null, alias);
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

        const aliasEntity = {
            id:crypto.randomUUID(),
            alias,
            url,
            statistics: {
                created: new Date().toISOString(),
                lastUsed: null,
                invoked: 0
            }
        };

        this.aliases.insertOne(aliasEntity, err => {
            if(err) {
                return callback(err);
            }
            callback(null);
        });
    },
    getAllAliases(callback) {
        this.aliases.find({},{ projection: { _id: 0 }}).sort({ 'statistics.invoked': -1 }).toArray((err, aliases) => {
            if(err) {
                return callback(err);
            }
            callback(null, aliases);
        });
    },
    updateStatistics(id, callback) {
        if(!id) {
            throw new Error('id is required');
        }
        if(!callback) {
            throw new Error('callback is required');
        }

        this.aliases.updateOne(
            { id },
            {$inc: {'statistics.invoked': 1}, $set: {'statistics.lastUsed': new Date().toISOString()}},
            err => {
                if(err) {
                    return callback(err);
                }
                callback(null);
            }
        );
    }
};

module.exports = database;
