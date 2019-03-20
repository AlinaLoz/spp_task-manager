const jwt = require('jsonwebtoken');
const AuthUser = require('../models/mongo/user');
const conf = require('../config/config');

exports.post = function (req, resp) {
    const {refreshToken} = req.body;

    AuthUser.findOne({refreshToken}, function (err, data) {
        // this.disconnect();

        if(err) return resp.status(500);
        if (!data) return resp.status(401).send({auth: false, message: 'refresh token is wrong' });

        jwt.verify(refreshToken, conf.token.refreshSecret, function (err, decode) {
            //типо если просрочился
            if (err) return resp.status(403).send({auth: false, message: 'refresh token has expired' });

            const token = jwt.sign({ id: decode.id }, conf.token.secret, {expiresIn: conf.token.tokenLife});

            AuthUser.updateOne({refreshToken}, {token}, function (err, data) {
                if(err) return resp.status(500);
                console.log('token update', token);

                resp.status(200).send({data: {token}});
            });
        });
    });
};