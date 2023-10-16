const {getAll, getPropertyByName} = require("../../controllers/PropertyC/getAllProperty");


const getProperty = async (req, res) => {
  const {title} = req.query;
  try {
    const response = title ? await getPropertyByName(title) : await getAll()
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to create", error: error.message });
  }
};

module.exports = getProperty;