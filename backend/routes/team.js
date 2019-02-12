module.exports = function (app, User) {
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
};