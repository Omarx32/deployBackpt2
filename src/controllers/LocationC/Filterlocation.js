const {Property, Location, Property_Location} = require("../../db");
const diacriticless = require("diacriticless");

const filterHomeByLocation = async (locationhome) => {
  try {
    const homeFilt = [];

    const homes = await Property.findAll();
    const locations= await Location.findAll();

    console.log(locations);
    console.log(homes);
    for (let i = 0; i < locations.length; i++) {
        locations[i].dataValues.secondName= diacriticless(locations[i].dataValues.direction);
    }

    
    const location= locations.find((loc)=>{
        if(
          loc.dataValues.direction===locationhome || 
          loc.dataValues.direction.toLowerCase()===locationhome.toLowerCase() ||
          loc.dataValues.direction.toUpperCase()===locationhome.toUpperCase() ||
          loc.dataValues.secondName===locationhome || 
          loc.dataValues.secondName.toLowerCase()===locationhome.toLowerCase() ||
          loc.dataValues.secondName.toUpperCase()===locationhome.toUpperCase()
          ){
            return loc;
        }
    })

    console.log(location);

    for(let i = 0; i < homes.length; i++){
        if(homes[i].dataValues.LocationId===location.dataValues.id){
          homeFilt.push(homes[i]);  
        }
    }

    for(let i = 0; i < homeFilt.length; i++){
        if(homeFilt[i].dataValues.LocationId===location.dataValues.id){
            homeFilt[i].dataValues.location=location.dataValues.direction;
        }
    }


    if (!homeFilt.length) {
      throw new Error("No hay propiedad ubicada en esta locación");
    }
    return homeFilt;
  } catch (error) {
    console.error(error);
    throw new Error("No se encontró la propiedad", error);
  }
};

module.exports = filterHomeByLocation;