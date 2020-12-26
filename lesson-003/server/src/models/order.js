module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'order',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            pending: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
        }
    )
    Order.associate = (models) => {
        Order.User = Order.belongsTo(models.user)
        Order.Medicines = Order.hasMany(models.medicine)
    }
    return Order
}
