module.exports = (sequelize, DataTypes) => {
    const Medicine = sequelize.define(
        'medicine',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            details: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    )
    Medicine.associate = (models) => {
        Medicine.User = Medicine.belongsTo(models.User)
        Medicine.Orders = Medicine.hasMany(models.Order)
    }
    return Medicine
}
