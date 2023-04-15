'use strict';

const http = require('http');
const getApp = require('./lib/getApp');
const database = require('./lib/database');
const loggingConfig = require('./lib/logging-configuration');
const logger = require('pino')(loggingConfig);

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/admin';
const port = process.env.PORT || 3_000;

database.initialize(connectionString, (err) => {
    if(err) {
        logger.info('Error connecting to database');
        logger.info(err);
        process.exit(1);
    }

    const app   = getApp(database);
    const server = http.createServer(app);

    server.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
});

