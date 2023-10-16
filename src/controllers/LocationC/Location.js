const { Location } = require("../../db");

const createLocation = async (req, res) => {

    const locationData = req.body; // Obtén el arreglo de locación desde el cuerpo de la solicitud

    // Itera sobre cada locación y crea una nueva entrada en la base de datos
    const createdLocations = await Promise.all(
      locationData.map(async (location) => {
        return await Location.create({ direction: location });
      })
    );

    res.status(201).json(createdLocations);
};

const getLocationC = async(req, res)=>{
  const location = await Location.findAll()
  return location
}




module.exports = {createLocation, getLocationC} 