module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('medicineOverviews', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            introduction: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            usage: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            composition: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            indication: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            dosage: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            storageConditions: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            sideEffects: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            safetyAdvices: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            quickTips: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            contraindications: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: true,
            },
            precaution: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            medicineId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface /* , Sequelize */) =>
        queryInterface.dropTable('medicineOverviews'),
}
