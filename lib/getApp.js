'use strict';

const express = require('express');
const pino = require('pino-http');

function getApp() {
    const app = express();

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        })
    );

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    return app;
}
module.exports = getApp;
