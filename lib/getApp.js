'use strict';

const express = require('express');
const getLoggingConfig = require('./logging-configuration');
const routes = require('./routes');

function getApp(database) {
    if(!database) {
        throw new Error('database is required');
    }

    const app = express();
    const router = express.Router();

    app.use(
        getLoggingConfig()
    );
    app.use(express.json());
    app.use('/url-shortener/v1/', router);

    router.get('/aliases/:alias', routes.getAlias(database));

    router.post('/aliases', routes.createAlias(database));

    return app;
}
module.exports = getApp;
