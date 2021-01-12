module.exports = (sequelize, DataTypes) => {
    const Overview = sequelize.define(
        'medicineOverview',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            introduction: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            usage: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            composition: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            dosage: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            indication: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            precaution: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            storageConditions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            sideEffects: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            safetyAdvices: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            quickTips: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            contraindications: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    )
    Overview.associate = (models) => {
        Overview.Medicine = Overview.belongsTo(models.medicine, {
            foreignKey: 'medicineId',
        })
    }
    return Overview
}
