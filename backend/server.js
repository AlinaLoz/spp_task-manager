const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
const app = express(conf);

var jwt = require(`jsonwebtoken`);
const bearerToken = require('express-bearer-token');
var bcrypt = require('bcryptjs');

const {User} = require('./sequelize');

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

app.use(bearerToken());

app.use(bodyParser.json());

app.use(/\/api\/v1.0\/(team|list|card|board)(\/:action)?/, (req, resp, next) => {
	var token = req.token || req.headers['x-access-token'];

	if (!token) return resp.status(401).send({auth: false, token: null});

	jwt.verify(token, conf.secret, function (err, decode) {
		if (err) return resp.status(500).send({auth: false, message: 'Failed to authenticate token.' });
		req.id = decode.id;
		next();
	});
});

require('./routes/register')(app);
require('./routes/auth')(app, conf, jwt, User, bcrypt);
require('./routes/team')(app, User);
require('./routes/board')(app);

app.listen(conf.port);
