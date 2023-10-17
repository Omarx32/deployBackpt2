const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "PassAdmins",
      {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      es_administrador: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Aquí establecemos que este usuario es el administrador
      },
    },
    {
      timestamps: false,
    }
  );

};