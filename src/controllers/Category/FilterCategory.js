const {Property, Category, Property_Category} = require("../../db");
const diacriticless = require("diacriticless");

const filterHomeByCategory = async (categoryhome) => {
  try {
    const homeFilt = [];

    const homes = await Property.findAll();
    const categories= await Category.findAll();

    console.log(categories);
    console.log(homes);
    for (let i = 0; i < categories.length; i++) {
        categories[i].dataValues.secondName= diacriticless(categories[i].dataValues.name);
    }

    
    const category= categories.find((cat)=>{
        if(          
          cat.dataValues.name===categoryhome || 
          cat.dataValues.name.toLowerCase()===categoryhome.toLowerCase() ||
          cat.dataValues.name.toUpperCase()===categoryhome.toUpperCase() ||
          cat.dataValues.secondName===categoryhome || 
          cat.dataValues.secondName.toLowerCase()===categoryhome.toLowerCase() ||
          cat.dataValues.secondName.toUpperCase()===categoryhome.toUpperCase()
          ){

            return cat;
        }
    })

    console.log(category);

    for(let i = 0; i < homes.length; i++){
        if(homes[i].dataValues.CategoryId===category.dataValues.id){
          homeFilt.push(homes[i]);  
        }
    }

    for(let i = 0; i < homeFilt.length; i++){
        if(homeFilt[i].dataValues.CategoryId===category.dataValues.id){
            homeFilt[i].dataValues.category=category.dataValues.name;
        }
    }


    if (!homeFilt.length) {
      throw new Error("No hay propiedad de tal categoría");
    }
    return homeFilt;
  } catch (error) {
    console.error(error);
    throw new Error("No se encontró la propiedad", error);
  }
};

module.exports = filterHomeByCategory;