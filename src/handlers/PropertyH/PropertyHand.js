const { getAll, getAllByName, getById } = require('../../controllers/PropertyC/PropertyCon')

const getProperty = async (req, res) => {
    const { title } = req.query; // Cambiar de req.query en lugar de req.body

    try {
        const response = title ? await getAllByName(title) : await getAll(); // Agregar await aquí
        res.status(200).json(response); // Cambiar el código de estado a 200
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Cambiar el mensaje de error
    }
}

const getPropertybyId = async (req, res )=>{
    const {id} = req.params;
    try {
        const response = await getById(id)
       console.log(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({message: 'Not Found', error})
    }
}

module.exports = {
    getProperty,
    getPropertybyId
};
