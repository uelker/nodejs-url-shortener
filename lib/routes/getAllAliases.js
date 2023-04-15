'use strict';

function getAllAliases(database) {
    if(!database) {
        throw new Error('database is required');
    }

    return (req, res) => {
        database.getAllAliases( (err, mapping) => {
            if(err) {
                return res.status(500).end();
            }
            res.send(mapping);
        });
    };
}

module.exports = getAllAliases;
