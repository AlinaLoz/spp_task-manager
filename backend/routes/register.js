const {User} = require('../sequelize');

module.exports = function(app) {
    app.post('/api/v1.0/register', (req, resp) => {
        const {login, password, confirmPassword} = req.body;

        User.findOne({where: {login}}).then((user) => {
            if (user) {
                resp.status(400).send({data: {status: "error", message: "user exist"}});
            } else {
                if (password !== confirmPassword) {
                    resp.status(400).send({data: {status: "error", message: "password and confirm password are not equal"}});
                    return;
                }

                var hashedPassword = bcrypt.hashSync(password, 8);

                User.create({login, password: hashedPassword})
                    .then(user => {
                        resp.send({message: "ok"});
                    })
                    .catch(err => { resp.status(500).send("There was a problem registering the user")});
            }
        });
    });
};