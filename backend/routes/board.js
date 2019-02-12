module.exports = function (app) {
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
};