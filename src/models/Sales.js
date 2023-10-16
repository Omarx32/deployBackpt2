const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define(
        "Sales",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Property: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Count: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            comision: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            amount: {  // Nuevo campo "cantidad"
                type: DataTypes.INTEGER,  // Tipo de dato para la cantidad (puede cambiar según tus necesidades)
                allowNull: false,  // Si la cantidad es obligatoria
            },
            clientId: {
                type: DataTypes.UUID,  
                allowNull: false,
              },
            dateSales: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            timestamps: false, 
          
        }
    );

    
};
