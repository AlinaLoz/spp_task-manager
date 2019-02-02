module.exports = (sequelize, type) => {
	return sequelize.define('user', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		login: type.STRING,
		salt: type.STRING,
		hash: type.STRING
	});
};