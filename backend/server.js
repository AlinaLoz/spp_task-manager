const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
const app = express(conf);
const {saltHashPassword, sha512} = require('./hash/saltHashPassword');

const {User, Task} = require('./sequelize');

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

app.use('/api/v1.0/register', bodyParser.json());
// app.use('/api/v1.0/update-password', bodyParser.json());
app.use('/api/v1.0/task-add', bodyParser.json());
app.use('/api/v1.0/task-remove', bodyParser.json());
app.use('/api/v1.0/task-change', bodyParser.json());


app.get('/api/v1.0/login', (req, resp) => {
	const {login, password} = req.query;
	User.findOne({where: {login}}).then(user => {
		if (user) {
			const userData = sha512(password, user.dataValues.salt);
			if (user.dataValues.hash !== userData.hash) {
				resp.status(401);
				resp.send({data: {message: "incorrect password"}});
			} else {
				resp.status(200);
				resp.send({data: {id: user.dataValues.id}});
			}
		} else {
			resp.status(401);
			resp.send({data: {message: "login isn't exist"}});
		}
	});
});

app.post('/api/v1.0/register', (req, resp) => {
	const {login, password, confirmPassword} = req.body;

	User.findOne({where: {login}}).then(user => {
		if (user) {
			resp.status(400);
			resp.send({data: {message: "пользователь с таким логином уже существует"}});
		} else {
			if (password !== confirmPassword) {
				resp.status(400);
				resp.send({data: {message: "password and confirm password are not equal"}});
				return;
			}
			const userData = saltHashPassword(password);

			User.create({login, ...userData})
				.then(data => {
					resp.status(201);
					resp.send({data: {status: "ok"}});
				})
				.catch(err => {
					resp.status(400);
					resp.send({data: {message: "user exist"}});});
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

app.get('/api/v1.0/task-get', (req, resp) => {
	const {id} = req.query;
	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.status(400);
			resp.send({data: {message: "user is not exist"}});
		} else {
			const tasks = user.getTasks().then(tasks => {
				resp.status(200);
				resp.send({data: tasks});
			});
		}
	});
});

app.post('/api/v1.0/task-add', (req, resp) => {
	const {text, userId, theme} = req.body;

	User.findById(parseInt(userId)).then(user => {
		if (!user) {
			resp.status(400);
			resp.send({error: "user is not exist"});
		} else {
			Task.create({text, theme})
				.then(task => {
					user.addTask(task)
						.then(_ => {
							resp.status(200);
							resp.send({status: "ok"});
						})
						.catch(error => {
							resp.status(500);
							resp.send({error})
						});
				})
				.catch(error => {
					resp.status(500);
					resp.send({error});
				});
		}
	});
});

app.delete('/api/v1.0/task-remove', (req, resp) => {
	const {taskId} = req.body;

	Task.findById(parseInt(taskId))
		.then(task => {
			if (task) {
				task.destroy().then(_ => {
					resp.status(200);
					resp.end();
				});
			} else {
				resp.status(500);
				resp.end();
			}
		})
		.catch(error => {
			resp.status(400);
			resp.send({error});
		});
});

app.put('/api/v1.0/task-change', (req, resp) => {
	const {taskId, value} = req.body;

	Task.findById(parseInt(taskId)).then(task => {
		if (!task) {
			resp.status(400);
			resp.send({message: "task is not correct"});
		} else {
			task.update({text: value})
				.then(_ => {
					resp.status(200);
					resp.end();
				})
				.catch(err => {
					resp.status(500);
					resp.send({err});
				});
		}
	});
});

app.listen(conf.port);
