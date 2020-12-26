module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            pending: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            userId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            medicineId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
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
