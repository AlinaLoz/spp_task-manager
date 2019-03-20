const Sequelize = require('sequelize');
const conf = require('../config/db');
const UserModel = require('../models/mysql/user').User;
const TeamModel = require('../models/mysql/team');
const BoardModel = require('../models/mysql/board');
// const TokenModel = require('../models/mysql/token');

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
	host: "127.0.0.1",
	dialect: conf.dialect,
 	port: "3306",
	pool: {
		max: conf.pool.max
	}
});

const User = UserModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Board = BoardModel(sequelize, Sequelize);
// const Token = TokenModel(sequelize, Sequelize);

User.belongsToMany(Team, {through: 'userteam' });
Team.belongsToMany(User, {through: 'userteam' });

User.hasMany(Board);
Team.hasMany(Board);
Board.belongsTo(User);
Board.belongsTo(Team);

// User.hasOne(Token);
// Token.belongsTo(User);

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
});

module.exports = {
	User,
	Team,
	Board
};

