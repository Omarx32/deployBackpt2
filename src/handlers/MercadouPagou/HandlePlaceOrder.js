const placeOrder = require("../../controllers/Mercadopago/PlaceOrder");

const handlePlaceOrder = async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    const response = await placeOrder(items);
    return res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handlePlaceOrder;
