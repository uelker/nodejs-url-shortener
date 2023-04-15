'use strict';

function getAllAliases(database) {
    if(!database) {
        throw new Error('database is required');
    }

    return (req, res) => {
        database.getAllAliases( (err, aliases) => {
            if(err) {
                return res.status(500).end();
            }
            res.send(aliases);
        });
    };
}

module.exports = getAllAliases;
