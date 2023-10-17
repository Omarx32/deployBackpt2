const {Reviews, Users, UsersGoogle, Property}= require("../../db")

const createReview= async (description, rating, idHouse, email, password)=>{
    try {
        if(!description || !rating || !idHouse || !email){
          throw new Error("Falta contenido")  
        }

        const pushDate= new Date();
        console.log(pushDate);

        const property= await Property.findByPk(idHouse)

        const review= await Reviews.create({pushDate, description, rating, idHouse, email, password})

        await review.setProperty(property)
        console.log(review);

        if(email && !password){
            const userGoogle= await UsersGoogle.findOne({
                where: {email}
            });
            if(userGoogle){
                await review.setUsersGoogle(userGoogle);
            } else{
                throw new Error("Esta revisión no pertenece a ningún usuario")
            }
        }
        if(email && password){
            const user= await Users.findOne({
                where: {email, password}
            });
            if(user){
                await review.setUser(user);             
            } else{
                throw new Error("Esta revisión no pertenece a ningún usuario")
            }
        }

        return review;

    } catch (error) {
        console.error(error);
        throw new Error("Error al crear review", error);
    }
}


const getReviewsHome = async (id) => {
    const reviews = await Reviews.findAll();
  
    console.log(reviews);
    const reviewsHome = [];
  
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].dataValues.PropertyId === id) {
        reviewsHome.push(reviews[i]);
      }
    }
  
    if (!reviewsHome.length) {
      throw new Error("Esta casa no tiene reviews");
    }

    return reviewsHome;
};



module.exports= {createReview, getReviewsHome};