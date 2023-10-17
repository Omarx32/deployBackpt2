const { Reservation } = require("../../db");

const DashboardAllRents = async () => {
  try {
    const reservations = await Reservation.findAll();

    const monthlyStatistics = {};

    reservations.forEach((reservation) => {
      const month = reservation.month;
      const price = reservation.price;

      if (!monthlyStatistics[month]) {
        monthlyStatistics[month] = {
          month,
          numberOfReservations: 0,
          totalReservationPrice: 0,
          totalEarnings: 0,
        };
      }

      monthlyStatistics[month].numberOfReservations += 1;
      monthlyStatistics[month].totalReservationPrice += price;
      monthlyStatistics[month].totalEarnings += price;
    });

    const statisticsArray = Object.values(monthlyStatistics);

    return statisticsArray;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching statistics");
  }
};

module.exports = { DashboardAllRents };