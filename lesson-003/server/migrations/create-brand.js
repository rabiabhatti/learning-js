module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('brands', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            medicineId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            genericId: {
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
        queryInterface.dropTable('brands'),
}
