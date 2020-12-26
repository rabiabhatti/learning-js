module.exports = (sequelize, DataTypes) => {
    const Generic = sequelize.define(
        'generic',
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
    Generic.associate = (models) => {
        Generic.Brands = Generic.hasMany(models.brand)
        Generic.Medicines = Generic.hasMany(models.medicine)
    }
    return Generic
}
