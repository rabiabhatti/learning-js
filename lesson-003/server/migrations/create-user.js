module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            firstName: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.DataTypes.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface /* , Sequelize */) =>
        queryInterface.dropTable('users'),
}
