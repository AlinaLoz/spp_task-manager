module.exports = function (app, User, Team) {
    app.get('/api/v1.0/team', (req, resp) => {
        User.findByPk(parseInt(req.id))
            .then(user => {
                user.getTeams().then(teams => resp.status(200).send(teams.map(team => ({
                    id: team.id,
                    name: team.name
                }))));
            })
            .catch(err => {
                console.log(err);
                resp.status(401).end();
            });
    });

    app.get('/api/v1.0/team/:id', (req, resp) => {
        console.log(parseInt(req.params.id));
        Team.findByPk(parseInt(req.params.id))
            .then( team => {
                User.findAll({
                    include: [{
                        model: Team,
                        where: { id: req.params.id }
                    }]
                }).then(users => {
                    const filterUsers = users.map(user => {return {id: user.id, login: user.login}});
                    resp.send(200, {team: {name: team.name, id: team.id, users: filterUsers}});
                });
            })
            .catch(err => {
                console.log(err);
                resp.status(500).end();
            });
    });

    app.post('/api/v1.0/team/add', (req, resp) => {
        const {name, users} = req.body;

        User.findByPk(parseInt(req.id))
            .then(user => {
                Team.findOne({where: {name}})
                    .then(item => {
                        if (item) return resp.status(400).send({message: "this team exist"});
                        Team.create({name})
                            .then(team => {
                                users.forEach(id => User.findByPk(id).then(user => user.addTeam(team)));
                                user.addTeam(team).then(user => resp.status(201).send({message: "team is created"}))
                            })
                            .catch(err => resp.status(500).end({messages: err}));
                    })
                    .catch(err => resp.status(500).end({messages: err}));
            })
            .catch(err => {
                console.log(err);
                return resp.status(401).end();
            });
    });

    app.delete('/api/v1.0/team/drop', (req, resp) => {
        const {id} = req.body;

        User.findByPk(parseInt(req.id))
            .then(user => {
                Team.findByPk(id)
                    .then(team => {
                        if (!team) resp.status(400).send({message: "this team is not exist"});
                        team.destroy().then(_ =>  resp.status(200).send({id, message: "team has been droped"}));
                    })
                    .catch(_ => resp.status(500).end());
            })
            .catch(err => {
                console.log(err);
                return resp.status(401).end();
            });
    });

    app.put('/api/v1.0/team/update', (req, resp) => {
        const {id, name} = req.body;
        Team.findByPk(parseInt(id))
            .then(team => {
                if (!team) resp.status(400).send({message: "this team is not exist"});
                team.update({name: name}).then(_ =>  resp.send(200, {message: "изменения сохранены"}));
            })
            .catch(_ => resp.send(500));
    });
};