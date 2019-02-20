const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
var cors = require('cors');
var cookieParser = require('cookie-parser');
const app = express(conf);

var jwt = require(`jsonwebtoken`);
const bearerToken = require('express-bearer-token');
var bcrypt = require('bcryptjs');

const {User, Team, Token} = require('./sequelize');

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});


app.use(bearerToken());
app.use(bodyParser.json());

app.use(/\/api\/v1.0\/(logout|team|list|card|board|user|auth)(\/:action)?/, (req, resp, next) => {
	var token = req.token || req.query['token'];

	console.log(token, 'token');

	if (!token) return resp.status(401).send({auth: false, token: null});
	jwt.verify(token, conf.secret, function (err, decode) {
		if (err) return resp.status(500).send({auth: false, message: 'Failed to authenticate token.' });

		Token.findOne({where: {token}}).then(findToken => {
			if (!findToken) {
				return resp.status(401).send({auth: false, message: 'Failed to authenticate token.' });
			}
		});
		req.id = decode.id;
		req.token = token;
		next();
	});
});

require('./routes/register')(app, bcrypt);
require('./routes/auth')(app, conf, jwt, User, bcrypt, Token);
require('./routes/team')(app, User, Team);
require('./routes/board')(app);
require('./routes/user')(app, User);

app.listen(conf.port);
