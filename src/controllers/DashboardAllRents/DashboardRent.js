const { Reservation } = require("../../db");

exports.getMonthlyStatistics = async (req, res) => {
  try {
    const month = parseInt(req.params.month);

    const reservations = await Reservation.findAll({
      where: { month }, // Filtrar por el mes
    });

    const numberOfReservations = reservations.length;
    const totalReservationPrice = reservations.reduce(
      (total, reservation) => total + reservation.price,
      0
    );
    const totalEarnings = totalReservationPrice;

    const statistics = {
      numberOfReservations,
      totalReservationPrice,
      totalEarnings,
    };

    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};