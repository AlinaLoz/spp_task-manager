module.exports = function (app) {
  app.get('/api/v1.0/login', require('./login').get);
  app.post('/api/v1.0/register', require('./register').post);
  app.post('/api/v1.0/token', require('./token').post);

  app.use(require('../middleware/tokenChecker'));

  app.get('/api/v1.0/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
  });

  app.get('/api/v1.0/auth', require('./auth').get);
  app.get('/api/v1.0/logout', require('./logout').get);
  app.get('/api/v1.0/team', require('./team').get);
  app.get('/api/v1.0/team/:id', require('./team').getById);
  app.post('/api/v1.0/team/add', require('./team').teamAdd);
  app.delete('/api/v1.0/team/drop', require('./team').delete);
  app.put('/api/v1.0/team/update', require('./team').put);
  app.get('/api/v1.0/team/board', require('./board').get);
  app.get('/api/v1.0/user/check', require('./user').get);
};