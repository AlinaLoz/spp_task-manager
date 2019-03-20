const {ConfirmPasswordError, InteractionDBError, UserExistError} = require("../models/mysql/user");
const {User} = require('../lib/sequelize');

exports.post = function(req, resp) {
    const {login, password, confirmPassword} = req.body;

    User.register(login, password, confirmPassword)
        .then(_ => resp.send(200, {message: "ok"}))
        .catch(err => {
            if (err instanceof UserExistError) {
                resp.status(400).send({data: {status: "error", message: err.message}});
            }
            if (err instanceof ConfirmPasswordError) {
                resp.status(400).send({data: {status: "error", message: err.message}});
            }

            if (err instanceof InteractionDBError) {
                resp.status(500).send({data: {status: "error", message: err.message}});
            }
        });
};