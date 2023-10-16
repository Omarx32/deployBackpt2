const filterHomeByCategory= require("../../controllers/Category/FilterCategory")

const filterByCatHandler = async (req, res) => {
  try {
    const { categoryhome } = req.query;
    const response = await filterHomeByCategory(categoryhome);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports= filterByCatHandler;