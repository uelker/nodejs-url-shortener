'use strict';

const pino = require('pino-http');

function getLoggingConfig() {
    return pino({
        transport: {
            target: 'pino-pretty',
        },
    });
}

module.exports = getLoggingConfig;
