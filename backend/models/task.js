module.exports = (sequelize, type) => {
	return sequelize.define('task', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: type.INTEGER
		login: type.STRING,
		salt: type.STRING,
		hash: type.STRING
	});
};