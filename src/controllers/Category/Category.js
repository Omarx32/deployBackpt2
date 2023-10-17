const { Category } = require("../../db");

const createCategory = async (req, res) => {
  try {
    // const categoryData = req.body.map(category => category.name); // Obtén solo los nombres de las categorías
    const categoryData = req.body; 

    const createdCategories = await Promise.all(
      categoryData.map(async (category) => {
        return await Category.create({ name: category });
      })
    );

    res.status(201).json(createdCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getCategorys = async() => {
  const categories = await Category.findAll();
  return categories;
}

module.exports = {
  createCategory,
  getCategorys
};