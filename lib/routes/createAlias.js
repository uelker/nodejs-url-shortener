'use strict';

function createAlias(database) {
    if(!database) {
        throw new Error('database is required');
    }

    return (req, res) => {
        const { alias, url } = req.body;

        database.createMapping(alias, url, err => {
            if(err) {
                return res.status(500).end();
            }
            res.status(201).end();
        });
    };
}

module.exports = createAlias;
