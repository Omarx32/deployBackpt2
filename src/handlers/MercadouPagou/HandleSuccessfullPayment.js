// const registerSuccessfulPayment = require("../controllers/RegisterSuccessfulPayment");

const handleSuccessfulPayment = (req, res) => {
  try {
    res.redirect("https://pf-2-lavenganza-front-n8elcrgbq-migorriti.vercel.app/");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handleSuccessfulPayment;
