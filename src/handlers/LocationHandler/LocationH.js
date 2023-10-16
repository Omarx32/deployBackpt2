const {createLocation,getLocationC}= require('../../controllers/LocationC/Location');


const handleCreateLocation = async (req, res) => {
  try {
    await createLocation(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear la categoría' });
  }
};

const getLocation = async (req, res) =>{
  try {
    const response = await getLocationC()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({message: 'error', error})
  }
}

module.exports = {
  handleCreateLocation,
  getLocation
};