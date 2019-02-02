const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
const app = express(conf);
const {saltHashPassword, sha512} = require('./hash/saltHashPassword');

const {User} = require('./sequelize');

app.use('/api/v1.0/register', bodyParser.json());
app.use('/api/v1.0/update-password', bodyParser.json());

app.get('/api/v1.0/login', (req, resp) => {
	const {login, password} = req.query;
	User.findOne({where: {login}}).then(user => {
		if (user) {
			const userData = sha512(password, user.dataValues.salt);
			if (user.dataValues.hash !== userData.hash) {
				resp.send({status: "error", message: "password is wrong"});
			} else {
				resp.send({status: "ok", id: user.dataValues.id});
			}
		} else {
			resp.send({status: "error", message: "login is wrong"});
		}
	});
});

app.post('/api/v1.0/register', (req, resp) => {
	const {login, password, confirmPassword} = req.body;
	User.findOne({where: {login}}).then(user => {
		if (user) {
			resp.send({status: "error", message: "user exist"});
		} else {
			if (password !== confirmPassword) {
				resp.send({status: "error", message: "password and confirm password are not equal"});
				return;
			}
			const userData = saltHashPassword(password);

			User.create({login, ...userData})
				.then(data => { resp.send({status: "ok"}); })
				.catch(err => { resp.send({status: "error", message: "user exist"}); });
		}
	});
});


app.put('/api/v1.0/update-password', (req, resp) => {
	const {id, newPassword, confirmNewPassword} = req.body;

	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({status: "error", message: "is is not correct"});
		} else {
			if (newPassword !== confirmNewPassword) {
				resp.send({status: "error", message: "password and confirm password are not equal"});
				return;
			}
			const userData = saltHashPassword(newPassword);
			user.update({...userData})
				.then(_ => { resp.send({status: "ok"}); });
		}
	});
});


app.get('/api/v1.0/tasks', (req, resp) => {

});
app.listen(conf.port);
