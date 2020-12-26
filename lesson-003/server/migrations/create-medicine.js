module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('medicines', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DataTypes.FLOAT,
                allowNull: false,
            },
            images: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            details: {
                type: Sequelize.DataTypes.JSON,
                allowNull: true,
            },
            brandId: {
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
