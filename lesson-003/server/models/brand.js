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
        Brand.Generics = Brand.hasMany(models.Generic)
        Brand.Medicine = Brand.hasMany(models.Medicine)
    }
    return Brand
}
