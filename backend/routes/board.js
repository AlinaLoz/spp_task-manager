const {User} = require('../lib/sequelize');

exports.get = function(req, resp) {
    console.log(req.id);

    User.findByPk(parseInt(req.id))
        .then(user => {
            user.getTeams().then(teams => resp.status(200).send(teams));
        })
        .catch(err => {
            console.log(err);
            resp.status(401).end();
        });
};