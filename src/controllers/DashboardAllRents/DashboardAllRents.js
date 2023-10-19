const { Reservation, Users } = require("../../db");

const DashboardAllRents = async () => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Users,
          attributes: ["id"], 
        },
      ],
    });

    const monthlyStatistics = {};

    reservations.forEach((reservation) => {
      const month = reservation.month;
      const price = reservation.price;
      const userId = reservation.User.id; 

      if (!monthlyStatistics[month]) {
        monthlyStatistics[month] = {
          month,
          numberOfReservations: 0,
          totalReservationPrice: 0,
          userIds: [],
        };
      }

      monthlyStatistics[month].numberOfReservations += 1;
      monthlyStatistics[month].totalReservationPrice += price;
      monthlyStatistics[month].userIds.push(userId); 
    });

    const statisticsArray = Object.values(monthlyStatistics);

    return statisticsArray;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching statistics');
  }
};

module.exports = { DashboardAllRents };
