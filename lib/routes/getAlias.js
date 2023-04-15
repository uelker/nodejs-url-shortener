'use strict';

function getAlias(database) {
    if(!database) {
        throw new Error('database is required');
    }

    return (req, res) => {
        const alias = req.params.alias;

        database.getMapping(alias, (err, mapping) => {
            if(err) {
                return res.status(404).end();
            }
            res.redirect(mapping.url);
        });
    };
}

module.exports = getAlias;
