const {User} = require('../lib/sequelize');

exports.get = function(req, resp) {
    const {login} = req.query;

    User.findOne({where: {login}})
        .then(user => {
            if (user) {
                resp.status(200).send({id:user.id, login: user.login});
            } else {
                resp.status(404).send({message: "user is not exist"});
            }})
        .catch(err => resp.status(404).end());
};
