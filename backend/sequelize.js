const Sequelize = require('sequelize');
const conf = require('./config/db');
const UserModel = require('./models/user');
const TaskModel = require('./models/task');

const sequelize = new Sequelize("task_manager", "lozita", "651003", {
	host: "127.0.0.1",
	dialect: "mysql",
 	port: "3306",
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

