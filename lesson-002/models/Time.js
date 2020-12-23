module.exports = (sequelize, DataTypes) => {
    const Time = sequelize.define(
        'time',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    )
    return Time
}
