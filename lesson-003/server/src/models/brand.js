module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define(
        'brand',
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
        },
        {
            timestamps: true,
        }
    )
    Brand.associate = (models) => {
        Brand.Medicines = Brand.hasMany(models.medicine)
        Brand.Generics = Brand.hasMany(models.generic)
    }
    return Brand
}
