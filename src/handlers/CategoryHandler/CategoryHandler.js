const { createCategory, getCategorys } = require('../../controllers/Category/Category');

const handleCreateCategory = async (req, res) => {
  try {
    // Llama al controlador para crear la categoría
    await createCategory(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear la locación' });
  }
};
const getCategories = async (req, res) =>{
  try {
    const response = await getCategorys()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({message: 'error', error})
  }
}
module.exports = {
  handleCreateCategory,
  getCategories
};