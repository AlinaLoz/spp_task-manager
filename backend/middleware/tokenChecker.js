const jwt = require('jsonwebtoken');
const conf = require('../config/config');
const AuthUser = require('../models/mongo/user');

module.exports = function (req, resp, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token)  return resp.status(403).send({auth: false, token: null});

    AuthUser.findOne({token}, function (err, data) {
        // this.disconnect();

        if(err) return resp.status(500);
        if (!data) return resp.status(401).send({auth: false, message: 'authenticate token шы цкщтп' });

        jwt.verify(token, conf.token.secret, function (err, decode) {
            //типо если просрочился
            if (err) return resp.status(403).send({auth: false, message: 'authenticate token has expired' });
            req.id = decode.id;
            req.token = token;
            next();
        });
    });
};