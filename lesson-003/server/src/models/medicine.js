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
            catergory: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    )
    Medicine.associate = (models) => {
        Medicine.Brand = Medicine.belongsTo(models.brand, {
            foreignKey: 'brandId',
        })
        Medicine.Orders = Medicine.hasMany(models.order)
    }
    return Medicine
}
