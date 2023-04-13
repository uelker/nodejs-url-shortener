'use strict';

const http = require('http');
const getApp = require('./lib/getApp');


const port = process.env.PORT || 3_000;
const app   = getApp();
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
