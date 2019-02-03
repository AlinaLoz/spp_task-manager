const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/config");
const app = express(conf);
const {saltHashPassword, sha512} = require('./hash/saltHashPassword');

const {User, Task} = require('./sequelize');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

app.use('/api/v1.0/register', bodyParser.json());
app.use('/api/v1.0/update-password', bodyParser.json());
app.use('/api/v1.0/task-add', bodyParser.json());
app.use('/api/v1.0/task-delete', bodyParser.json());


app.get('/api/v1.0/login', (req, resp) => {
	const {login, password} = req.query;
	console.log(login);
	User.findOne({where: {login}}).then(user => {
		if (user) {
			const userData = sha512(password, user.dataValues.salt);
			if (user.dataValues.hash !== userData.hash) {
				resp.status(401);
				resp.send({message: "incorrect password"});
			} else {
				resp.status(200);
				resp.send({id: user.dataValues.id});
			}
		} else {
			resp.status(401);
			resp.send({message: "login isn't exist"});
		}
	});
});

app.post('/api/v1.0/register', (req, resp) => {
	const {login, password, confirmPassword} = req.body;

	User.findOne({where: {login}}).then(user => {
		if (user) {
			resp.send({data: {status: "error", message: "user exist"}});
		} else {
			if (password !== confirmPassword) {
				resp.send({data: {status: "error", message: "password and confirm password are not equal"}});
				return;
			}
			const userData = saltHashPassword(password);

			User.create({login, ...userData})
				.then(data => { resp.send({data: {status: "ok"}}); })
				.catch(err => { resp.send({data: {status: "error", message: "user exist"}}); });
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
	const {id} = req.query;
	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({status: "error", message: "user is not exist"});
		} else {
			const tasks = user.getTasks().then(tasks => {
				resp.send({status: "ok", tasks});
			});
		}
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

app.post('/api/v1.0/task-delete', (req, resp) => {
	const {text, id} = req.body;

	User.findById(parseInt(id)).then(user => {
		if (!user) {
			resp.send({status: "error", message: "user is not exist"});
		} else {
			Task.create({text})
				.then(task => {
					user.addTask(task)
						.then(_ => { resp.send({status: "ok"}); })
						.catch(error => {resp.send({code: 500, error})});
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
