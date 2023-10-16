const {Property, Category, Location} = require('../../db');

const getAll = async(req, res) =>{
    const property = await Property.findAll({
        include:[
           { 
            model: Category,
            attribute: ["title"],
        }

        ]
    })
    return [...property]
}
const getAllByName = async(title) =>{
    const propertyName = await Property.findAll({
        where:{title},
            include:    [
                {model: Category,},
            ],
        
    },)
    return [...propertyName]
}
const getById = async (id) =>{
    const property = await Property.findByPk(id,{
       
        include: [
            {
                model: Category, Location, 
            attributes:['name'],
        },
        ],
    })
    console.log(property);
    return property
}
module.exports = {
    getAll,
    getAllByName,
    getById
}