module.exports = function(app, conf, jwt, User, bcrypt, Token) {
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
                    resp.send(200, { auth: true, token: token });

                    Token.findOne({where: {userId: user.id}}).then(findToken => {
                        if (findToken) {
                            findToken.update({token});
                        } else {
                            Token.create({token}).then(token => user.setToken(token));
                        }
                    });
                } else {
                    resp.status(400).send({message: "user is not exist"});
                }})
            .catch(err => resp.status(401).end());
    });

    app.get('/api/v1.0/auth', (req, resp) => {
        resp.send(200, {auth: true});
    });

    app.get('/api/v1.0/logout', (req, resp) => {
        Token.findOne({where: {token: req.token}})
            .then(token => {
                console.log(token);
                token.destroy();
                resp.send(200, {status: "ok"});
            });
    });
};