module.exports = (sequelize, type) => {
	return sequelize.define('user', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		login: type.STRING,
		password: type.STRING,
		name: type.STRING
	});
};