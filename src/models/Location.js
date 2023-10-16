const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{ 
    sequelize.define(
        "Location",
        {
            id:{
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
              allowNull: false,  
            },
            direction:{
              type:DataTypes.STRING,
              allowNull: false,
            } 
                
        },
        {
            timestamps:  false
        }
    );
}