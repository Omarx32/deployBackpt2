const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define(
    "UsersGoogle",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      givenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      isBanned: { // Agrega el campo isPublished
        type: DataTypes.BOOLEAN, // Será un booleano
        allowNull: true, // No puede estar vacío
        defaultValue: false, // Por defecto, las publicaciones estarán activas
      },
    },
    {
      timestamps: false,
    }
  );
};

