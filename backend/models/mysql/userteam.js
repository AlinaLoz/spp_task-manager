module.exports = (sequelize, type) => {
	return sequelize.define('userteam', {
		role: type.STRING
	});
};