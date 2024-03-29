module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('times', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
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
        queryInterface.dropTable('times'),
}
