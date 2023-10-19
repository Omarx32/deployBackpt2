const {createReview, getReviewsHome, getReviewsUser}= require('../../controllers/Reviews/createReview');
const destroyReview= require('../../controllers/Reviews/destroyReservation')

const createReviewHandler= async (req, res)=>{
    try {
        const {description, rating, idHouse, email, password}= req.body;
        const response= await createReview(description, rating, idHouse, email, password);
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create", error: error.message});
    }
}

const getReviewsHandler= async (req, res)=>{
    try {
        const {id}= req.params;
        const response= await getReviewsHome(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: "Failed to get", error: error.message});
    }
}

const destroyReviewHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await destroyReview(id);
      res.status(200).send("Review successfully deleted");
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Failed to delete", error: error.message });
    }
  };
  const getReviewsUserHandler = async (req, res) => {
    try {
      const { email } = req.query;
      const response = await getReviewsUser(email);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
}

module.exports={createReviewHandler, getReviewsHandler, destroyReviewHandler, getReviewsUserHandler}