const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define(
        "Property",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,

            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            numBeds: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            numBaths: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nightPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            availability: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: true,
            },
            homeCapacity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }

        },
        {
            timestamps: false,
            freezeTableName: true,

        }
    );
}