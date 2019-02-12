module.exports = function(app, conf, jwt, User, bcrypt) {
    app.get('/api/v1.0/login', (req, resp) => {
        const {login, password} = req.query;

        User.findOne({where: {login}})
            .then(user => {
                if (user) {
                    var passwordIsValid = bcrypt.compareSync( password, user.password);

                    if (!passwordIsValid) return resp.status(401).send({ auth: false, token: null });
                    var token = jwt.sign({ id: user.id }, conf.secret, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({ auth: true, token: token });
                } else {
                    resp.status(400).send({message: "user is not exist"});
                }})
            .catch(err => resp.status(401).end());
    });
};