const { Property, Category, Location } = require("../../db");

const getPropertyByName = async(title) => {
  const Properties = await Property.findAll({
    where: {title},
    include:[{model: Category, Location}]
  })
  return [...Properties]
}

const getAll = async (req, res) => {
    const Properties= await Property.findAll({
      include: [
        {
          model: Category,Location,
          attributes: ["name"],
        },
      ],
    });
  
    return [...Properties];
  };


  module.exports = {
    getAll,
    getPropertyByName
  };