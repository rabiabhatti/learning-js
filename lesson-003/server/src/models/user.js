module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notNull: true,
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                },
            },
            address: {
                type: DataTypes.TEXT,
                get() {
                    return JSON.parse(this.getDataValue('address'))
                },
                set(value) {
                    return this.setDataValue('address', JSON.stringify(value))
                },
            },
        },
        {
            timestamps: true,
        }
    )
    User.associate = (models) => {
        User.Orders = User.hasMany(models.Order)
    }
    return User
}
