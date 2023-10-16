const diacriticless = require("diacriticless");
const {Property, Reservation, Users, UsersGoogle} = require ("../../db");

const createReservation= async (month, numHuespedes, home, email, password)=>{
	if(!month || !numHuespedes || !home){
		 throw new Error("Missing required data") 
	}

	const resHomes= await Property.findAll()

	for(let i = 0; i < resHomes.length; i++){
		resHomes[i].dataValues.secondName= diacriticless(resHomes[i].dataValues.title)
	}
	console.log(resHomes);
	const nameHome= resHomes.find((resHome)=>{
        if(          
          resHome.dataValues.title===home || 
          resHome.dataValues.title.toLowerCase()===home.toLowerCase() ||
          resHome.dataValues.title.toUpperCase()===home.toUpperCase() ||
          resHome.dataValues.secondName===home || 
          resHome.dataValues.secondName.toLowerCase()===home.toLowerCase() ||
          resHome.dataValues.secondName.toUpperCase()===home.toUpperCase()
          ){
            return resHome;
        }
    })

	console.log(nameHome);

	const price= nameHome.dataValues.nightPrice
	const newRes= {month, price, numHuespedes}
	
	const createRes= await Reservation.create(newRes)
	
	await createRes.setProperty(nameHome);

	if(email && !password){
		const userGoogle= await UsersGoogle.findOne({
			where: {email}
		});
		if(userGoogle){
			await createRes.setUsersGoogle(userGoogle);
		} else{
			throw new Error("Esta renta no pertenece a ningún usuario")
		}
	}
	if(email && password){
		const user= await Users.findOne({
			where: {email, password}
		});
		if(user){
			await createRes.setUser(user);             
		} else{
			throw new Error("Esta renta no pertenece a ningún usuario")
		}
	}

	return createRes;
}

const getAllResHome= async (id)=>{
	const reservations= await Reservation.findAll();

	console.log(reservations);
	const reservationsHome=[]

	for(let i = 0; i < reservations.length; i++){
		if(reservations[i].dataValues.PropertyId===id){
			reservationsHome.push(reservations[i]);
		}
	}

	if(!reservationsHome.length){
		throw new Error("Esta casa no tiene reservaciones")
	}
	return reservationsHome;
}

const getAllResUser= async (UserId)=>{
	const reservations= await Reservation.findAll();

	console.log(reservations);
	const reservationsUser=[];

	for(let i = 0; i < reservations.length; i++){
		if(reservations[i].dataValues.UserId===UserId){
			reservationsUser.push(reservations[i]);
		}
	}

	if(!reservationsUser.length){
		for(let i = 0; i < reservations.length; i++){
			if(reservations[i].dataValues.UsersGoogleId===UserId){
				reservationsUser.push(reservations[i]);
			}
		}
	}

	if(!reservationsUser.length){
		throw new Error("No tienes reservaciones, de momento")	
	}

	return reservationsUser;
}

module.exports= {createReservation, getAllResHome, getAllResUser}