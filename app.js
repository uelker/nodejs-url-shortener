'use strict';

const http = require('http');
const getApp = require('./lib/getApp');
const database = require('./lib/database');

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/admin';
const port = process.env.PORT || 3_000;

database.initialize(connectionString, (err) => {
    if(err) {
        console.log('Error connecting to database');
        console.log(err);
        process.exit(1);
    }

    const app   = getApp();
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

