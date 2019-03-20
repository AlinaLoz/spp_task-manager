const AuthUser = require('../models/mongo/user');

exports.get = function(req, resp) {
    const {token} = req.get;
    AuthUser.remove({token}, function (err, user) {
        if(err) return console.log(err);
        console.log('чел удален');
        resp.send(200, {status: "ok"});
    });
};