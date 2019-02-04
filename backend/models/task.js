module.exports = (sequelize, type) => {
	return sequelize.define('task', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		text: type.TEXT,
		theme: type.TEXT
	});
};