const Sequelize = require('sequelize');
const conf = require('./config/db');
const UserModel = require('./models/user');
const TeamModel = require('./models/team');
const BoardModel = require('./models/board');
const TokenModel = require('./models/token');

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
	host: conf.host,
	dialect: conf.dialect,
 	port: conf.port,
	pool: {
		max: conf.pool.max
	}
});

const User = UserModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Board = BoardModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

User.belongsToMany(Team, {through: 'userteam' });
Team.belongsToMany(User, {through: 'userteam' });

User.hasMany(Board);
Team.hasMany(Board);
Board.belongsTo(User);
Board.belongsTo(Team);

User.hasOne(Token);
Token.belongsTo(User);

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
});

module.exports = {
	User,
	Team,
	Board,
    Token
};

