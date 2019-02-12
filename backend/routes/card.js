module.exports = function (app) {
    app.get('/api/v1.0/card', (req, resp) => {
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

    app.post('/api/v1.0/card/add', (req, resp) => {
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


    app.delete('/api/v1.0/card/remove', (req, resp) => {
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

    app.put('/api/v1.0/card/update', (req, resp) => {
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
};