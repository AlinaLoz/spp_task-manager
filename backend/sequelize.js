const Sequelize = require('sequelize');
const conf = require('./config/db');
const UserModel = require('./models/user');

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
	host: conf.host,
	dialect: conf.dialect,
	pool: {
		max: conf.pool.max
	}
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
	});

module.exports = {
	User
};

