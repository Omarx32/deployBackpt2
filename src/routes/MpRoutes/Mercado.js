const express = require("express");
const router = express.Router();
const handlePlaceOrder = require("../../handlers/MercadouPagou/HandlePlaceOrder");
const handleSuccessfulPayment = require("../../handlers/MercadouPagou/HandleSuccessfullPayment");

router.post("/createpreference", handlePlaceOrder);
router.get("/success", handleSuccessfulPayment);
// router.get("/failure", handleFailureOrder);

module.exports = router;
