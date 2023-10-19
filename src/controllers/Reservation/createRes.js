const { Property, Reservation, Users, UsersGoogle } = require("../../db");

const createReservation = async (
  month,
  numHuespedes,
  idHome,
  email,
  password
) => {
  console.log(month);
  console.log(numHuespedes);
  console.log(idHome);
  console.log(email);
  console.log(password);
  if (!month || !numHuespedes || !idHome || !email) {
    throw new Error("Missing required data");
  }
  const reservaciones= await Reservation.findAll();
  const resHome = await Property.findByPk(idHome);
  const price = resHome.dataValues.nightPrice;
  const newRes = { month, price, numHuespedes };
  
  for(let i = 0; i < reservaciones.length; i++){
    if(reservaciones[i].dataValues.month===month && reservaciones[i].dataValues.PropertyId===idHome){
      throw new Error("Esta casa ya está reservada este mes")
    }
  }
  
  const createRes = await Reservation.create(newRes);

  await createRes.setProperty(resHome);

  if (email && !password) {
    const userGoogle = await UsersGoogle.findOne({
      where: { email },
    });
    if (userGoogle) {
      await createRes.setUsersGoogle(userGoogle);
    } else {
      throw new Error("Esta renta no pertenece a ningún usuario");
    }
  }
  if (email && password) {
    const user = await Users.findOne({
      where: { email, password },
    });
    if (user) {
      await createRes.setUser(user);
    } else {
      throw new Error("Esta renta no pertenece a ningún usuario");
    }
  }

  return createRes;
};

const getAllResHome = async (id) => {
  const reservations = await Reservation.findAll();

  console.log(reservations);
  const reservationsHome = [];

  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].dataValues.PropertyId === id) {
      reservationsHome.push(reservations[i]);
    }
  }

  if (!reservationsHome.length) {
    throw new Error("Esta casa no tiene reservaciones");
  }
  return reservationsHome;
};

const getAllResUser = async (UserEmail) => {
  const reservations = await Reservation.findAll();
  const properties = await Property.findAll();
  const user = await Users.findOne({ where: { email: UserEmail } });
  const userGoogle = await UsersGoogle.findOne({ where: { email: UserEmail } });

  console.log(user);
  // console.log(userGoogle);

  const reservationsUser = [];

  for(let i = 0; i < reservations.length; i++){
    if(!reservations[i].dataValues.UserId || !user){continue;}
    if(reservations[i].dataValues.UserId===user.dataValues.id){
      reservationsUser.push(reservations[i]);
    }
  }
  console.log(reservationsUser);

    if (!reservationsUser.length) {
      for (let i = 0; i < reservations.length; i++) {
        if(!reservations[i].dataValues.UsersGoogleId || !userGoogle){continue;}
        console.log(userGoogle);
        if (reservations[i].dataValues.UsersGoogleId === userGoogle.dataValues.id) {
          reservationsUser.push(reservations[i]);
        }
      }
    }

  if (!reservationsUser.length) {
    throw new Error("No tienes reservaciones, de momento");
  }

  for (let i = 0; i < reservationsUser.length; i++) {
    for (let j = 0; j < properties.length; j++) {
      if (
        reservationsUser[i].dataValues.PropertyId ===
        properties[j].dataValues.id
      ) {
        reservationsUser[i].dataValues.PropertyTitle =
          properties[j].dataValues.title;
      }
    }
  }
  console.log(reservationsUser);

  return reservationsUser;
};

module.exports = { createReservation, getAllResHome, getAllResUser };