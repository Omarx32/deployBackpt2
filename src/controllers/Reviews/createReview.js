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
    const users = await Users.findAll();
    const usersGoogle= await UsersGoogle.findAll();
  
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

    for(let i = 0; i < reviewsHome.length; i++){
        for(let j = 0; j < users.length; j++){
            if(!reviewsHome[i].dataValues.UserId){
              continue;  
            }
            if(reviewsHome[i].dataValues.UserId===users[j].dataValues.id){
                reviewsHome[i].dataValues.userName=`${users[j].dataValues.fullName} ${users[j].dataValues.lastName}`
            }
        }
    }

    for(let i = 0; i < reviewsHome.length; i++){
        for(let j = 0; j < usersGoogle.length; j++){
            if(!reviewsHome[i].dataValues.UsersGoogleId){
              continue;  
            }
            if(reviewsHome[i].dataValues.UsersGoogleId===usersGoogle[j].dataValues.id){
                reviewsHome[i].dataValues.userName=`${usersGoogle[j].dataValues.givenName} ${usersGoogle[j].dataValues.familyName}`
            }
        }
    }

    return reviewsHome;
};

const getReviewsUser = async (UserEmail) => {
    const reviews = await Reviews.findAll();
    const properties = await Property.findAll();
    const user = await Users.findOne({ where: { email: UserEmail } });
    const userGoogle = await UsersGoogle.findOne({ where: { email: UserEmail } });
  
    console.log(user);
    // console.log(userGoogle);
  
    const reviewsUser = [];
  
    for(let i = 0; i < reviews.length; i++){
      if(!reviews[i].dataValues.UserId || !user){continue;}
      if(reviews[i].dataValues.UserId===user.dataValues.id){
        reviewsUser.push(reviews[i]);
      }
    }
    console.log(reviewsUser);
  
      if (!reviewsUser.length) {
        for (let i = 0; i < reviews.length; i++) {
          if(!reviews[i].dataValues.UsersGoogleId || !userGoogle){continue;}
          console.log(userGoogle);
          if (reviews[i].dataValues.UsersGoogleId === userGoogle.dataValues.id) {
            reviewsUser.push(reviews[i]);
          }
        }
      }
  
    if (!reviewsUser.length) {
      throw new Error("Error viteh");
    }
  
    for (let i = 0; i < reviewsUser.length; i++) {
      for (let j = 0; j < properties.length; j++) {
        if (
          reviewsUser[i].dataValues.PropertyId ===
          properties[j].dataValues.id
        ) {
          reviewsUser[i].dataValues.PropertyTitle =
            properties[j].dataValues.title;
        }
      }
    }
    console.log(reviewsUser);
  
    return reviewsUser;
  };

module.exports= {createReview, getReviewsHome, getReviewsUser};