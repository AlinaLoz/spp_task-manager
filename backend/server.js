const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
const app = express(conf);

var jwt = require(`jsonwebtoken`);
const bearerToken = require('express-bearer-token');


var bcrypt = require('bcryptjs');

const {User, Team} = require('./sequelize');

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

app.use(bearerToken());


app.use(/^api\/v1.0\/(register|team|password|card).*/, bodyParser.json());

app.use('/api/v1.0/team/:action', bodyParser.json());

app.use('/api/v1.0/team(/:action)?', (req, resp, next) => {
	var token = req.token || req.headers['x-access-token'];

	if (!token) return resp.status(401).send({auth: false, token: null});

	jwt.verify(token, conf.secret, function (err, decode) {
		if (err) return resp.status(500).send({auth: false, message: 'Failed to authenticate token.' });
		req.id = decode.id;
		next();
	});
});

app.get('/api/v1.0/team', (req, resp) => {
	console.log(req.id);

	User.findByPk(parseInt(req.id))
		.then(user => {
			user.getTeams().then(teams => resp.status(200).send(teams));
		})
		.catch(err => {
			console.log(err);
			resp.status(401).end();
		});
});

app.post('/api/v1.0/team/add', (req, resp) => {
	const {name} = req.body;

	User.findByPk(parseInt(req.id))
		.then(user => {
			Team.findOne({where: {name}})
				.then(item => {
					if (item) return resp.status(400).send({message: "this team is eremovexist"});

					Team.create({name})
						.then(team => {
							user.addTeam(team)
								.then(user => resp.status(200).send({message: name}))
								.catch(err => resp.status(500).end());
						})
						.catch(err => resp.status(500).end());
				})
				.catch(_ => resp.status(500).end());
		})
		.catch(err => {
			console.log(err);
			return resp.status(401).end();
		});
});

app.delete('/api/v1.0/team/remove', (req, resp) => {
	const {name} = req.body;

	User.findByPk(parseInt(req.id))
		.then(user => {
			Team.findOne({where: {name}})
				.then(team => {
					if (!team) resp.status(400).send({message: "this team is not exist"});
					team.destroy().then(_ =>  resp.status(200).send({message: name}));
				})
				.catch(_ => resp.status(500).end());
		})
		.catch(err => {
			console.log(err);
			return resp.status(401).end();
		});
});

app.put('/api/v1.0/team/update', (req, resp) => {
	const {name, newName} = req.body;
	User.findByPk(parseInt(req.id))
		.then(user => {
			Team.findOne({where: {name}})
				.then(team => {
					if (!team) resp.status(400).send({message: "this team is not exist"});
					team.update({name: newName}).then(_ =>  resp.status(200).send({message: newName}));
				})
				.catch(_ => resp.status(500).end());
		})
		.catch(err => {
			console.log(err);
			return resp.status(401).end();
		});
});

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

// app.put('/api/v1.0/update-password', (req, resp) => {
// 	const {id, newPassword, confirmNewPassword} = req.body;
//
// 	User.findById(parseInt(id)).then(user => {
// 		if (!user) {
// 			resp.send({status: "error", message: "is is not correct"});
// 		} else {
// 			if (newPassword !== confirmNewPassword) {
// 				resp.send({status: "error", message: "password and confirm password are not equal"});
// 				return;
// 			}
// 			const userData = saltHashPassword(newPassword);
// 			user.update({...userData})
// 				.then(_ => { resp.send({status: "ok"}); });
// 		}
// 	});
// });

app.get('/api/v1.0/tasks', (req, resp) => {
	var token = req.headers['x-access-token'];

	if (!token) return resp.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, conf.secret, function(err, decoded) {
		if (err) return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		User.findById(parseInt(decoded.id)).then(user => {
			if (err) return resp.status(500).send("There was a problem finding the user.");
			const tasks = user.getTasks().then(tasks => {
				resp.send({status: "ok", tasks});
			});
		}).catch(err => resp.status(401).end());
	});


});

app.post('/api/v1.0/task-add', (req, resp) => {
	const {text, id} = req.body;

	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({status: "error", message: "user is not exist"});
		} else {
			Task.create({text})
				.then(task => {
					user.addTask(task)
						.then(_ => { resp.send({status: "ok"}); })
						.catch(error => {resp.send({status: "error", error})});
				})
				.catch(error => { resp.send({status: "error", error}); });
		}
	});
});


app.delete('/api/v1.0/task-delete', (req, resp) => {
	const {task_id, id} = req.body;

	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({status: "error", message: "user is not exist"});
		} else {
			Task.findById(parseInt(task_id))
				.then(task => {
					if (task) {
						task.destroy().then(_ => {resp.send({code: 200})});
					} else {
						resp.send({code: 500});
					}
				})
				.catch(error => {
					resp.send({code: 404});
				});
		}
	});
});


app.put('/api/v1.0/task-update', (req, resp) => {
	const {task_id, id, text} = req.body;

	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({code: 404, message: "user is not exist"});
		} else {
			Task.findById(parseInt(task_id))
				.then(task => {
					if (task) {
						if (task.dataValues === text) {
							resp.send({code: 200});
							return;
						}
						task.update().then(_ => {resp.send({code: 200})}).catch(resp.send({code: 500}));
					} else {
						resp.send({code: 404});
					}
				})
				.catch(error => {
					resp.send({code: 404});
				});
		}
	});
});

app.listen(conf.port);
