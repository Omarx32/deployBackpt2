const express = require("express");
const {
  getMonthlyStatistics,
} = require("../../handlers/DashboardHandler/DashboardHandler");
const {
  dashboardAllRentsHandler,
} = require("../../handlers/DashboardAllRentsH/DashnoardAllRentsH");
const router = express.Router();

router.get("/statistics/:month", getMonthlyStatistics);
router.get("/Allstatistics", dashboardAllRentsHandler);

module.exports = router;