// const registerSuccessfulPayment = require("../controllers/RegisterSuccessfulPayment");

const handleSuccessfulPayment = (req, res) => {
  try {
    res.redirect("http://localhost:5173");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handleSuccessfulPayment;
