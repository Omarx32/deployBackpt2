const {
    DashboardAllRents,
  } = require("../../controllers/DashboardAllRents/DashboardAllRents");
  
  exports.dashboardAllRentsHandler = async (req, res) => {
    try {
      const statistics = await DashboardAllRents();
      res.json(statistics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };