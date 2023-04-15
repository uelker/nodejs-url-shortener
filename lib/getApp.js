'use strict';

const express = require('express');
const getLoggingConfig = require('./logging-configuration');

function getApp() {
    const app = express();

    app.use(
        getLoggingConfig()
    );

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    return app;
}
module.exports = getApp;
