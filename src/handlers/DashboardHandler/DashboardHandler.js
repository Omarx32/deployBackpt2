const DashboardRent = require("../../controllers/DashboardAllRents/DashboardRent");

exports.getMonthlyStatistics = (req, res) => {
  const month = parseInt(req.params.month);
  DashboardRent.getMonthlyStatistics(req, res, month);
};