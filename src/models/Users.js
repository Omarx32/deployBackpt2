const { DataTypes, ValidationError } = require("sequelize");

module.exports = (sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("Admin", "Usuario", "UserRent"),
        allowNull: true,
        defaultValue: "Usuario",
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
    }
  );

  // Método estático para buscar un cliente por su ID
  Users.findByClientId = async (clientId) => {
    try {
      const user = await Users.findOne({
        where: {
          id: clientId,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Error al buscar el cliente por ID");
    }
  };

  return Users;
};