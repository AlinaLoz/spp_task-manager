module.exports = (sequelize, type) => {
    return sequelize.define('board', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.TEXT,
            allowNull: false
        },
        ownerIsTeam: {
            type: type.BOOLEAN,
            allowNull: false,
        }
    });
};