const filterHomeByLocation= require('../../controllers/LocationC/Filterlocation')

const filterByLocHandler= async (req, res)=>{
    try {
        const {locationhome}= req.query
        const response= await filterHomeByLocation(locationhome)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports= filterByLocHandler;