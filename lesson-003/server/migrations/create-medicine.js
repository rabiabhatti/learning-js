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
            type: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            composition: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            catergory: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            strength: {
                type: Sequelize.DataTypes.STRING,
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
        queryInterface.dropTable('medicines'),
}
