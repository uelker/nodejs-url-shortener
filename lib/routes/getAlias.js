'use strict';

function getAlias(database) {
    if(!database) {
        throw new Error('database is required');
    }

    return (req, res) => {
        const alias = req.params.alias;

        database.getAlias(alias, (err, aliasEntity) => {
            if(err) {
                return res.status(404).end();
            }
            database.updateStatistics(aliasEntity.id, err => {
                if(err) {
                    return res.status(500).end();
                }
                res.redirect(aliasEntity.url);
            });
        });
    };
}

module.exports = getAlias;
