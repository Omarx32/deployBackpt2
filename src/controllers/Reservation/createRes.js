const diacriticless = require("diacriticless");
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

  const resHome = await Property.findByPk(idHome);

  // const resHomes= await Property.findAll()

  // for(let i = 0; i < resHomes.length; i++){
  // 	resHomes[i].dataValues.secondName= diacriticless(resHomes[i].dataValues.title)
  // }
  // console.log(resHomes);
  // const nameHome= resHomes.find((resHome)=>{
  //     if(
  //       resHome.dataValues.title===home ||
  //       resHome.dataValues.title.toLowerCase()===home.toLowerCase() ||
  //       resHome.dataValues.title.toUpperCase()===home.toUpperCase() ||
  //       resHome.dataValues.secondName===diacriticless(home) ||
  //       resHome.dataValues.secondName.toLowerCase()===diacriticless(home.toLowerCase()) ||
  //       resHome.dataValues.secondName.toUpperCase()===diacriticless(home.toUpperCase())
  //       ){
  //         return resHome;
  //     }
  // })

  // console.log(reservationsHome);

  const price = resHome.dataValues.nightPrice;
  const newRes = { month, price, numHuespedes };

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

  const reservationsUser = [];

  // for (let i = 0; i < reservations.length; i++) {
  //   if (
  //     reservations[i].dataValues.UserId ||
  //     reservations[i].dataValues.UsersGoogleId
  //   ) {
  //     reservationsUser.push(reservations[i]);
  //   }
  // }

  for(let i = 0; i < reservations.length; i++){
    if(!reservations[i].dataValues.UserId || !user){break;}
    if(reservations[i].dataValues.UserId===user.dataValues.id){
      reservationsUser.push(reservations[i]);
    }
  }

    if (!reservationsUser.length) {
      for (let i = 0; i < reservations.length; i++) {
        if(!reservations[i].dataValues.UsersGoogleId || userGoogle){break;}
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