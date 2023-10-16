const {Reservation}=require('../../db');

const destroyRes= async (id)=>{

    const deletedReservation= await Reservation.destroy({where:{id}});

    return deletedReservation;
}

module.exports= destroyRes;