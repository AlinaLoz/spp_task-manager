const Sequelize = require('sequelize');
const conf = require('./config/db');
const UserModel = require('./models/user');
const TaskModel = require('./models/task');

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
	host: conf.host,
	dialect: conf.dialect,
	pool: {
		max: conf.pool.max
	}
});

const User = UserModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);

User.hasMany(Task);
Task.belongsTo(User);

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
	});



module.exports = {
	User,
	Task
};

